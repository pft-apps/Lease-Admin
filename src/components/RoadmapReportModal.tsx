import React, { useState } from 'react';
import { GanttPhase, AuditGate } from '../types';
import { AppLogo } from './AppLogo';
import { getAssessmentWorkingDaysProgress, formatDateRange, formatDateShort } from '../utils/workingDays';
import { STANDARD_PIC_OPTIONS } from '../data/mockData';

interface RoadmapReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  combinedData: GanttPhase[];
  setCombinedData?: React.Dispatch<React.SetStateAction<GanttPhase[]>>;
  officeData: GanttPhase[];
  setOfficeData?: React.Dispatch<React.SetStateAction<GanttPhase[]>>;
  retailData: GanttPhase[];
  setRetailData?: React.Dispatch<React.SetStateAction<GanttPhase[]>>;
  gates: AuditGate[];
  startDate?: string;
  onUpdateStartDate?: (newDate: string) => void;
  totalWorkingDays?: number;
  onUpdateTotalWorkingDays?: (days: number) => void;
}

export interface Signatory {
  id: string;
  roleLabel: string;
  name: string;
  title: string;
  department: string;
}

type TrackFilter = 'all' | 'combined' | 'office' | 'retail';
type GanttViewMode = 'both' | 'planned' | 'actual';

/* -------------------------------------------------------------------------- */
/* REAL GANTT CHART MATRIX COMPONENT                                          */
/* -------------------------------------------------------------------------- */
interface RealGanttChartProps {
  type: 'planned' | 'actual';
  title: string;
  badgeText: string;
  phases: GanttPhase[];
  onUpdateTaskPIC?: (phaseId: string, taskId: string, newPICs: string[]) => void;
}

