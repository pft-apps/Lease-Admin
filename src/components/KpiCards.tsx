import React from 'react';

export const KpiCards: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-2xl card-elevation border-t-4 border-[#003366] transition hover:-translate-y-1 hover:shadow-lg">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Portfolio</span>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#003366] flex items-center justify-center shadow-xs">
            <i className="fa-solid fa-folder-open text-base"></i>
          </div>
        </div>
        <div className="text-3xl font-extrabold text-[#003366] mb-1">~1,150</div>
        <p className="text-xs text-slate-500 font-medium">Retail FLI (~945), Retail FAI (~155), & Office (~50)</p>
      </div>

      <div className="bg-white p-6 rounded-2xl card-elevation border-t-4 border-[#007BFF] transition hover:-translate-y-1 hover:shadow-lg">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Peak Renewals</span>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#007BFF] flex items-center justify-center shadow-xs">
            <i className="fa-solid fa-arrows-rotate text-base"></i>
          </div>
        </div>
        <div className="text-3xl font-extrabold text-[#003366] mb-1">200–300</div>
        <p className="text-xs text-slate-500 font-medium">Monthly renewal volume requiring SLA precision</p>
      </div>

      <div className="bg-white p-6 rounded-2xl card-elevation border-t-4 border-amber-500 transition hover:-translate-y-1 hover:shadow-lg">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fast-Track Scope</span>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
            <i className="fa-solid fa-bolt text-base"></i>
          </div>
        </div>
        <div className="text-3xl font-extrabold text-[#003366] mb-1">~50</div>
        <p className="text-xs text-slate-500 font-medium">Office Leasing contracts decoupled for early go-live</p>
      </div>

      <div className="bg-white p-6 rounded-2xl card-elevation border-t-4 border-emerald-500 transition hover:-translate-y-1 hover:shadow-lg">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Go-Live Prerequisites</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
            <i className="fa-solid fa-list-check text-base"></i>
          </div>
        </div>
        <div className="text-3xl font-extrabold text-[#003366] mb-1">8 Gates</div>
        <p className="text-xs text-slate-500 font-medium">Mandatory criteria for Green RAG approval</p>
      </div>
    </section>
  );
};
