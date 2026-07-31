import React, { useState, useEffect } from 'react';
import { AuditGate } from '../types';

interface GateDetailModalProps {
  gate: AuditGate | null;
  onClose: () => void;
  onSaveGate: (updatedGate: AuditGate) => void;
}

export const GateDetailModal: React.FC<GateDetailModalProps> = ({ gate, onClose, onSaveGate }) => {
  if (!gate) return null;

  const [notes, setNotes] = useState(gate.notes || '');
  const [evidenceRef, setEvidenceRef] = useState(gate.evidenceRef || '');
  const [completed, setCompleted] = useState(gate.completed);
  const [riskLevel, setRiskLevel] = useState(gate.riskLevel);

  useEffect(() => {
    setNotes(gate.notes || '');
    setEvidenceRef(gate.evidenceRef || '');
    setCompleted(gate.completed);
    setRiskLevel(gate.riskLevel);
  }, [gate]);

  const handleSave = () => {
    onSaveGate({
      ...gate,
      notes,
      evidenceRef,
      completed,
      riskLevel
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-[#007BFF] uppercase tracking-wider">
              Gate {gate.gateNumber} Audit Inspection
            </span>
            <h3 className="text-xl font-bold text-[#003366] mt-0.5">{gate.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center cursor-pointer transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-500 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              Gate Description
            </label>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
              {gate.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-500 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Status
              </label>
              <button
                type="button"
                onClick={() => setCompleted(!completed)}
                className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer border transition ${
                  completed
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-rose-50 text-rose-700 border-rose-300'
                }`}
              >
                <i className={`fa-solid ${completed ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-rose-500'}`}></i>
                <span>{completed ? 'VERIFIED PASSED' : 'PENDING AUDIT'}</span>
              </button>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Risk Severity
              </label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value as any)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              >
                <option value="High">High Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="Low">Low Risk</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              Evidence Document Reference
            </label>
            <input
              type="text"
              value={evidenceRef}
              onChange={(e) => setEvidenceRef(e.target.value)}
              placeholder="e.g. DOC-RACI-2026-V2.1"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              Auditor Audit Notes & Remarks
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter specific audit observations or pending sign-offs..."
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#007BFF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            Save Audit Record
          </button>
        </div>
      </div>
    </div>
  );
};
