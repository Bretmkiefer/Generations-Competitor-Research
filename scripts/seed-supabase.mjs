import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const envPath = path.resolve('.env.supabase');

async function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const raw = await readFile(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}

await loadEnvFile(envPath);

const projectId = process.env.SUPABASE_PROJECT_ID || process.env.VITE_SUPABASE_PROJECT_ID;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const seedDataFile = process.env.SEED_DATA_FILE || 'data/user-flow-maps-data-2026-06-22.json';

if (!projectId) {
  throw new Error('Missing SUPABASE_PROJECT_ID in .env.supabase.');
}

if (!serviceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in .env.supabase.');
}

const dataPath = path.resolve(seedDataFile);
const websites = JSON.parse(await readFile(dataPath, 'utf8'));

if (!Array.isArray(websites)) {
  throw new Error(`Seed data must be a JSON array. Received ${typeof websites}.`);
}

const response = await fetch(`https://${projectId}.supabase.co/rest/v1/kv_store_0d49d71e`, {
  method: 'POST',
  headers: {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates',
  },
  body: JSON.stringify({
    key: 'websites',
    value: websites,
    updated_at: new Date().toISOString(),
  }),
});

if (!response.ok) {
  const details = await response.text();
  throw new Error(`Supabase seed failed (${response.status}): ${details}`);
}

const screenshotCount = websites.reduce((sum, site) => sum + (Array.isArray(site.images) ? site.images.length : 0), 0);
console.log(`Seeded ${websites.length} websites and ${screenshotCount} screenshots into ${projectId}.`);
