import React, { useState, useEffect } from 'react';
import { getAssessmentWorkingDaysProgress, formatDateRange, formatDateShort } from '../utils/workingDays';

interface HeroHeaderProps {
  startDate: string;
  onUpdateStartDate: (newDate: string) => void;
  totalWorkingDays?: number;
  onUpdateTotalWorkingDays?: (days: number) => void;
  onSaveAndCommit?: (overrideState?: any) => void;
  isEditMode?: boolean;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  startDate,
  onUpdateStartDate,
  totalWorkingDays = 30,
  onUpdateTotalWorkingDays,
  onSaveAndCommit,
  isEditMode = true,
}) => {
  const [isEditingWindow, setIsEditingWindow] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempWorkingDays, setTempWorkingDays] = useState(totalWorkingDays);

  useEffect(() => {
    setTempStartDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setTempWorkingDays(totalWorkingDays);
  }, [totalWorkingDays]);

  const windowProgress = getAssessmentWorkingDaysProgress(startDate, totalWorkingDays, '2026-07-29');
  const { endDate, elapsedDays, remainingDays, progressPercent } = windowProgress;

  const dateRangeStr = formatDateRange(new Date(startDate), endDate);

  const handleSaveWindow = () => {
    if (tempStartDate) {
      onUpdateStartDate(tempStartDate);
    }
    if (onUpdateTotalWorkingDays && tempWorkingDays > 0) {
      onUpdateTotalWorkingDays(tempWorkingDays);
    }
    if (onSaveAndCommit) {
      onSaveAndCommit({
        startDate: tempStartDate,
        totalWorkingDays: tempWorkingDays,
      });
    }
    setIsEditingWindow(false);
  };

  return (
    <header id="overview" className="pt-20 pb-10 px-2 sm:px-4 lg:px-6 bg-[#06234D] text-white relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#00C4E7]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#7F59E9]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        <div className="lg:w-2/3 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#003886] rounded-full border border-[#00C4E7]/40 text-xs font-semibold tracking-wide text-[#00C4E7] shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#00C4E7] animate-pulse"></span>
            30-WORKING-DAY STRATEGIC READINESS ASSESSMENT (MON–FRI)
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
            Lease Administration
          </h1>

          <p className="text-slate-200 text-base md:text-lg max-w-2xl leading-relaxed opacity-95">
            Transitioning operations from{' '}
            <span className="font-semibold text-white underline decoration-amber-400 decoration-2 underline-offset-2">
              "Lift-and-Shift"
            </span>{' '}
            to{' '}
            <span className="font-semibold text-white underline decoration-[#00C4E7] decoration-2 underline-offset-2">
              "Improve-Then-Move."
            </span>{' '}
            Stabilizing and auditing ~1,150 active contracts to guarantee FBSC Enterprise Capability Hub operational excellence.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Assessment Window Interactive Card */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-[#003886]/70 hover:bg-[#003886] rounded-xl text-sm font-medium backdrop-blur-sm border border-[#00C4E7]/40 shadow-sm transition-all">
              <i className="fa-regular fa-calendar-days text-[#00C4E7] text-base"></i>
              <span>
                Assessment Window:{' '}
                <strong className="text-[#00C4E7] font-bold">{totalWorkingDays} Working Days</strong> ({dateRangeStr})
              </span>
              <span className="text-[10px] font-semibold bg-[#00C4E7]/20 text-[#00C4E7] px-2 py-0.5 rounded-full border border-[#00C4E7]/30">
                Mon–Fri Excl. Weekends
              </span>

              <button
                type="button"
                disabled={!isEditMode}
                onClick={() => {
                  if (!isEditMode) return;
                  setTempStartDate(startDate);
                  setTempWorkingDays(totalWorkingDays);
                  setIsEditingWindow(true);
                }}
                className={`ml-2 px-2.5 py-1 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 shadow-xs ${
                  isEditMode
                    ? 'bg-[#00C4E7] hover:bg-sky-300 text-[#06234D] cursor-pointer'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600'
                }`}
                title={isEditMode ? 'Edit Start Date of Assessment Window' : 'Activate Edit Mode in header to enable date modification'}
              >
                <i className={`fa-solid ${isEditMode ? 'fa-pen-to-square' : 'fa-lock'} text-[11px]`}></i>
                <span>{isEditMode ? 'Edit Start Date' : 'Locked'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#003886]/60 rounded-xl text-sm font-medium backdrop-blur-sm border border-[#003886] shadow-sm">
              <i className="fa-solid fa-file-contract text-[#00C4E7] text-base"></i>
              <span>
                Total Portfolio: <strong>~1,150 Active Leases</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Hero Metric Card - Working Days Progress & Remaining Days */}
        <div className="lg:w-1/3 w-full flex justify-center">
          <div className="glass-card p-7 rounded-3xl w-full max-w-sm text-center shadow-2xl relative border border-white/20 bg-[#003886]/50 backdrop-blur-md">
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-[#00C4E7] mb-1">
              Working Days Progress Timeline
            </div>
            
            <div className="flex items-baseline justify-center gap-1.5 my-2">
              <span className="text-2xl font-bold text-slate-300">Working Day</span>
              <span className="text-5xl font-black text-white tracking-tight">{elapsedDays}</span>
              <span className="text-xl font-bold text-[#00C4E7]">/ {totalWorkingDays}</span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 w-full bg-slate-900/40 rounded-full my-3 overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-[#00C4E7] via-sky-400 to-emerald-400 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Elapsed vs Remaining Split Badges */}
            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="bg-[#06234D]/80 border border-white/10 rounded-xl p-2 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-300">Elapsed</div>
                <div className="text-base font-extrabold text-white">{elapsedDays} Working Days</div>
              </div>
              <div className="bg-[#003886]/80 border border-[#00C4E7]/30 rounded-xl p-2 text-center">
                <div className="text-[10px] uppercase font-bold text-[#00C4E7]">Remaining</div>
                <div className="text-base font-extrabold text-[#00C4E7]">{remainingDays} Working Days</div>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              Currently on <strong>Working Day {elapsedDays}</strong> of the {totalWorkingDays}-working-day schedule (Monday to Friday) with <strong>{remainingDays} working days remaining</strong> (Ends {formatDateShort(endDate)}).
            </p>
          </div>
        </div>
      </div>

      {/* Edit Assessment Window Modal */}
      {isEditingWindow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar-check text-[#007BFF] text-lg"></i>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Edit Assessment Window
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingWindow(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center cursor-pointer transition"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Start Date of Assessment Window:
                </label>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Assessment Window Duration (Working Days):
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={tempWorkingDays}
                  onChange={(e) => setTempWorkingDays(parseInt(e.target.value) || 30)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-[#007BFF]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  <i className="fa-solid fa-circle-info text-sky-600 mr-1"></i>
                  Measured strictly in <strong>Monday to Friday working days</strong> (excluding Saturdays & Sundays).
                </p>
              </div>

              {/* Calculated preview */}
              {tempStartDate && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-slate-800 space-y-1">
                  <div className="font-bold text-[#003886]">Calculated Working Days Schedule:</div>
                  <div className="text-xs">
                    Start Date: <strong>{formatDateShort(new Date(tempStartDate))}</strong>
                  </div>
                  <div className="text-xs">
                    Calculated End Date: <strong>{formatDateShort(getAssessmentWorkingDaysProgress(tempStartDate, tempWorkingDays).endDate)}</strong>
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold pt-1 border-t border-blue-200/60">
                    Range: {formatDateRange(new Date(tempStartDate), getAssessmentWorkingDaysProgress(tempStartDate, tempWorkingDays).endDate)} ({tempWorkingDays} Working Days)
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditingWindow(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveWindow}
                className="px-5 py-2 bg-[#003886] hover:bg-[#002244] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <i className="fa-solid fa-check"></i>
                <span>Save Working Days Schedule</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

