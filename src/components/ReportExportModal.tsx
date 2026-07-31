import React, { useState } from 'react';
import { AuditGate } from '../types';
import { AppLogo } from './AppLogo';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  gates: AuditGate[];
  onOpenRoadmapReportModal?: () => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  isOpen,
  onClose,
  gates,
  onOpenRoadmapReportModal,
}) => {
  const [officerName, setOfficerName] = useState('');
  const [officerTitle, setOfficerTitle] = useState('Lead Audit Officer');
  const [fbscName, setFbscName] = useState('');
  const [fbscTitle, setFbscTitle] = useState('FBSC Operational Lead');

  if (!isOpen) return null;

  const completedCount = gates.filter((g) => g.completed).length;
  const percentage = Math.round((completedCount / gates.length) * 100);

  let ragStatus = 'RED - DEFER CUTOVER';
  let ragColor = 'text-rose-600 bg-rose-50 border-rose-200';

  if (completedCount === 8) {
    ragStatus = 'GREEN - APPROVED FOR CUTOVER';
    ragColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  } else if (completedCount >= 4) {
    ragStatus = 'AMBER - CONDITIONAL APPROVAL';
    ragColor = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Print Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <AppLogo height={24} variant="dark" showSubLabel={false} />
              <span className="font-bold text-xs text-slate-500 border-l border-slate-300 pl-2">Enterprise Risk & Intelligence (ERI) Audit</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Lease Administration Migration Audit Report
            </h2>
            <p className="text-xs text-slate-500">
              Evaluation Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center cursor-pointer transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Executive Summary Card */}
        <div className={`p-5 rounded-2xl border ${ragColor} space-y-2`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider">Overall Assessment RAG Decision</span>
            <span className="text-xs font-mono font-bold">{completedCount} of 8 Gates Met ({percentage}%)</span>
          </div>
          <div className="text-2xl font-black">{ragStatus}</div>
          <p className="text-xs leading-relaxed opacity-90">
            Audit evaluation performed for ~1,150 active lease contracts transitioning from "Lift-and-Shift" to "Improve-Then-Move" FBSC enterprise capability hub baseline.
          </p>
        </div>

        {/* Audit Gates Status Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider">
            Mandatory Gate Breakdown:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {gates.map((g) => (
              <div
                key={g.id}
                className={`p-3 rounded-xl border flex flex-col justify-between ${
                  g.completed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-[#003366]">Gate {g.gateNumber}: {g.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        g.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {g.completed ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-tight mb-2">{g.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>Ref: {g.evidenceRef || 'Pending Ref'}</span>
                  <span>Risk: {g.riskLevel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Sign-off Block */}
        <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="space-y-2">
            <div className="font-bold text-slate-800">1. Lead Audit Officer</div>
            <div className="h-10 border-b border-slate-300 my-1"></div>
            
            <div className="no-print space-y-1">
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                placeholder="[ Enter Signatory Name ]"
                className="w-full font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-sky-500"
              />
              <input
                type="text"
                value={officerTitle}
                onChange={(e) => setOfficerTitle(e.target.value)}
                placeholder="[ Enter Title / Position ]"
                className="w-full text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-[11px] outline-none"
              />
            </div>

            <div className="hidden print:block space-y-0.5">
              <div className="font-extrabold text-slate-900 text-xs">
                {officerName.trim() || '________________________'}
              </div>
              <div className="text-[10px] text-slate-500">
                {officerTitle.trim() || 'Lead Audit Officer'} — Enterprise Risk & Intelligence (ERI)
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-800">2. FBSC Operational Lead</div>
            <div className="h-10 border-b border-slate-300 my-1"></div>

            <div className="no-print space-y-1">
              <input
                type="text"
                value={fbscName}
                onChange={(e) => setFbscName(e.target.value)}
                placeholder="[ Enter Signatory Name ]"
                className="w-full font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-sky-500"
              />
              <input
                type="text"
                value={fbscTitle}
                onChange={(e) => setFbscTitle(e.target.value)}
                placeholder="[ Enter Title / Position ]"
                className="w-full text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-[11px] outline-none"
              />
            </div>

            <div className="hidden print:block space-y-0.5">
              <div className="font-extrabold text-slate-900 text-xs">
                {fbscName.trim() || '________________________'}
              </div>
              <div className="text-[10px] text-slate-500">
                {fbscTitle.trim() || 'FBSC Operational Lead'} — Cutover Directorate
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Close Window
          </button>
          <div className="flex items-center space-x-3">
            {onOpenRoadmapReportModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRoadmapReportModal();
                }}
                className="px-4 py-2.5 bg-[#00C4E7] hover:bg-sky-300 text-[#06234D] font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <i className="fa-solid fa-chart-gantt"></i>
                <span>Open Roadmap Gantt Report</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <i className="fa-solid fa-print"></i>
              <span>Print Audit Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
