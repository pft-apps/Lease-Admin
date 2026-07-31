import React, { useState } from 'react';
import {
  combinedGanttPhases,
  officeGanttPhases,
  retailGanttPhases,
  comparativeMatrix,
  executiveDecouplingSummary,
} from '../data/mockData';
import { GanttPhase, MasterPIC } from '../types';
import { getAssessmentWorkingDaysProgress, formatDateRange, formatDateShort } from '../utils/workingDays';

type TimelineTab = 'combined' | 'office' | 'retail' | 'comparison';

const STANDARD_PIC_OPTIONS = [
  'Cely B. Atas',
  'Erickson T. Serrano',
  'Perds Mesina',
  'Mitch Dumlao',
  'Venus Mejia',
  'Nhelly Carnetes',
  'Patrick Jay Tanap',
  'Naconiel C. Dela Torre',
  'FBSC Enterprise Capability Hub',
  'IT Leads',
  'ERI Audit Team',
  'Retail BU',
  'Office BU',
  'Hypercare Squad',
  'Data Audit Squad',
  'Capacity Squad',
];

interface ExecutionRoadmapProps {
  combinedData?: GanttPhase[];
  setCombinedData?: React.Dispatch<React.SetStateAction<GanttPhase[]>>;
  officeData?: GanttPhase[];
  setOfficeData?: React.Dispatch<React.SetStateAction<GanttPhase[]>>;
  retailData?: GanttPhase[];
  setRetailData?: React.Dispatch<React.SetStateAction<GanttPhase[]>>;
  masterPics?: MasterPIC[];
  trackLeads?: Record<string, string>;
  setTrackLeads?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onOpenRoadmapReport?: () => void;
  startDate?: string;
  onUpdateStartDate?: (newDate: string) => void;
  totalWorkingDays?: number;
  onUpdateTotalWorkingDays?: (days: number) => void;
  onSaveAndCommit?: () => void;
  isEditMode?: boolean;
}

