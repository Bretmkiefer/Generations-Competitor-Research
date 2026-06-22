import { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { projectId } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d49d71e`;

const CATEGORIES: { label: string; platforms: string[] }[] = [
  {
    label: 'Category 1 — General Design',
    platforms: ['Canva', 'Adobe Firefly', 'AdCreative.ai'],
  },
  {
    label: 'Category 2 — AI Creative / Video',
    platforms: ['ChatGPT / GPT-4o', 'Midjourney v7', 'DALL-E 3', 'Stable Diffusion', 'DaVinci.ai', 'Runway ML', 'Kling AI'],
  },
  {
    label: 'Category 3 — Product Photography',
    platforms: ['Claid.ai', 'Nightjar', 'Flair.ai', 'Photoroom', 'Pebblely', 'Kive.ai'],
  },
];

function timeAgo(ms: number): string {
  const secs = Math.floor((Date.now() - ms) / 1000);
  if (secs < 60) return 'just now';
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

export function CostsDashboard() {
  const [pricing, setPricing] = useState<Record<string, string> | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (forceRefresh = false) => {
    forceRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      let res;
      if (forceRefresh) {
        res = await fetch(`${API_BASE}/costs/refresh`, { method: 'POST' });
      } else {
        res = await fetch(`${API_BASE}/costs`);
      }
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPricing(data.pricing);
      setFetchedAt(data.fetchedAt);
    } catch (e: any) {
      setError(e.message || 'Failed to load pricing data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fdf8f3' }}>
      {/* Sub-header */}
      <div style={{
        background: 'linear-gradient(135deg, hsl(30,48%,36%) 0%, hsl(30,45%,44%) 100%)',
        borderBottom: '1px solid hsl(30,50%,60%)',
        flexShrink: 0,
        padding: '10px 24px 12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
              Competitor Pricing
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>
              {fetchedAt ? `Last updated ${timeAgo(fetchedAt)} · refreshes every 24h` : 'Loading…'}
            </div>
          </div>
          <button
            onClick={() => load(true)}
            disabled={refreshing || loading}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.15)', color: '#fff',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              opacity: (refreshing || loading) ? 0.6 : 1,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <RefreshCw style={{ width: '12px', height: '12px', animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            {refreshing ? 'Refreshing…' : 'Refresh Now'}
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'hsl(30,20%,50%)' }}>
              <div style={{ fontSize: '14px' }}>Fetching current pricing from the web…</div>
              <div style={{ fontSize: '12px', marginTop: '8px', color: 'hsl(30,20%,65%)' }}>This may take up to 30 seconds on first load</div>
            </div>
          )}

          {error && !loading && (
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '24px', color: '#9f1239' }}>
              <strong>Could not load pricing data</strong>
              <p style={{ margin: '8px 0 0', fontSize: '13px' }}>{error}</p>
              {error.includes('TAVILY_API_KEY') && (
                <p style={{ margin: '8px 0 0', fontSize: '13px' }}>
                  Add the secret in your Supabase dashboard: <strong>Project Settings → Edge Functions → Secrets → Add TAVILY_API_KEY</strong>
                </p>
              )}
            </div>
          )}

          {pricing && !loading && CATEGORIES.map((cat) => (
            <div key={cat.label} style={{ marginBottom: '28px' }}>
              <h3 style={{
                fontSize: '13px', fontWeight: 700, color: 'hsl(30,40%,40%)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                marginBottom: '12px', paddingBottom: '6px',
                borderBottom: '1px solid hsl(30,40%,85%)',
              }}>
                {cat.label}
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {cat.platforms.map((name) => (
                  <div key={name} style={{
                    background: '#fff',
                    border: '1px solid hsl(30,40%,85%)',
                    borderRadius: '12px',
                    padding: '18px 20px',
                  }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '8px' }}>
                      {name}
                    </div>
                    <p style={{ fontSize: '13px', color: 'hsl(30,15%,38%)', lineHeight: '1.65', margin: 0 }}>
                      {pricing[name] || 'No pricing data available.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
