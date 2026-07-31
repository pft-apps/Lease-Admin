import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { portfolioCategories } from '../data/mockData';
import { PortfolioCategory } from '../types';

export const PortfolioBreakdown: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);

  const chartData = portfolioCategories.map((cat) => ({
    name: cat.label,
    value: cat.count,
    color: cat.color,
    percentage: cat.percentage,
    id: cat.id
  }));

  const handleSliceClick = (entry: any) => {
    const matched = portfolioCategories.find((c) => c.id === entry.id || c.label === entry.name);
    if (matched) setSelectedCategory(matched);
  };

  return (
    <section className="space-y-6">
      <div className="max-w-5xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-[#003366] text-xs font-bold uppercase tracking-wider mb-2">
          <i className="fa-solid fa-chart-pie"></i> Scope Analytics
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#003366] tracking-tight">
          Portfolio Scope & Breakdown
        </h2>
        <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed">
          Comprehensive operational data showing contract distribution across business sectors. While Office contracts (~50) feature standardized workflows, Retail represents over 1,100 active agreements with high operational complexity and seasonal volume spikes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-8 rounded-3xl card-elevation border border-slate-100">
        {/* Interactive Recharts Donut */}
        <div className="lg:col-span-5 flex flex-col items-center relative">
          <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider mb-2">
            Active Portfolio Composition
          </h3>
          <div className="w-full h-72 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                  onClick={handleSliceClick}
                  cursor="pointer"
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.id}`}
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="transition-all duration-300 hover:opacity-85"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `~${value} contracts (${((value / 1150) * 100).toFixed(1)}%)`,
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                  }}
                  itemStyle={{ color: '#38bdf8' }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-[#003366]">1,150</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Leases</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center font-medium mt-1">
            Click chart slices or cards to filter detailed operational scope
          </p>
        </div>

        {/* Sector Cards */}
        <div className="lg:col-span-7 space-y-4">
          {portfolioCategories.map((cat) => {
            const isSelected = selectedCategory?.id === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`p-5 rounded-2xl border-l-4 cursor-pointer transition-all ${cat.borderClass} ${
                  isSelected
                    ? `${cat.bgClass} shadow-md ring-2 ring-[#007BFF]/20 scale-[1.01]`
                    : 'bg-slate-50 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {cat.label}
                    </span>
                    <div className="text-xl font-bold text-[#003366]">~{cat.count} Active Tenants</div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${cat.badgeClass}`}>
                    {cat.percentage}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{cat.description}</p>

                {isSelected && (
                  <div className="pt-3 border-t border-slate-200/60 mt-2 space-y-1.5 animate-fadeIn">
                    <div className="text-[11px] font-bold text-[#003366] uppercase tracking-wider">Key Operational Notes:</div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-700">
                      {cat.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <i className="fa-solid fa-circle-check text-blue-500 text-xs mt-0.5"></i>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
