import React, { useState } from 'react';
import { AuditGate } from '../types';

interface AuditScorecardProps {
  gates: AuditGate[];
  onToggleGate: (id: string) => void;
  onSetAllGates: (completed: boolean) => void;
  onSelectGateForEdit: (gate: AuditGate) => void;
  onOpenReportModal: () => void;
  onSaveAndCommit?: () => void;
  isEditMode?: boolean;
}

export const AuditScorecard: React.FC<AuditScorecardProps> = ({
  gates,
  onToggleGate,
  onSetAllGates,
  onSelectGateForEdit,
  onOpenReportModal,
  onSaveAndCommit,
  isEditMode = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const completedCount = gates.filter((g) => g.completed).length;
  const totalCount = gates.length;

  let ragBadgeStyle = 'bg-rose-500/20 border-rose-500/40 text-rose-300';
  let statusText = `RED (${completedCount}/8) - DEFER CUTOVER`;
  let statusDescription = 'Crucial prerequisites unfulfilled. Cutover risks severe SLA breaches.';

  if (completedCount === 8) {
    ragBadgeStyle = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
    statusText = 'GREEN (8/8) - PROCEED TO CUTOVER';
    statusDescription = 'All 8 mandatory gates verified! Approved for FBSC operational handoff.';
  } else if (completedCount >= 4) {
    ragBadgeStyle = 'bg-amber-500/20 border-amber-500/40 text-amber-300';
    statusText = `AMBER (${completedCount}/8) - CONDITIONAL AUDIT`;
    statusDescription = 'Partial criteria met. Hypercare mitigations required before formal go-live.';
  }

  const categories = ['All', 'Governance', 'Process', 'Data', 'Technology', 'Operations'];

  const filteredGates = selectedCategory === 'All'
    ? gates
    : gates.filter((g) => g.category === selectedCategory);

  return (
    <section id="interactive-calculator" className="bg-slate-900 text-white p-5 md:p-8 rounded-3xl card-elevation relative overflow-hidden border border-slate-800">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full space-y-6 relative z-10">
        {/* Header & Live RAG Result Badge */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/30 inline-flex items-center gap-1.5">
              <i className="fa-solid fa-calculator text-xs"></i> Interactive Audit Scorecard
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              Mandatory Go-Live Prerequisites Checklist
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-xl">
              Toggle verified tollgate prerequisites to calculate current readiness status in real time.
            </p>
          </div>

          <div className={`px-6 py-4 rounded-2xl border ${ragBadgeStyle} text-center min-w-[240px] shadow-lg backdrop-blur-sm transition-all duration-300`}>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-300">
              Calculated Tollgate RAG Status
            </div>
            <div className="text-xl md:text-2xl font-black my-0.5 tracking-tight">{statusText}</div>
            <div className="text-[11px] font-medium opacity-90">{statusDescription}</div>
          </div>
        </div>

        {/* Toolbar: Category Filters & Batch Toggles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#007BFF] text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            {!isEditMode && (
              <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/40 flex items-center gap-1">
                <i className="fa-solid fa-lock text-amber-400"></i> Read-Only Mode
              </span>
            )}
            {onSaveAndCommit && (
              <button
                type="button"
                onClick={onSaveAndCommit}
                disabled={!isEditMode}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                  isEditMode
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                    : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                }`}
                title={isEditMode ? 'Save & Commit Mandatory Gates Checklist to Storage' : 'Activate Edit Mode in header to enable saving'}
              >
                <i className="fa-solid fa-floppy-disk text-emerald-200"></i>
                <span>Save & Commit Gates</span>
              </button>
            )}
            <button
              onClick={() => isEditMode && onSetAllGates(true)}
              disabled={!isEditMode}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                isEditMode
                  ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <i className="fa-solid fa-check-double"></i>
              <span>Select All</span>
            </button>
            <button
              onClick={() => isEditMode && onSetAllGates(false)}
              disabled={!isEditMode}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                isEditMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <i className="fa-solid fa-rotate-left"></i>
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 8 Mandatory Gates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGates.map((gate) => (
            <div
              key={gate.id}
              className={`p-4 rounded-xl border transition-all duration-200 flex items-start justify-between gap-3 ${
                gate.completed
                  ? 'bg-blue-950/40 border-blue-500/50 shadow-md ring-1 ring-blue-500/30'
                  : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <label className={`flex items-start gap-3 flex-1 select-none ${isEditMode ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                <input
                  type="checkbox"
                  checked={gate.completed}
                  disabled={!isEditMode}
                  onChange={() => isEditMode && onToggleGate(gate.id)}
                  className="w-5 h-5 mt-0.5 accent-blue-500 rounded disabled:opacity-40 cursor-pointer transition-transform active:scale-95"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Gate {gate.gateNumber}
                    </span>
                    <span className="px-2 py-0.2 rounded bg-slate-700/80 text-[10px] text-slate-300 font-semibold">
                      {gate.category}
                    </span>
                    {gate.riskLevel === 'High' && (
                      <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                        High Risk
                      </span>
                    )}
                  </div>
                  <div className={`text-sm font-semibold mt-0.5 transition-colors ${gate.completed ? 'text-white line-through opacity-80' : 'text-slate-100'}`}>
                    {gate.title}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {gate.description}
                  </p>
                </div>
              </label>

              <button
                onClick={() => isEditMode && onSelectGateForEdit(gate)}
                disabled={!isEditMode}
                className={`p-2 rounded-lg transition text-xs ${
                  isEditMode
                    ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
                title={isEditMode ? 'Edit Gate Notes & Evidence' : 'Activate Edit Mode in header to edit gate details'}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Footer Audit Summary Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-blue-400 text-sm"></i>
            <span>
              Mandatory Gate Rule: Minimum <strong>8/8 required</strong> for GREEN go-live approval.
            </span>
          </div>
          <button
            onClick={onOpenReportModal}
            className="text-sky-400 hover:text-sky-300 font-bold underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Full Audit Certificate & Printable Summary</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    </section>
  );
};
