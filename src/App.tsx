import React, { useState, useEffect, useRef } from 'react';
import {
  initialGates,
  combinedGanttPhases,
  officeGanttPhases,
  retailGanttPhases,
  strategicQuestions as initialStrategicQuestions,
  riskDataPoints as initialRiskPoints,
  assessmentPillars as initialAssessmentPillars,
  initialMasterPics,
} from './data/mockData';
import { AuditGate, GanttPhase, StrategicQuestion, RiskPoint, AssessmentPillar } from './types';
import {
  MasterPIC,
  AppStorageState,
  saveStateToIndexedDB,
  loadStateFromIndexedDB,
  saveFileHandleToIndexedDB,
  getFileHandleFromIndexedDB,
  removeFileHandleFromIndexedDB,
} from './utils/db';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { SectionTabBar } from './components/SectionTabBar';
import { KpiCards } from './components/KpiCards';
import { PortfolioBreakdown } from './components/PortfolioBreakdown';
import { ExecutionRoadmap } from './components/ExecutionRoadmap';
import { PillarsGrid } from './components/PillarsGrid';
import { RiskMatrixChart } from './components/RiskMatrixChart';
import { AuditScorecard } from './components/AuditScorecard';
import { StrategicQuestions } from './components/StrategicQuestions';
import { GateDetailModal } from './components/GateDetailModal';
import { ReportExportModal } from './components/ReportExportModal';
import { RoadmapReportModal } from './components/RoadmapReportModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [gates, setGates] = useState<AuditGate[]>(initialGates);
  const [editingGate, setEditingGate] = useState<AuditGate | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isRoadmapReportModalOpen, setIsRoadmapReportModalOpen] = useState<boolean>(false);

  // Edit Mode state & Admin Authentication Modal state
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);

  const handleToggleEditMode = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  // Strategic Questions & Risk Points state
  const [questions, setQuestions] = useState<StrategicQuestion[]>(initialStrategicQuestions);
  const [riskPoints, setRiskPoints] = useState<RiskPoint[]>(initialRiskPoints);

  // Assessment Window Start Date & Duration (Working Days Mon-Fri)
  const [startDate, setStartDate] = useState<string>('2026-07-20');
  const [totalWorkingDays, setTotalWorkingDays] = useState<number>(30);

  // Shared Roadmap Gantt Datasets
  const [combinedData, setCombinedData] = useState<GanttPhase[]>(combinedGanttPhases);
  const [officeData, setOfficeData] = useState<GanttPhase[]>(officeGanttPhases);
  const [retailData, setRetailData] = useState<GanttPhase[]>(retailGanttPhases);

  // Assessment Pillars State
  const [pillars, setPillars] = useState<AssessmentPillar[]>(() =>
    initialAssessmentPillars.map((p) => ({
      ...p,
      items:
        p.items ||
        p.keyFocusAreas.map((area, idx) => ({
          id: `${p.number}-${idx}`,
          title: area,
          completed: true,
          remarks: '',
        })),
    }))
  );

  // Master Data PICs
  const [masterPics, setMasterPics] = useState<MasterPIC[]>(initialMasterPics);

  // Active Section Tab State ('all' | 'overview' | 'risk-map' | 'roadmap' | 'pillars' | 'scorecard' | 'strategic-questions' | 'settings')
  const [activeTab, setActiveTab] = useState<string>('all');

  const handleSelectTab = (tabId: string) => {
    if (tabId === 'settings') {
      handleOpenSettingsClick();
      return;
    }
    setActiveTab(tabId);
    setTimeout(() => {
      const tabElement = document.getElementById('section-tabs');
      if (tabElement) {
        tabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Track Leads
  const [trackLeads, setTrackLeads] = useState<Record<string, string>>({
    'track-a': 'Cely B. Atas',
    'track-b': 'Erickson T. Serrano / FBSC Hub',
  });

  // Admin Auth & Settings State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Storage State
  const [linkedFileName, setLinkedFileName] = useState<string | null>(null);
  const [linkedFileHandle, setLinkedFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'linked' | 'local' | 'saving'>('local');
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Web Worker Ref
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    try {
      const worker = new Worker(new URL('./workers/storageWorker.ts', import.meta.url), {
        type: 'module',
      });
      worker.onmessage = (event) => {
        const { type, success, error } = event.data;
        if (type === 'SAVE_PROCESSED') {
          if (success) {
            setLastSavedTime(
              new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })
            );
            setSyncStatus('synced');
          } else {
            console.error('Worker save error:', error);
          }
        }
      };
      workerRef.current = worker;
    } catch (e) {
      console.warn('Web Workers not available or blocked in this environment', e);
    }

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Power Automate HTTP Webhooks Configuration
  const POWER_AUTOMATE_READ_URL = "https://defaultcdb710b6704140938e6f80ac01d6c6.5a.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/10/workflows/0455504f0a4b407981a62197b0fce827/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VWyfTVQwBD5eYrCjXrvyVK8gneYkp0LGKY6vkEEQeCY";
  const POWER_AUTOMATE_SAVE_URL = "https://defaultcdb710b6704140938e6f80ac01d6c6.5a.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/12/workflows/653d135a1c5147a39ace756caa77d6af/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ITb4fk47jSNinEScwKMn3Pb4x-XGwBp3YZm0kKPF07s";

  const updateAppState = (data: Partial<AppStorageState>) => {
    if (!data) return;
    if (data.startDate) setStartDate(data.startDate);
    if (data.totalWorkingDays) setTotalWorkingDays(data.totalWorkingDays);
    if (data.gates && Array.isArray(data.gates)) setGates(data.gates);
    if (data.questions && Array.isArray(data.questions)) setQuestions(data.questions);
    if (data.riskPoints && Array.isArray(data.riskPoints)) setRiskPoints(data.riskPoints);
    if (data.combinedData && Array.isArray(data.combinedData)) setCombinedData(data.combinedData);
    if (data.officeData && Array.isArray(data.officeData)) setOfficeData(data.officeData);
    if (data.retailData && Array.isArray(data.retailData)) setRetailData(data.retailData);
    if (data.pillars && Array.isArray(data.pillars)) setPillars(data.pillars);
    if (data.masterPics && Array.isArray(data.masterPics)) setMasterPics(data.masterPics);
    if (data.trackLeads) setTrackLeads(data.trackLeads);
    if (data.lastSaved) setLastSavedTime(data.lastSaved);
  };

  async function fetchLatestData() {
    setSyncStatus('saving');
    // Step A: Load from IndexedDB local cache first so UI opens instantly
    const cachedData = await loadStateFromIndexedDB();
    if (cachedData) {
      updateAppState(cachedData);
    }

    // Step B: Fetch fresh payload from Power Automate Read Flow in background
    try {
      let response: Response | null = null;
      try {
        response = await fetch(POWER_AUTOMATE_READ_URL, {
          method: "GET",
          headers: { "Accept": "application/json" }
        });
      } catch (getErr) {
        console.warn("GET request to Power Automate read webhook failed, trying POST fallback...", getErr);
      }

      // Fallback to POST if GET is not allowed or returns an error status (e.g. 405 Method Not Allowed)
      if (!response || !response.ok) {
        try {
          response = await fetch(POWER_AUTOMATE_READ_URL, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({})
          });
        } catch (postErr) {
          console.warn("POST request to Power Automate read webhook failed:", postErr);
        }
      }

      if (!response || !response.ok) {
        console.warn(`Read webhook unavailable or returned error status: ${response ? response.status : 'No response'}`);
        setSyncStatus('local');
        return;
      }

      const rawData = await response.json();
      
      // Parse payload considering possible stringified JSON or wrapped body structures from Power Automate
      let freshData: any = rawData;
      if (typeof freshData === 'string') {
        try { freshData = JSON.parse(freshData); } catch (e) { /* ignore */ }
      }
      if (typeof freshData === 'string') {
        try { freshData = JSON.parse(freshData); } catch (e) { /* ignore */ }
      }
      if (freshData && typeof freshData === 'object') {
        if (freshData.body && typeof freshData.body === 'object') {
          freshData = freshData.body;
        } else if (freshData.body && typeof freshData.body === 'string') {
          try { freshData = JSON.parse(freshData.body); } catch (e) { /* ignore */ }
        } else if (freshData.d && typeof freshData.d === 'object') {
          freshData = freshData.d;
        } else if (freshData.value && typeof freshData.value === 'object' && !Array.isArray(freshData.value)) {
          freshData = freshData.value;
        }
      }

      // Save fresh data to IndexedDB and update app state
      if (freshData && typeof freshData === 'object') {
        await saveStateToIndexedDB(freshData);
        updateAppState(freshData);
        setSyncStatus('synced');
        setLinkedFileName('Power Automate Webhook (SharePoint)');
        showToast('Refreshed latest data from Power Automate!');
      } else {
        console.warn("Read webhook returned empty or non-object payload format");
        setSyncStatus('local');
      }
    } catch (error) {
      console.warn("Background data fetch notice (using local IndexedDB cache):", error);
      setSyncStatus('local');
      // App gracefully keeps using cached IndexedDB data
    }
  }

  const handleUpdateStartDate = async (newDate: string) => {
    setStartDate(newDate);
    const updatedState: AppStorageState = {
      version: '2.5',
      lastSaved: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      startDate: newDate,
      totalWorkingDays,
      gates,
      questions,
      riskPoints,
      combinedData,
      officeData,
      retailData,
      pillars,
      masterPics,
      trackLeads,
    };
    await saveStateToIndexedDB(updatedState);
    showToast(`Assessment Window Start Date updated to ${newDate} and saved!`);

    // Post background save to Power Automate
    try {
      await fetch(POWER_AUTOMATE_SAVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedState),
      });
    } catch (e) {
      console.warn("Save webhook error", e);
    } finally {
      // 10-second delay before pulling fresh data to allow backend processing to complete
      await new Promise((resolve) => setTimeout(resolve, 10000));
      await fetchLatestData();
    }
  };

  const handleUpdateTotalWorkingDays = async (newDays: number) => {
    setTotalWorkingDays(newDays);
    const updatedState: AppStorageState = {
      version: '2.5',
      lastSaved: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      startDate,
      totalWorkingDays: newDays,
      gates,
      questions,
      riskPoints,
      combinedData,
      officeData,
      retailData,
      pillars,
      masterPics,
      trackLeads,
    };
    await saveStateToIndexedDB(updatedState);
    showToast(`Assessment Window Duration updated to ${newDays} Working Days and saved!`);

    // Post background save to Power Automate
    try {
      await fetch(POWER_AUTOMATE_SAVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedState),
      });
    } catch (e) {
      console.warn("Save webhook error", e);
    } finally {
      // 10-second delay before pulling fresh data to allow backend processing to complete
      await new Promise((resolve) => setTimeout(resolve, 10000));
      await fetchLatestData();
    }
  };

  // Load initial state on startup, on tab focus, and automatically every 15 minutes
  useEffect(() => {
    // 1. Initial load / open trigger
    fetchLatestData();

    // 2. Automatic Data Refresh every 15 minutes (900,000 ms)
    const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
    const intervalId = setInterval(() => {
      fetchLatestData();
    }, FIFTEEN_MINUTES_MS);

    // 3. Trigger refresh when user opens or switches back to the tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchLatestData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Save & Commit State to IndexedDB & Power Automate Save Webhook
  const handleSaveAndCommit = async (overrideState?: Partial<AppStorageState>) => {
    setSyncStatus('saving');
    const stateToSave: AppStorageState = {
      version: '2.5',
      lastSaved: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      startDate,
      totalWorkingDays,
      gates,
      questions,
      riskPoints,
      combinedData,
      officeData,
      retailData,
      pillars,
      masterPics,
      trackLeads,
      ...overrideState,
    };

    // 1. Save to local IndexedDB cache first
    await saveStateToIndexedDB(stateToSave);

    // 2. Post to Web Worker for background processing
    if (workerRef.current) {
      workerRef.current.postMessage({
        action: 'PROCESS_SAVE',
        payload: stateToSave,
      });
    }

    // 3. Write to Linked File Handle if present
    if (linkedFileHandle) {
      try {
        const jsonString = JSON.stringify(stateToSave, null, 2);
        const writable = await (linkedFileHandle as any).createWritable();
        await writable.write(jsonString);
        await writable.close();
      } catch (err) {
        console.warn('Could not write directly to file handle:', err);
      }
    }

    // 4. Send HTTP POST request to Power Automate Save Webhook
    try {
      const response = await fetch(POWER_AUTOMATE_SAVE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stateToSave),
      });

      if (!response.ok) {
        throw new Error(`Save webhook returned error status: ${response.status}`);
      }

      // On successful save, update local IndexedDB cache and show success alert
      await saveStateToIndexedDB(stateToSave);
      setSyncStatus('synced');
      setLastSavedTime(stateToSave.lastSaved);

      const alertMsg = "Data successfully saved and published live to SharePoint!";
      showToast(alertMsg);
      alert(alertMsg);
    } catch (error) {
      console.warn("Save webhook fetch notice (data safely saved to local IndexedDB):", error);
      setSyncStatus('local');
      showToast("Data saved to local IndexedDB cache.");
    } finally {
      // Always run the Data Pulling Logic after a 10-second delay following Data Saving Logic
      await new Promise((resolve) => setTimeout(resolve, 10000));
      await fetchLatestData();
    }
  };

  const triggerFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const fakeEvent = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleImportJson(fakeEvent);
      }
    };
    input.click();
  };

  const handleLinkFile = async () => {
    if (typeof (window as any).showOpenFilePicker !== 'function') {
      triggerFileInput();
      return;
    }

    try {
      const [handle] = await (window as any).showOpenFilePicker({
        types: [{ description: 'JSON Storage File', accept: { 'application/json': ['.json'] } }],
        multiple: false,
      });

      if (!handle) return;

      const file = await handle.getFile();
      const content = await file.text();

      if (content.trim()) {
        try {
          const parsed: AppStorageState = JSON.parse(content);
          if (parsed.startDate) setStartDate(parsed.startDate);
          if (parsed.totalWorkingDays) setTotalWorkingDays(parsed.totalWorkingDays);
          if (parsed.gates && Array.isArray(parsed.gates)) setGates(parsed.gates);
          if (parsed.questions && Array.isArray(parsed.questions)) setQuestions(parsed.questions);
          if (parsed.riskPoints && Array.isArray(parsed.riskPoints)) setRiskPoints(parsed.riskPoints);
          if (parsed.combinedData && Array.isArray(parsed.combinedData)) setCombinedData(parsed.combinedData);
          if (parsed.officeData && Array.isArray(parsed.officeData)) setOfficeData(parsed.officeData);
          if (parsed.retailData && Array.isArray(parsed.retailData)) setRetailData(parsed.retailData);
          if (parsed.pillars && Array.isArray(parsed.pillars)) setPillars(parsed.pillars);
          if (parsed.masterPics && Array.isArray(parsed.masterPics)) setMasterPics(parsed.masterPics);
          if (parsed.trackLeads) setTrackLeads(parsed.trackLeads);
          showToast(`Successfully linked & loaded storage file: ${handle.name}`);
        } catch (e) {
          showToast('Linked file, but contents could not be parsed as valid JSON.');
        }
      }

      setLinkedFileHandle(handle);
      setLinkedFileName(handle.name);
      setSyncStatus('linked');
      await saveFileHandleToIndexedDB(handle);
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      // Fallback to standard file input selection if File Access API is restricted in iframe
      triggerFileInput();
    }
  };

  const handleCreateFile = async () => {
    const stateToSave: AppStorageState = {
      version: '2.5',
      lastSaved: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      startDate,
      totalWorkingDays,
      gates,
      questions,
      riskPoints,
      combinedData,
      officeData,
      retailData,
      pillars,
      masterPics,
      trackLeads,
    };

    // Save state to IndexedDB local cache immediately
    await saveStateToIndexedDB(stateToSave);

    if (typeof (window as any).showSaveFilePicker !== 'function') {
      handleExportJson();
      showToast('Exported JSON backup & saved data to local database.');
      return;
    }

    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: 'Horizon_Scheduler_Data.json',
        types: [{ description: 'JSON Storage File', accept: { 'application/json': ['.json'] } }],
      });

      if (!handle) return;

      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(stateToSave, null, 2));
      await writable.close();

      setLinkedFileHandle(handle);
      setLinkedFileName(handle.name);
      setSyncStatus('synced');
      await saveFileHandleToIndexedDB(handle);

      showToast(`Created & Linked new storage file: ${handle.name}`);
    } catch (err: any) {
      if (err?.name === 'AbortError') return;

      // Handle cross-origin subframes or permission issues gracefully by falling back to Blob download
      handleExportJson();
      showToast('Exported JSON backup file & saved data to local database.');
    }
  };

  const handleDisconnectFile = async () => {
    await removeFileHandleFromIndexedDB();
    setLinkedFileHandle(null);
    setLinkedFileName(null);
    setSyncStatus('local');
    showToast('Disconnected storage file link.');
  };

  const handleExportJson = () => {
    const stateToSave: AppStorageState = {
      version: '2.5',
      lastSaved: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      startDate,
      totalWorkingDays,
      gates,
      questions,
      riskPoints,
      combinedData,
      officeData,
      retailData,
      pillars,
      masterPics,
      trackLeads,
    };

    const jsonString = JSON.stringify(stateToSave, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Horizon_Lease_Admin_Migration_Data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded full state backup JSON file.');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const parsed: AppStorageState = JSON.parse(text);

        if (parsed.startDate) setStartDate(parsed.startDate);
        if (parsed.totalWorkingDays) setTotalWorkingDays(parsed.totalWorkingDays);
        if (parsed.gates && Array.isArray(parsed.gates)) setGates(parsed.gates);
        if (parsed.questions && Array.isArray(parsed.questions)) setQuestions(parsed.questions);
        if (parsed.riskPoints && Array.isArray(parsed.riskPoints)) setRiskPoints(parsed.riskPoints);
        if (parsed.combinedData && Array.isArray(parsed.combinedData)) setCombinedData(parsed.combinedData);
        if (parsed.officeData && Array.isArray(parsed.officeData)) setOfficeData(parsed.officeData);
        if (parsed.retailData && Array.isArray(parsed.retailData)) setRetailData(parsed.retailData);
        if (parsed.pillars && Array.isArray(parsed.pillars)) setPillars(parsed.pillars);
        if (parsed.masterPics && Array.isArray(parsed.masterPics)) setMasterPics(parsed.masterPics);
        if (parsed.trackLeads) setTrackLeads(parsed.trackLeads);

        await saveStateToIndexedDB(parsed);
        showToast('Successfully imported & restored JSON database backup!');
      } catch (err) {
        showToast('Failed to parse uploaded JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // PIC Master Data Actions
  const handleAddPic = (fullName: string, position: string) => {
    const newPic: MasterPIC = {
      id: `pic-${Date.now()}`,
      fullName,
      position,
    };
    setMasterPics((prev) => [...prev, newPic]);
    showToast(`Added Person In Charge: ${fullName}`);
  };

  const handleUpdatePic = (id: string, fullName: string, position: string) => {
    setMasterPics((prev) =>
      prev.map((p) => (p.id === id ? { ...p, fullName, position } : p))
    );
    showToast('Updated Person In Charge record.');
  };

  const handleDeletePic = (id: string) => {
    setMasterPics((prev) => prev.filter((p) => p.id !== id));
    showToast('Deleted Person In Charge record.');
  };

  const handleResetPicsToDefault = () => {
    setMasterPics(initialMasterPics);
    showToast('Reset Persons In Charge to default list.');
  };

  const handleOpenSettingsClick = () => {
    if (isAdminAuthenticated) {
      setIsSettingsOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginOpen(false);
    setIsSettingsOpen(true);
    showToast('Authenticated as Admin successfully!');
  };

  const handleToggleGate = (id: string) => {
    setGates((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const handleSetAllGates = (completed: boolean) => {
    setGates((prev) => prev.map((g) => ({ ...g, completed })));
  };

  const handleSaveGate = (updatedGate: AuditGate) => {
    const updatedGates = gates.map((g) => (g.id === updatedGate.id ? updatedGate : g));
    setGates(updatedGates);
    handleSaveAndCommit({ gates: updatedGates });
  };

  const handleSaveQuestion = (updatedQuestion: StrategicQuestion) => {
    const updatedQuestions = questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q));
    setQuestions(updatedQuestions);
    handleSaveAndCommit({ questions: updatedQuestions });
  };

  const handleSaveRiskPoint = (updatedRiskPoint: RiskPoint) => {
    const updatedRiskPoints = riskPoints.map((r) => (r.id === updatedRiskPoint.id ? updatedRiskPoint : r));
    setRiskPoints(updatedRiskPoints);
    handleSaveAndCommit({ riskPoints: updatedRiskPoints });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003366] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-[#00C4E7]/40 flex items-center gap-2.5 animate-bounce">
          <i className="fa-solid fa-circle-check text-[#00C4E7] text-base"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Top Bar */}
      <Navbar
        gates={gates}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenRoadmapReportModal={() => setIsRoadmapReportModalOpen(true)}
        onOpenSettings={handleOpenSettingsClick}
        onSync={fetchLatestData}
        syncStatus={syncStatus}
        isLinked={!!linkedFileHandle}
        isEditMode={isEditMode}
        onToggleEditMode={handleToggleEditMode}
      />

      {/* Main Content Sections */}
      <HeroHeader
        startDate={startDate}
        onUpdateStartDate={handleUpdateStartDate}
        totalWorkingDays={totalWorkingDays}
        onUpdateTotalWorkingDays={handleUpdateTotalWorkingDays}
        onSaveAndCommit={handleSaveAndCommit}
        isEditMode={isEditMode}
      />

      <main className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 py-8 space-y-12">
        {/* Module View Tabs (Placed directly before KPIs) */}
        <SectionTabBar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          completedGatesCount={gates.filter((g) => g.completed).length}
          totalGatesCount={gates.length}
        />

        {/* Overview & Portfolio Scope */}
        {(activeTab === 'all' || activeTab === 'overview') && (
          <div className="space-y-12 animate-fadeIn">
            {/* Top Metric Cards */}
            <KpiCards />

            {/* Portfolio Breakdown */}
            <PortfolioBreakdown />
          </div>
        )}

        {/* Risk & Operational Complexity Plot */}
        {(activeTab === 'all' || activeTab === 'risk-map') && (
          <div className="animate-fadeIn">
            <RiskMatrixChart
              riskPoints={riskPoints}
              onSaveRiskPoint={handleSaveRiskPoint}
              isEditMode={isEditMode}
            />
          </div>
        )}

        {/* 30-Day Execution Roadmap Timeline */}
        {(activeTab === 'all' || activeTab === 'roadmap') && (
          <div className="animate-fadeIn">
            <ExecutionRoadmap
              combinedData={combinedData}
              setCombinedData={setCombinedData}
              officeData={officeData}
              setOfficeData={setOfficeData}
              retailData={retailData}
              setRetailData={setRetailData}
              masterPics={masterPics}
              trackLeads={trackLeads}
              setTrackLeads={setTrackLeads}
              onOpenRoadmapReport={() => setIsRoadmapReportModalOpen(true)}
              startDate={startDate}
              onUpdateStartDate={handleUpdateStartDate}
              totalWorkingDays={totalWorkingDays}
              onUpdateTotalWorkingDays={handleUpdateTotalWorkingDays}
              onSaveAndCommit={handleSaveAndCommit}
              isEditMode={isEditMode}
            />
          </div>
        )}

        {/* 5 Assessment Pillars */}
        {(activeTab === 'all' || activeTab === 'pillars') && (
          <div className="animate-fadeIn">
            <PillarsGrid
              pillars={pillars}
              setPillars={setPillars}
              onSaveAndCommit={handleSaveAndCommit}
              isEditMode={isEditMode}
            />
          </div>
        )}

        {/* Interactive Gate Calculator Scorecard */}
        {(activeTab === 'all' || activeTab === 'scorecard') && (
          <div className="animate-fadeIn">
            <AuditScorecard
              gates={gates}
              onToggleGate={handleToggleGate}
              onSetAllGates={handleSetAllGates}
              onSelectGateForEdit={(gate) => setEditingGate(gate)}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onSaveAndCommit={handleSaveAndCommit}
              isEditMode={isEditMode}
            />
          </div>
        )}

        {/* Strategic Questions Resolved */}
        {(activeTab === 'all' || activeTab === 'strategic-questions') && (
          <div className="animate-fadeIn">
            <StrategicQuestions
              questions={questions}
              onSaveQuestion={handleSaveQuestion}
              onSaveAndCommit={handleSaveAndCommit}
              isEditMode={isEditMode}
            />
          </div>
        )}
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Gate Detail & Notes Modal */}
      <GateDetailModal
        gate={editingGate}
        onClose={() => setEditingGate(null)}
        onSaveGate={handleSaveGate}
      />

      {/* Full Assessment Report Export / Print Modal */}
      <ReportExportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        gates={gates}
        onOpenRoadmapReportModal={() => setIsRoadmapReportModalOpen(true)}
      />

      {/* Printable Executive Roadmap & Dual Gantt Report Modal */}
      <RoadmapReportModal
        isOpen={isRoadmapReportModalOpen}
        onClose={() => setIsRoadmapReportModalOpen(false)}
        combinedData={combinedData}
        setCombinedData={setCombinedData}
        officeData={officeData}
        setOfficeData={setOfficeData}
        retailData={retailData}
        setRetailData={setRetailData}
        gates={gates}
        startDate={startDate}
        onUpdateStartDate={setStartDate}
        totalWorkingDays={totalWorkingDays}
        onUpdateTotalWorkingDays={setTotalWorkingDays}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Admin Authentication Modal for Edit Mode */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={() => {
          setIsEditMode(true);
          setIsAdminAuthModalOpen(false);
          setToastMessage('Edit Mode Activated successfully');
          setTimeout(() => setToastMessage(null), 3000);
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        linkedFileName={linkedFileName}
        syncStatus={syncStatus}
        lastSavedTime={lastSavedTime}
        onSaveAndCommit={handleSaveAndCommit}
        onLinkFile={handleLinkFile}
        onCreateFile={handleCreateFile}
        onDisconnectFile={handleDisconnectFile}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onFetchSharePoint={fetchLatestData}
        masterPics={masterPics}
        onAddPic={handleAddPic}
        onUpdatePic={handleUpdatePic}
        onDeletePic={handleDeletePic}
        onResetPicsToDefault={handleResetPicsToDefault}
      />
    </div>
  );
}
