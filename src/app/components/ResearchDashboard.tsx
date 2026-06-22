import { useState } from 'react';
import { BarChart3, Users, MessageSquare, Wrench, Navigation, Table2 } from 'lucide-react';
import { CompetitiveAnalysisTab } from './tabs/CompetitiveAnalysisTab';
import { CustomerFeedbackTab } from './tabs/CustomerFeedbackTab';
import { CompanyLanguageTab } from './tabs/CompanyLanguageTab';
import { ToolsBreakdownTab } from './tabs/ToolsBreakdownTab';
import { PathOfCreationTab } from './tabs/PathOfCreationTab';
import { TablesGraphicsTab } from './tabs/TablesGraphicsTab';

type TabType = 'competitive' | 'feedback' | 'language' | 'tools' | 'path' | 'tables';

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'competitive', label: 'Competitive Analysis', icon: BarChart3 },
  { id: 'feedback', label: 'Customer Feedback', icon: Users },
  { id: 'language', label: 'Company Language', icon: MessageSquare },
  { id: 'tools', label: 'Tools, Models & Tactics', icon: Wrench },
  { id: 'path', label: 'Path of Creation', icon: Navigation },
  { id: 'tables', label: 'Tables & Graphics', icon: Table2 },
];

const NJ = {
  navBg:     'linear-gradient(135deg, hsl(30,48%,36%) 0%, hsl(30,45%,44%) 100%)',
  navBorder: 'hsl(30,50%,60%)',
  active:    { background: 'rgba(255,255,255,0.22)', color: '#fff', borderBottom: '2px solid rgba(255,255,255,0.7)' },
  inactive:  { background: 'transparent', color: 'rgba(255,255,255,0.72)', borderBottom: '2px solid transparent' },
  page:      '#fdf8f3',
};

export function ResearchDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('competitive');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: NJ.page }}>
      {/* Sub-header */}
      <div style={{ background: NJ.navBg, borderBottom: `1px solid ${NJ.navBorder}`, flexShrink: 0 }}>
        <div style={{ padding: '0 24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '10px 0 2px' }}>
            Product Research
          </div>
          <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    whiteSpace: 'nowrap',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: 'all 0.15s',
                    flexShrink: 0,
                    ...(isActive ? NJ.active : NJ.inactive),
                  }}
                >
                  <Icon style={{ width: '13px', height: '13px' }} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {activeTab === 'competitive'  && <CompetitiveAnalysisTab />}
          {activeTab === 'feedback'     && <CustomerFeedbackTab />}
          {activeTab === 'language'     && <CompanyLanguageTab />}
          {activeTab === 'tools'        && <ToolsBreakdownTab />}
          {activeTab === 'path'         && <PathOfCreationTab />}
          {activeTab === 'tables'       && <TablesGraphicsTab />}
        </div>
      </div>
    </div>
  );
}
