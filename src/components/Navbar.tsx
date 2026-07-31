import React from 'react';
import { AuditGate } from '../types';
import { AppLogo } from './AppLogo';

interface NavbarProps {
  gates: AuditGate[];
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenReportModal: () => void;
  onOpenRoadmapReportModal?: () => void;
  onOpenSettings: () => void;
  onSync: () => void;
  syncStatus: 'synced' | 'linked' | 'local' | 'saving';
  isLinked: boolean;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  gates,
  activeTab,
  onSelectTab,
  onOpenReportModal,
  onOpenRoadmapReportModal,
  onOpenSettings,
  onSync,
  syncStatus,
  isLinked,
  isEditMode,
  onToggleEditMode,
}) => {
  const completedCount = gates.filter((g) => g.completed).length;
  const percentage = Math.round((completedCount / gates.length) * 100);

  let statusBg = 'bg-rose-500 text-white';
  let statusLabel = 'RED';
  if (completedCount === 8) {
    statusBg = 'bg-emerald-500 text-white';
    statusLabel = 'GREEN';
  } else if (completedCount >= 4) {
    statusBg = 'bg-amber-500 text-white';
    statusLabel = 'AMBER';
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#06234D]/95 backdrop-blur-md border-b border-[#003886] py-2.5 px-2 sm:px-4 lg:px-6 transition-all shadow-md">
      <div className="max-w-[1920px] mx-auto w-full flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <a href="#overview" className="flex items-center space-x-3 group py-0.5">
            <AppLogo height={30} showSubLabel={true} />
          </a>
        </div>

        {/* Right Action Items */}

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Refresh Data / Pull Webhook Button */}
          <button
            onClick={onSync}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-95 text-white rounded-xl text-xs font-extrabold shadow-md transition-all cursor-pointer ring-2 ring-sky-400/30"
            title="Refresh Data from Power Automate HTTP Webhook"
          >
            <i className={`fa-solid fa-arrows-rotate text-xs ${syncStatus === 'saving' ? 'animate-spin' : ''}`}></i>
            <span className="hidden sm:inline">Refresh Data</span>
            <span className="sm:hidden">Refresh</span>
            <span className="text-[10px] bg-black/25 px-1.5 py-0.5 rounded font-black">
              Webhook
            </span>
          </button>

          {/* Live Gate Status Pill */}
          <a
            href="#interactive-calculator"
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#003886]/80 hover:bg-[#003886] rounded-xl border border-[#00C4E7]/30 text-xs font-semibold text-white transition"
            title="Click to view Audit Gates"
          >
            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${statusBg}`}>
              {statusLabel}
            </span>
            <span>
              {completedCount}/{gates.length} Gates ({percentage}%)
            </span>
          </a>

          {/* Generate / Print Assessment Report Button */}
          <button
            onClick={onOpenReportModal}
            className="bg-[#003886] hover:bg-[#002866] active:scale-95 text-white border border-[#00C4E7]/50 text-xs font-bold py-2 px-3 md:px-4 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            title="Open Audit Gate Assessment Report"
          >
            <i className="fa-solid fa-file-pdf text-[#00C4E7]"></i>
            <span className="hidden md:inline">Report & Audit</span>
            <span className="md:hidden">Audit</span>
          </button>

          {/* Generate Printable Roadmap Report Button */}
          {onOpenRoadmapReportModal && (
            <button
              onClick={onOpenRoadmapReportModal}
              className="bg-[#00C4E7] hover:bg-sky-300 active:scale-95 text-[#06234D] text-xs font-black py-2 px-3 md:px-4 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              title="Open Executive Roadmap & Dual Gantt Analysis Report"
            >
              <i className="fa-solid fa-print"></i>
              <span className="hidden sm:inline">Roadmap Report</span>
            </button>
          )}

          {/* Edit Mode Toggle Button */}
          <button
            onClick={onToggleEditMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black shadow-md transition-all cursor-pointer border select-none ${
              isEditMode
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-300 ring-2 ring-amber-400/40 animate-pulse'
                : 'bg-[#003886] hover:bg-[#002b66] text-slate-200 hover:text-white border-[#00C4E7]/40'
            }`}
            title={isEditMode ? 'Edit Mode is ACTIVE. Click to lock/disable editing.' : 'Click to unlock Admin Edit Mode'}
          >
            <i className={`fa-solid ${isEditMode ? 'fa-unlock-keyhole text-slate-950' : 'fa-lock text-[#00C4E7]'} text-xs`}></i>
            <span>{isEditMode ? 'Edit Mode: ON' : 'Edit Mode: OFF'}</span>
            {isEditMode && (
              <span className="text-[9px] bg-slate-950 text-amber-300 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Active
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="bg-[#003886] hover:bg-[#002b66] active:scale-95 text-slate-200 hover:text-white border border-[#00C4E7]/40 text-xs font-bold py-2 px-3.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            title="Open Admin Settings & Storage Setup"
          >
            <i className="fa-solid fa-gear text-[#00C4E7] text-xs"></i>
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

