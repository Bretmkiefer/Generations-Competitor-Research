import { useState } from 'react';
import { FileText, Users, BarChart3, Target } from 'lucide-react';
import { OverviewTab } from './tabs/OverviewTab';
import { CustomerFeedbackTab } from './tabs/CustomerFeedbackTab';
import { CompetitiveAnalysisTab } from './tabs/CompetitiveAnalysisTab';
import { ToolsBreakdownTab } from './tabs/ToolsBreakdownTab';

type TabType = 'overview' | 'feedback' | 'competitive' | 'tools';

export function ResearchDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: FileText },
    { id: 'competitive' as TabType, label: 'Competitive Analysis', icon: BarChart3 },
    { id: 'tools' as TabType, label: 'Tools & Features', icon: Target },
    { id: 'feedback' as TabType, label: 'Customer Feedback', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-indigo-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Generations Product Research
          </h1>
          <p className="text-gray-600">Competitive analysis and market intelligence</p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1 border-b border-indigo-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'feedback' && <CustomerFeedbackTab />}
        {activeTab === 'competitive' && <CompetitiveAnalysisTab />}
        {activeTab === 'tools' && <ToolsBreakdownTab />}
      </main>
    </div>
  );
}
