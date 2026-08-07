import React from 'react';
import { DataRequestItem } from '../types';

interface DataRequestMatrixProps {
  dataRequests: DataRequestItem[];
  setDataRequests: React.Dispatch<React.SetStateAction<DataRequestItem[]>>;
  isEditMode: boolean;
}

export const DataRequestMatrix: React.FC<DataRequestMatrixProps> = ({
  dataRequests,
  setDataRequests,
  isEditMode
}) => {
  const updateItem = (id: string, field: keyof DataRequestItem, value: string) => {
    setDataRequests(prev => prev.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: value };
        
        if (field === 'submittedOffice') {
          if (value === 'N/A') {
            newItem.dateSubmittedOffice = '';
            newItem.auditStatusOffice = 'N/A';
          } else if (item.submittedOffice === 'N/A' && value !== 'N/A') {
            newItem.auditStatusOffice = 'Not Yet Started';
          }
        }
        
        if (field === 'submittedRetail') {
          if (value === 'N/A') {
            newItem.dateSubmittedRetail = '';
            newItem.auditStatusRetail = 'N/A';
          } else if (item.submittedRetail === 'N/A' && value !== 'N/A') {
            newItem.auditStatusRetail = 'Not Yet Started';
          }
        }

        return newItem;
      }
      return item;
    }));
  };

  const addRow = () => {
    const newId = `DRM-${String(dataRequests.length + 1).padStart(2, '0')}`;
    setDataRequests(prev => [
      ...prev,
      {
        id: newId,
        riskDimension: '',
        itemRequested: '',
        targetScope: '',
        description: '',
        preferredFormat: '',
        assignedOwner: '',
        priority: 'MEDIUM',
        targetDateStr: '',
        submittedOffice: '',
        dateSubmittedOffice: '',
        auditStatusOffice: 'Not Yet Started',
        submittedRetail: '',
        dateSubmittedRetail: '',
        auditStatusRetail: 'Not Yet Started',
        auditorRemarks: ''
      }
    ]);
  };

  return (
    <div className="bg-[#06234D] border border-slate-700/60 rounded-xl overflow-hidden shadow-xl mb-12">
      <div className="bg-[#041530] border-b border-slate-700/60 px-6 py-4 flex items-center justify-between">
        <h3 className="text-xl font-black text-white">Data Request Matrix (DRM)</h3>
        {isEditMode && (
          <button
            onClick={addRow}
            className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold rounded-lg transition-colors border border-emerald-500/30 text-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Add Row
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0A2A5E] text-slate-400 font-bold uppercase text-xs">
            <tr>
              <th rowSpan={2} className="px-4 py-3 border-r border-slate-700/50">Ref #</th>
              <th rowSpan={2} className="px-4 py-3 border-r border-slate-700/50">Risk Dimension</th>
              <th rowSpan={2} className="px-4 py-3 border-r border-slate-700/50">Data / Document Item Requested</th>
              <th rowSpan={2} className="px-4 py-3 border-r border-slate-700/50">Target Scope</th>
              <th rowSpan={2} className="px-4 py-3 min-w-[300px] border-r border-slate-700/50">Description & Purpose</th>
              <th rowSpan={2} className="px-4 py-3 border-r border-slate-700/50">Preferred Format</th>
              <th rowSpan={2} className="px-4 py-3 border-r border-slate-700/50">Assigned Primary Owner</th>
              <th rowSpan={2} className="px-4 py-3 text-center border-r border-slate-700/50">Priority</th>
              <th rowSpan={2} className="px-4 py-3 text-center border-r border-slate-700/50">Target Date</th>
              <th colSpan={3} className="px-4 py-2 text-center border-b border-r border-slate-700/50 bg-[#0C3373]">Office Lease Admin</th>
              <th colSpan={3} className="px-4 py-2 text-center border-b border-r border-slate-700/50 bg-[#0C3373]">Retail Lease Admin</th>
              <th rowSpan={2} className="px-4 py-3 min-w-[200px]">Auditor Remarks</th>
            </tr>
            <tr>
              <th className="px-2 py-2 text-center border-r border-slate-700/50 min-w-[100px] bg-[#0A2A5E]">Submitted?</th>
              <th className="px-2 py-2 text-center border-r border-slate-700/50 min-w-[130px] bg-[#0A2A5E]">Date Submitted</th>
              <th className="px-2 py-2 text-center border-r border-slate-700/50 min-w-[140px] bg-[#0A2A5E]">Audit Status</th>
              <th className="px-2 py-2 text-center border-r border-slate-700/50 min-w-[100px] bg-[#0A2A5E]">Submitted?</th>
              <th className="px-2 py-2 text-center border-r border-slate-700/50 min-w-[130px] bg-[#0A2A5E]">Date Submitted</th>
              <th className="px-2 py-2 text-center border-r border-slate-700/50 min-w-[140px] bg-[#0A2A5E]">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {dataRequests.map((item, idx) => (
              <tr key={item.id} className={idx % 2 === 0 ? 'bg-[#06234D]' : 'bg-[#0A2A5E]/30'}>
                <td className="px-4 py-3 font-bold text-white whitespace-nowrap border-r border-slate-700/50">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="w-full bg-[#041530] border border-slate-600 rounded text-white text-sm px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.id}
                      onChange={(e) => updateItem(item.id, 'id', e.target.value)}
                    />
                  ) : item.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap border-r border-slate-700/50">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.riskDimension}
                      onChange={(e) => updateItem(item.id, 'riskDimension', e.target.value)}
                    />
                  ) : item.riskDimension}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-100 border-r border-slate-700/50">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-100 text-sm px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.itemRequested}
                      onChange={(e) => updateItem(item.id, 'itemRequested', e.target.value)}
                    />
                  ) : item.itemRequested}
                </td>
                <td className="px-4 py-3 border-r border-slate-700/50">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.targetScope}
                      onChange={(e) => updateItem(item.id, 'targetScope', e.target.value)}
                    />
                  ) : item.targetScope}
                </td>
                <td className="px-4 py-3 text-xs leading-relaxed border-r border-slate-700/50">
                  {isEditMode ? (
                    <textarea
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-xs px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      rows={2}
                    />
                  ) : item.description}
                </td>
                <td className="px-4 py-3 text-xs border-r border-slate-700/50">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-xs px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.preferredFormat}
                      onChange={(e) => updateItem(item.id, 'preferredFormat', e.target.value)}
                    />
                  ) : item.preferredFormat}
                </td>
                <td className="px-4 py-3 whitespace-nowrap border-r border-slate-700/50">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.assignedOwner}
                      onChange={(e) => updateItem(item.id, 'assignedOwner', e.target.value)}
                    />
                  ) : item.assignedOwner}
                </td>
                <td className="px-4 py-3 text-center border-r border-slate-700/50">
                  {isEditMode ? (
                    <select
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.priority}
                      onChange={(e) => updateItem(item.id, 'priority', e.target.value)}
                    >
                      <option value="HIGH">HIGH</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="LOW">LOW</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.priority === 'HIGH' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      item.priority === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {item.priority}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center whitespace-nowrap border-r border-slate-700/50">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.targetDateStr}
                      onChange={(e) => updateItem(item.id, 'targetDateStr', e.target.value)}
                    />
                  ) : item.targetDateStr}
                </td>

                {/* Office Columns */}
                <td className="px-2 py-3 text-center border-r border-slate-700/50 bg-[#0C3373]/10">
                  {isEditMode ? (
                    <select
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-1 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.submittedOffice}
                      onChange={(e) => updateItem(item.id, 'submittedOffice', e.target.value)}
                    >
                      <option value="">-</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="N/A">N/A</option>
                    </select>
                  ) : (
                    <span className={`font-bold ${item.submittedOffice === 'Yes' ? 'text-emerald-400' : item.submittedOffice === 'No' ? 'text-rose-400' : 'text-slate-500'}`}>
                      {item.submittedOffice || '-'}
                    </span>
                  )}
                </td>
                <td className="px-2 py-3 text-center border-r border-slate-700/50 bg-[#0C3373]/10">
                  {isEditMode ? (
                    item.submittedOffice === 'N/A' ? (
                      <span className="text-slate-500 font-bold">N/A</span>
                    ) : (
                      <input
                        type="date"
                        className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-1 py-1 outline-none focus:border-[#00C4E7]"
                        value={item.dateSubmittedOffice}
                        onChange={(e) => updateItem(item.id, 'dateSubmittedOffice', e.target.value)}
                      />
                    )
                  ) : (
                    <span className="text-slate-300">
                      {item.submittedOffice === 'N/A' ? 'N/A' : (item.dateSubmittedOffice ? new Date(item.dateSubmittedOffice).toLocaleDateString() : '-')}
                    </span>
                  )}
                </td>
                <td className="px-2 py-3 text-center border-r border-slate-700/50 bg-[#0C3373]/10">
                  {isEditMode ? (
                    item.submittedOffice === 'N/A' ? (
                      <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">N/A</span>
                    ) : (
                      <select
                        className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-1 py-1 outline-none focus:border-[#00C4E7]"
                        value={item.auditStatusOffice}
                        onChange={(e) => updateItem(item.id, 'auditStatusOffice', e.target.value)}
                      >
                        <option value="">-</option>
                        <option value="Not Yet Started">Not Yet Started</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Deferred">Deferred</option>
                      </select>
                    )
                  ) : (
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.auditStatusOffice === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      item.auditStatusOffice === 'In-Progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      item.auditStatusOffice === 'Deferred' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      item.auditStatusOffice === 'N/A' ? 'bg-slate-500/20 text-slate-500 border border-slate-500/30' :
                      'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {item.auditStatusOffice || 'Not Yet Started'}
                    </span>
                  )}
                </td>

                {/* Retail Columns */}
                <td className="px-2 py-3 text-center border-r border-slate-700/50 bg-[#0A2A5E]/10">
                  {isEditMode ? (
                    <select
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-1 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.submittedRetail}
                      onChange={(e) => updateItem(item.id, 'submittedRetail', e.target.value)}
                    >
                      <option value="">-</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="N/A">N/A</option>
                    </select>
                  ) : (
                    <span className={`font-bold ${item.submittedRetail === 'Yes' ? 'text-emerald-400' : item.submittedRetail === 'No' ? 'text-rose-400' : 'text-slate-500'}`}>
                      {item.submittedRetail || '-'}
                    </span>
                  )}
                </td>
                <td className="px-2 py-3 text-center border-r border-slate-700/50 bg-[#0A2A5E]/10">
                  {isEditMode ? (
                    item.submittedRetail === 'N/A' ? (
                      <span className="text-slate-500 font-bold">N/A</span>
                    ) : (
                      <input
                        type="date"
                        className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-1 py-1 outline-none focus:border-[#00C4E7]"
                        value={item.dateSubmittedRetail}
                        onChange={(e) => updateItem(item.id, 'dateSubmittedRetail', e.target.value)}
                      />
                    )
                  ) : (
                    <span className="text-slate-300">
                      {item.submittedRetail === 'N/A' ? 'N/A' : (item.dateSubmittedRetail ? new Date(item.dateSubmittedRetail).toLocaleDateString() : '-')}
                    </span>
                  )}
                </td>
                <td className="px-2 py-3 text-center border-r border-slate-700/50 bg-[#0A2A5E]/10">
                  {isEditMode ? (
                    item.submittedRetail === 'N/A' ? (
                      <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">N/A</span>
                    ) : (
                      <select
                        className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-sm px-1 py-1 outline-none focus:border-[#00C4E7]"
                        value={item.auditStatusRetail}
                        onChange={(e) => updateItem(item.id, 'auditStatusRetail', e.target.value)}
                      >
                        <option value="">-</option>
                        <option value="Not Yet Started">Not Yet Started</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Deferred">Deferred</option>
                      </select>
                    )
                  ) : (
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.auditStatusRetail === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      item.auditStatusRetail === 'In-Progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      item.auditStatusRetail === 'Deferred' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      item.auditStatusRetail === 'N/A' ? 'bg-slate-500/20 text-slate-500 border border-slate-500/30' :
                      'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {item.auditStatusRetail || 'Not Yet Started'}
                    </span>
                  )}
                </td>

                {/* Remarks */}
                <td className="px-4 py-3 text-xs">
                  {isEditMode ? (
                    <textarea
                      className="w-full bg-[#041530] border border-slate-600 rounded text-slate-300 text-xs px-2 py-1 outline-none focus:border-[#00C4E7]"
                      value={item.auditorRemarks}
                      onChange={(e) => updateItem(item.id, 'auditorRemarks', e.target.value)}
                      rows={2}
                    />
                  ) : item.auditorRemarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
