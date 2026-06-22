import { useRef, useState, useEffect } from 'react';
import { Trash2, Plus, X, ExternalLink, FileDown, ChevronLeft, ChevronRight, Pencil, Check } from 'lucide-react';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Website, ImageItem } from './WebsiteTracker';

interface WebsiteCardProps {
  website: Website;
  onUpdate: (updates: Partial<Website>) => void;
  onDelete: () => void;
  onAddImage: (item: ImageItem) => void;
  onRemoveImage: (index: number) => void;
  onUpdateImage: (index: number, updates: Partial<ImageItem>) => void;
  onReorderImages: (fromIndex: number, toIndex: number) => void;
  accentColor?: string;
}

export function WebsiteCard({
  website,
  onUpdate,
  onDelete,
  onAddImage,
  onRemoveImage,
  onUpdateImage,
  onReorderImages,
  accentColor = 'hsl(30,60%,52%)',
}: WebsiteCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [editingLabel, setEditingLabel] = useState<number | null>(null);
  const [labelDraft, setLabelDraft] = useState('');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };
    if (showExportMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showExportMenu]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => prev === null ? null : prev > 0 ? prev - 1 : website.images.length - 1);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => prev === null ? null : prev < website.images.length - 1 ? prev + 1 : 0);
    };
    if (lightboxIndex !== null) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [lightboxIndex, website.images.length]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const maxWidth = 1400;
        if (width > maxWidth) { height = (height * maxWidth) / width; width = maxWidth; }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.75);
        const label = file.name.replace(/\.[^/.]+$/, '');
        onAddImage({ data: compressed, note: '', label });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const saveLabel = (index: number) => {
    onUpdateImage(index, { label: labelDraft });
    setEditingLabel(null);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let y = margin;

    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 35, 'F');
    doc.setFillColor(147, 51, 234);
    doc.rect(0, 0, pageWidth, 3, 'F');
    y = 50;

    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text(website.name || 'Untitled Website', pageWidth / 2, y, { align: 'center' });
    y += 20;

    if (website.url) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(website.url, pageWidth / 2, y, { align: 'center' });
      y += 15;
    }

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 20, 3, 3, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 20, 3, 3, 'S');
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Clicks:', margin + 5, y);
    doc.setFont('helvetica', 'normal');
    doc.text(String(website.clicks), margin + 25, y);
    y += 15;

    if (website.notes) {
      doc.setFontSize(14);
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
      y += h + 10;
    }

    if (website.images.length > 0) {
      if (y > pageHeight - 120) { doc.addPage(); y = margin; }
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      doc.text(`Screenshots (${website.images.length})`, margin, y);
      y += 10;

      website.images.forEach((img) => {
        if (y > pageHeight - 110) { doc.addPage(); y = margin; }
        try {
          const imgW = pageWidth - margin * 2;
          const imgH = 100;
          doc.setDrawColor(229, 231, 235);
          doc.roundedRect(margin - 2, y - 2, imgW + 4, imgH + 4, 3, 3, 'S');
          doc.addImage(img.data, 'JPEG', margin, y, imgW, imgH);
          y += imgH + 5;
          if (img.label || img.note) {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(100, 100, 100);
            if (img.label) { doc.text(img.label, margin, y); y += 5; }
            if (img.note) { doc.text(img.note, margin, y); y += 5; }
          }
          y += 10;
        } catch { }
      });
    }

    doc.save(`${website.name.replace(/[^a-z0-9]/gi, '_')}_flow_map.pdf`);
  };

  const exportToWord = async () => {
    const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer, ImageRun } = await import('docx');
    const children: any[] = [];
    children.push(new Paragraph({ text: website.name || 'Untitled Website', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, spacing: { after: 200 } }));
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
          const b64 = img.data.split(',')[1];
          const bin = atob(b64);
          const bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
          children.push(new Paragraph({ children: [new ImageRun({ data: bytes, transformation: { width: 550, height: 350 } })], spacing: { after: 100 } }));
          if (img.label) children.push(new Paragraph({ text: `Label: ${img.label}`, italics: true, spacing: { after: 50 } }));
          if (img.note) children.push(new Paragraph({ text: `Note: ${img.note}`, spacing: { after: 150 } }));
        } catch { }
      }
    }
    const doc = new Document({ sections: [{ children }] });
    saveAs(await Packer.toBlob(doc), `${website.name.replace(/[^a-z0-9]/gi, '_')}_flow_map.docx`);
  };

  const exportToFolder = async () => {
    const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } = await import('docx');
    const zip = new JSZip();
    const folderName = website.name.replace(/[^a-z0-9]/gi, '_');
    const folder = zip.folder(folderName);
    if (!folder) return;

    const children: any[] = [];
    children.push(new Paragraph({ text: website.name || 'Untitled Website', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, spacing: { after: 200 } }));
    if (website.url) children.push(new Paragraph({ children: [new TextRun({ text: 'URL: ', bold: true }), new TextRun({ text: website.url, color: '4F46E5' })], spacing: { after: 100 } }));
    children.push(new Paragraph({ children: [new TextRun({ text: 'Clicks: ', bold: true }), new TextRun({ text: String(website.clicks) })], spacing: { after: 200 } }));
    if (website.notes) {
      children.push(new Paragraph({ text: 'Notes:', bold: true, spacing: { after: 100 } }));
      children.push(new Paragraph({ text: website.notes, spacing: { after: 200 } }));
    }
    website.images.forEach((img, i) => {
      const imageName = `screenshot_${i + 1}${img.label ? '_' + img.label.replace(/[^a-z0-9]/gi, '_') : ''}.png`;
      children.push(new Paragraph({ text: `  • ${imageName}`, spacing: { after: 50 } }));
      if (img.note) children.push(new Paragraph({ text: `    Note: ${img.note}`, italics: true, spacing: { after: 50 } }));
      folder.file(imageName, img.data.split(',')[1], { base64: true });
    });

    const doc = new Document({ sections: [{ children }] });
    folder.file(`${folderName}.docx`, await Packer.toBlob(doc));
    saveAs(await zip.generateAsync({ type: 'blob' }), `${folderName}_flow_map.zip`);
  };

  const currentImage = lightboxIndex !== null ? website.images[lightboxIndex] : null;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: `1px solid ${accentColor}33`, boxShadow: `0 4px 24px ${accentColor}1a, 0 1px 4px rgba(0,0,0,0.06)` }}>
      {/* Header — single tight row */}
      <div className="px-3 py-2 bg-white" style={{ borderBottom: `1px solid ${accentColor}22`, borderTop: `3px solid ${accentColor}` }}>
        {/* Name + logo + actions */}
        <div className="flex items-center gap-2">
          {website.logoUrl && (
            <img src={website.logoUrl} alt="" className="w-7 h-7 rounded-md object-contain bg-gray-50 p-0.5 flex-shrink-0" />
          )}
          <input
            type="text"
            value={website.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Website name"
            className="flex-1 min-w-0 text-base font-bold text-gray-900 bg-transparent border-none outline-none placeholder-gray-300"
          />
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <div className="relative" ref={exportMenuRef}>
              <button onClick={() => setShowExportMenu(!showExportMenu)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Export">
                <FileDown className="w-3.5 h-3.5" />
              </button>
              {showExportMenu && (
                <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                  {[
                    { label: 'Export as PDF', action: exportToPDF },
                    { label: 'Export as Word Doc', action: exportToWord },
                    { label: 'Export as Folder (.zip)', action: exportToFolder },
                  ].map(({ label, action }) => (
                    <button key={label} onClick={() => { action(); setShowExportMenu(false); }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <FileDown className="w-3.5 h-3.5 text-gray-400" />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={onDelete} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* URL + Clicks — ultra-compact single row */}
        <div className="flex items-center gap-2 mt-1.5">
          <input
            type="text"
            value={website.url}
            onChange={(e) => onUpdate({ url: e.target.value })}
            placeholder="URL (e.g. canva.com)"
            className="flex-1 min-w-0 text-xs text-gray-500 bg-gray-50 rounded-md px-2 py-1 border border-gray-200 focus:outline-none focus:ring-1 placeholder-gray-300"
            style={{ borderColor: `${accentColor}33` }}
          />
          {website.url && (
            <a href={website.url.startsWith('http') ? website.url : `https://${website.url}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-gray-400 hover:text-indigo-500 transition-colors" title="Open site">
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <span className="text-xs text-gray-400 flex-shrink-0">Clicks</span>
          <input
            type="number"
            value={website.clicks}
            onChange={(e) => onUpdate({ clicks: parseInt(e.target.value) || 0 })}
            min="0"
            className="w-14 text-xs text-center font-semibold text-gray-700 bg-gray-50 rounded-md px-1 py-1 border border-gray-200 focus:outline-none focus:ring-1"
            style={{ borderColor: `${accentColor}33` }}
          />
        </div>
      </div>

      {/* Screenshots */}
      <div className="px-3 py-2" style={{ borderTop: `1px solid ${accentColor}22` }}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            Screenshots <span className="ml-1" style={{ color: accentColor }}>{website.images.length}</span>
          </label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium"
          style={{ background: `${accentColor}18`, color: accentColor }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Image
          </button>
        </div>

        {website.images.length === 0 ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all"
            style={{ border: '2px dashed #e5e7eb' }}
          >
            <Plus className="w-8 h-8" />
            <span className="text-sm">Click to add a screenshot</span>
          </button>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {website.images.map((image, index) => (
              <div
                key={index}
                className="group flex flex-col"
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIndex !== null && dragIndex !== index) {
                    onReorderImages(dragIndex, index);
                  }
                  setDragIndex(null);
                  setDragOverIndex(null);
                }}
                style={{
                  opacity: dragIndex === index ? 0.4 : 1,
                  outline: dragOverIndex === index && dragIndex !== index ? `2px solid ${accentColor}` : '2px solid transparent',
                  borderRadius: '2px',
                  transition: 'opacity 0.15s, outline 0.1s',
                  cursor: 'grab',
                }}
              >
                {/* Tile */}
                <div
                  className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-all"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={image.data}
                    alt={image.label || `Screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    <span className="text-white text-xs font-medium bg-black/40 px-2 py-1 rounded">View</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onRemoveImage(index); }}
                      className="text-white text-xs font-medium bg-red-500/80 px-2 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Label row */}
                <div className="mt-1.5 px-1">
                  {editingLabel === index ? (
                    <div className="flex items-center gap-1">
                      <input
                        autoFocus
                        type="text"
                        value={labelDraft}
                        onChange={(e) => setLabelDraft(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') saveLabel(index); if (e.key === 'Escape') setEditingLabel(null); }}
                        className="flex-1 text-xs bg-gray-50 rounded px-2 py-1 border border-indigo-300 focus:outline-none"
                        placeholder="Add label…"
                      />
                      <button onClick={() => saveLabel(index)} className="p-1 text-emerald-600 hover:text-emerald-700">
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditingLabel(index); setLabelDraft(image.label || ''); }}
                      className="flex items-center gap-1 group/label w-full text-left"
                      title="Click to edit label"
                    >
                      <span className="text-xs text-gray-600 truncate flex-1 font-medium">
                        {image.label || <span className="text-gray-300 font-normal">Screenshot {index + 1}</span>}
                      </span>
                      <Pencil className="w-2.5 h-2.5 text-gray-300 group-hover/label:text-gray-500 flex-shrink-0 transition-colors" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && currentImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 text-white flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white/80">{website.name}</span>
              <span className="text-white/40">·</span>
              <span className="text-sm text-white/60">{lightboxIndex + 1} / {website.images.length}</span>
            </div>
            <button onClick={() => setLightboxIndex(null)} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image area */}
          <div className="flex-1 flex items-center justify-center relative px-16 min-h-0" onClick={(e) => e.stopPropagation()}>
            {website.images.length > 1 && (
              <>
                <button onClick={() => setLightboxIndex(prev => prev === null ? null : prev > 0 ? prev - 1 : website.images.length - 1)} className="absolute left-4 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={() => setLightboxIndex(prev => prev === null ? null : prev < website.images.length - 1 ? prev + 1 : 0)} className="absolute right-4 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <img
              src={currentImage.data}
              alt={currentImage.label || `Screenshot ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Bottom notes panel */}
          <div className="px-6 pb-6 pt-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="max-w-3xl mx-auto bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-3">
                {/* Label */}
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wide flex-shrink-0">Label</span>
                  <input
                    type="text"
                    value={currentImage.label}
                    onChange={(e) => onUpdateImage(lightboxIndex, { label: e.target.value })}
                    placeholder="Add a label for this screenshot…"
                    className="flex-1 bg-white/10 text-white placeholder-white/30 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
              </div>
              {/* Note */}
              <div>
                <span className="text-xs font-semibold text-white/50 uppercase tracking-wide block mb-2">Image Note</span>
                <textarea
                  value={currentImage.note}
                  onChange={(e) => onUpdateImage(lightboxIndex, { note: e.target.value })}
                  placeholder="Add observations, context, or notes about this screenshot…"
                  rows={3}
                  className="w-full bg-white/10 text-white placeholder-white/30 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-white/30 resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
