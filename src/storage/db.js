/**
 * Simple IndexedDB wrapper for progress and family attempts.
 * Counts unique families, not raw questions.
 */
const DB_NAME = 'k53-clear';
const STORE = 'progress';

export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'familyId' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function recordFamilyAttempt(familyId, section, correct) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    const get = store.get(familyId);
    get.onsuccess = () => {
      const existing = get.result || { familyId, section, attempts: 0, correct: 0, lastResult: null };
      existing.attempts += 1;
      if (correct) existing.correct += 1;
      existing.lastResult = correct ? 'correct' : 'incorrect';
      existing.lastSeen = new Date().toISOString();
      store.put(existing);
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getUniqueFamilies(section) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const req = store.getAll();
    req.onsuccess = () => {
      const all = req.result || [];
      const unique = new Set(all.filter(r => r.section === section).map(r => r.familyId));
      resolve(unique.size);
    };
    req.onerror = () => reject(req.error);
  });
}
