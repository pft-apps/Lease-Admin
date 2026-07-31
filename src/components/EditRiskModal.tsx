import React, { useState, useEffect } from 'react';
import { RiskPoint } from '../types';

interface EditRiskModalProps {
  riskPoint: RiskPoint | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedRiskPoint: RiskPoint) => void;
}

export const EditRiskModal: React.FC<EditRiskModalProps> = ({
  riskPoint,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [volume, setVolume] = useState<number>(0);
  const [complexity, setComplexity] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [impactMitigation, setImpactMitigation] = useState('');

  useEffect(() => {
    if (riskPoint) {
      setName(riskPoint.name);
      setCategory(riskPoint.category);
      setVolume(riskPoint.volume);
      setComplexity(riskPoint.complexity);
      setDescription(riskPoint.description);
      setImpactMitigation(riskPoint.impactMitigation);
    }
  }, [riskPoint]);

  if (!isOpen || !riskPoint) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...riskPoint,
      name: name.trim() || riskPoint.name,
      category: category.trim() || riskPoint.category,
      volume: Number(volume) || 0,
      complexity: Number(complexity) || 0,
      description: description.trim(),
      impactMitigation: impactMitigation.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Risk Profile & Strategy Editor
            </div>
            <h3 className="text-xl font-bold text-slate-900">{riskPoint.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center cursor-pointer transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Risk Area Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Category / Level</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Transaction Volume (Leases)</label>
              <input
                type="number"
                min="0"
                max="2000"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Operational Complexity Rating (0–100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Risk Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1 text-emerald-700 flex items-center gap-1.5">
              <i className="fa-solid fa-shield-virus"></i> Risk Mitigation Strategy:
            </label>
            <textarea
              rows={4}
              value={impactMitigation}
              onChange={(e) => setImpactMitigation(e.target.value)}
              required
              placeholder="Specify the risk mitigation strategy, operational controls, and safeguards..."
              className="w-full px-3 py-2 bg-emerald-50/60 border border-emerald-300 rounded-xl text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <i className="fa-solid fa-floppy-disk"></i>
              <span>Save Risk Mitigation Strategy</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