export const ExecutionRoadmap: React.FC<ExecutionRoadmapProps> = ({
  combinedData: extCombined,
  setCombinedData: extSetCombined,
  officeData: extOffice,
  setOfficeData: extSetOffice,
  retailData: extRetail,
  setRetailData: extSetRetail,
  masterPics = [],
  trackLeads: extTrackLeads,
  setTrackLeads: extSetTrackLeads,
  onOpenRoadmapReport,
  startDate = '2026-07-20',
  onUpdateStartDate,
  totalWorkingDays = 30,
  onUpdateTotalWorkingDays,
  onSaveAndCommit,
  isEditMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<TimelineTab>('combined');

  // Datasets state (fallback if props not provided)
  const [localCombined, setLocalCombined] = useState<GanttPhase[]>(combinedGanttPhases);
  const [localOffice, setLocalOffice] = useState<GanttPhase[]>(officeGanttPhases);
  const [localRetail, setLocalRetail] = useState<GanttPhase[]>(retailGanttPhases);

  const combinedData = extCombined || localCombined;
  const officeData = extOffice || localOffice;
  const retailData = extRetail || localRetail;

  const setCombinedData = extSetCombined || setLocalCombined;
  const setOfficeData = extSetOffice || setLocalOffice;
  const setRetailData = extSetRetail || setLocalRetail;

  // Inline Editing state for Track Leads & Target Dates
  const [localTrackLeads, setLocalTrackLeads] = useState<Record<string, string>>({
    'track-a': 'Cely B. Atas',
    'track-b': 'Erickson T. Serrano / FBSC Hub',
  });
  const trackLeads = extTrackLeads || localTrackLeads;
  const setTrackLeads = extSetTrackLeads || setLocalTrackLeads;

  // Track Lead inline editing state
  const [editingTrackLeadId, setEditingTrackLeadId] = useState<string | null>(null);
  const [editingTrackLeadValue, setEditingTrackLeadValue] = useState<string>('');
  const [isCustomTrackLead, setIsCustomTrackLead] = useState<boolean>(false);
  const [customTrackLeadInput, setCustomTrackLeadInput] = useState<string>('');

  // Task PIC inline editing state
  const [editingTaskPicKey, setEditingTaskPicKey] = useState<string | null>(null);
  const [editingTaskPicValue, setEditingTaskPicValue] = useState<string>('');
  const [isCustomTaskPicInput, setIsCustomTaskPicInput] = useState<boolean>(false);
  const [customTaskPicInput, setCustomTaskPicInput] = useState<string>('');

  const [addingCustomPicTaskId, setAddingCustomPicTaskId] = useState<string | null>(null);
  const [customNewPicInput, setCustomNewPicInput] = useState<string>('');

  const [editingPhaseDateId, setEditingPhaseDateId] = useState<string | null>(null);
  const [editingPhaseDateValue, setEditingPhaseDateValue] = useState<string>('');
  const [editingTaskDateId, setEditingTaskDateId] = useState<string | null>(null);
  const [editingTaskDateValue, setEditingTaskDateValue] = useState<string>('');

  // Accordion state per tab
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});

  const [expandedSubDetails, setExpandedSubDetails] = useState<Record<string, boolean>>({});

  // Filter controls
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStakeholder, setFilterStakeholder] = useState<string>('all');

  // Select current active dataset
  const currentPhases =
    activeTab === 'office'
      ? officeData
      : activeTab === 'retail'
      ? retailData
      : combinedData;

  const setCurrentPhases = (updater: (prev: GanttPhase[]) => GanttPhase[]) => {
    if (activeTab === 'office') setOfficeData(updater);
    else if (activeTab === 'retail') setRetailData(updater);
    else setCombinedData(updater);
  };

  // Compute stats for current tab
  const allTasks = currentPhases.flatMap((p) => p.tasks);
  const completedTasksCount = allTasks.filter((t) => t.completed).length;
  const totalTasksCount = allTasks.length;
  const overallProgressPct =
    totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Available PIC options from Master Data directory or fallback to standard options
  const picOptions: { fullName: string; position?: string }[] =
    masterPics && masterPics.length > 0
      ? masterPics.map((p) => ({ fullName: p.fullName, position: p.position }))
      : STANDARD_PIC_OPTIONS.map((name) => ({ fullName: name }));

  // Whether edits are allowed on the current tab
  const canEdit = isEditMode && activeTab !== 'combined';

  // Extract stakeholders for filter dropdown
  const allStakeholders = Array.from(
    new Set([
      ...picOptions.map((p) => p.fullName),
      ...allTasks.flatMap((t) => t.stakeholders || []),
    ])
  ).filter(Boolean).sort();

  // Accordion Toggles
  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const handleExpandAll = () => {
    const nextState = { ...expandedPhases };
    currentPhases.forEach((p) => (nextState[p.id] = true));
    setExpandedPhases(nextState);
  };

  const handleCollapseAll = () => {
    const nextState = { ...expandedPhases };
    currentPhases.forEach((p) => (nextState[p.id] = false));
    setExpandedPhases(nextState);
  };

  // Checkbox toggle for individual task
  const toggleTask = (phaseId: string, taskId: string) => {
    if (!canEdit) return;
    setCurrentPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.id !== phaseId) return phase;

        const updatedTasks = phase.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );

        const completedCount = updatedTasks.filter((t) => t.completed).length;
        let newStatus = phase.status;
        let newStatusText = phase.statusText;

        if (completedCount === updatedTasks.length) {
          newStatus = 'completed';
          newStatusText = 'Completed';
        } else if (completedCount > 0) {
          newStatus = 'in-progress';
          newStatusText = 'In Progress';
        } else {
          newStatus = 'pending';
          newStatusText = 'Pending';
        }

        return {
          ...phase,
          status: newStatus,
          statusText: newStatusText,
          tasks: updatedTasks,
        };
      })
    );
  };

  // Batch toggle for phase
  const toggleAllPhaseTasks = (phaseId: string, targetState: boolean) => {
    if (!canEdit) return;
    setCurrentPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.id !== phaseId) return phase;
        const updatedTasks = phase.tasks.map((t) => ({ ...t, completed: targetState }));
        return {
          ...phase,
          status: targetState ? 'completed' : 'pending',
          statusText: targetState ? 'Completed' : 'Pending',
          tasks: updatedTasks,
        };
      })
    );
  };

  const updateTaskRemark = (phaseId: string, taskId: string, remarkText: string) => {
    if (!canEdit) return;
    setCurrentPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.id !== phaseId) return phase;
        const updatedTasks = phase.tasks.map((t) =>
          t.id === taskId ? { ...t, remarks: remarkText } : t
        );
        return {
          ...phase,
          tasks: updatedTasks,
        };
      })
    );
  };

  const updateTaskStakeholders = (
    phaseId: string,
    taskId: string,
    newStakeholders: string[]
  ) => {
    if (!canEdit) return;
    setCurrentPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.id !== phaseId) return phase;
        const updatedTasks = phase.tasks.map((t) =>
          t.id === taskId ? { ...t, stakeholders: newStakeholders } : t
        );
        return {
          ...phase,
          tasks: updatedTasks,
        };
      })
    );
  };

  const updatePhaseDateRange = (phaseId: string, newDateRange: string) => {
    if (!canEdit) return;
    setCurrentPhases((prevPhases) =>
      prevPhases.map((phase) =>
        phase.id === phaseId ? { ...phase, dateRange: newDateRange } : phase
      )
    );
  };

  const updateTaskDateStr = (phaseId: string, taskId: string, newDateStr: string) => {
    if (!canEdit) return;
    setCurrentPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.id !== phaseId) return phase;
        const updatedTasks = phase.tasks.map((t) =>
          t.id === taskId ? { ...t, dateStr: newDateStr } : t
        );
        return {
          ...phase,
          tasks: updatedTasks,
        };
      })
    );
  };

  const toggleSubDetails = (taskId: string) => {
    setExpandedSubDetails((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <section id="timeline" className="space-y-6">
      {/* Section Title & Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="max-w-4xl space-y-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-[#003366] text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-chart-gantt text-[#007BFF]"></i> Execution Timeline
            </div>
            
            {/* Assessment Window Start Date Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 text-white text-xs font-semibold border border-slate-700">
              <i className="fa-regular fa-calendar-days text-[#00C4E7]"></i>
              <span>
                Assessment Window: <strong>{formatDateRange(new Date(startDate), getAssessmentWorkingDaysProgress(startDate, totalWorkingDays).endDate)}</strong> ({totalWorkingDays} Working Days)
              </span>
              {onUpdateStartDate && (
                <label className={`ml-1 text-[11px] px-2 py-0.5 rounded text-white font-bold transition flex items-center gap-1 ${
                  isEditMode
                    ? 'bg-[#007BFF] hover:bg-blue-600 cursor-pointer'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600'
                }`}>
                  <i className={`fa-solid ${isEditMode ? 'fa-calendar' : 'fa-lock'} text-[10px]`}></i>
                  <span>{isEditMode ? 'Change Start' : 'Locked'}</span>
                  <input
                    type="date"
                    value={startDate}
                    disabled={!isEditMode}
                    onChange={(e) => isEditMode && e.target.value && onUpdateStartDate(e.target.value)}
                    className="sr-only"
                  />
                </label>
              )}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#003366] tracking-tight">
            Lease Admin Migration Execution Roadmap
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Decoupled execution strategy comparing fast-track Office onboarding with the {totalWorkingDays}-working-day Retail readiness assessment (Monday–Friday).
          </p>
        </div>

        {/* Header Right Actions & Progress */}
        <div className="flex flex-wrap items-center gap-3">
          {!isEditMode && (
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
              <i className="fa-solid fa-lock text-amber-600"></i> Read-Only Mode
            </span>
          )}
          {onSaveAndCommit && (
            <button
              type="button"
              onClick={() => onSaveAndCommit({ combinedData, officeData, retailData, trackLeads })}
              disabled={!isEditMode}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
                isEditMode
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
              title={isEditMode ? 'Save & Commit Roadmap Tasks & PIC Assignments to Storage' : 'Activate Edit Mode in header to enable saving'}
            >
              <i className="fa-solid fa-floppy-disk text-emerald-200"></i>
              <span>Save & Commit Roadmap</span>
            </button>
          )}

          {onOpenRoadmapReport && (
            <button
              onClick={onOpenRoadmapReport}
              className="bg-[#003886] hover:bg-[#002866] active:scale-95 text-white border border-[#00C4E7]/40 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer hover:border-[#00C4E7]"
            >
              <i className="fa-solid fa-print text-[#00C4E7]"></i>
              <span>Printable Roadmap Report</span>
            </button>
          )}

          {/* Global Progress Card (When on timeline tabs) */}
          {activeTab !== 'comparison' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 px-4 shadow-xs flex flex-col justify-center min-w-[240px]">
              <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                <span className="text-slate-600">Tab Milestone Progress</span>
                <span className="text-[#003366] font-bold">
                  {completedTasksCount} / {totalTasksCount} ({overallProgressPct}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#003366] to-[#007BFF] h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallProgressPct}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Executive Strategy Banner / Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 md:p-6 shadow-md border border-slate-700 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400 text-base">
              <i className="fa-solid fa-diagram-project text-[#007BFF]"></i>
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-white">
                {executiveDecouplingSummary.title}
              </h3>
              <p className="text-xs text-blue-300 font-semibold">
                {executiveDecouplingSummary.subtitle}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-400/30 text-emerald-300 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Parallel Track Decoupling Active
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          {executiveDecouplingSummary.description}
        </p>

        {/* Track Summaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {executiveDecouplingSummary.tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => setActiveTab(track.id === 'track-a' ? 'office' : 'retail')}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/90 rounded-xl p-4 transition-all cursor-pointer group hover:border-blue-400/50"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-blue-200 tracking-wide uppercase">
                  {track.title}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Target: {track.goLive}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {track.description}
              </p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-700/50">
                {editingTrackLeadId === track.id ? (
                  <div
                    className="inline-flex items-center gap-1.5 bg-slate-900 border border-blue-400/80 rounded-lg p-1.5 shadow-lg text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={isCustomTrackLead ? '__custom__' : editingTrackLeadValue}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setIsCustomTrackLead(true);
                        } else {
                          setIsCustomTrackLead(false);
                          setEditingTrackLeadValue(e.target.value);
                        }
                      }}
                      className="bg-slate-800 text-white text-xs font-semibold border border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#00C4E7]"
                    >
                      <option value="">Select Track Lead PIC...</option>
                      <optgroup label="Master Data PICs Directory">
                        {picOptions.map((item) => (
                          <option key={item.fullName} value={item.fullName}>
                            {item.fullName}{item.position ? ` — ${item.position}` : ''}
                          </option>
                        ))}
                      </optgroup>
                      <option value="__custom__">+ Enter Custom PIC Name...</option>
                    </select>

                    {isCustomTrackLead && (
                      <input
                        type="text"
                        value={customTrackLeadInput}
                        onChange={(e) => setCustomTrackLeadInput(e.target.value)}
                        placeholder="Type PIC name..."
                        className="bg-slate-800 text-white text-xs font-semibold border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-[#00C4E7] w-36"
                        autoFocus
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const finalValue = isCustomTrackLead ? customTrackLeadInput.trim() : editingTrackLeadValue.trim();
                        if (finalValue) {
                          setTrackLeads((prev) => ({ ...prev, [track.id]: finalValue }));
                          if (onSaveAndCommit) onSaveAndCommit();
                        }
                        setEditingTrackLeadId(null);
                        setIsCustomTrackLead(false);
                      }}
                      className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs transition cursor-pointer"
                      title="Save PIC"
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTrackLeadId(null);
                        setIsCustomTrackLead(false);
                      }}
                      className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded font-bold text-xs transition cursor-pointer"
                      title="Cancel"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <span>PIC:</span>
                    <strong className="text-slate-200">{trackLeads[track.id] || track.lead}</strong>
                    <button
                      type="button"
                      disabled={!canEdit}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!canEdit) return;
                        setEditingTrackLeadId(track.id);
                        setEditingTrackLeadValue(trackLeads[track.id] || track.lead);
                        setCustomTrackLeadInput('');
                        setIsCustomTrackLead(false);
                      }}
                      className={`p-1 transition ${
                        canEdit
                          ? 'text-slate-400 hover:text-blue-300 cursor-pointer'
                          : 'text-slate-600 cursor-not-allowed'
                      }`}
                      title={canEdit ? 'Edit Track PIC' : 'Activate Edit Mode in header to edit'}
                    >
                      <i className={`fa-solid ${canEdit ? 'fa-pen-to-square' : 'fa-lock'} text-[10px]`}></i>
                    </button>
                  </span>
                )}
                <span className="text-[#00C4E7] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                  View Timeline <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Tab Navigation Buttons */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('combined')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'combined'
              ? 'bg-[#003886] text-white shadow-sm border-t-2 border-[#00C4E7]'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <i className="fa-solid fa-timeline text-[#00C4E7]"></i> Combined Master Timeline
        </button>

        <button
          onClick={() => setActiveTab('office')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'office'
              ? 'bg-[#003886] text-white shadow-sm border-t-2 border-[#00C4E7]'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>🏢</span> Track A: Office Fast-Track (~50 Contracts)
        </button>

        <button
          onClick={() => setActiveTab('retail')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'retail'
              ? 'bg-[#003886] text-white shadow-sm border-t-2 border-[#00C4E7]'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>🛍️</span> Track B: Retail 30-Day Assessment (~1,100 Tenants)
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'comparison'
              ? 'bg-[#003886] text-white shadow-sm border-t-2 border-[#00C4E7]'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>⚖️</span> Comparative Summary: Fast-Track vs. Full Assessment
        </button>
      </div>

      {/* VIEW MODE 1: COMPARISON MATRIX TAB */}
      {activeTab === 'comparison' ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-[#003366] text-lg">
                Fast-Track vs. Full Assessment Strategy Comparison
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Side-by-side operational evaluation governing the migration framework decision.
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-[#003366] rounded-full text-xs font-extrabold border border-blue-200">
              RACI Decoupled Model
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                  <th className="p-3.5 rounded-tl-xl border-r border-slate-800 min-w-[180px]">
                    Evaluation Feature
                  </th>
                  <th className="p-3.5 border-r border-slate-800 bg-[#003366] min-w-[260px]">
                    🏢 Track A: Office Leasing (Fast-Track)
                  </th>
                  <th className="p-3.5 rounded-tr-xl bg-amber-800 min-w-[280px]">
                    🛍️ Track B: Retail Leasing (Full Assessment)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 border-b border-slate-200">
                {comparativeMatrix.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/60 hover:bg-slate-100/60'}
                  >
                    <td className="p-4 font-bold text-slate-800 border-r border-slate-200 flex items-center gap-2">
                      <i className={`fa-solid ${row.icon} text-[#007BFF]`}></i>
                      <span>{row.feature}</span>
                    </td>
                    <td className="p-4 text-slate-700 border-r border-slate-200 font-medium">
                      {row.trackA}
                    </td>
                    <td className="p-4 text-slate-700 font-semibold text-amber-900">
                      {row.trackB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200 text-xs space-y-2">
              <div className="font-bold text-[#003366] flex items-center gap-1.5">
                <i className="fa-solid fa-circle-check text-blue-600"></i>
                Track A Strategic Advantage
              </div>
              <p className="text-slate-600 leading-relaxed">
                Accelerates quick-win migration of ~50 office leases in 2 weeks, establishing early FBSC momentum while Retail undergoes thorough risk mitigation.
              </p>
            </div>

            <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 text-xs space-y-2">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-amber-600"></i>
                Track B Governance Imperative
              </div>
              <p className="text-slate-600 leading-relaxed">
                Protects company revenues by ensuring turnover rent calculations, CAM reconciliations, and 200–300 peak renewal cycles are fully audited before handoff.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2, 3, 4: GANTT TIMELINE TABS (Combined, Track A, Track B) */
        <div className="space-y-4">
          {/* Timeline Toolbar: Search, Stakeholder Filter, Collapse Controls */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="relative flex-1 min-w-[200px]">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Search milestone, date, or PIC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Filter PIC:</span>
                <select
                  value={filterStakeholder}
                  onChange={(e) => setFilterStakeholder(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                >
                  <option value="all">All PICs</option>
                  {allStakeholders.map((person) => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={handleExpandAll}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <i className="fa-solid fa-angles-down text-slate-400"></i> Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <i className="fa-solid fa-angles-up text-slate-400"></i> Collapse All
              </button>
            </div>
          </div>

          {/* Main Gantt Timeline Container */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Header Scale Bar */}
            <div className="bg-slate-900 text-white p-4 border-b border-slate-800">
              <div className="grid grid-cols-12 gap-2 text-center text-xs font-bold tracking-wider">
                <div className="col-span-12 md:col-span-4 text-left pl-2 text-slate-300 uppercase">
                  Phase / Milestone Task Scope
                </div>
                <div className="hidden md:grid md:col-span-8 grid-cols-4 gap-1 text-[11px] font-semibold text-slate-400">
                  <div className="bg-slate-800/80 py-1 rounded border border-slate-700/50">
                    Phase 0 (Jul 20–22)
                  </div>
                  <div className="bg-slate-800/80 py-1 rounded border border-slate-700/50">
                    Phase 1 (Jul 23–29)
                  </div>
                  <div className="bg-slate-800/80 py-1 rounded border border-slate-700/50">
                    Phase 2 (Aug 03–28)
                  </div>
                  <div className="bg-slate-800/80 py-1 rounded border border-slate-700/50">
                    Phase 3 (Sept 2026+)
                  </div>
                </div>
              </div>
            </div>

            {/* Phase Accordions */}
            <div className="divide-y divide-slate-100">
              {currentPhases.map((phase) => {
                const isExpanded = !!expandedPhases[phase.id];

                const filteredTasks = phase.tasks.filter((task) => {
                  const matchesSearch =
                    !searchQuery ||
                    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    task.dateStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (task.description &&
                      task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (task.remarks &&
                      task.remarks.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (task.stakeholders &&
                      task.stakeholders.some((s) =>
                        s.toLowerCase().includes(searchQuery.toLowerCase())
                      )) ||
                    (task.subDetails &&
                      task.subDetails.some((d) =>
                        d.toLowerCase().includes(searchQuery.toLowerCase())
                      ));

                  const matchesStakeholder =
                    filterStakeholder === 'all' ||
                    (task.stakeholders && task.stakeholders.includes(filterStakeholder));

                  return matchesSearch && matchesStakeholder;
                });

                const phaseCompletedTasks = phase.tasks.filter((t) => t.completed).length;
                const phaseTotalTasks = phase.tasks.length;
                const phasePct =
                  phaseTotalTasks > 0
                    ? Math.round((phaseCompletedTasks / phaseTotalTasks) * 100)
                    : 0;
                const isPhaseAllCompleted = phaseCompletedTasks === phaseTotalTasks;

                let statusBadgeClass = 'bg-slate-100 text-slate-700';
                if (phase.status === 'completed')
                  statusBadgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
                if (phase.status === 'in-progress')
                  statusBadgeClass = 'bg-amber-100 text-amber-800 border border-amber-200';
                if (phase.status === 'pending')
                  statusBadgeClass = 'bg-slate-100 text-slate-600 border border-slate-200';

                return (
                  <div key={phase.id} className="transition-colors">
                    {/* Phase Accordion Header */}
                    <div
                      className={`p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer border-l-4 ${phase.accentColor}`}
                      onClick={() => togglePhase(phase.id)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#007BFF] transition-all shadow-2xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePhase(phase.id);
                          }}
                        >
                          <i
                            className={`fa-solid fa-chevron-right text-xs transition-transform duration-200 ${
                              isExpanded ? 'rotate-90 text-[#007BFF]' : ''
                            }`}
                          ></i>
                        </button>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-black uppercase tracking-wider text-[#003366] px-2 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">
                              {phase.phaseNumber}
                            </span>
                            <h3 className="font-bold text-slate-900 text-sm md:text-base">
                              {phase.title}
                            </h3>

                            {editingPhaseDateId === phase.id ? (
                              <div
                                className="inline-flex items-center gap-1 bg-white border border-[#007BFF] rounded-lg p-1 shadow-md z-10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  type="text"
                                  value={editingPhaseDateValue}
                                  onChange={(e) => setEditingPhaseDateValue(e.target.value)}
                                  className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded px-2 py-0.5 outline-none focus:ring-1 focus:ring-[#007BFF] w-36"
                                  placeholder="e.g. Jul 20 – 22, 2026"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      updatePhaseDateRange(phase.id, editingPhaseDateValue);
                                      setEditingPhaseDateId(null);
                                    } else if (e.key === 'Escape') {
                                      setEditingPhaseDateId(null);
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    updatePhaseDateRange(phase.id, editingPhaseDateValue);
                                    setEditingPhaseDateId(null);
                                  }}
                                  className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition shadow-2xs cursor-pointer"
                                  title="Save Target Date Range"
                                >
                                  <i className="fa-solid fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingPhaseDateId(null)}
                                  className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-bold transition cursor-pointer"
                                  title="Cancel"
                                >
                                  <i className="fa-solid fa-xmark"></i>
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                disabled={!canEdit}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!canEdit) return;
                                  setEditingPhaseDateId(phase.id);
                                  setEditingPhaseDateValue(phase.dateRange);
                                }}
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold shadow-2xs group/pdate ${
                                  canEdit
                                    ? 'text-slate-700 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer'
                                    : 'text-slate-500 bg-slate-100 border border-slate-200 cursor-not-allowed'
                                }`}
                                title={canEdit ? 'Click to edit phase target date range' : 'Activate Edit Mode in header to edit phase dates'}
                              >
                                <i className="fa-regular fa-calendar-days text-[#007BFF] text-[11px]"></i>
                                <span>{phase.dateRange}</span>
                                {canEdit && (
                                  <i className="fa-solid fa-pen-to-square text-[10px] text-slate-400 group-hover/pdate:text-[#007BFF] transition-colors ml-0.5"></i>
                                )}
                              </button>
                            )}

                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${statusBadgeClass}`}
                            >
                              {phase.statusText}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-[11px] font-medium">
                            {phaseCompletedTasks}/{phaseTotalTasks} Done
                          </span>
                          <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden hidden sm:block">
                            <div
                              className={`h-full ${phase.barColor} rounded-full transition-all duration-300`}
                              style={{ width: `${phasePct}%` }}
                            ></div>
                          </div>
                        </div>

                        <button
                          disabled={!canEdit}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!canEdit) return;
                            toggleAllPhaseTasks(phase.id, !isPhaseAllCompleted);
                          }}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors flex items-center gap-1.5 shadow-2xs ${
                            canEdit
                              ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'
                              : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                          title={canEdit ? 'Check or uncheck all phase tasks' : 'Activate Edit Mode in header to modify tasks'}
                        >
                          <i
                            className={`fa-solid ${
                              isPhaseAllCompleted
                                ? 'fa-square-check text-emerald-600'
                                : 'fa-square text-slate-300'
                            }`}
                          ></i>
                          <span>{isPhaseAllCompleted ? 'All Done' : 'Check All'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Gantt Bar Visualization */}
                    <div className="px-4 py-2 bg-slate-100/50 border-t border-b border-slate-200/60 hidden md:block">
                      <div className="relative h-4 bg-slate-200/80 rounded-full overflow-hidden flex items-center px-1">
                        <div
                          className={`absolute h-3 rounded-full ${phase.barColor} opacity-85 transition-all duration-300 flex items-center justify-center text-[10px] text-white font-bold shadow-xs`}
                          style={{
                            left: `${phase.ganttStartPct}%`,
                            width: `${phase.ganttWidthPct}%`,
                          }}
                        >
                          <span className="truncate px-1">
                            {phase.dateRange} • {phasePct}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Task Items */}
                    {isExpanded && (
                      <div className="bg-slate-50/40 p-3 md:p-5 space-y-3">
                        {filteredTasks.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                            No tasks match search criteria in this phase.
                          </div>
                        ) : (
                          filteredTasks.map((task) => {
                            const hasSubDetails =
                              task.subDetails && task.subDetails.length > 0;
                            const isSubExpanded = !!expandedSubDetails[task.id];

                            return (
                              <div
                                key={task.id}
                                className={`p-3.5 md:p-4 rounded-xl border transition-all ${
                                  task.completed
                                    ? 'bg-emerald-50/40 border-emerald-200/80 shadow-2xs'
                                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <input
                                    type="checkbox"
                                    checked={task.completed}
                                    disabled={!canEdit}
                                    onChange={() => canEdit && toggleTask(phase.id, task.id)}
                                    className="mt-1 w-4 h-4 rounded text-[#007BFF] focus:ring-[#007BFF] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer accent-[#007BFF]"
                                  />

                                  <div className="flex-1 space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span
                                          className={`text-xs font-semibold ${
                                            task.completed
                                              ? 'line-through text-slate-400'
                                              : 'text-slate-900 font-bold'
                                          }`}
                                        >
                                          {task.title}
                                        </span>

                                        {task.isMilestone && (
                                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider border border-amber-300 flex items-center gap-1">
                                            <i className="fa-solid fa-star text-amber-600 text-[9px]"></i> Key Milestone
                                          </span>
                                        )}

                                        {task.category && (
                                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200">
                                            {task.category}
                                          </span>
                                        )}
                                      </div>

                                      {editingTaskDateId === task.id ? (
                                        <div
                                          className="inline-flex items-center gap-1 bg-white border border-[#007BFF] rounded-lg p-1 shadow-md self-start sm:self-auto z-10"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <input
                                            type="text"
                                            value={editingTaskDateValue}
                                            onChange={(e) => setEditingTaskDateValue(e.target.value)}
                                            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded px-2 py-0.5 outline-none focus:ring-1 focus:ring-[#007BFF] w-32"
                                            placeholder="e.g. July 20, 2026"
                                            autoFocus
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                updateTaskDateStr(phase.id, task.id, editingTaskDateValue);
                                                setEditingTaskDateId(null);
                                              } else if (e.key === 'Escape') {
                                                setEditingTaskDateId(null);
                                              }
                                            }}
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              updateTaskDateStr(phase.id, task.id, editingTaskDateValue);
                                              setEditingTaskDateId(null);
                                            }}
                                            className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition shadow-2xs cursor-pointer"
                                            title="Save Target Date"
                                          >
                                            <i className="fa-solid fa-check"></i>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setEditingTaskDateId(null)}
                                            className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-bold transition cursor-pointer"
                                            title="Cancel"
                                          >
                                            <i className="fa-solid fa-xmark"></i>
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          type="button"
                                          disabled={!canEdit}
                                          onClick={() => {
                                            if (!canEdit) return;
                                            setEditingTaskDateId(task.id);
                                            setEditingTaskDateValue(task.dateStr);
                                          }}
                                          className={`text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-md transition-all group/tdate shadow-2xs ${
                                            canEdit
                                              ? 'text-slate-700 hover:text-[#003886] bg-slate-100/80 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 cursor-pointer'
                                              : 'text-slate-500 bg-slate-100 border border-slate-200 cursor-not-allowed'
                                          }`}
                                          title={canEdit ? 'Click to edit task target date' : 'Activate Edit Mode in header to edit task target date'}
                                        >
                                          <i className="fa-regular fa-calendar-check text-[#007BFF]"></i>
                                          <span>{task.dateStr}</span>
                                          {canEdit && (
                                            <i className="fa-solid fa-pen-to-square text-[10px] text-slate-400 group-hover/tdate:text-[#007BFF] transition-colors ml-0.5"></i>
                                          )}
                                        </button>
                                      )}
                                    </div>

                                    {task.description && (
                                      <p
                                        className={`text-xs leading-relaxed ${
                                          task.completed ? 'text-slate-400' : 'text-slate-600'
                                        }`}
                                      >
                                        {task.description}
                                      </p>
                                    )}

                                    {hasSubDetails && (
                                      <div className="pt-1">
                                        <button
                                          onClick={() => toggleSubDetails(task.id)}
                                          className="text-xs font-bold text-[#007BFF] hover:text-[#003366] transition-colors inline-flex items-center gap-1.5 py-1"
                                        >
                                          <i
                                            className={`fa-solid fa-chevron-down text-[10px] transition-transform ${
                                              isSubExpanded ? 'rotate-180' : ''
                                            }`}
                                          ></i>
                                          <span>
                                            {isSubExpanded
                                              ? 'Hide Detailed Breakdown'
                                              : `View ${task.subDetails?.length} Detailed Items`}
                                          </span>
                                        </button>

                                        {isSubExpanded && (
                                          <ul className="mt-2 space-y-2 bg-slate-50/90 p-3 rounded-lg border border-slate-200/80 text-xs text-slate-700 font-normal">
                                            {task.subDetails?.map((detail, idx) => (
                                              <li
                                                key={idx}
                                                className="flex items-start gap-2 leading-relaxed"
                                              >
                                                <i className="fa-solid fa-angle-right text-[#007BFF] text-[11px] mt-0.5"></i>
                                                <span>{detail}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                    )}

                                    {/* Task PIC (Person In Charge) Selector */}
                                    <div className="pt-2 border-t border-slate-100 mt-2 space-y-1.5">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                                            <i className="fa-solid fa-user-tie text-[#007BFF]"></i>
                                            <span>PIC (Person In Charge):</span>
                                          </span>

                                          {task.stakeholders && task.stakeholders.length > 0 ? (
                                            task.stakeholders.map((person, personIdx) => {
                                              const picKey = `${phase.id}-${task.id}-${personIdx}`;
                                              const isEditingThisPic = editingTaskPicKey === picKey;

                                              if (isEditingThisPic) {
                                                return (
                                                  <div
                                                    key={`edit-pic-${personIdx}`}
                                                    className="inline-flex items-center gap-1 bg-white border border-[#007BFF] rounded-lg p-1 shadow-md z-20"
                                                    onClick={(e) => e.stopPropagation()}
                                                  >
                                                    <select
                                                      value={isCustomTaskPicInput ? '__custom__' : editingTaskPicValue}
                                                      onChange={(e) => {
                                                        if (e.target.value === '__custom__') {
                                                          setIsCustomTaskPicInput(true);
                                                        } else {
                                                          setIsCustomTaskPicInput(false);
                                                          setEditingTaskPicValue(e.target.value);
                                                        }
                                                      }}
                                                      className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-[#007BFF]"
                                                    >
                                                      <option value="">Select replacement PIC...</option>
                                                      <optgroup label="Master Data Directory">
                                                        {picOptions.map((item) => (
                                                          <option key={item.fullName} value={item.fullName}>
                                                            {item.fullName}{item.position ? ` — ${item.position}` : ''}
                                                          </option>
                                                        ))}
                                                      </optgroup>
                                                      <option value="__custom__">+ Custom Name...</option>
                                                    </select>

                                                    {isCustomTaskPicInput && (
                                                      <input
                                                        type="text"
                                                        value={customTaskPicInput}
                                                        onChange={(e) => setCustomTaskPicInput(e.target.value)}
                                                        placeholder="PIC Name"
                                                        className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-[#007BFF] w-28"
                                                        autoFocus
                                                      />
                                                    )}

                                                    <button
                                                      type="button"
                                                      onClick={() => {
                                                        const newVal = isCustomTaskPicInput ? customTaskPicInput.trim() : editingTaskPicValue.trim();
                                                        if (newVal) {
                                                          const updated = [...(task.stakeholders || [])];
                                                          updated[personIdx] = newVal;
                                                          updateTaskStakeholders(phase.id, task.id, updated);
                                                        }
                                                        setEditingTaskPicKey(null);
                                                        setIsCustomTaskPicInput(false);
                                                      }}
                                                      className="px-1.5 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold cursor-pointer"
                                                      title="Save PIC"
                                                    >
                                                      <i className="fa-solid fa-check"></i>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      onClick={() => {
                                                        setEditingTaskPicKey(null);
                                                        setIsCustomTaskPicInput(false);
                                                      }}
                                                      className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer"
                                                      title="Cancel"
                                                    >
                                                      <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                  </div>
                                                );
                                              }

                                              return (
                                                <span
                                                  key={person}
                                                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#003366] text-[11px] font-bold border border-blue-200/80 shadow-2xs"
                                                >
                                                  <span>{person}</span>
                                                  {canEdit && (
                                                    <div className="inline-flex items-center gap-1 ml-0.5">
                                                      <button
                                                        type="button"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          setEditingTaskPicKey(picKey);
                                                          setEditingTaskPicValue(person);
                                                          setCustomTaskPicInput('');
                                                          setIsCustomTaskPicInput(false);
                                                        }}
                                                        className="text-slate-400 hover:text-[#007BFF] transition-colors cursor-pointer"
                                                        title="Edit / Change PIC"
                                                      >
                                                        <i className="fa-solid fa-pen text-[9px]"></i>
                                                      </button>
                                                      <button
                                                        type="button"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          const updated = (task.stakeholders || []).filter(
                                                            (_, idx) => idx !== personIdx
                                                          );
                                                          updateTaskStakeholders(
                                                            phase.id,
                                                            task.id,
                                                            updated
                                                          );
                                                        }}
                                                        className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                                        title="Remove PIC"
                                                      >
                                                        <i className="fa-solid fa-xmark text-[10px]"></i>
                                                      </button>
                                                    </div>
                                                  )}
                                                </span>
                                              );
                                            })
                                          ) : (
                                            <span className="text-xs text-amber-600 font-medium italic">
                                              Unassigned PIC
                                            </span>
                                          )}
                                        </div>

                                        <div className="flex items-center gap-1.5 self-start sm:self-auto">
                                          {addingCustomPicTaskId === task.id ? (
                                            <div
                                              className="inline-flex items-center gap-1 bg-white border border-[#007BFF] rounded-lg p-1 shadow-md"
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              <input
                                                type="text"
                                                value={customNewPicInput}
                                                onChange={(e) => setCustomNewPicInput(e.target.value)}
                                                placeholder="Enter custom PIC name..."
                                                className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded px-2 py-0.5 outline-none focus:ring-1 focus:ring-[#007BFF] w-36"
                                                autoFocus
                                                onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                    if (customNewPicInput.trim()) {
                                                      const current = task.stakeholders || [];
                                                      if (!current.includes(customNewPicInput.trim())) {
                                                        updateTaskStakeholders(phase.id, task.id, [
                                                          ...current,
                                                          customNewPicInput.trim(),
                                                        ]);
                                                      }
                                                    }
                                                    setAddingCustomPicTaskId(null);
                                                    setCustomNewPicInput('');
                                                  } else if (e.key === 'Escape') {
                                                    setAddingCustomPicTaskId(null);
                                                    setCustomNewPicInput('');
                                                  }
                                                }}
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  if (customNewPicInput.trim()) {
                                                    const current = task.stakeholders || [];
                                                    if (!current.includes(customNewPicInput.trim())) {
                                                      updateTaskStakeholders(phase.id, task.id, [
                                                        ...current,
                                                        customNewPicInput.trim(),
                                                      ]);
                                                    }
                                                  }
                                                  setAddingCustomPicTaskId(null);
                                                  setCustomNewPicInput('');
                                                }}
                                                className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition shadow-2xs cursor-pointer"
                                                title="Add PIC"
                                              >
                                                <i className="fa-solid fa-check"></i>
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  setAddingCustomPicTaskId(null);
                                                  setCustomNewPicInput('');
                                                }}
                                                className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-bold transition cursor-pointer"
                                                title="Cancel"
                                              >
                                                <i className="fa-solid fa-xmark"></i>
                                              </button>
                                            </div>
                                          ) : (
                                            <select
                                              value=""
                                              disabled={!canEdit}
                                              onChange={(e) => {
                                                if (!canEdit || !e.target.value) return;
                                                const selectedValue = e.target.value;
                                                if (selectedValue === '__custom__') {
                                                  setAddingCustomPicTaskId(task.id);
                                                  setCustomNewPicInput('');
                                                } else {
                                                  const current = task.stakeholders || [];
                                                  if (!current.includes(selectedValue)) {
                                                    updateTaskStakeholders(phase.id, task.id, [
                                                      ...current,
                                                      selectedValue,
                                                    ]);
                                                  }
                                                }
                                              }}
                                              className={`border rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#007BFF] shadow-2xs ${
                                                canEdit
                                                  ? 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 cursor-pointer'
                                                  : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                                              }`}
                                            >
                                              <option value="">{canEdit ? '+ Assign/Change PIC...' : 'PIC Locked'}</option>
                                              <optgroup label="Master Data PICs Directory">
                                                {picOptions.map((item) => (
                                                  <option
                                                    key={item.fullName}
                                                    value={item.fullName}
                                                    disabled={task.stakeholders?.includes(item.fullName)}
                                                  >
                                                    {item.fullName}{item.position ? ` — ${item.position}` : ''}{' '}
                                                    {task.stakeholders?.includes(item.fullName)
                                                      ? '(Assigned)'
                                                      : ''}
                                                  </option>
                                                ))}
                                              </optgroup>
                                              <option value="__custom__">+ Add Custom PIC...</option>
                                            </select>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Task Remarks Input Field */}
                                    <div className="pt-2.5 border-t border-slate-100 mt-2 space-y-1">
                                      <div className="flex items-center justify-between">
                                        <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                                          <i className="fa-regular fa-comment-dots text-[#007BFF]"></i>
                                          <span>Task Remarks & Execution Notes:</span>
                                        </label>
                                        {task.remarks && (
                                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                            <i className="fa-solid fa-check text-[9px]"></i> Saved
                                          </span>
                                        )}
                                      </div>
                                      <input
                                        type="text"
                                        value={task.remarks || ''}
                                        disabled={!canEdit}
                                        onChange={(e) =>
                                          canEdit && updateTaskRemark(phase.id, task.id, e.target.value)
                                        }
                                        placeholder={canEdit ? "Enter progress remarks, owner notes, or status update..." : "Read-only mode. Activate Edit Mode in header to edit remarks."}
                                        className={`w-full px-3 py-1.5 text-xs border rounded-lg transition-all ${
                                          canEdit
                                            ? 'bg-slate-50/80 border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007BFF] placeholder:text-slate-400'
                                            : 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed placeholder:text-slate-400'
                                        }`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