const RealGanttChartMatrix: React.FC<RealGanttChartProps> = ({
  type,
  title,
  badgeText,
  phases,
  onUpdateTaskPIC,
}) => {
  const isPlanned = type === 'planned';

  return (
    <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden print:border-slate-400">
      {/* Header Banner */}
      <div
        className={`p-3.5 px-5 flex justify-between items-center text-white border-b ${
          isPlanned ? 'bg-[#06234D] border-sky-900' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`w-3 h-3 rounded-full ${
              isPlanned ? 'bg-sky-400 shadow-xs' : 'bg-emerald-400 shadow-xs'
            }`}
          ></span>
          <h4 className="font-extrabold text-xs md:text-sm tracking-wide uppercase text-white">
            {title}
          </h4>
        </div>
        <span
          className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
            isPlanned
              ? 'bg-sky-950 text-sky-200 border-sky-600/60'
              : 'bg-emerald-950 text-emerald-300 border-emerald-600/60'
          }`}
        >
          {badgeText}
        </span>
      </div>

      {/* Main Gantt Table Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[880px]">
          {/* Table Column Headers */}
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-[10px] uppercase font-black tracking-wider border-b border-slate-300 divide-x divide-slate-200">
              <th className="py-2.5 px-3.5 w-[32%] font-black">Phase & Sub-Title / Deliverable Hierarchy</th>
              <th className="py-2.5 px-2 w-[22%] font-black text-center">PIC (Person In Charge)</th>
              <th className="py-2.5 px-2 w-[15%] font-black text-center">Schedule / Target</th>
              <th className="py-2.5 px-2 w-[9%] font-black text-center">Status</th>
              <th className="py-2.5 px-1 w-[22%] font-black text-center bg-slate-200/80">
                <div className="text-[9px] text-slate-900 uppercase font-black">Timeline Matrix (Jul 20 – Aug 28)</div>
                <div className="grid grid-cols-6 text-[8px] font-black text-slate-600 pt-1 border-t border-slate-300/80 mt-1">
                  <div>W1</div>
                  <div>W2</div>
                  <div>W3</div>
                  <div>W4</div>
                  <div>W5</div>
                  <div>W6</div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-xs">
            {phases.map((phase) => {
              const completedTasks = phase.tasks.filter((t) => t.completed).length;
              const totalTasks = phase.tasks.length;
              const phasePct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

              return (
                <React.Fragment key={`${type}-phase-frag-${phase.id}`}>
                  {/* PHASE SUMMARY ROW */}
                  <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300 hover:bg-slate-200/60 transition divide-x divide-slate-200">
                    <td className="py-2 px-3 text-slate-900 font-extrabold flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#003886] text-white text-[10px] rounded font-black uppercase shrink-0">
                        {phase.phaseNumber}
                      </span>
                      <span className="text-xs text-slate-900 tracking-tight font-extrabold">{phase.title}</span>
                    </td>

                    {/* Phase PIC Summary Cell */}
                    <td className="py-2 px-2 text-center text-slate-700 text-[10px] font-semibold">
                      <span className="px-2 py-0.5 rounded bg-blue-100/80 text-[#003366] font-bold text-[10px] border border-blue-200/80">
                        {phase.lead || 'Phase Lead Squad'}
                      </span>
                    </td>

                    <td className="py-2 px-2 text-center text-slate-700 text-[11px] font-bold whitespace-nowrap">
                      {phase.dateRange}
                    </td>

                    <td className="py-2 px-2 text-center whitespace-nowrap">
                      {isPlanned ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                          Baseline Target
                        </span>
                      ) : (
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold border ${
                            phase.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : phase.status === 'in-progress'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          {phase.statusText} ({phasePct}%)
                        </span>
                      )}
                    </td>

                    {/* Phase Gantt Bar Container */}
                    <td className="py-1 px-1 relative bg-slate-50/50">
                      {/* Vertical Gridlines */}
                      <div className="absolute inset-0 grid grid-cols-6 divide-x divide-slate-200 pointer-events-none">
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                      </div>

                      {/* Phase Bar */}
                      <div className="relative h-5 w-full flex items-center">
                        <div
                          className={`absolute h-4 rounded transition-all shadow-2xs flex items-center justify-center text-[9px] font-black text-white px-1 overflow-hidden ${
                            isPlanned
                              ? 'bg-gradient-to-r from-[#003886] to-[#007BFF]'
                              : phase.status === 'completed'
                              ? 'bg-emerald-600'
                              : phase.status === 'in-progress'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-400'
                          }`}
                          style={{
                            left: `${phase.ganttStartPct}%`,
                            width: `${Math.max(phase.ganttWidthPct, 15)}%`,
                          }}
                        >
                          <span className="truncate">{phase.phaseNumber}</span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* SUB-TITLE / TASK ROWS */}
                  {phase.tasks.map((task, idx) => {
                    const taskStartPct = phase.ganttStartPct + (idx * (phase.ganttWidthPct / totalTasks));
                    const taskWidthPct = Math.max(10, phase.ganttWidthPct / totalTasks);

                    return (
                      <React.Fragment key={`${type}-task-frag-${task.id}`}>
                        <tr className="hover:bg-slate-50 transition border-b border-slate-100 divide-x divide-slate-200">
                          {/* Sub-Title / Task Name */}
                          <td className="py-1.5 px-3 pl-6 text-slate-800 font-medium text-[11px] flex items-center gap-1.5 flex-wrap">
                            <span className="text-slate-400 font-bold text-[10px]">└─</span>
                            <span className="font-semibold text-slate-900">{task.title}</span>
                            {task.isMilestone && (
                              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[9px] font-black rounded border border-amber-300">
                                🎯 Milestone
                              </span>
                            )}
                          </td>

                          {/* Inherited Read-Only PICs Cell */}
                          <td className="py-1.5 px-2 text-center text-slate-800 text-[10px] font-medium">
                            <div className="flex items-center justify-center gap-1 flex-wrap">
                              {task.stakeholders && task.stakeholders.length > 0 ? (
                                task.stakeholders.map((person) => (
                                  <span
                                    key={person}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-[#003366] text-[10px] font-bold border border-blue-200 shadow-2xs"
                                  >
                                    <span>{person}</span>
                                  </span>
                                ))
                              ) : (
                                <span className="text-[10px] text-slate-400 font-medium italic">Unassigned</span>
                              )}
                            </div>
                          </td>

                          {/* Task Schedule */}
                          <td className="py-1.5 px-2 text-center text-slate-600 text-[10px] font-medium whitespace-nowrap">
                            {task.dateStr}
                          </td>

                          {/* Task Status */}
                          <td className="py-1.5 px-2 text-center whitespace-nowrap">
                            {isPlanned ? (
                              <span className="text-[10px] text-slate-500 font-medium">Planned</span>
                            ) : (
                              <span
                                className={`px-2 py-0.2 rounded text-[9px] font-extrabold ${
                                  task.completed
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}
                              >
                                {task.completed ? '✓ Done' : 'Active'}
                              </span>
                            )}
                          </td>

                          {/* Task Timeline Bar */}
                          <td className="py-1 px-1 relative bg-white">
                            {/* Gridline background columns */}
                            <div className="absolute inset-0 grid grid-cols-6 divide-x divide-slate-100 pointer-events-none">
                              <div></div><div></div><div></div><div></div><div></div><div></div>
                            </div>

                            <div className="relative h-4 w-full flex items-center">
                              <div
                                className={`absolute h-2.5 rounded-full transition-all ${
                                  isPlanned
                                    ? 'bg-sky-500'
                                    : task.completed
                                    ? 'bg-emerald-500'
                                    : 'bg-amber-400'
                                }`}
                                style={{
                                  left: `${taskStartPct}%`,
                                  width: `${taskWidthPct}%`,
                                }}
                              ></div>
                            </div>
                          </td>
                        </tr>

                        {/* SUB-DETAILS / DELIVERABLE ITEMS UNDER TASK */}
                        {task.subDetails &&
                          task.subDetails.map((subDetail, sdIdx) => (
                            <tr
                              key={`${type}-subdetail-${task.id}-${sdIdx}`}
                              className="bg-slate-50/40 text-[10px] border-b border-slate-100 divide-x divide-slate-200 text-slate-600"
                            >
                              <td className="py-1 px-3 pl-10 text-slate-600 italic flex items-center gap-1.5">
                                <span className="text-slate-400 font-normal">↳ •</span>
                                <span>{subDetail}</span>
                              </td>
                              <td className="py-1 px-2 text-center text-slate-300">-</td>
                              <td className="py-1 px-2 text-center text-slate-300">-</td>
                              <td className="py-1 px-1 relative">
                                <div className="absolute inset-0 grid grid-cols-6 divide-x divide-slate-100 pointer-events-none">
                                  <div></div><div></div><div></div><div></div><div></div><div></div>
                                </div>
                                <div className="relative h-3 w-full flex items-center">
                                  <div
                                    className="absolute h-1 bg-slate-300 rounded-full"
                                    style={{
                                      left: `${taskStartPct}%`,
                                      width: `${taskWidthPct}%`,
                                    }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN ROADMAP REPORT MODAL                                                  */
/* -------------------------------------------------------------------------- */
export const RoadmapReportModal: React.FC<RoadmapReportModalProps> = ({
  isOpen,
  onClose,
  combinedData,
  setCombinedData,
  officeData,
  setOfficeData,
  retailData,
  setRetailData,
  gates,
  startDate = '2026-07-20',
  onUpdateStartDate,
  totalWorkingDays = 30,
  onUpdateTotalWorkingDays,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackFilter>('all');
  const [viewMode, setViewMode] = useState<GanttViewMode>('both');

  const windowProgress = getAssessmentWorkingDaysProgress(startDate, totalWorkingDays, '2026-07-29');
  const { endDate, elapsedDays, remainingDays } = windowProgress;

  // Editable signatories state (Initialized with blank Name and Title)
  const [signatories, setSignatories] = useState<Signatory[]>([
    {
      id: 'sig-1',
      roleLabel: 'Executive Sponsor',
      name: '',
      title: '',
      department: 'FBSC Enterprise Capability Hub',
    },
    {
      id: 'sig-2',
      roleLabel: 'Track A Operational Lead',
      name: '',
      title: '',
      department: 'Office Leasing Division',
    },
    {
      id: 'sig-3',
      roleLabel: 'Track B Operational Lead',
      name: '',
      title: '',
      department: 'Retail Leasing Division',
    },
    {
      id: 'sig-4',
      roleLabel: 'Audit & Governance Lead',
      name: '',
      title: '',
      department: 'Enterprise Risk & Intelligence (ERI)',
    },
  ]);

  if (!isOpen) return null;

  const completedGatesCount = gates.filter((g) => g.completed).length;

  const calcStats = (phases: GanttPhase[]) => {
    const tasks = phases.flatMap((p) => p.tasks);
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const inProgress = phases.filter((p) => p.status === 'in-progress').length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, pct };
  };

  const combStats = calcStats(combinedData);
  const offStats = calcStats(officeData);
  const retStats = calcStats(retailData);

  const handlePrint = () => {
    window.print();
  };

  const handleSignatoryChange = (id: string, field: keyof Signatory, value: string) => {
    setSignatories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleClearSignatories = () => {
    setSignatories((prev) =>
      prev.map((s) => ({ ...s, name: '', title: '' }))
    );
  };

  const handleAddSignatory = () => {
    const newSig: Signatory = {
      id: `sig-${Date.now()}`,
      roleLabel: 'Additional Approver',
      name: '',
      title: '',
      department: '',
    };
    setSignatories((prev) => [...prev, newSig]);
  };

  const handleRemoveSignatory = (id: string) => {
    setSignatories((prev) => prev.filter((s) => s.id !== id));
  };

  const updateTaskPICInModal = (phaseId: string, taskId: string, newPICs: string[]) => {
    const updateList = (prev: GanttPhase[]) =>
      prev.map((p) => {
        if (p.id !== phaseId) return p;
        return {
          ...p,
          tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, stakeholders: newPICs } : t)),
        };
      });

    if (setCombinedData) setCombinedData(updateList);
    if (setOfficeData) setOfficeData(updateList);
    if (setRetailData) setRetailData(updateList);
  };

  const renderTrackReportSection = (
    title: string,
    badgeText: string,
    description: string,
    phases: GanttPhase[],
    stats: { total: number; completed: number; pct: number }
  ) => {
    return (
      <div className="space-y-6 page-break-inside-avoid print:space-y-5">
        {/* Track Banner Header */}
        <div className="bg-slate-900 text-white p-4 px-5 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:bg-slate-900 print:text-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#00C4E7] text-[#06234D] text-[10px] font-black uppercase rounded tracking-wider">
                {badgeText}
              </span>
              <span className="text-xs text-slate-300 font-semibold">FBSC Migration Track</span>
            </div>
            <h3 className="text-lg font-extrabold tracking-tight text-white">{title}</h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">{description}</p>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 px-4 py-2 rounded-xl text-center min-w-[130px] shrink-0">
            <div className="text-[10px] uppercase font-bold text-slate-400">Track Progress</div>
            <div className="text-xl font-black text-[#00C4E7]">{stats.pct}%</div>
            <div className="text-[10px] text-slate-300 font-medium">
              {stats.completed}/{stats.total} Tasks Completed
            </div>
          </div>
        </div>

        {/* 1. PLANNED ROADMAP GANTT CHART */}
        {(viewMode === 'both' || viewMode === 'planned') && (
          <RealGanttChartMatrix
            type="planned"
            title="1. Planned Baseline Roadmap Schedule"
            badgeText="Target Timeline Matrix"
            phases={phases}
            onUpdateTaskPIC={updateTaskPICInModal}
          />
        )}

        {/* 2. ACTUAL STATUS ROADMAP GANTT CHART */}
        {(viewMode === 'both' || viewMode === 'actual') && (
          <RealGanttChartMatrix
            type="actual"
            title="2. Actual Operational Status & Progress Gantt"
            badgeText="Live Progress Matrix"
            phases={phases}
            onUpdateTaskPIC={updateTaskPICInModal}
          />
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-[95vw] xl:max-w-7xl w-full h-[94vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden print:h-auto print:max-w-none print:shadow-none print:border-none print:rounded-none">
        {/* Top Control Toolbar (Hidden on Print) */}
        <div className="no-print bg-[#06234D] text-white p-4 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#003886] shrink-0">
          <div className="flex items-center gap-3">
            <AppLogo height={26} variant="light" showSubLabel={false} />
            <div className="border-l border-white/20 pl-3">
              <h2 className="font-extrabold text-base tracking-tight text-white">
                Printable Executive Roadmap & Gantt Report
              </h2>
              <p className="text-xs text-[#00C4E7]">
                Hierarchical Dual Gantt Matrix (Planned Baseline vs Actual Status)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Track Selector */}
            <div className="flex items-center gap-1.5 bg-[#003886] p-1 rounded-xl border border-[#00C4E7]/30 text-xs">
              <span className="text-slate-300 pl-2 font-semibold text-[11px]">Track:</span>
              <button
                onClick={() => setSelectedTrack('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedTrack === 'all'
                    ? 'bg-[#00C4E7] text-[#06234D] shadow-xs'
                    : 'text-white hover:text-sky-200'
                }`}
              >
                All Tracks
              </button>
              <button
                onClick={() => setSelectedTrack('combined')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedTrack === 'combined'
                    ? 'bg-[#00C4E7] text-[#06234D] shadow-xs'
                    : 'text-white hover:text-sky-200'
                }`}
              >
                Combined
              </button>
              <button
                onClick={() => setSelectedTrack('office')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedTrack === 'office'
                    ? 'bg-[#00C4E7] text-[#06234D] shadow-xs'
                    : 'text-white hover:text-sky-200'
                }`}
              >
                Track A (Office)
              </button>
              <button
                onClick={() => setSelectedTrack('retail')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedTrack === 'retail'
                    ? 'bg-[#00C4E7] text-[#06234D] shadow-xs'
                    : 'text-white hover:text-sky-200'
                }`}
              >
                Track B (Retail)
              </button>
            </div>

            {/* Gantt View Mode Toggle */}
            <div className="flex items-center gap-1.5 bg-[#003886] p-1 rounded-xl border border-[#00C4E7]/30 text-xs">
              <button
                onClick={() => setViewMode('both')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  viewMode === 'both' ? 'bg-white text-[#06234D]' : 'text-slate-300 hover:text-white'
                }`}
              >
                Both Gantts
              </button>
              <button
                onClick={() => setViewMode('planned')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  viewMode === 'planned' ? 'bg-white text-[#06234D]' : 'text-slate-300 hover:text-white'
                }`}
              >
                Planned Only
              </button>
              <button
                onClick={() => setViewMode('actual')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  viewMode === 'actual' ? 'bg-white text-[#06234D]' : 'text-slate-300 hover:text-white'
                }`}
              >
                Actual Only
              </button>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handlePrint}
              className="bg-[#00C4E7] hover:bg-sky-300 active:scale-95 text-[#06234D] font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-print"></i>
              <span>Print / Export PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Printable Document Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 bg-slate-50 text-slate-800 print:overflow-visible print:p-0 print:bg-white print:text-black">
          {/* Official Document Cover Header */}
          <div className="border-b-2 border-slate-300 pb-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <AppLogo height={32} variant="dark" showSubLabel={true} />
              <div className="text-left sm:text-right text-xs text-slate-500 font-medium">
                <div>Document Ref: <span className="font-bold text-slate-800">FBSC-LA-MIG-GANTT-2026</span></div>
                <div>Date Generated: <span className="font-bold text-slate-800">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#003886] bg-sky-100 border border-sky-200 px-3 py-1 rounded-md">
                Executive Audit Report & Dual Gantt Matrix
              </span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight pt-1">
                Lease Administration Migration Strategic Roadmap
              </h1>
              <p className="text-sm text-slate-600 max-w-4xl leading-relaxed">
                Hierarchical Dual Gantt Analysis covering Track A (Office Fast-Track), Track B (Retail Deep-Audit), and Unified Combined Migration Strategy.
              </p>
            </div>

            {/* Evaluation Status Callout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs relative group">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Assessment Working Days</div>
                <div className="text-lg font-black text-[#003886] flex items-center justify-between">
                  <span>Day {elapsedDays} / {totalWorkingDays}</span>
                  {onUpdateStartDate && (
                    <label className="no-print text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded cursor-pointer transition" title="Edit Assessment Window Start Date">
                      <i className="fa-solid fa-pen-to-square mr-1"></i>Edit Start
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => e.target.value && onUpdateStartDate(e.target.value)}
                        className="sr-only"
                      />
                    </label>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {elapsedDays} Working Days Elapsed | {remainingDays} Days Left
                </div>
                <div className="text-[9px] text-[#003886] font-bold pt-0.5 border-t border-slate-100 mt-1">
                  Range: {formatDateRange(new Date(startDate), endDate)} (Mon–Fri)
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Active Portfolio Scope</div>
                <div className="text-lg font-black text-slate-900">~1,150 Leases</div>
                <div className="text-[10px] text-slate-500 font-medium">Office (~50) | Retail (~1,100)</div>
              </div>

              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Overall Deliverables</div>
                <div className="text-lg font-black text-emerald-700">{combStats.pct}% Complete</div>
                <div className="text-[10px] text-slate-500 font-medium">{combStats.completed}/{combStats.total} Tasks Finished</div>
              </div>

              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Cutover Gate Readiness</div>
                <div className="text-lg font-black text-rose-700">{completedGatesCount} / {gates.length} Gates</div>
                <div className="text-[10px] text-rose-600 font-bold">RED - Defer Cutover</div>
              </div>
            </div>
          </div>

          {/* Executive Summary Narrative */}
          <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="text-[#003886]">📋</span> Executive Summary & Operational Context
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] text-[#003886]">
                  Strategic Decoupling Rationale
                </h4>
                <p>
                  To eliminate revenue exposure and operational paralysis during handoff to the <strong>FBSC Enterprise Capability Hub</strong>, the Lease Administration migration was decoupled into two distinct parallel tracks:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>
                    <strong>Track A (Office Leasing ~50 Contracts):</strong> Highly standardized, stable volume with predictable annual renewals. Fast-tracked for administrative transfer.
                  </li>
                  <li>
                    <strong>Track B (Retail Leasing ~1,100 Contracts):</strong> High operational complexity with ~200–300 monthly renewal peaks, turnover rent calculations, and heavy reliance on legacy workarounds in FiLLS, eLMS, and IFCA. Requires deep process stabilization.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] text-[#003886]">
                  "Improve-Then-Move" Governance Principle
                </h4>
                <p>
                  Per executive directive from SVP Perds Mesina, no operational scope shall be transferred without passing <strong>8 Non-Negotiable Cutover Prerequisites</strong>. 
                </p>
                <p>
                  Current assessment status at Day 10 shows strong progress on Track A alignment, while Track B exception tree mapping is underway. Cutover remains conditionally blocked until all mandatory audit gates achieve verified GREEN status.
                </p>
              </div>
            </div>
          </div>

          {/* Selected Track Reports */}
          {(selectedTrack === 'all' || selectedTrack === 'combined') &&
            renderTrackReportSection(
              'Unified Combined Portfolio Strategy',
              'Combined Master Timeline',
              'Unified operational roadmap merging Track A fast-track execution with Track B deep process audits, ensuring single-governance oversight across all ~1,150 active leases.',
              combinedData,
              combStats
            )}

          {(selectedTrack === 'all' || selectedTrack === 'office') &&
            renderTrackReportSection(
              'Track A — Office Leasing Fast-Track (~50 Contracts)',
              'Track A: Office',
              'Fast-track administrative transfer of stable Office Lease Administration execution under FBSC organizational structure.',
              officeData,
              offStats
            )}

          {(selectedTrack === 'all' || selectedTrack === 'retail') &&
            renderTrackReportSection(
              'Track B — Retail Leasing Deep Process Stabilization (~1,100 Contracts)',
              'Track B: Retail',
              'Deep-dive process audit, exception tree cataloging, turnover rent calculation standardization, and capacity modeling prior to full cutover.',
              retailData,
              retStats
            )}

          {/* Editable Executive Sign-off Block */}
          <div className="border-t-2 border-slate-300 pt-8 mt-12 space-y-6 page-break-inside-avoid">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span>Executive Governance Sign-Off & Approval</span>
                  <span className="no-print text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-[#003886] border border-blue-200">
                    {signatories.length} {signatories.length === 1 ? 'Signatory' : 'Signatories'}
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500 no-print">
                  Signatories are kept blank by default. Type the Name and Title below, or click "+ Add Signatory" to insert additional sign-off blocks.
                </p>
              </div>
              <div className="flex items-center gap-2 no-print shrink-0">
                <button
                  type="button"
                  onClick={handleAddSignatory}
                  className="no-print text-[11px] font-bold text-white bg-[#007BFF] hover:bg-[#0056b3] active:bg-[#003886] px-3.5 py-1.5 rounded-lg transition cursor-pointer shadow-2xs flex items-center gap-1.5"
                  title="Add a new signatory block"
                >
                  <i className="fa-solid fa-user-plus text-[11px]"></i>
                  <span>+ Add Signatory</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearSignatories}
                  className="no-print text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-200/80 hover:bg-slate-300 px-3 py-1.5 rounded-lg transition cursor-pointer"
                  title="Clear all name & title fields"
                >
                  Clear Inputs
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              {signatories.map((sig, idx) => (
                <div key={sig.id} className="border-t-2 border-slate-400 pt-3 space-y-2 relative group">
                  {/* Top Bar with Signatory Label & Remove Button */}
                  <div className="no-print flex justify-between items-center text-[10px] text-slate-400 pb-0.5">
                    <span className="font-bold text-[#003886] uppercase tracking-wider text-[9px]">
                      Signatory #{idx + 1}
                    </span>
                    {signatories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSignatory(sig.id)}
                        className="text-slate-400 hover:text-red-600 transition cursor-pointer p-0.5 rounded hover:bg-red-50 flex items-center gap-1 text-[10px]"
                        title="Remove this signatory"
                      >
                        <i className="fa-solid fa-trash-can text-[10px]"></i>
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    )}
                  </div>

                  {/* Physical Signature Space */}
                  <div className="h-12 border-b-2 border-slate-400 flex items-end pb-1 text-[9px] text-slate-400 italic font-mono select-none">
                    ( Signature / Date )
                  </div>

                  {/* Editable Inputs for On-Screen Editing */}
                  <div className="no-print space-y-1.5 pt-1">
                    <div>
                      <label className="text-[9px] font-bold uppercase text-slate-400 block mb-0.5">
                        Name
                      </label>
                      <input
                        type="text"
                        value={sig.name}
                        onChange={(e) => handleSignatoryChange(sig.id, 'name', e.target.value)}
                        placeholder="[ Enter Name ]"
                        className="w-full font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-[#00C4E7] focus:bg-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase text-slate-400 block mb-0.5">
                        Title / Position
                      </label>
                      <input
                        type="text"
                        value={sig.title}
                        onChange={(e) => handleSignatoryChange(sig.id, 'title', e.target.value)}
                        placeholder="[ Enter Title / Designation ]"
                        className="w-full text-slate-700 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[11px] focus:ring-2 focus:ring-[#00C4E7] focus:bg-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase text-slate-400 block mb-0.5">
                        Department / Org
                      </label>
                      <input
                        type="text"
                        value={sig.department}
                        onChange={(e) => handleSignatoryChange(sig.id, 'department', e.target.value)}
                        placeholder="[ Enter Department ]"
                        className="w-full text-slate-500 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] focus:ring-2 focus:ring-[#00C4E7] focus:bg-white outline-none"
                      />
                    </div>
                  </div>

                  {/* Clean Printed Display Block for PDF/Paper */}
                  <div className="hidden print:block space-y-0.5 pt-1">
                    <div className="font-extrabold text-slate-900 text-xs uppercase tracking-tight">
                      {sig.name.trim() || '________________________'}
                    </div>
                    <div className="text-[11px] text-slate-700 font-medium">
                      {sig.title.trim() || '________________________'}
                    </div>
                    {sig.department.trim() && (
                      <div className="text-[10px] text-slate-400">{sig.department}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
