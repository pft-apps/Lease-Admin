import React, { useState } from 'react';
import { MasterPIC } from '../utils/db';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Storage props
  linkedFileName: string | null;
  syncStatus: 'synced' | 'linked' | 'local' | 'saving';
  lastSavedTime: string | null;
  onSaveAndCommit: () => void;
  onLinkFile: () => void;
  onCreateFile: () => void;
  onDisconnectFile: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFetchSharePoint?: () => void;
  // Master Data props
  masterPics: MasterPIC[];
  onAddPic: (fullName: string, position: string) => void;
  onUpdatePic: (id: string, fullName: string, position: string) => void;
  onDeletePic: (id: string) => void;
  onResetPicsToDefault: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  linkedFileName,
  syncStatus,
  lastSavedTime,
  onSaveAndCommit,
  onLinkFile,
  onCreateFile,
  onDisconnectFile,
  onExportJson,
  onImportJson,
  onFetchSharePoint,
  masterPics,
  onAddPic,
  onUpdatePic,
  onDeletePic,
  onResetPicsToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'storage' | 'masterData'>('storage');

  // Master Data Add/Edit form state
  const [newFullName, setNewFullName] = useState<string>('');
  const [newPosition, setNewPosition] = useState<string>('');
  const [editingPicId, setEditingPicId] = useState<string | null>(null);
  const [editFullName, setEditFullName] = useState<string>('');
  const [editPosition, setEditPosition] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const handleAddPicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newPosition.trim()) return;
    onAddPic(newFullName.trim(), newPosition.trim());
    setNewFullName('');
    setNewPosition('');
  };

  const handleStartEdit = (pic: MasterPIC) => {
    setEditingPicId(pic.id);
    setEditFullName(pic.fullName);
    setEditPosition(pic.position);
  };

  const handleSaveEdit = (id: string) => {
    if (!editFullName.trim() || !editPosition.trim()) return;
    onUpdatePic(id, editFullName.trim(), editPosition.trim());
    setEditingPicId(null);
  };

  const filteredPics = masterPics.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const storageModules = [
    { num: 1, title: 'Start Date of Assessment Window', desc: 'Working days timeline baseline & target dates' },
    { num: 2, title: 'Risk Profile Details', desc: 'Volume vs. Complexity plot points & mitigations' },
    { num: 3, title: 'PIC Assignments', desc: 'Track Leads & Task-level Persons In Charge' },
    { num: 4, title: 'Execution Timeline Dates', desc: 'Target date ranges for roadmap phases & tasks' },
    { num: 5, title: 'Execution Timeline Remarks', desc: 'Descriptions & sub-details on roadmap items' },
    { num: 6, title: 'Marking of Check/Uncheck on Execution Timeline', desc: 'Task completion statuses & phase states' },
    { num: 7, title: 'Marking of Check/Uncheck on 5 Core Pillars', desc: 'Focus area verification checklist states' },
    { num: 8, title: '5 Core Pillars Auditor Remarks & Notes', desc: 'Detailed observations & dependency notes' },
    { num: 9, title: 'Marking of Check/Uncheck on Go-Live Prerequisites', desc: '8 Mandatory Tollgate verification statuses' },
    { num: 10, title: 'Saving of Audit Record on Prerequisites', desc: 'Auditor notes, evidence refs & sign-offs' },
    { num: 11, title: 'Strategic Priority Questions & Master Data', desc: 'Resolutions, PIC master directory & config' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#06234D]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002B5B] via-[#003366] to-[#0055a5] p-6 text-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <i className="fa-solid fa-gear text-[#00C4E7] text-xl"></i>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00C4E7]/20 border border-[#00C4E7]/30 text-[10px] font-bold uppercase tracking-wider text-[#00C4E7] mb-0.5">
                  <i className="fa-solid fa-shield-cat"></i> Admin Control Panel
                </div>
                <h3 className="text-xl font-extrabold text-white">System Settings & Data Management</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition cursor-pointer text-base"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-6 border-b border-white/10 pb-px">
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'storage'
                  ? 'bg-white text-[#003366] shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <i className="fa-solid fa-database text-[#007BFF]"></i>
              <span>Storage Set-up & File Sync</span>
            </button>

            <button
              onClick={() => setActiveTab('masterData')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'masterData'
                  ? 'bg-white text-[#003366] shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <i className="fa-solid fa-users-gear text-[#007BFF]"></i>
              <span>Master Data Setup (PICs)</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 font-sans text-xs space-y-6">
          {activeTab === 'storage' && (
            <div className="space-y-6">
              {/* File Linker Status Banner */}
              <div className="p-5 bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                      Storage Status: {syncStatus === 'synced' ? 'File Linked & Synced' : syncStatus === 'linked' ? 'File Linked' : 'IndexedDB Local Cache'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {linkedFileName ? `Linked File: ${linkedFileName}` : 'Virtual Local Browser Engine (IndexedDB)'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Last Saved: {lastSavedTime ? lastSavedTime : 'Just now'} • Web Worker & IndexedDB Enabled
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={onSaveAndCommit}
                    className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                    <span>Save & Commit Data</span>
                  </button>

                  {!linkedFileName ? (
                    <button
                      onClick={onLinkFile}
                      className="px-3.5 py-2.5 bg-[#007BFF] hover:bg-blue-600 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-link"></i>
                      <span>Link .json File</span>
                    </button>
                  ) : (
                    <button
                      onClick={onDisconnectFile}
                      className="px-3.5 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold rounded-xl transition cursor-pointer"
                    >
                      Disconnect Link
                    </button>
                  )}
                </div>
              </div>

              {/* Actions Toolbar */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#003886]/5 border border-[#003886]/20 rounded-2xl space-y-2">
                  <div className="font-bold text-[#003886] flex items-center gap-1.5">
                    <i className="fa-solid fa-[#00C4E7] fa-cloud shadow-sm text-[#007BFF]"></i>
                    <span>Power Automate Sync</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Fetch fresh payload from Power Automate Read Webhook and update cache.
                  </p>
                  <button
                    onClick={onFetchSharePoint}
                    className="w-full mt-2 py-2 bg-[#003886] hover:bg-[#06234D] text-white font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-solid fa-arrows-rotate"></i>
                    <span>Refresh Data</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="font-bold text-[#003366] flex items-center gap-1.5">
                    <i className="fa-solid fa-file-circle-plus text-[#007BFF]"></i>
                    <span>Create Storage File</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Create a new `.json` storage file on your disk using File Access API.
                  </p>
                  <button
                    onClick={onCreateFile}
                    className="w-full mt-2 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-[#003366] font-bold rounded-xl transition cursor-pointer"
                  >
                    Create New .json File
                  </button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="font-bold text-[#003366] flex items-center gap-1.5">
                    <i className="fa-solid fa-download text-[#007BFF]"></i>
                    <span>Download JSON Backup</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Export full system state (all 11 modules) as a standalone JSON backup file.
                  </p>
                  <button
                    onClick={onExportJson}
                    className="w-full mt-2 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-[#003366] font-bold rounded-xl transition cursor-pointer"
                  >
                    Download JSON Backup
                  </button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="font-bold text-[#003366] flex items-center gap-1.5">
                    <i className="fa-solid fa-upload text-[#007BFF]"></i>
                    <span>Restore JSON Backup</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Import a previously saved `.json` file to restore all application data.
                  </p>
                  <label className="w-full mt-2 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-[#003366] font-bold rounded-xl transition cursor-pointer text-center block">
                    Upload & Restore File
                    <input
                      type="file"
                      accept=".json"
                      onChange={onImportJson}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Verified Data Modules Saved in Storage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#003366] text-sm flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-check text-emerald-500"></i>
                    <span>Storage Modules Covered (11/11 Included in Persistent Engine)</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {storageModules.map((m) => (
                    <div
                      key={m.num}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-xs">{m.title}</div>
                        <div className="text-[11px] text-slate-500">{m.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'masterData' && (
            <div className="space-y-6">
              {/* Header description */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-[#003366] text-sm">
                    Master Data Setup — Persons In Charge (PICs) Directory
                  </h4>
                  <p className="text-slate-600 text-xs">
                    Define Full Name and Position for all Persons In Charge. These options populate PIC selectors across the Execution Roadmap and Reports.
                  </p>
                </div>
                <button
                  onClick={onResetPicsToDefault}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer whitespace-nowrap"
                >
                  Reset to Defaults
                </button>
              </div>

              {/* Add New PIC Form */}
              <form
                onSubmit={handleAddPicSubmit}
                className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3"
              >
                <div className="font-bold text-[#003366] text-xs flex items-center gap-1.5">
                  <i className="fa-solid fa-user-plus text-[#007BFF]"></i>
                  <span>Add New Person In Charge (PIC)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      placeholder="e.g. Maria Santos"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Title / Position
                    </label>
                    <input
                      type="text"
                      value={newPosition}
                      onChange={(e) => setNewPosition(e.target.value)}
                      placeholder="e.g. Senior Lease Admin Specialist"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={!newFullName.trim() || !newPosition.trim()}
                      className="w-full py-2 bg-[#003366] hover:bg-[#002244] disabled:bg-slate-300 text-white font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <i className="fa-solid fa-plus"></i>
                      <span>Add PIC</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Filter / Search Bar */}
              <div className="flex justify-between items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search PICs by name or position..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#007BFF]"
                  />
                </div>
                <span className="text-xs font-bold text-slate-500">
                  Total PICs: {masterPics.length}
                </span>
              </div>

              {/* Master List Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 text-[10px] uppercase font-black tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4 w-[35%]">Full Name</th>
                      <th className="py-3 px-4 w-[45%]">Title / Position</th>
                      <th className="py-3 px-4 w-[20%] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {filteredPics.map((pic) => (
                      <tr key={pic.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-2.5 px-4 font-bold text-[#003366]">
                          {editingPicId === pic.id ? (
                            <input
                              type="text"
                              value={editFullName}
                              onChange={(e) => setEditFullName(e.target.value)}
                              className="w-full px-2 py-1 border border-slate-300 rounded font-bold text-xs"
                            />
                          ) : (
                            pic.fullName
                          )}
                        </td>

                        <td className="py-2.5 px-4 text-slate-600">
                          {editingPicId === pic.id ? (
                            <input
                              type="text"
                              value={editPosition}
                              onChange={(e) => setEditPosition(e.target.value)}
                              className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            />
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-[#003366] font-semibold border border-blue-100">
                              {pic.position}
                            </span>
                          )}
                        </td>

                        <td className="py-2.5 px-4 text-center">
                          {editingPicId === pic.id ? (
                            <div className="flex justify-center gap-1.5">
                              <button
                                onClick={() => handleSaveEdit(pic.id)}
                                className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 cursor-pointer"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingPicId(null)}
                                className="px-2.5 py-1 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleStartEdit(pic)}
                                className="p-1.5 text-slate-500 hover:text-[#007BFF] hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                title="Edit PIC"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                onClick={() => onDeletePic(pic.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                title="Delete PIC"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}

                    {filteredPics.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-6 text-center text-slate-400 font-semibold italic">
                          No Person In Charge records found matching search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center flex-shrink-0 font-sans text-xs">
          <div className="text-slate-500 text-[11px] font-medium flex items-center gap-1.5">
            <i className="fa-solid fa-shield-halved text-[#007BFF]"></i>
            <span>System changes are automatically committed to local IndexedDB and synced file.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-xl transition cursor-pointer"
          >
            Done & Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
