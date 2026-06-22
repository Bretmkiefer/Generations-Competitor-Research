import { useState, useEffect } from 'react';
import { WebsiteTracker } from './components/WebsiteTracker';
import { ResearchDashboard } from './components/ResearchDashboard';
import { Login } from './components/Login';
import { FileText, Map, Download } from 'lucide-react';

// Source file contents bundled at build time via Vite's ?raw imports
import appSrc from './App.tsx?raw';
import trackerSrc from './components/WebsiteTracker.tsx?raw';
import cardSrc from './components/WebsiteCard.tsx?raw';
import loginSrc from './components/Login.tsx?raw';
import researchSrc from './components/ResearchDashboard.tsx?raw';
import overviewSrc from './components/tabs/OverviewTab.tsx?raw';
import competitiveSrc from './components/tabs/CompetitiveAnalysisTab.tsx?raw';
import feedbackSrc from './components/tabs/CustomerFeedbackTab.tsx?raw';
import toolsSrc from './components/tabs/ToolsBreakdownTab.tsx?raw';
import fontsCss from '../styles/fonts.css?raw';
import themeCss from '../styles/theme.css?raw';
import indexCss from '../styles/index.css?raw';
import tailwindCss from '../styles/tailwind.css?raw';
import serverSrc from '../../supabase/functions/make-server-0d49d71e/index.tsx?raw';

type ViewType = 'tracker' | 'research';

const SOURCE_FILES: Record<string, string> = {
  'src/app/App.tsx': appSrc,
  'src/app/components/WebsiteTracker.tsx': trackerSrc,
  'src/app/components/WebsiteCard.tsx': cardSrc,
  'src/app/components/Login.tsx': loginSrc,
  'src/app/components/ResearchDashboard.tsx': researchSrc,
  'src/app/components/tabs/OverviewTab.tsx': overviewSrc,
  'src/app/components/tabs/CompetitiveAnalysisTab.tsx': competitiveSrc,
  'src/app/components/tabs/CustomerFeedbackTab.tsx': feedbackSrc,
  'src/app/components/tabs/ToolsBreakdownTab.tsx': toolsSrc,
  'src/styles/fonts.css': fontsCss,
  'src/styles/theme.css': themeCss,
  'src/styles/index.css': indexCss,
  'src/styles/tailwind.css': tailwindCss,
  'supabase/functions/make-server-0d49d71e/index.tsx': serverSrc,
};

async function exportSourceCode() {
  const JSZip = (await import('jszip')).default;
  const { saveAs } = await import('file-saver');

  const zip = new JSZip();

  for (const [path, content] of Object.entries(SOURCE_FILES)) {
    zip.file(path, content);
  }

  // Add a basic README
  zip.file('README.md', [
    '# Generations — User Flow Maps',
    '',
    'Export of source files. To run locally:',
    '',
    '```bash',
    'npm install',
    'npm run dev',
    '```',
    '',
    'Set the following environment variables:',
    '- `VITE_SUPABASE_PROJECT_ID`',
    '- `VITE_SUPABASE_ANON_KEY`',
  ].join('\n'));

  const blob = await zip.generateAsync({ type: 'blob' });
  const date = new Date().toISOString().split('T')[0];
  saveAs(blob, `generations-source-${date}.zip`);
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [activeView, setActiveView] = useState<ViewType>('tracker');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const authenticated = sessionStorage.getItem('userflow-authenticated');
    setIsAuthenticated(authenticated === 'true');
    setIsChecking(false);
  }, []);

  const handleLogin = () => { setIsAuthenticated(true); };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportSourceCode();
    } finally {
      setIsExporting(false);
    }
  };

  if (isChecking) return <div className="size-full bg-neutral-900" />;
  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  const NJ = {
    navBg:        'linear-gradient(135deg, hsl(30,48%,36%) 0%, hsl(30,45%,44%) 100%)',
    navBorder:    'hsl(30,50%,60%)',
    activeBg:     'rgba(255,255,255,0.22)',
    activeBorder: 'rgba(255,255,255,0.45)',
    inactiveText: 'rgba(255,255,255,0.72)',
    pageBackground: '#fdf8f3',
  };

  return (
    <div className="size-full flex flex-col overflow-hidden" style={{ background: NJ.pageBackground, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* MARKER-MAKE-KIT-INVOKED */}
      {/* Top Navigation */}
      <div className="flex-shrink-0" style={{ background: NJ.navBg, borderBottom: `2px solid ${NJ.navBorder}`, boxShadow: '0 2px 12px rgba(180,100,20,0.18)' }}>
        <div className="px-5 py-2 flex items-center gap-2">
          {/* Brand mark */}
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '0.02em', marginRight: '8px', opacity: 0.9, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Generations
          </span>
          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.25)', marginRight: '6px' }} />
          <button
            onClick={() => setActiveView('tracker')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: activeView === 'tracker' ? NJ.activeBg : 'transparent',
              color: activeView === 'tracker' ? '#fff' : NJ.inactiveText,
              border: activeView === 'tracker' ? `1px solid ${NJ.activeBorder}` : '1px solid transparent',
            }}
          >
            <Map className="w-3.5 h-3.5" />
            User Flow Maps
          </button>
          <button
            onClick={() => setActiveView('research')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: activeView === 'research' ? NJ.activeBg : 'transparent',
              color: activeView === 'research' ? '#fff' : NJ.inactiveText,
              border: activeView === 'research' ? `1px solid ${NJ.activeBorder}` : '1px solid transparent',
            }}
          >
            <FileText className="w-3.5 h-3.5" />
            Product Research
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Export Source Code */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-60"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: 'rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            title="Download source code as .zip"
          >
            <Download className="w-3.5 h-3.5" />
            {isExporting ? 'Exporting…' : 'Export Code'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'tracker' ? <WebsiteTracker /> : <ResearchDashboard />}
      </div>
    </div>
  );
}
