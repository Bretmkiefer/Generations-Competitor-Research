import { useState, useEffect, useRef } from 'react';
import { Plus, Save, Search, X, AlertTriangle, ExternalLink, FileDown, Upload, Download, ChevronDown, Bug, Trash2, RefreshCw, ChevronRight } from 'lucide-react';
import { WebsiteCard } from './WebsiteCard';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Nightjar fixed theme — warm amber hsl(30,…)
const THEME = {
  sidebarBg:       'linear-gradient(180deg, hsl(30,45%,42%) 0%, hsl(30,42%,52%) 55%, hsl(48,44%,46%) 100%)',
  borderColor:     'hsl(30,55%,72%)',
  glowColor:       'hsla(30,55%,60%,0.22)',
  accentColor:     'hsl(30,60%,58%)',
  listActiveBg:    'rgba(255,255,255,0.18)',
  listActiveBorder:'rgba(255,255,255,0.35)',
  cardTopBorder:   'hsl(30,60%,52%)',
};

export interface ImageItem {
  data: string;
  note: string;
  label: string;
}

export interface Website {
  id: string;
  name: string;
  url: string;
  clicks: number;
  notes: string;
  images: ImageItem[];
  logoUrl?: string;
}

interface DeleteConfirmation {
  websiteId: string;
  websiteName: string;
}

