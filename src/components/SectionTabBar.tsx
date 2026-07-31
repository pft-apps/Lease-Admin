import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  description: string;
}

interface SectionTabBarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  completedGatesCount: number;
  totalGatesCount: number;
}

export const SectionTabBar: React.FC<SectionTabBarProps> = ({
  activeTab,
  onSelectTab,
  completedGatesCount,
  totalGatesCount,
}) => {
  const tabs: TabItem[] = [
    {
      id: 'all',
      label: 'All Modules (Full View)',
      icon: 'fa-solid fa-[#00C4E7] fa-layer-group',
      badge: 'Full Dashboard',
      description: 'View all assessment sections and roadmap modules together',
    },
    {
      id: 'overview',
      label: 'Overview & Portfolio',
      icon: 'fa-solid fa-[#00C4E7] fa-chart-pie',
      badge: '~1,150 Leases',
      description: 'Key performance metrics & portfolio breakdown',
    },
    {
      id: 'risk-map',
      label: 'Risk Map',
      icon: 'fa-solid fa-[#00C4E7] fa-chart-bubble',
      badge: 'Plot Analysis',
      description: 'Volume vs. Complexity matrix and mitigations',
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      icon: 'fa-solid fa-[#00C4E7] fa-timeline',
      badge: '30-Day Gantt',
      description: 'Dual-track execution roadmap timeline & tasks',
    },
    {
      id: 'pillars',
      label: '5 Pillars',
      icon: 'fa-solid fa-[#00C4E7] fa-cubes',
      badge: '5 Focus Areas',
      description: 'Core assessment pillars & audit focus checklist',
    },
    {
      id: 'scorecard',
      label: 'Readiness Scorecard',
      icon: 'fa-solid fa-[#00C4E7] fa-list-check',
      badge: `${completedGatesCount}/${totalGatesCount} Gates`,
      description: '8 Mandatory Go-Live tollgates & audit sign-off',
    },
    {
      id: 'strategic-questions',
      label: 'Strategic Priority Questions Being Resolved',
      icon: 'fa-solid fa-[#00C4E7] fa-lightbulb',
      badge: '21 Resolved',
      description: 'Key architectural & operational decisions resolved',
    },
  ];

  return (
    <div id="section-tabs" className="bg-[#06234D] text-white rounded-3xl border-2 border-[#00C4E7]/35 shadow-xl p-4 sm:p-5 mb-8 space-y-4 font-sans relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#00C4E7]/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#7F59E9]/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 pt-1 pb-3 border-b border-[#00C4E7]/20 gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00C4E7] text-[#06234D] flex items-center justify-center font-black text-base shadow-md">
            <i className="fa-solid fa-folder-open"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-wide text-white">Dashboard Module Views</h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#00C4E7]/20 text-[#00C4E7] border border-[#00C4E7]/30">
                Folder Navigation
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Select a folder tab below to group and focus on specific assessment modules or switch to Full Dashboard View.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-bold text-slate-200 bg-[#001838] px-3.5 py-1.5 rounded-full border border-[#00C4E7]/40 shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00C4E7] animate-pulse"></span>
          <span className="text-slate-400">Active Module:</span>
          <strong className="text-[#00C4E7] uppercase font-black tracking-wider">
            {tabs.find((t) => t.id === activeTab)?.label || 'Full Dashboard'}
          </strong>
        </div>
      </div>

      {/* Folder Tabs Container (No scrollbars, auto-responsive grid layout) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 pt-1 relative z-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              title={tab.description}
              className={`flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 rounded-xl text-[11px] xl:text-xs font-extrabold transition-all cursor-pointer border select-none relative w-full ${
                isActive
                  ? 'bg-white text-[#06234D] border-white shadow-xl z-20 font-black ring-2 ring-white/50'
                  : 'bg-[#001D45] hover:bg-[#002D68] text-slate-200 hover:text-white border-[#00C4E7]/25 hover:border-[#00C4E7]/50 z-0'
              }`}
            >
              <i className={`${tab.icon} ${isActive ? 'text-[#06234D]' : 'text-[#00C4E7]'} text-xs shrink-0`}></i>
              <span className="truncate tracking-tight">{tab.label}</span>
              {tab.badge && (
                <span
                  className={`hidden xl:inline-block text-[9px] px-1.5 py-0.2 rounded-full font-black tracking-tighter shrink-0 ${
                    isActive
                      ? 'bg-[#06234D] text-white border border-[#06234D]'
                      : 'bg-[#003886] text-slate-200 border border-[#00C4E7]/30'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
