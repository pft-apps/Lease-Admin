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
    <header id="overview" className="pt-20 pb-8 px-2 sm:px-4 lg:px-6 bg-[#06234D] text-white relative border-b border-[#003886]">
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        <div className="lg:w-2/3 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#003886] rounded-md border border-[#00C4E7]/30 text-xs font-semibold tracking-wide text-[#00C4E7]">
            <span className="w-2 h-2 rounded-full bg-[#00C4E7]"></span>
            30-WORKING-DAY STRATEGIC READINESS ASSESSMENT (MON–FRI)
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
            Lease Administration
          </h1>

          <p className="text-slate-200 text-base md:text-lg max-w-2xl leading-relaxed">
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

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Assessment Window Interactive Card */}
            <div className="flex flex-wrap items-center gap-2 px-3.5 py-2 bg-[#002B66] rounded-lg text-xs font-medium border border-[#00C4E7]/30">
              <i className="fa-regular fa-calendar-days text-[#00C4E7]"></i>
              <span>
                Assessment Window:{' '}
                <strong className="text-[#00C4E7] font-bold">{totalWorkingDays} Working Days</strong> ({dateRangeStr})
              </span>
              <span className="text-[10px] font-semibold bg-[#00C4E7]/15 text-[#00C4E7] px-2 py-0.5 rounded border border-[#00C4E7]/25">
                Mon–Fri Excl. Weekends
              </span>

              {isEditMode && (
                <button
                  type="button"
                  onClick={() => {
                    setTempStartDate(startDate);
                    setTempWorkingDays(totalWorkingDays);
                    setIsEditingWindow(true);
                  }}
                  className="ml-2 px-2.5 py-1 text-xs font-bold rounded transition-all flex items-center gap-1.5 bg-[#00C4E7] hover:bg-sky-300 text-[#06234D] cursor-pointer shadow-xs"
                  title="Edit Start Date of Assessment Window"
                >
                  <i className="fa-solid fa-pen-to-square text-[11px]"></i>
                  <span>Edit Start Date</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#002B66] rounded-lg text-xs font-medium border border-[#003886]">
              <i className="fa-solid fa-file-contract text-[#00C4E7]"></i>
              <span>
                Total Portfolio: <strong>~1,150 Active Leases</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Hero Metric Card - Working Days Progress & Remaining Days */}
        <div className="lg:w-1/3 w-full flex justify-center">
          <div className="p-6 rounded-2xl w-full max-w-sm text-center border border-[#00C4E7]/30 bg-[#002B66]">
            <div className="text-[10px] uppercase tracking-widest font-black text-[#00C4E7] mb-1">
              Working Days Progress Timeline
            </div>
            
            <div className="flex items-baseline justify-center gap-1.5 my-2">
              <span className="text-xl font-bold text-slate-300">Working Day</span>
              <span className="text-4xl font-black text-white tracking-tight">{elapsedDays}</span>
              <span className="text-lg font-bold text-[#00C4E7]">/ {totalWorkingDays}</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full bg-[#06234D] rounded-full my-3 overflow-hidden border border-[#003886]">
              <div 
                className="h-full bg-[#00C4E7] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Elapsed vs Remaining Split Badges */}
            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="bg-[#06234D] border border-slate-700/60 rounded-lg p-2 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Elapsed</div>
                <div className="text-sm font-black text-white">{elapsedDays} Working Days</div>
              </div>
              <div className="bg-[#06234D] border border-[#00C4E7]/30 rounded-lg p-2 text-center">
                <div className="text-[10px] uppercase font-bold text-[#00C4E7]">Remaining</div>
                <div className="text-sm font-black text-[#00C4E7]">{remainingDays} Working Days</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
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