interface ErrorEntry {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  context: string;
  explanation: string;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d49d71e`;
const STORAGE_KEY = 'user-flow-map-backup';

function migrateImages(raw: any[]): ImageItem[] {
  return (raw || []).map((img: any) => {
    if (typeof img === 'string') {
      return { data: img, note: '', label: '' };
    }
    return { data: img.data || '', note: img.note || '', label: img.label || '' };
  });
}

async function logErrorToBackend(type: string, message: string, context: string) {
  try {
    await fetch(`${API_BASE}/errors`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, message, context }),
    });
  } catch (e) {
    // Silently fail — don't cascade errors
  }
}

export function WebsiteTracker() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isSaved, setIsSaved] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showErrorLog, setShowErrorLog] = useState(false);
  const [errorLog, setErrorLog] = useState<ErrorEntry[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [isLoadingErrors, setIsLoadingErrors] = useState(false);
  const [notesCollapsed, setNotesCollapsed] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { loadWebsites(); }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };
    if (showExportMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showExportMenu]);

  const websitesRef = useRef(websites);
  websitesRef.current = websites;

  useEffect(() => {
    // Never auto-save during the initial load phase.
    // Also require at least one website to exist — this prevents an empty-array
    // save from overwriting real cloud data if the load temporarily sets [] before
    // the real data arrives, or if a network error causes a fallback to empty state.
    if (!isInitialLoad && websites.length > 0) {
      setIsSaved(false);
      const timeoutId = setTimeout(() => saveData(), 1500);
      return () => clearTimeout(timeoutId);
    }
    // When the user explicitly deletes the last website, we still want to save.
    // That case is handled by calling saveData() directly in confirmDelete.
  }, [websites, isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad && websites.length > 0) {
      const needsLogos = websites.filter(w => w.url && !w.logoUrl);
      if (needsLogos.length > 0) {
        setWebsites(prev => prev.map(site =>
          site.url && !site.logoUrl
            ? { ...site, logoUrl: fetchCompanyLogo(site.url) || undefined }
            : site
        ));
      }
    }
  }, [isInitialLoad]);

  const loadWebsites = async () => {
    try {
      setIsLoading(true);
      // Retry cloud load up to 3 times for transient startup errors
      let cloudLoaded = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          if (attempt > 0) await new Promise(r => setTimeout(r, 2000 * attempt));
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(new Error('Load request timed out')), 30000);
          const response = await fetch(`${API_BASE}/websites`, {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` },
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const rawWebsites = data.websites || [];
            const loadedWebsites: Website[] = rawWebsites.map((w: any) => ({
              ...w,
              images: migrateImages(w.images),
            }));
            try { localStorage.removeItem(STORAGE_KEY); } catch {}
            const merged = mergeWithCompetitors(loadedWebsites);
            cloudCountRef.current = merged.length;
            setWebsites(merged);
            if (merged.length > 0) setSelectedWebsiteId(merged[0].id);
            setUseLocalStorage(false);
            cloudLoaded = true;
            break;
          }
        } catch (cloudError: any) {
          console.warn(`Cloud load attempt ${attempt + 1} failed:`, cloudError?.message);
          if (attempt === 2) {
            await logErrorToBackend('LOAD_CLOUD_FAILED', cloudError?.message || String(cloudError), 'loadWebsites');
          }
        }
      }
      if (cloudLoaded) return;

      // Fallback to localStorage
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const raw = JSON.parse(saved);
          const loadedWebsites: Website[] = raw.map((w: any) => ({
            ...w,
            images: migrateImages(w.images),
          }));
          const merged = mergeWithCompetitors(loadedWebsites);
          setWebsites(merged);
          if (merged.length > 0) setSelectedWebsiteId(merged[0].id);
          setUseLocalStorage(true);
        } else {
          setWebsites([]);
          setUseLocalStorage(true);
        }
      } catch (storageError: any) {
        console.error('localStorage read error:', storageError);
        setWebsites([]);
        setUseLocalStorage(true);
      }
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  const mergeWithCompetitors = (existing: Website[]): Website[] => {
    // Only seed default competitors on first-ever load (empty database).
    // Once any data exists, the user's list is the source of truth —
    // deleted entries must stay deleted.
    if (existing.length > 0) return existing;

    const competitorCompanies = [
      { name: 'Canva', url: 'canva.com' },
      { name: 'Adobe Firefly', url: 'adobe.com' },
      { name: 'AdCreative.ai', url: 'adcreative.ai' },
      { name: 'ChatGPT', url: 'openai.com' },
      { name: 'Midjourney', url: 'midjourney.com' },
      { name: 'Stable Diffusion', url: 'stability.ai' },
      { name: 'DaVinci.ai', url: 'davinci.ai' },
      { name: 'Runway', url: 'runwayml.com' },
      { name: 'Kling AI', url: 'klingai.com' },
      { name: 'Claid.ai', url: 'claid.ai' },
      { name: 'Nightjar', url: 'nightjar.ai' },
      { name: 'Flair.ai', url: 'flair.ai' },
      { name: 'Photoroom', url: 'photoroom.com' },
      { name: 'Pebblely', url: 'pebblely.com' },
      { name: 'Kaptured AI', url: 'kaptured.ai' },
      { name: 'Kive.ai', url: 'kive.ai' },
    ];

    return competitorCompanies.map((company, index) => ({
      id: `competitor-${Date.now()}-${index}`,
      name: company.name,
      url: company.url,
      clicks: 0,
      notes: '',
      images: [],
      logoUrl: fetchCompanyLogo(company.url) || undefined,
    }));
  };

  // Track how many websites were in the cloud at last successful load/save.
  // Used as a safety rail to prevent accidental overwrites with fewer entries.
  const cloudCountRef = useRef<number>(0);

  const saveData = async (showAlert = false, dataToSave?: Website[]) => {
    const payload = dataToSave ?? websites;

    // Hard safety: never save if payload is empty (nothing to write)
    if (payload.length === 0) {
      console.warn('saveData blocked: refusing to save empty website list');
      return;
    }

    // Soft safety: warn if we are about to save significantly fewer websites
    // than what the cloud last had (protects against accidental overwrites)
    if (cloudCountRef.current > 0 && payload.length < cloudCountRef.current - 2) {
      const confirmed = showAlert
        ? window.confirm(
            `You are about to save ${payload.length} websites, but the cloud has ${cloudCountRef.current}. Continue?`
          )
        : false;
      if (!confirmed) {
        console.warn(`saveData blocked: local count ${payload.length} < cloud count ${cloudCountRef.current}`);
        await logErrorToBackend(
          'SAVE_BLOCKED_COUNT_MISMATCH',
          `Local: ${payload.length}, Cloud: ${cloudCountRef.current}`,
          'saveData safety check'
        );
        return;
      }
    }

    // Try cloud save with up to 3 attempts for transient errors
    let lastError = '';
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if (attempt > 0) await new Promise(r => setTimeout(r, 2000 * attempt));

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(new Error('Save request timed out')), 30000);

        const response = await fetch(`${API_BASE}/websites`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ websites: payload }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          cloudCountRef.current = payload.length;
          setUseLocalStorage(false);
          setIsSaved(true);
          try { localStorage.removeItem(STORAGE_KEY); } catch {}
          if (showAlert) alert('Saved successfully to cloud!');
          return;
        } else {
          const errorText = await response.text();
          lastError = `HTTP ${response.status}: ${errorText}`;
          console.error(`Cloud save attempt ${attempt + 1} failed:`, lastError);
          // Don't retry on client errors (4xx)
          if (response.status >= 400 && response.status < 500) break;
        }
      } catch (e: any) {
        lastError = e?.message || String(e);
        console.error(`Save error attempt ${attempt + 1}:`, lastError);
      }
    }

    // Cloud save failed — persist locally so data isn't lost
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setUseLocalStorage(true);
      setIsSaved(true); // data is safe locally
      await logErrorToBackend('SAVE_FAILED_FELL_BACK_TO_LOCAL', lastError, 'saveData');
      if (showAlert) alert('Cloud unavailable — saved locally. Will sync to cloud next time.');
      return;
    } catch (storageErr: any) {
      await logErrorToBackend('SAVE_FAILED', lastError, 'saveData');
    }

    setIsSaved(false);
    if (showAlert) alert('Unable to save. Please try again in a moment.');
  };

  const fetchErrorLog = async () => {
    setIsLoadingErrors(true);
    try {
      const response = await fetch(`${API_BASE}/errors`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });
      if (response.ok) {
        const data = await response.json();
        setErrorLog(data.errors || []);
        setErrorCount(data.errors?.length || 0);
      }
    } catch (e) {
      console.error('Failed to fetch error log:', e);
    } finally {
      setIsLoadingErrors(false);
    }
  };

  const clearErrorLog = async () => {
    try {
      await fetch(`${API_BASE}/errors`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });
      setErrorLog([]);
      setErrorCount(0);
    } catch (e) {
      console.error('Failed to clear error log:', e);
    }
  };

  const getDomainFromUrl = (url: string): string | null => {
    try {
      if (!url) return null;
      const urlWithProtocol = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;
      return new URL(urlWithProtocol).hostname.replace('www.', '');
    } catch { return null; }
  };

  const fetchCompanyLogo = (url: string): string | null => {
    const domain = getDomainFromUrl(url);
    if (!domain) return null;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  const addWebsite = () => {
    const newWebsite: Website = {
      id: Date.now().toString(),
      name: '',
      url: '',
      clicks: 0,
      notes: '',
      images: [],
      logoUrl: undefined,
    };
    setWebsites(prev => [...prev, newWebsite]);
    setSelectedWebsiteId(newWebsite.id);
  };

  const updateWebsite = (id: string, updates: Partial<Website>) => {
    if (updates.url !== undefined && updates.url.trim() !== '') {
      const logoUrl = fetchCompanyLogo(updates.url);
      if (logoUrl) updates.logoUrl = logoUrl;
    }
    setWebsites(prev => prev.map(site => site.id === id ? { ...site, ...updates } : site));
  };

  const deleteWebsite = (id: string) => {
    const website = websites.find(s => s.id === id);
    setDeleteConfirmation({ websiteId: id, websiteName: website?.name || 'Untitled Website' });
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      const remaining = websites.filter(s => s.id !== deleteConfirmation.websiteId);
      setWebsites(remaining);
      if (selectedWebsiteId === deleteConfirmation.websiteId) setSelectedWebsiteId(null);
      setDeleteConfirmation(null);
      // Update cloud count ref so the safety check doesn't block intentional deletes.
      cloudCountRef.current = remaining.length;
      if (remaining.length === 0) {
        // Auto-save won't fire for empty lists, so save explicitly.
        setTimeout(() => saveData(false, remaining), 500);
      }
    }
  };

  const addImage = (id: string, item: ImageItem) => {
    setWebsites(prev => prev.map(site =>
      site.id === id ? { ...site, images: [...site.images, item] } : site
    ));
  };

  const removeImage = (id: string, imageIndex: number) => {
    setWebsites(prev => prev.map(site =>
      site.id === id
        ? { ...site, images: site.images.filter((_, i) => i !== imageIndex) }
        : site
    ));
  };

  const updateImage = (id: string, imageIndex: number, updates: Partial<ImageItem>) => {
    setWebsites(prev => prev.map(site =>
      site.id === id
        ? { ...site, images: site.images.map((img, i) => i === imageIndex ? { ...img, ...updates } : img) }
        : site
    ));
  };

  const reorderImages = (id: string, fromIndex: number, toIndex: number) => {
    setWebsites(prev => prev.map(site => {
      if (site.id !== id) return site;
      const imgs = [...site.images];
      const [moved] = imgs.splice(fromIndex, 1);
      imgs.splice(toIndex, 0, moved);
      return { ...site, images: imgs };
    }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(websites, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `user-flow-maps-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          if (Array.isArray(imported)) {
            const migrated: Website[] = imported.map((w: any) => ({
              ...w,
              images: migrateImages(w.images),
            }));
            setWebsites(migrated);
            if (migrated.length > 0) setSelectedWebsiteId(migrated[0].id);
            saveData();
            alert(`Successfully imported ${migrated.length} websites!`);
          } else {
            alert('Invalid file format.');
          }
        } catch {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;

    const addHeader = (isFirst = false) => {
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, pageWidth, 35, 'F');
      doc.setFillColor(147, 51, 234);
      doc.rect(0, 0, pageWidth, 3, 'F');
      if (!isFirst) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(255, 255, 255);
        doc.text('User Flow Maps', margin, 20);
        doc.setTextColor(200, 200, 255);
        doc.text(`Page ${doc.getCurrentPageInfo().pageNumber}`, pageWidth - margin - 20, 20);
      }
    };

    addHeader(true);
    let y = 50;

    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text('User Flow Maps', pageWidth / 2, y, { align: 'center' });
    y += 15;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Competitive Analysis Report', pageWidth / 2, y, { align: 'center' });
    y += 30;

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 22, 3, 3, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 22, 3, 3, 'S');
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Generated:', margin + 5, y);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), margin + 35, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Total Websites:', margin + 5, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${websites.length}`, margin + 42, y);
    y += 30;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text('Table of Contents', margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    websites.forEach((website, index) => {
      if (y > pageHeight - 30) { doc.addPage(); addHeader(); y = 50; }
      doc.setTextColor(79, 70, 229);
      doc.text(`${index + 1}.`, margin, y);
      doc.setTextColor(60, 60, 60);
      doc.text(website.name || 'Untitled Website', margin + 10, y);
      y += 6;
    });

    for (let i = 0; i < websites.length; i++) {
      const website = websites[i];
      doc.addPage();
      addHeader();
      y = 50;

      doc.setFillColor(249, 250, 251);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 35, 3, 3, 'F');
      doc.setFillColor(79, 70, 229);
      doc.roundedRect(margin, y, 4, 35, 0, 0, 'F');
      y += 12;

      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(79, 70, 229);
      doc.text(`${i + 1}.`, margin + 10, y);
      doc.setTextColor(30, 30, 30);
      doc.text(website.name || 'Untitled Website', margin + 20, y);
      y += 10;

      if (website.url) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(website.url, margin + 10, y);
      }
      y += 20;

      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, y, 80, 20, 3, 3, 'F');
      doc.setDrawColor(229, 231, 235);
      doc.roundedRect(margin, y, 80, 20, 3, 3, 'S');
      y += 8;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 100, 100);
      doc.text('CLICKS', margin + 5, y);
      y += 7;
      doc.setFontSize(16);
      doc.setTextColor(79, 70, 229);
      doc.text(String(website.clicks), margin + 5, y);
      y += 10;

      if (website.notes) {
        y += 5;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(60, 60, 60);
        doc.text('Notes', margin, y);
        y += 8;
        doc.setFillColor(254, 252, 232);
        const lines = doc.splitTextToSize(website.notes, pageWidth - margin * 2 - 10);
        const h = lines.length * 6 + 10;
        doc.roundedRect(margin, y - 5, pageWidth - margin * 2, h, 3, 3, 'F');
        doc.setDrawColor(250, 204, 21);
        doc.roundedRect(margin, y - 5, pageWidth - margin * 2, h, 3, 3, 'S');
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text(lines, margin + 5, y);
        y += h + 5;
      }

      if (website.images.length > 0) {
        y += 10;
        if (y > pageHeight - 120) { doc.addPage(); addHeader(); y = 50; }
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(60, 60, 60);
        doc.text(`Screenshots (${website.images.length})`, margin, y);
        y += 10;

        for (const img of website.images) {
          if (y > pageHeight - 110) { doc.addPage(); addHeader(); y = 50; }
          try {
            const imgWidth = pageWidth - margin * 2;
            const imgHeight = 100;
            doc.setDrawColor(229, 231, 235);
            doc.roundedRect(margin - 2, y - 2, imgWidth + 4, imgHeight + 4, 3, 3, 'S');
            doc.addImage(img.data, 'JPEG', margin, y, imgWidth, imgHeight);
            y += imgHeight;
            if (img.label || img.note) {
              y += 5;
              doc.setFontSize(9);
              doc.setFont('helvetica', 'italic');
              doc.setTextColor(100, 100, 100);
              if (img.label) doc.text(img.label, margin, y);
              if (img.note) { y += 5; doc.text(img.note, margin, y); }
            }
            y += 15;
          } catch {
            doc.setFontSize(9);
            doc.setTextColor(200, 100, 100);
            doc.text('[Image could not be added]', margin, y);
            y += 10;
          }
        }
      }
    }

    doc.save(`user-flow-maps-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportToWord = async () => {
    const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer, ImageRun } = await import('docx');
    const children: any[] = [];

    children.push(new Paragraph({ text: "User Flow Maps", heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, spacing: { after: 200 } }));
    children.push(new Paragraph({ text: "Competitive Analysis Report", alignment: AlignmentType.CENTER, spacing: { after: 400 } }));

    for (let index = 0; index < websites.length; index++) {
      const website = websites[index];
      children.push(new Paragraph({ text: `${index + 1}. ${website.name || 'Untitled Website'}`, heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }));
      if (website.url) children.push(new Paragraph({ children: [new TextRun({ text: 'URL: ', bold: true }), new TextRun({ text: website.url, color: '4F46E5' })], spacing: { after: 100 } }));
      children.push(new Paragraph({ children: [new TextRun({ text: 'Clicks: ', bold: true }), new TextRun({ text: String(website.clicks) })], spacing: { after: 200 } }));
      if (website.notes) {
        children.push(new Paragraph({ text: 'Notes:', bold: true, spacing: { after: 100 } }));
        children.push(new Paragraph({ text: website.notes, spacing: { after: 200 } }));
      }
      if (website.images.length > 0) {
        children.push(new Paragraph({ text: `Screenshots (${website.images.length}):`, bold: true, spacing: { after: 200 } }));
        for (const img of website.images) {
          try {
            const base64Data = img.data.split(',')[1];
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
            children.push(new Paragraph({ children: [new ImageRun({ data: bytes, transformation: { width: 550, height: 350 } })], spacing: { after: 100 } }));
            if (img.label) children.push(new Paragraph({ text: `Label: ${img.label}`, italics: true, spacing: { after: 50 } }));
            if (img.note) children.push(new Paragraph({ text: `Note: ${img.note}`, spacing: { after: 150 } }));
          } catch {
            children.push(new Paragraph({ text: '[Image could not be added]', italics: true, spacing: { after: 200 } }));
          }
        }
      }
      children.push(new Paragraph({ text: '─────────────────────────────────────────', spacing: { after: 200 } }));
    }

    const doc = new Document({ sections: [{ children }] });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `user-flow-maps-${new Date().toISOString().split('T')[0]}.docx`);
  };

  const exportToFolder = async () => {
    const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } = await import('docx');
    const zip = new JSZip();
    const folder = zip.folder('user-flow-maps');
    if (!folder) return;

    const children: any[] = [];
    children.push(new Paragraph({ text: "User Flow Maps", heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, spacing: { after: 400 } }));

    websites.forEach((website, index) => {
      children.push(new Paragraph({ text: `${index + 1}. ${website.name || 'Untitled Website'}`, heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }));
      if (website.url) children.push(new Paragraph({ children: [new TextRun({ text: 'URL: ', bold: true }), new TextRun({ text: website.url, color: '4F46E5' })], spacing: { after: 100 } }));
      children.push(new Paragraph({ children: [new TextRun({ text: 'Clicks: ', bold: true }), new TextRun({ text: String(website.clicks) })], spacing: { after: 200 } }));
      if (website.notes) {
        children.push(new Paragraph({ text: 'Notes:', bold: true, spacing: { after: 100 } }));
        children.push(new Paragraph({ text: website.notes, spacing: { after: 200 } }));
      }
      if (website.images.length > 0) {
        children.push(new Paragraph({ text: `Screenshots (${website.images.length}):`, bold: true, spacing: { after: 100 } }));
        website.images.forEach((img, imgIndex) => {
          const imageName = `${index + 1}_${website.name.replace(/[^a-z0-9]/gi, '_')}_screenshot_${imgIndex + 1}.png`;
          children.push(new Paragraph({ text: `  • ${imageName}${img.label ? ` — ${img.label}` : ''}`, spacing: { after: 50 } }));
          if (img.note) children.push(new Paragraph({ text: `    Note: ${img.note}`, italics: true, spacing: { after: 50 } }));
          folder.file(imageName, img.data.split(',')[1], { base64: true });
        });
        children.push(new Paragraph({ text: '', spacing: { after: 200 } }));
      }
      children.push(new Paragraph({ text: '─────────────────────────────────────────', spacing: { after: 200 } }));
    });

    const doc = new Document({ sections: [{ children }] });
    const docBlob = await Packer.toBlob(doc);
    folder.file('user-flow-maps.docx', docBlob);
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, `user-flow-maps-${new Date().toISOString().split('T')[0]}.zip`);
  };

  const filteredWebsites = websites.filter(website => {
    const query = searchQuery.toLowerCase();
    return (
      website.name.toLowerCase().includes(query) ||
      website.url.toLowerCase().includes(query) ||
      website.notes.toLowerCase().includes(query)
    );
  });

  const selectedWebsite = selectedWebsiteId ? websites.find(w => w.id === selectedWebsiteId) : null;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ background: '#fdf8f3' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#fdf8f3' }}>
      {/* Sidebar */}
      <div className="w-72 flex flex-col overflow-hidden flex-shrink-0" style={{
        background: THEME.sidebarBg,
        borderRight: `4px solid ${THEME.borderColor}`,
        boxShadow: `4px 0 24px ${THEME.glowColor}`,
      }}>
        {/* Header */}
        <div className="px-4 pt-5 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.01em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>User Flow Map</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <div className={`w-1.5 h-1.5 rounded-full ${isSaved ? 'bg-emerald-300' : 'bg-amber-300'}`}
                style={{ boxShadow: isSaved ? '0 0 5px #6ee7b7' : '0 0 5px #fcd34d' }}
              />
              <span style={{ fontSize: '11px', color: '#555', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {isSaved ? 'Saved' : 'Saving…'} · {useLocalStorage ? 'Local' : 'Cloud'}
              </span>
            </div>
          </div>
          <button
            onClick={() => { setShowErrorLog(true); fetchErrorLog(); }}
            className="relative p-1.5 rounded-lg transition-colors hover:bg-white/15"
            style={{ color: 'rgba(0,0,0,0.5)' }}
            title="View error log"
          >
            <Bug className="w-4 h-4" />
            {errorCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-400 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                {errorCount > 9 ? '9+' : errorCount}
              </span>
            )}
          </button>
        </div>

        {/* Action buttons */}
        <div className="px-3 pt-3 pb-2 flex gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <button
            onClick={addWebsite}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: 'rgba(255,255,255,0.22)', color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.18)', backdropFilter: 'blur(4px)', transition: 'background 0.3s ease' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.32)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
          <button
            onClick={() => saveData(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ color: '#2d2d2d', border: '1px solid rgba(0,0,0,0.18)', background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            title="Manual save"
          >
            <Save className="w-3.5 h-3.5" />
            Save
          </button>
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={websites.length === 0}
              className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30"
              style={{ color: '#2d2d2d', border: '1px solid rgba(0,0,0,0.18)', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              title="Export"
            >
              <FileDown className="w-3.5 h-3.5" />
              <ChevronDown className="w-3 h-3" />
            </button>
            {showExportMenu && websites.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl z-50 py-1 overflow-hidden" style={{ border: '1px solid #e0e7ff' }}>
                {[
                  { label: 'Export as PDF', action: exportToPDF },
                  { label: 'Export as Word Doc', action: exportToWord },
                  { label: 'Export as Folder (.zip)', action: exportToFolder },
                ].map(({ label, action }) => (
                  <button key={label} onClick={() => { action(); setShowExportMenu(false); }} className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <FileDown className="w-3.5 h-3.5 text-indigo-400" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Import/Export JSON */}
        <div className="px-3 pb-3 flex gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <button onClick={exportData} disabled={websites.length === 0} className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg transition-all disabled:opacity-30"
            style={{ fontSize: '11px', color: '#2d2d2d', border: '1px solid rgba(0,0,0,0.18)', background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <Download className="w-3 h-3" />
            Export JSON
          </button>
          <label className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg transition-all cursor-pointer"
            style={{ fontSize: '11px', color: '#2d2d2d', border: '1px solid rgba(0,0,0,0.18)', background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <Upload className="w-3 h-3" />
            Import JSON
            <input type="file" accept=".json" onChange={importData} className="hidden" />
          </label>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.18), transparent)', margin: '0 12px 10px' }} />

        {/* Search */}
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'rgba(0,0,0,0.4)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search websites…"
              className="w-full pl-8 pr-7 py-2 rounded-lg text-xs focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(0,0,0,0.15)', color: '#1a1a1a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(0,0,0,0.4)' }}>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Website list */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {filteredWebsites.length === 0 ? (
            <div className="p-4 text-center text-xs" style={{ color: 'rgba(0,0,0,0.4)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {websites.length === 0 ? 'No websites yet' : 'No matches'}
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredWebsites.map(website => {
                const isSelected = selectedWebsiteId === website.id;
                return (
                  <div
                    key={website.id}
                    className="relative rounded-xl transition-all overflow-hidden"
                    style={isSelected ? {
                      background: 'rgba(255,255,255,0.18)',
                      border: '1px solid rgba(255,255,255,0.35)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                    } : {
                      border: '1px solid transparent',
                    }}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.5)' }} />
                    )}
                    <button onClick={() => setSelectedWebsiteId(website.id)} className="w-full text-left p-2.5 pl-3">
                      <div className="flex items-center gap-2.5">
                        {website.logoUrl ? (
                          <img src={website.logoUrl} alt="" className="w-8 h-8 rounded-lg object-contain flex-shrink-0 p-1" style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.1)' }} />
                        ) : (
                          <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.12)' }}>
                            <span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{(website.name || 'U').charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="truncate" style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#111' : '#2d2d2d', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {website.name || 'Untitled'}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="truncate max-w-[72px]" style={{ fontSize: '10px', color: '#666', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{website.url || '—'}</span>
                            <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: '10px', fontWeight: 600, background: 'rgba(0,0,0,0.1)', color: '#333', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{website.clicks}</span>
                            <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: '10px', fontWeight: 600, background: 'rgba(0,0,0,0.08)', color: '#444', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{website.images.length} img</span>
                          </div>
                        </div>
                      </div>
                    </button>
                    {website.url && (
                      <a
                        href={website.url.startsWith('http') ? website.url : `https://${website.url}`}
                        target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2.5 right-2.5 p-1 rounded transition-colors"
                        style={{ color: 'rgba(0,0,0,0.3)' }}
                        title="Open site"
                        onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.3)')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '11px', color: '#666', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{websites.length} websites tracked</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto" style={{ background: '#fdf8f3' }}>
        {websites.length === 0 ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center max-w-xs">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No websites yet</h2>
              <p className="text-gray-500 text-sm mb-6">Add your first website to start tracking user flows</p>
              <button onClick={addWebsite} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
                Add Your First Website
              </button>
            </div>
          </div>
        ) : selectedWebsite ? (
          <div className="p-3 max-w-full">
            <WebsiteCard
              website={selectedWebsite}
              onUpdate={(updates) => updateWebsite(selectedWebsite.id, updates)}
              onDelete={() => deleteWebsite(selectedWebsite.id)}
              onAddImage={(item) => addImage(selectedWebsite.id, item)}
              onRemoveImage={(index) => removeImage(selectedWebsite.id, index)}
              onUpdateImage={(index, updates) => updateImage(selectedWebsite.id, index, updates)}
              onReorderImages={(from, to) => reorderImages(selectedWebsite.id, from, to)}
              accentColor={THEME.cardTopBorder}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">Select a website from the sidebar</p>
          </div>
        )}
      </div>

      {/* Right panel — Process Notes */}
      {selectedWebsite && (
        <div
          className="flex-shrink-0 flex flex-col overflow-hidden transition-all duration-200"
          style={{
            width: notesCollapsed ? '36px' : '260px',
            borderLeft: `2px solid ${THEME.borderColor}`,
            background: '#fdf8f3',
          }}
        >
          {/* Panel header */}
          <div
            className="flex items-center justify-between flex-shrink-0 px-2 py-3"
            style={{ borderBottom: notesCollapsed ? 'none' : '1px solid rgba(0,0,0,0.08)' }}
          >
            {!notesCollapsed && (
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Process Notes
              </span>
            )}
            <button
              onClick={() => setNotesCollapsed(c => !c)}
              className="p-1 rounded hover:bg-black/5 transition-colors flex-shrink-0"
              style={{ marginLeft: notesCollapsed ? 'auto' : undefined, marginRight: notesCollapsed ? 'auto' : undefined }}
              title={notesCollapsed ? 'Expand notes' : 'Collapse notes'}
            >
              <ChevronRight
                className="w-3.5 h-3.5 transition-transform duration-200"
                style={{ color: '#999', transform: notesCollapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}
              />
            </button>
          </div>

          {/* Notes textarea */}
          {!notesCollapsed && (
            <div className="flex-1 p-2 flex flex-col min-h-0">
              <textarea
                value={selectedWebsite.notes}
                onChange={(e) => updateWebsite(selectedWebsite.id, { notes: e.target.value })}
                placeholder="Describe the user flow steps, observations, patterns…"
                className="flex-1 w-full px-3 py-2 text-gray-800 placeholder-gray-300 rounded-lg text-xs focus:outline-none resize-none leading-relaxed"
                style={{
                  background: '#f9f8ff',
                  border: `1px solid ${THEME.borderColor}44`,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  minHeight: 0,
                }}
                onFocus={e => (e.currentTarget.style.border = `1px solid ${THEME.borderColor}`)}
                onBlur={e => (e.currentTarget.style.border = `1px solid ${THEME.borderColor}44`)}
              />
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-2xl mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Website?</h3>
            <p className="text-gray-500 text-center text-sm mb-1">This will permanently delete</p>
            <p className="text-base font-semibold text-indigo-600 text-center mb-5">"{deleteConfirmation.websiteName}"</p>
            <p className="text-xs text-gray-400 text-center mb-6">All data including screenshots and notes will be removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmation(null)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Error Log Modal */}
      {showErrorLog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bug className="w-5 h-5 text-red-500" />
                <h3 className="text-base font-bold text-gray-900">Error Log</h3>
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">{errorLog.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={fetchErrorLog} disabled={isLoadingErrors} className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Refresh">
                  <RefreshCw className={`w-4 h-4 ${isLoadingErrors ? 'animate-spin' : ''}`} />
                </button>
                <button onClick={clearErrorLog} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Clear all errors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={() => setShowErrorLog(false)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {errorLog.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Bug className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No errors logged — everything's running smoothly!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {errorLog.map((error) => (
                    <div key={error.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-mono rounded font-medium">{error.type}</span>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(error.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium mb-1">{error.message}</p>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                        <p className="text-xs text-amber-800"><span className="font-semibold">Why this happened: </span>{error.explanation}</p>
                      </div>
                      {error.context && (
                        <p className="text-xs text-gray-400 mt-1">Context: {error.context}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
