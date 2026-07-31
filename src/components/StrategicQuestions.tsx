import React, { useState } from 'react';
import { strategicQuestions as defaultQuestions } from '../data/mockData';
import { StrategicQuestion } from '../types';
import { EditQuestionModal } from './EditQuestionModal';

interface StrategicQuestionsProps {
  questions?: StrategicQuestion[];
  onSaveQuestion?: (updatedQuestion: StrategicQuestion) => void;
  onSaveAndCommit?: () => void;
  isEditMode?: boolean;
}

export const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({
  questions = defaultQuestions,
  onSaveQuestion,
  onSaveAndCommit,
  isEditMode = true,
}) => {
  const [isCategoryItemsCollapsed, setIsCategoryItemsCollapsed] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<'All' | 'OPERATIONS' | 'INTEGRITY'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [editingQuestion, setEditingQuestion] = useState<StrategicQuestion | null>(null);

  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(questions.map((q) => q.category)))];

  // Visual Inquiry Roadmap definitions matching screenshot
  const inquiryRoadmap = [
    {
      domain: 'OPERATIONS',
      title: 'INQUIRY ROADMAP: OPERATIONS',
      categories: [
        {
          letter: 'A',
          name: 'A. Scope Boundaries',
          items: [
            { code: 'A.1', text: 'Day 1 FBSC vs BU Exclusions' },
            { code: 'A.2', text: 'Steady-state vs Project Backlog' },
            { code: 'A.3', text: 'Decision rights / approvals' },
          ],
        },
        {
          letter: 'B',
          name: 'B. Volume & Capacity',
          items: [
            { code: 'B.1', text: 'Monthly volume by activity type' },
            { code: 'B.2', text: 'Tenant folder completeness' },
            { code: 'B.3', text: 'Renewal cycle workload peaks' },
          ],
        },
        {
          letter: 'C',
          name: 'C. Process Maturity',
          items: [
            { code: 'C.1', text: 'E2E SOP availability' },
            { code: 'C.2', text: '"Happy Path" vs Exception trees' },
            { code: 'C.3', text: 'SLA vs Same-day expectations' },
          ],
        },
      ],
    },
    {
      domain: 'INTEGRITY',
      title: 'INQUIRY ROADMAP: INTEGRITY',
      categories: [
        {
          letter: 'D',
          name: 'D. Data Quality',
          items: [
            { code: 'D.1', text: 'Reconciled Lease Inventory' },
            { code: 'D.2', text: 'Single Source of Truth audit' },
            { code: 'D.3', text: 'Contract Master File accuracy' },
          ],
        },
        {
          letter: 'E',
          name: 'E. System Readiness',
          items: [
            { code: 'E.1', text: 'FiLLS/eLMS/IFCA workaround audit' },
            { code: 'E.2', text: 'Automation & integration gaps' },
            { code: 'E.3', text: 'Oracle Migration dependency' },
          ],
        },
        {
          letter: 'F',
          name: 'F. Controls & Revenue',
          items: [
            { code: 'F.1', text: 'Billing reconciliation controls' },
            { code: 'F.2', text: 'Revenue leakage (CAM/Turnover)' },
            { code: 'F.3', text: 'Late indexation exposure' },
          ],
        },
      ],
    },
  ];

  const filteredQuestions = questions.filter((q) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      q.title.toLowerCase().includes(term) ||
      q.summary.toLowerCase().includes(term) ||
      q.details.toLowerCase().includes(term) ||
      (q.code && q.code.toLowerCase().includes(term));

    const matchesDomain = selectedDomain === 'All' || q.domain === selectedDomain;
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;

    return matchesSearch && matchesDomain && matchesCat;
  });

  const toggleCard = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !isCardExpanded(id),
    }));
  };

  const isCardExpanded = (id: string) => {
    if (expandedIds[id] !== undefined) {
      return expandedIds[id];
    }
    return expandAll;
  };

  const handleToggleExpandAll = () => {
    const newExpandAll = !expandAll;
    setExpandAll(newExpandAll);
    setExpandedIds({});
  };

  const handleSelectCategory = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(categoryName);
    }
  };

  return (
    <section id="strategic-questions" className="space-y-8">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-[#003366] text-xs font-bold uppercase tracking-wider mb-2">
            <i className="fa-solid fa-lightbulb"></i> Risk Resolutions
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#003366] tracking-tight">
            Strategic Priority Questions Being Resolved
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-1.5">
            Key operational and technical risk challenges categorized into <span className="font-bold text-[#003366]">Operations (A–C)</span> and <span className="font-bold text-[#003366]">Integrity (D–F)</span>. Click any inquiry category card below to filter the resolution strategies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {!isEditMode && (
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
              <i className="fa-solid fa-lock text-amber-600"></i> Read-Only Mode
            </span>
          )}
          {onSaveAndCommit && (
            <button
              type="button"
              onClick={onSaveAndCommit}
              disabled={!isEditMode}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 ${
                isEditMode
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
              title={isEditMode ? 'Save & Commit Strategic Questions to Storage' : 'Activate Edit Mode in header to enable saving'}
            >
              <i className="fa-solid fa-floppy-disk text-emerald-200"></i>
              <span>Save & Commit Questions</span>
            </button>
          )}

          {/* Global Toggle Expand All Button */}
          <button
            onClick={handleToggleExpandAll}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 border shadow-xs ${
              expandAll
                ? 'bg-blue-50 border-blue-300 text-[#003366] hover:bg-blue-100'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i className={`fa-solid ${expandAll ? 'fa-compress' : 'fa-expand'}`}></i>
            <span>{expandAll ? 'Collapse All Strategies' : 'Show All Resolution Strategies'}</span>
          </button>

          {/* Search Bar */}
          <div className="w-full sm:w-64 relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="Search (e.g. A.1, SOP, Oracle)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007BFF] shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Visual Inquiry Roadmap Grid (Matching the exact diagram design) */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-6 shadow-xs transition-all">
        {/* Roadmap Card Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#003366] text-amber-400 flex items-center justify-center font-black text-sm shadow-2xs">
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
            <div>
              <h3 className="text-base font-black text-[#002244] uppercase tracking-wider">
                Inquiry Roadmap Overview
              </h3>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Interactive inquiry domain matrix (Operations A–C & Integrity D–F)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 animate-fadeIn">
          {inquiryRoadmap.map((section) => (
            <div key={section.domain} className="space-y-4">
              {/* Header with Orange Accent Bar */}
              <div className="flex items-center gap-3">
                <span className="w-2 h-7 bg-amber-500 rounded-xs"></span>
                <h3 className="text-lg md:text-xl font-black text-[#002244] tracking-wider uppercase font-mono">
                  {section.title}
                </h3>
              </div>

              {/* 3 Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {section.categories.map((cat) => {
                  const isSelected = selectedCategory === cat.name;

                  return (
                    <div
                      key={cat.letter}
                      onClick={() => handleSelectCategory(cat.name)}
                      className={`bg-white rounded-xl p-5 border-2 transition-all cursor-pointer shadow-xs relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#003366] ring-2 ring-[#007BFF]/30 bg-blue-50/30'
                          : 'border-[#002244]/80 hover:border-[#007BFF] hover:shadow-md'
                      }`}
                    >
                      <div>
                        {/* Card Title */}
                        <h4 className="text-base font-black text-[#002244] mb-3 border-b pb-2 border-slate-100 flex items-center justify-between">
                          <span>{cat.name}</span>
                          {isSelected && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#003366] text-white">
                              Active Filter
                            </span>
                          )}
                        </h4>

                        {/* Items List with Checkmark Badges */}
                        <ul className="space-y-2.5">
                          {cat.items.map((item) => (
                            <li key={item.code} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-tight">
                              <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5 shadow-2xs">
                                <i className="fa-solid fa-check"></i>
                              </span>
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 pt-2 text-[10px] font-bold text-[#007BFF] hover:underline flex items-center gap-1">
                        <span>View Category Resolutions</span>
                        <i className="fa-solid fa-arrow-right text-[9px]"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Toolbar: Domain & Category Pills */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <span>Filter Category:</span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer bg-rose-50 px-2 py-0.5 rounded border border-rose-200"
              >
                Reset Filter (Show All 18)
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-slate-500">
              Showing {filteredQuestions.length} of {questions.length} Items
            </div>

            {/* Collapse/Expand Category Resolution Items Button */}
            <button
              type="button"
              onClick={() => setIsCategoryItemsCollapsed(!isCategoryItemsCollapsed)}
              className="px-3.5 py-1 rounded-xl text-xs font-black text-[#003366] bg-white border border-slate-300 hover:bg-slate-100 hover:border-[#007BFF] transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title={isCategoryItemsCollapsed ? 'Expand Category Items (A.1 to F.3)' : 'Collapse Category Items (A.1 to F.3)'}
            >
              <i className={`fa-solid ${isCategoryItemsCollapsed ? 'fa-chevron-down text-[#007BFF]' : 'fa-chevron-up text-slate-500'} text-[11px]`}></i>
              <span>{isCategoryItemsCollapsed ? 'Expand Categories' : 'Collapse Categories'}</span>
            </button>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setSelectedDomain('All');
              setSelectedCategory('All');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedDomain === 'All' && selectedCategory === 'All'
                ? 'bg-[#003366] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Roadmap Inquiries ({questions.length})
          </button>
          <button
            onClick={() => {
              setSelectedDomain('OPERATIONS');
              setSelectedCategory('All');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedDomain === 'OPERATIONS' && selectedCategory === 'All'
                ? 'bg-[#003366] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Operations Inquiries (A–C)</span>
          </button>
          <button
            onClick={() => {
              setSelectedDomain('INTEGRITY');
              setSelectedCategory('All');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedDomain === 'INTEGRITY' && selectedCategory === 'All'
                ? 'bg-[#003366] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Integrity Inquiries (D–F)</span>
          </button>
        </div>

        {/* Individual Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#007BFF] text-white shadow-2xs font-black'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Categorized & Enumerated Strategic Questions (18 Items A.1 to F.3) */}
      {!isCategoryItemsCollapsed ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredQuestions.map((q) => {
              const expanded = isCardExpanded(q.id);

              let domainColor = 'bg-[#003366] text-white';
              if (q.domain === 'INTEGRITY') domainColor = 'bg-[#007BFF] text-white';

              return (
                <div
                  key={q.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between relative group border-t-4 border-t-[#003366]"
                >
                  <div>
                    {/* Header Badge Row */}
                    <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        {/* Item Code Pill (e.g. A.1) */}
                        <span className="px-2 py-0.5 rounded-md bg-[#003366] text-amber-400 font-mono font-black text-xs shadow-2xs">
                          {q.code || `#${q.number}`}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${domainColor}`}>
                          {q.domain || 'OPERATIONS'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            q.resolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {q.resolved ? 'Resolved' : 'In Progress'}
                        </span>

                        {/* Edit Button */}
                        {isEditMode && (
                          <button
                            onClick={() => setEditingQuestion(q)}
                            title="Edit Resolution Strategy"
                            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-[#003366] hover:text-white text-slate-600 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                          >
                            <i className="fa-solid fa-pen-to-square text-[10px]"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category & Title */}
                    <div className="mb-2">
                      <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-tight mb-0.5">
                        {q.category}
                      </div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-bold text-slate-900 text-base leading-snug">{q.title}</h4>
                        <span
                          className={`text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 ${
                            q.impactLevel === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-[#003366]'
                          }`}
                        >
                          {q.impactLevel}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{q.summary}</p>

                    {/* Resolution Strategy & Impact Block */}
                    {expanded && (
                      <div className="mt-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-slate-700 space-y-1.5 animate-fadeIn">
                        <div className="font-bold text-[#003366] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <i className="fa-solid fa-lightbulb text-amber-500"></i>
                            Resolution Strategy & Impact:
                          </span>
                          {isEditMode && (
                            <button
                              onClick={() => setEditingQuestion(q)}
                              className="text-[11px] text-[#007BFF] hover:underline font-bold cursor-pointer"
                            >
                              Edit Strategy
                            </button>
                          )}
                        </div>
                        <p className="leading-relaxed text-slate-700 font-normal">{q.details}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => toggleCard(q.id)}
                      className="text-xs font-bold text-[#007BFF] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{expanded ? 'Hide Details' : 'View Resolution Strategy'}</span>
                      <i className={`fa-solid fa-chevron-down text-xs transition-transform ${expanded ? 'rotate-180' : ''}`}></i>
                    </button>

                    <button
                      onClick={() => isEditMode && setEditingQuestion(q)}
                      disabled={!isEditMode}
                      className={`text-xs font-semibold flex items-center gap-1 ${
                        isEditMode
                          ? 'text-slate-500 hover:text-[#003366] cursor-pointer'
                          : 'text-slate-300 cursor-not-allowed'
                      }`}
                      title={isEditMode ? 'Edit Question Strategy' : 'Activate Edit Mode in header to edit'}
                    >
                      <i className="fa-solid fa-pen text-[10px]"></i>
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
              <i className="fa-solid fa-circle-exclamation text-3xl text-slate-300"></i>
              <p className="font-bold text-sm">No strategic questions match your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDomain('All');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-[#007BFF] hover:underline cursor-pointer"
              >
                Clear Filters & Search
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-2.5 animate-fadeIn">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#003366] bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
            <i className="fa-solid fa-folder-closed"></i> Category Items Collapsed (18 Items A.1 to F.3)
          </div>
          <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
            The 18 category resolution cards (A.1 to F.3) are currently collapsed. Click below or use the button beside the toolbar counter to expand.
          </p>
          <button
            onClick={() => setIsCategoryItemsCollapsed(false)}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#003366] text-white hover:bg-blue-900 transition cursor-pointer shadow-2xs inline-flex items-center gap-2"
          >
            <i className="fa-solid fa-chevron-down text-[10px]"></i>
            <span>Expand Category Items (A.1 to F.3)</span>
          </button>
        </div>
      )}

      {/* Edit Question Modal */}
      <EditQuestionModal
        question={editingQuestion}
        isOpen={!!editingQuestion}
        onClose={() => setEditingQuestion(null)}
        onSave={(updated) => {
          if (onSaveQuestion) {
            onSaveQuestion(updated);
          }
        }}
      />
    </section>
  );
};

