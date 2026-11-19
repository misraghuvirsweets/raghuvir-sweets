/**
 * Data service layer.
 * ------------------------------------------------------------
 * Every read/write of website data goes through this file.
 * Today it uses the browser's LocalStorage. To move to Firebase,
 * Supabase or your own PHP/Node API, re-implement `loadData` and
 * `saveData` (keeping the same signatures) — no UI code changes.
 */
import { defaultData as seedData } from '../data/defaultData.js';
import published from '../data/site-data.json';

// If you paste an exported backup into src/data/site-data.json and redeploy,
// that becomes the data every visitor sees. Otherwise the seed data is used.
const defaultData = published && Array.isArray(published.products) ? published : seedData;

const STORAGE_KEY = 'raghuvir_site_data_v1';

const clone = (o) => JSON.parse(JSON.stringify(o));

export async function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(defaultData);
    const parsed = JSON.parse(raw);
    // Merge so newly-added settings keys get defaults.
    return {
      ...clone(defaultData),
      ...parsed,
      settings: { ...defaultData.settings, ...(parsed.settings || {}) },
    };
  } catch {
    return clone(defaultData);
  }
}

export async function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { ok: true };
  } catch (e) {
    // Usually quota exceeded because of too many large images.
    return { ok: false, error: 'Storage is full. Use smaller images or image URLs, then export a backup.' };
  }
}

export async function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return clone(defaultData);
}

export function exportData(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `raghuvir-website-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseImport(text) {
  const data = JSON.parse(text);
  if (!data || !Array.isArray(data.products) || !Array.isArray(data.offers) || !data.settings) {
    throw new Error('This file is not a valid Raghuvir website backup.');
  }
  return data;
}

export function storageUsageKB() {
  const raw = localStorage.getItem(STORAGE_KEY) || '';
  return Math.round((raw.length * 2) / 1024);
}

export const uid = (p = 'id') => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
