import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { riskDataPoints as defaultRiskPoints } from '../data/mockData';
import { RiskPoint } from '../types';
import { EditRiskModal } from './EditRiskModal';

interface RiskMatrixChartProps {
  riskPoints?: RiskPoint[];
  onSaveRiskPoint?: (updatedRiskPoint: RiskPoint) => void;
  isEditMode?: boolean;
}

export const RiskMatrixChart: React.FC<RiskMatrixChartProps> = ({
  riskPoints = defaultRiskPoints,
  onSaveRiskPoint,
  isEditMode = false,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<RiskPoint | null>(null);
  const [editingPoint, setEditingPoint] = useState<RiskPoint | null>(null);

  // Synchronize selectedPoint if points update
  const currentSelected = riskPoints.find((p) => p.id === selectedPoint?.id) || selectedPoint;

  return (
    <section id="risk-matrix" className="space-y-6">
      <div className="max-w-5xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-[#003366] text-xs font-bold uppercase tracking-wider mb-2">
          <i className="fa-solid fa-chart-bubble"></i> Risk Assessment
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#003366] tracking-tight">
          Volume vs. Operational Complexity Risk Plot
        </h2>
        <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed">
          Visualizing transaction volume against complexity scores. Click any risk point or select below to view and edit its Risk Mitigation Strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-6 md:p-8 rounded-3xl card-elevation border border-slate-100">
        {/* Scatter / Bubble Plot */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <XAxis
                  type="number"
                  dataKey="volume"
                  name="Transaction Volume"
                  unit=" leases"
                  domain={[0, 1050]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  label={{ value: 'Transaction Volume (Active Leases / Workloads)', position: 'insideBottom', offset: -10, fill: '#475569', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis
                  type="number"
                  dataKey="complexity"
                  name="Operational Complexity"
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  label={{ value: 'Operational Complexity Rating (0-100)', angle: -90, position: 'insideLeft', offset: 10, fill: '#475569', fontSize: 11, fontWeight: 600 }}
                />
                <ZAxis type="number" dataKey="size" range={[200, 1200]} name="Impact Area" />
                
                {/* Quadrant Guidelines */}
                <ReferenceLine y={50} stroke="#e2e8f0" strokeDasharray="3 3" />
                <ReferenceLine x={500} stroke="#e2e8f0" strokeDasharray="3 3" />

                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload as RiskPoint;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1">
                          <div className="font-bold text-sky-400">{data.name}</div>
                          <div>Category: <span className="text-slate-300">{data.category}</span></div>
                          <div>Volume: <span className="font-bold text-white">{data.volume} leases</span></div>
                          <div>Complexity: <span className="font-bold text-amber-400">{data.complexity}/100</span></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Scatter
                  name="Risk Scope"
                  data={riskPoints}
                  onClick={(node: any) => setSelectedPoint(node.payload || node)}
                  cursor="pointer"
                >
                  {riskPoints.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={entry.color}
                      fillOpacity={currentSelected?.id === entry.id ? 0.95 : 0.75}
                      stroke={currentSelected?.id === entry.id ? '#0f172a' : '#ffffff'}
                      strokeWidth={currentSelected?.id === entry.id ? 3 : 1.5}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600 mt-2">
            {riskPoints.map((pt) => (
              <button
                key={pt.id}
                onClick={() => setSelectedPoint(pt)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                  currentSelected?.id === pt.id
                    ? 'bg-slate-100 border-slate-400 text-slate-900 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pt.color }}></span>
                <span>{pt.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Point Detail Card */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
          {currentSelected ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
                    Risk Profile Details
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">{currentSelected.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: currentSelected.color }}
                  ></span>
                  <button
                    onClick={() => setEditingPoint(currentSelected)}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 text-xs font-bold transition cursor-pointer flex items-center gap-1 border border-slate-700"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span>Edit</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Volume</div>
                  <div className="text-base font-bold text-white mt-0.5">{currentSelected.volume} <span className="text-xs font-normal text-slate-400">contracts</span></div>
                </div>
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Complexity Score</div>
                  <div className="text-base font-bold text-amber-400 mt-0.5">{currentSelected.complexity} / 100</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Description:</div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                  {currentSelected.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-shield-virus text-xs"></i> Risk Mitigation Strategy:
                </div>
                <p className="text-xs text-slate-200 leading-relaxed bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30">
                  {currentSelected.impactMitigation}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 text-xs py-10">Select a bubble on the plot to view risk mitigation strategies</div>
          )}
        </div>
      </div>

      {/* Edit Risk Modal */}
      <EditRiskModal
        riskPoint={editingPoint}
        isOpen={!!editingPoint}
        onClose={() => setEditingPoint(null)}
        onSave={(updated) => {
          if (onSaveRiskPoint) {
            onSaveRiskPoint(updated);
          }
          setSelectedPoint(updated);
        }}
      />
    </section>
  );
};
