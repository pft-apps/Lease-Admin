export interface MasterPIC {
  id: string;
  fullName: string;
  position: string;
}

export interface AppStorageState {
  version: string;
  lastSaved: string;
  startDate: string;
  totalWorkingDays: number;
  gates: any[];
  questions: any[];
  riskPoints: any[];
  combinedData: any[];
  officeData: any[];
  retailData: any[];
  dataRequests: any[];
  pillars: any[];
  masterPics: MasterPIC[];
  trackLeads: Record<string, string>;
}

const DB_NAME = 'LeaseAdminMigrationDB';
const DB_VERSION = 1;
const STORE_STATE = 'app_state';
const STORE_HANDLE = 'file_handles';

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_STATE)) {
        db.createObjectStore(STORE_STATE);
      }
      if (!db.objectStoreNames.contains(STORE_HANDLE)) {
        db.createObjectStore(STORE_HANDLE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveStateToIndexedDB(state: AppStorageState): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_STATE, 'readwrite');
    const store = tx.objectStore(STORE_STATE);
    store.put(state, 'current');
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Error saving to IndexedDB:', err);
  }
}

export async function loadStateFromIndexedDB(): Promise<AppStorageState | null> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_STATE, 'readonly');
    const store = tx.objectStore(STORE_STATE);
    const req = store.get('current');
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Error loading from IndexedDB:', err);
    return null;
  }
}

export async function saveFileHandleToIndexedDB(handle: FileSystemFileHandle): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_HANDLE, 'readwrite');
    const store = tx.objectStore(STORE_HANDLE);
    store.put(handle, 'linked_handle');
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Error saving file handle:', err);
  }
}

export async function getFileHandleFromIndexedDB(): Promise<FileSystemFileHandle | null> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_HANDLE, 'readonly');
    const store = tx.objectStore(STORE_HANDLE);
    const req = store.get('linked_handle');
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    return null;
  }
}

export async function removeFileHandleFromIndexedDB(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_HANDLE, 'readwrite');
    const store = tx.objectStore(STORE_HANDLE);
    store.delete('linked_handle');
  } catch (err) {
    console.error('Error removing file handle:', err);
  }
}
