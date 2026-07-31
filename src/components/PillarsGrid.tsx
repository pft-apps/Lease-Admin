import React, { useState } from 'react';
import { assessmentPillars } from '../data/mockData';
import { AssessmentPillar } from '../types';

interface PillarsGridProps {
  pillars?: AssessmentPillar[];
  setPillars?: React.Dispatch<React.SetStateAction<AssessmentPillar[]>>;
  onSaveAndCommit?: () => void;
  isEditMode?: boolean;
}

export const PillarsGrid: React.FC<PillarsGridProps> = ({
  pillars: externalPillars,
  setPillars: externalSetPillars,
  onSaveAndCommit,
  isEditMode = false,
}) => {
  const [internalPillars, setInternalPillars] = useState<AssessmentPillar[]>(() =>
    assessmentPillars.map((p) => ({
      ...p,
      items:
        p.items ||
        p.keyFocusAreas.map((area, idx) => ({
          id: `${p.number}-${idx}`,
          title: area,
          completed: true,
          remarks: '',
        })),
    }))
  );

  const pillars = externalPillars || internalPillars;
  const setPillars = externalSetPillars || setInternalPillars;

  const [selectedPillarNumber, setSelectedPillarNumber] = useState<string | null>(null);
  const [showAllChecklist, setShowAllChecklist] = useState<boolean>(false);

  const toggleItemCompletion = (pillarNumber: string, itemId: string) => {
    if (!isEditMode) return;
    setPillars((prev) =>
      prev.map((pillar) => {
        if (pillar.number !== pillarNumber) return pillar;
        const updatedItems = (pillar.items || []).map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        return { ...pillar, items: updatedItems };
      })
    );
  };

  const updateItemRemarks = (pillarNumber: string, itemId: string, remarks: string) => {
    if (!isEditMode) return;
    setPillars((prev) =>
      prev.map((pillar) => {
        if (pillar.number !== pillarNumber) return pillar;
        const updatedItems = (pillar.items || []).map((item) =>
          item.id === itemId ? { ...item, remarks } : item
        );
        return { ...pillar, items: updatedItems };
      })
    );
  };

  const toggleAllPillarItems = (pillarNumber: string, targetState: boolean) => {
    if (!isEditMode) return;
    setPillars((prev) =>
      prev.map((pillar) => {
        if (pillar.number !== pillarNumber) return pillar;
        const updatedItems = (pillar.items || []).map((item) => ({
          ...item,
          completed: targetState,
        }));
        return { ...pillar, items: updatedItems };
      })
    );
  };

  // Overall stats
  const allItems = pillars.flatMap((p) => p.items || []);
  const totalCompleted = allItems.filter((i) => i.completed).length;
  const totalCount = allItems.length;
  const overallPct = totalCount > 0 ? Math.round((totalCompleted / totalCount) * 100) : 0;

  const selectedPillar = pillars.find((p) => p.number === selectedPillarNumber) || null;

  return (
    <section id="pillars" className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="max-w-4xl space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-[#003366] text-xs font-bold uppercase tracking-wider mb-1">
            <i className="fa-solid fa-cubes text-[#007BFF]"></i> Structural Architecture
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#003366] tracking-tight">
            The 5 Core Assessment Pillars & Audit Focus Checklist
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every operational element is audited across these five structural pillars. Track execution status and record detailed auditor remarks for each focus area.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-4 min-w-[280px]">
          <div className="flex-1">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-600">Pillar Requirements Audit</span>
              <span className="text-[#003366] font-bold">
                {totalCompleted} / {totalCount} ({overallPct}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#003366] to-[#007BFF] h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditMode && (
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                <i className="fa-solid fa-lock text-amber-600"></i> Read-Only Mode
              </span>
            )}
            {onSaveAndCommit && (
              <button
                type="button"
                onClick={() => onSaveAndCommit({ pillars })}
                disabled={!isEditMode}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                  isEditMode
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
                title={isEditMode ? 'Save & Commit Pillar Checklist & Remarks to Storage' : 'Activate Edit Mode in header to enable saving'}
              >
                <i className="fa-solid fa-floppy-disk text-emerald-200"></i>
                <span>Save & Commit Pillars</span>
              </button>
            )}
            <button
              onClick={() => setShowAllChecklist(!showAllChecklist)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                showAllChecklist
                  ? 'bg-[#003366] text-white border-[#003366]'
                  : 'bg-slate-50 text-[#003366] border-slate-200 hover:bg-slate-100'
              }`}
            >
              {showAllChecklist ? 'Hide All Checklist' : 'View All Checklist'}
            </button>
          </div>
        </div>
      </div>

      {/* 5 Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pillars.map((pillar) => {
          const items = pillar.items || [];
          const completedCount = items.filter((i) => i.completed).length;
          const totalItems = items.length;
          const pct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
          const isSelected = selectedPillarNumber === pillar.number;

          return (
            <div
              key={pillar.number}
              onClick={() => setSelectedPillarNumber(isSelected ? null : pillar.number)}
              className={`bg-white p-5 rounded-2xl card-elevation border-b-4 ${pillar.borderColor} space-y-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-[#007BFF] bg-blue-50/20' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <div
                  className={`w-9 h-9 rounded-xl ${pillar.badgeBg} ${pillar.badgeText} font-extrabold text-sm flex items-center justify-center shadow-xs`}
                >
                  {pillar.number}
                </div>
                <i className={`fa-solid ${pillar.icon} text-slate-400 text-base`}></i>
              </div>

              <div>
                <h4 className="font-bold text-[#003366] text-base mb-1">{pillar.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{pillar.description}</p>
              </div>

              {/* Progress indicator inside card */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Audit Progress</span>
                  <span className="text-[#003366] font-bold">
                    {completedCount}/{totalItems} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#007BFF] h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#007BFF]">
                <span>{isSelected ? 'Editing Focus Areas' : 'Edit Focus Areas & Remarks'}</span>
                <i
                  className={`fa-solid fa-chevron-down text-[10px] transition-transform ${
                    isSelected ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Single Pillar View with Checkboxes & Editable Remarks */}
      {selectedPillar && !showAllChecklist && (
        <div className="bg-white p-6 rounded-3xl card-elevation border-l-4 border-[#007BFF] border-y border-r border-slate-200 space-y-4 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#003366] font-black text-sm flex items-center justify-center border border-blue-200">
                {selectedPillar.number}
              </span>
              <div>
                <h3 className="font-bold text-[#003366] text-lg">
                  {selectedPillar.name} — Interactive Audit Checklist & Remarks
                </h3>
                <p className="text-xs text-slate-500">{selectedPillar.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onSaveAndCommit && (
                <button
                  type="button"
                  onClick={() => onSaveAndCommit({ pillars })}
                  disabled={!isEditMode}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                    isEditMode
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                  title={isEditMode ? 'Save & Commit Checklist & Remarks to Local Database' : 'Activate Edit Mode in header to enable saving'}
                >
                  <i className="fa-solid fa-floppy-disk text-emerald-200"></i>
                  <span>Save & Commit</span>
                </button>
              )}
              <button
                onClick={() =>
                  toggleAllPillarItems(
                    selectedPillar.number,
                    !(selectedPillar.items || []).every((i) => i.completed)
                  )
                }
                disabled={!isEditMode}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  isEditMode
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {(selectedPillar.items || []).every((i) => i.completed)
                  ? 'Mark All Incomplete'
                  : 'Mark All Complete'}
              </button>
              <button
                onClick={() => setSelectedPillarNumber(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {(selectedPillar.items || []).map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  item.completed
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <label className={`flex items-start gap-3 flex-1 ${isEditMode ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      disabled={!isEditMode}
                      onChange={() => toggleItemCompletion(selectedPillar.number, item.id)}
                      className="mt-0.5 w-4 h-4 rounded text-[#007BFF] focus:ring-[#007BFF] disabled:opacity-50 cursor-pointer accent-[#007BFF]"
                    />
                    <div className="space-y-1">
                      <span
                        className={`text-xs font-bold ${
                          item.completed ? 'text-slate-800' : 'text-slate-700'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`inline-block ml-2 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                          item.completed
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {item.completed ? 'Verified / Done' : 'Pending Audit'}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Remarks Field */}
                <div className="mt-3 pl-7 space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <i className="fa-regular fa-comment-dots text-[#007BFF]"></i>
                    <span>Auditor Remarks & Notes:</span>
                  </label>
                  <input
                    type="text"
                    value={item.remarks || ''}
                    disabled={!isEditMode}
                    onChange={(e) =>
                      updateItemRemarks(selectedPillar.number, item.id, e.target.value)
                    }
                    placeholder={isEditMode ? 'Add observations, sign-off notes, or dependencies...' : 'Unlock Edit Mode in header to modify remarks'}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007BFF] placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show All Pillars Master Checklist View */}
      {showAllChecklist && (
        <div className="bg-white p-6 rounded-3xl card-elevation border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-[#003366] text-lg">
                Master 5-Pillar Audit Checklist & Remarks Overview
              </h3>
              <p className="text-xs text-slate-500">
                Full interactive checklist across all 5 Assessment Pillars with editable remarks.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {onSaveAndCommit && (
                <button
                  type="button"
                  onClick={() => onSaveAndCommit({ pillars })}
                  disabled={!isEditMode}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                    isEditMode
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                  title={isEditMode ? 'Save & Commit Master Checklist & Remarks to Storage' : 'Activate Edit Mode in header to enable saving'}
                >
                  <i className="fa-solid fa-floppy-disk text-emerald-200"></i>
                  <span>Save & Commit Pillars</span>
                </button>
              )}
              <button
                onClick={() => setShowAllChecklist(false)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                Close All View
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg ${pillar.badgeBg} ${pillar.badgeText} font-bold text-xs flex items-center justify-center`}
                    >
                      {pillar.number}
                    </span>
                    <h4 className="font-bold text-[#003366] text-sm">{pillar.name}</h4>
                  </div>
                  <span className="text-xs font-bold text-[#007BFF]">
                    {(pillar.items || []).filter((i) => i.completed).length} /{' '}
                    {(pillar.items || []).length} Verified
                  </span>
                </div>

                <div className="space-y-2">
                  {(pillar.items || []).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3 rounded-xl border border-slate-200 space-y-2"
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItemCompletion(pillar.number, item.id)}
                          className="w-4 h-4 rounded text-[#007BFF] focus:ring-[#007BFF] accent-[#007BFF]"
                        />
                        <span
                          className={`text-xs font-semibold ${
                            item.completed ? 'text-slate-900 font-bold' : 'text-slate-600'
                          }`}
                        >
                          {item.title}
                        </span>
                      </label>
                      <input
                        type="text"
                        value={item.remarks || ''}
                        onChange={(e) =>
                          updateItemRemarks(pillar.number, item.id, e.target.value)
                        }
                        placeholder="Add remarks or notes..."
                        className="w-full px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#007BFF]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
