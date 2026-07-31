import React, { useState, useEffect } from 'react';
import { StrategicQuestion } from '../types';

interface EditQuestionModalProps {
  question: StrategicQuestion | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedQuestion: StrategicQuestion) => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  question,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [impactLevel, setImpactLevel] = useState<'Critical' | 'High' | 'Medium'>('High');
  const [resolved, setResolved] = useState(true);
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setCategory(question.category);
      setImpactLevel(question.impactLevel || 'High');
      setResolved(question.resolved);
      setSummary(question.summary);
      setDetails(question.details);
    }
  }, [question]);

  if (!isOpen || !question) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...question,
      title: title.trim() || question.title,
      category: category.trim() || question.category,
      impactLevel,
      resolved,
      summary: summary.trim(),
      details: details.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#003366]">
              Question #{question.number}
            </div>
            <h3 className="text-xl font-bold text-slate-900">Edit Strategic Question & Resolution</h3>
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
              <label className="block font-bold text-slate-800 mb-1">Question Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Category</label>
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
              <label className="block font-bold text-slate-800 mb-1">Impact Rating</label>
              <select
                value={impactLevel}
                onChange={(e) => setImpactLevel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Resolution Status</label>
              <select
                value={resolved ? 'resolved' : 'pending'}
                onChange={(e) => setResolved(e.target.value === 'resolved')}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              >
                <option value="resolved">Resolved</option>
                <option value="pending">In Progress / Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Problem Summary</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1 text-[#003366] flex items-center gap-1.5">
              <i className="fa-solid fa-lightbulb"></i> Resolution Strategy & Impact:
            </label>
            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              placeholder="Detail the exact strategy executed and its operational/financial impact..."
              className="w-full px-3 py-2 bg-blue-50/50 border border-blue-200 rounded-xl text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
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
              className="px-5 py-2 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <i className="fa-solid fa-floppy-disk"></i>
              <span>Save Strategy & Impact</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
