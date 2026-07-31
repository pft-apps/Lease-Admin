import React from 'react';

export const KpiCards: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Portfolio</span>
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#003366] flex items-center justify-center">
            <i className="fa-solid fa-folder-open text-sm"></i>
          </div>
        </div>
        <div className="text-2xl font-black text-[#003366] mb-1">~1,150</div>
        <p className="text-xs text-slate-500 font-medium">Retail FLI (~945), Retail FAI (~155), & Office (~50)</p>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Peak Renewals</span>
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-sky-600 flex items-center justify-center">
            <i className="fa-solid fa-arrows-rotate text-sm"></i>
          </div>
        </div>
        <div className="text-2xl font-black text-[#003366] mb-1">200–300</div>
        <p className="text-xs text-slate-500 font-medium">Monthly renewal volume requiring SLA precision</p>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Fast-Track Scope</span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <i className="fa-solid fa-bolt text-sm"></i>
          </div>
        </div>
        <div className="text-2xl font-black text-[#003366] mb-1">~50</div>
        <p className="text-xs text-slate-500 font-medium">Office Leasing contracts decoupled for early go-live</p>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Go-Live Prerequisites</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <i className="fa-solid fa-list-check text-sm"></i>
          </div>
        </div>
        <div className="text-2xl font-black text-[#003366] mb-1">8 Gates</div>
        <p className="text-xs text-slate-500 font-medium">Mandatory criteria for Green RAG approval</p>
      </div>
    </section>
  );
};

