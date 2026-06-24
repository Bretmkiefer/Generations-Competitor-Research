import { useState, useEffect } from 'react';
import { Pencil, Save, X, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d49d71e`;

const T = {
  bg: '#fdf8f3',
  card: '#fff',
  border: 'hsl(30,40%,85%)',
  heading: 'hsl(30,40%,22%)',
  sub: 'hsl(30,20%,45%)',
  accent: 'hsl(30,60%,42%)',
  accentBg: 'hsl(30,60%,96%)',
  pill: 'hsl(30,50%,90%)',
  pillText: 'hsl(30,40%,30%)',
  deprecatedBg: 'hsl(0,60%,97%)',
  deprecatedBorder: 'hsl(0,60%,85%)',
  deprecatedText: 'hsl(0,50%,40%)',
  batchBg: 'hsl(150,40%,96%)',
  batchBorder: 'hsl(150,40%,80%)',
  batchText: 'hsl(150,40%,30%)',
  editBg: 'hsl(210,60%,97%)',
  editBorder: 'hsl(210,60%,80%)',
  editText: 'hsl(210,50%,35%)',
};

export interface ResolutionRow {
  res: string;
  price: string;
  batch?: string;
}

export interface ModelCard {
  name: string;
  provider: string;
  tagline: string;
  deprecated?: string;
  rows: ResolutionRow[];
  inputTokens?: string;
  outputTokens?: string;
}

const DEFAULT_MODELS: ModelCard[] = [
  {
    name: 'GPT-Image-2',
    provider: 'OpenAI',
    tagline: 'State-of-the-art token-metered image generation',
    inputTokens: 'Image $8 / 1M; Text $5 / 1M',
    outputTokens: 'Image $30 / 1M tokens',
    rows: [
      { res: 'Token-metered generation', price: 'Varies by size' },
      { res: 'Batch API', price: '50% off', batch: 'Inputs + outputs' },
    ],
  },
  {
    name: 'Gemini 3.1 Flash Image',
    provider: 'Google',
    tagline: 'Fast multi-resolution output',
    inputTokens: '$0.50 / 1M tokens',
    outputTokens: '$60 / 1M tokens',
    rows: [
      { res: '512 × 512',   price: '$0.045', batch: '$0.022' },
      { res: '1024 × 1024', price: '$0.067', batch: '$0.034' },
      { res: '2048 × 2048', price: '$0.101', batch: '$0.050' },
      { res: '4096 × 4096', price: '$0.151', batch: '$0.076' },
    ],
  },
  {
    name: 'Gemini 3 Pro Image',
    provider: 'Google',
    tagline: 'High-quality professional output',
    inputTokens: '$2.00 / 1M tokens',
    outputTokens: '$120 / 1M tokens',
    rows: [
      { res: 'Up to 1024 × 1024', price: '$0.039', batch: '$0.020' },
      { res: '1024 – 2048',       price: '$0.134', batch: '$0.067' },
      { res: '4096 × 4096',       price: '$0.240', batch: '$0.120' },
    ],
  },
  {
    name: 'Gemini 2.5 Flash Image',
    provider: 'Google',
    tagline: 'Budget-friendly generation',
    inputTokens: '$0.30 / 1M tokens',
    rows: [
      { res: 'Standard', price: '$0.039', batch: '$0.020' },
      { res: 'Priority',  price: '$0.070' },
    ],
  },
  {
    name: 'Imagen 4 Fast',
    provider: 'Google',
    tagline: 'Quickest Imagen option',
    deprecated: 'Shutting down Aug 17, 2026',
    rows: [{ res: 'Standard', price: '$0.020' }],
  },
  {
    name: 'Imagen 4 Standard',
    provider: 'Google',
    tagline: 'Balanced quality & speed',
    deprecated: 'Shutting down Aug 17, 2026',
    rows: [{ res: 'Standard', price: '$0.040' }],
  },
  {
    name: 'Imagen 4 Ultra',
    provider: 'Google',
    tagline: 'Highest Imagen quality',
    deprecated: 'Shutting down Aug 17, 2026',
    rows: [{ res: 'Standard', price: '$0.060' }],
  },
  {
    name: 'FLUX.2 [klein] 4B',
    provider: 'Black Forest Labs',
    tagline: 'Lowest-cost FLUX.2 endpoint for high-volume work',
    rows: [
      { res: 'Text to image', price: 'From $0.014' },
      { res: 'Image editing', price: 'From $0.014' },
    ],
  },
  {
    name: 'FLUX.2 [pro]',
    provider: 'Black Forest Labs',
    tagline: 'Production-grade text-to-image and editing',
    rows: [
      { res: 'Text to image', price: 'From $0.030' },
      { res: 'Image editing', price: 'From $0.045' },
    ],
  },
  {
    name: 'FLUX.2 [max]',
    provider: 'Black Forest Labs',
    tagline: 'Highest-quality FLUX.2 model',
    rows: [
      { res: 'Text to image', price: 'From $0.070' },
      { res: 'Image editing', price: 'From $0.070' },
    ],
  },
  {
    name: 'Ideogram 4.0',
    provider: 'Ideogram',
    tagline: 'Strong typography and design-layout generation',
    rows: [
      { res: 'Turbo', price: '$0.030' },
      { res: 'Default', price: '$0.060' },
      { res: 'Quality', price: '$0.100' },
    ],
  },
  {
    name: 'Ideogram 4.0 Custom',
    provider: 'Ideogram',
    tagline: 'Custom model inference after brand/model training',
    rows: [
      { res: 'Training run', price: '$40.00' },
      { res: 'Custom Turbo', price: '$0.060' },
      { res: 'Custom Default', price: '$0.120' },
      { res: 'Custom Quality', price: '$0.200' },
    ],
  },
  {
    name: 'Midjourney',
    provider: 'Midjourney',
    tagline: 'Subscription model; no per-image API pricing',
    rows: [
      { res: 'Basic plan', price: '$10/mo' },
      { res: 'Standard plan', price: '$30/mo' },
      { res: 'Pro plan', price: '$60/mo' },
      { res: 'Mega plan', price: '$120/mo' },
      { res: 'Extra GPU time', price: '$4/hr' },
    ],
  },
  {
    name: 'Recraft',
    provider: 'Recraft',
    tagline: 'Credit-based designer image suite with API access',
    rows: [
      { res: 'Generate / modify', price: '1-2 credits' },
      { res: 'Creative Upscale', price: '20 credits' },
      { res: 'API access', price: 'Credit-based' },
    ],
  },
];

function mergeModelLists(defaults: ModelCard[], saved: ModelCard[]) {
  const savedKeys = new Set(saved.map(model => `${model.provider}::${model.name}`));
  return [
    ...saved,
    ...defaults.filter(model => !savedKeys.has(`${model.provider}::${model.name}`)),
  ];
}

function groupByProvider(models: ModelCard[]) {
  return models.reduce<Record<string, ModelCard[]>>((groups, model) => {
    groups[model.provider] ??= [];
    groups[model.provider].push(model);
    return groups;
  }, {});
}

function EditableModelCard({
  model,
  editing,
  onEdit,
  onChange,
}: {
  model: ModelCard;
  editing: boolean;
  onEdit: () => void;
  onChange: (updated: ModelCard) => void;
}) {
  const hasBatch = model.rows.some(r => r.batch);

  function updateField(field: keyof ModelCard, value: string) {
    onChange({ ...model, [field]: value });
  }

  function updateRow(i: number, field: keyof ResolutionRow, value: string) {
    const rows = model.rows.map((r, idx) => idx === i ? { ...r, [field]: value } : r);
    onChange({ ...model, rows });
  }

  const cardStyle: React.CSSProperties = {
    background: editing ? T.editBg : T.card,
    border: `1px solid ${model.deprecated ? T.deprecatedBorder : editing ? T.editBorder : T.border}`,
    borderRadius: '14px',
    padding: '22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    transition: 'background 0.15s, border-color 0.15s',
  };

  const inputStyle: React.CSSProperties = {
    border: `1px solid ${T.editBorder}`,
    borderRadius: '6px',
    padding: '3px 7px',
    fontSize: '13px',
    background: '#fff',
    color: T.heading,
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {editing ? (
              <input style={{ ...inputStyle, fontWeight: 700, fontSize: '15px' }} value={model.name} onChange={e => updateField('name', e.target.value)} />
            ) : (
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: T.heading, margin: 0 }}>{model.name}</h3>
            )}
            <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '99px', background: T.pill, color: T.pillText, flexShrink: 0 }}>
              {model.provider}
            </span>
          </div>
          {editing ? (
            <input style={{ ...inputStyle, marginTop: '6px', fontSize: '12px' }} value={model.tagline} onChange={e => updateField('tagline', e.target.value)} />
          ) : (
            <p style={{ fontSize: '13px', color: T.sub, marginTop: '4px', marginBottom: 0 }}>{model.tagline}</p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          {model.deprecated && !editing && (
            <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '99px', background: T.deprecatedBg, color: T.deprecatedText, border: `1px solid ${T.deprecatedBorder}` }}>
              Deprecated
            </span>
          )}
          {!editing && (
            <button onClick={onEdit} title="Edit prices" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: T.sub, padding: '2px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
              <Pencil size={13} />
            </button>
          )}
        </div>
      </div>

      {model.deprecated && !editing && (
        <p style={{ fontSize: '12px', color: T.deprecatedText, background: T.deprecatedBg, border: `1px solid ${T.deprecatedBorder}`, borderRadius: '8px', padding: '8px 12px', margin: 0 }}>
          {model.deprecated}
        </p>
      )}

      {(model.inputTokens || model.outputTokens) && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {model.inputTokens && (
            <div style={{ fontSize: '12px', background: T.accentBg, borderRadius: '8px', padding: '5px 10px' }}>
              <span style={{ color: T.accent, fontWeight: 600 }}>Input </span>
              {editing ? (
                <input style={{ ...inputStyle, display: 'inline', width: '130px' }} value={model.inputTokens} onChange={e => updateField('inputTokens', e.target.value)} />
              ) : (
                <span style={{ color: T.sub }}>{model.inputTokens}</span>
              )}
            </div>
          )}
          {model.outputTokens && (
            <div style={{ fontSize: '12px', background: T.accentBg, borderRadius: '8px', padding: '5px 10px' }}>
              <span style={{ color: T.accent, fontWeight: 600 }}>Output </span>
              {editing ? (
                <input style={{ ...inputStyle, display: 'inline', width: '130px' }} value={model.outputTokens} onChange={e => updateField('outputTokens', e.target.value)} />
              ) : (
                <span style={{ color: T.sub }}>{model.outputTokens}</span>
              )}
            </div>
          )}
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${T.border}` }}>
            <th style={{ textAlign: 'left', padding: '5px 0', color: T.sub, fontWeight: 600 }}>Resolution</th>
            <th style={{ textAlign: 'right', padding: '5px 0', color: T.sub, fontWeight: 600 }}>Per image</th>
            {hasBatch && (
              <th style={{ textAlign: 'right', padding: '5px 0', color: T.batchText, fontWeight: 600 }}>Batch</th>
            )}
          </tr>
        </thead>
        <tbody>
          {model.rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < model.rows.length - 1 ? `1px solid ${T.border}` : 'none' }}>
              <td style={{ padding: '8px 0', color: T.heading }}>
                {editing ? (
                  <input style={inputStyle} value={row.res} onChange={e => updateRow(i, 'res', e.target.value)} />
                ) : row.res}
              </td>
              <td style={{ padding: '8px 0', textAlign: 'right' }}>
                {editing ? (
                  <input style={{ ...inputStyle, textAlign: 'right', width: '90px' }} value={row.price} onChange={e => updateRow(i, 'price', e.target.value)} />
                ) : (
                  <span style={{ fontWeight: 700, color: T.accent }}>{row.price}</span>
                )}
              </td>
              {hasBatch && (
                <td style={{ padding: '8px 0', textAlign: 'right' }}>
                  {editing ? (
                    <input style={{ ...inputStyle, textAlign: 'right', width: '90px' }} value={row.batch ?? ''} onChange={e => updateRow(i, 'batch', e.target.value)} />
                  ) : (
                    <span style={{ color: T.batchText, fontWeight: 600 }}>{row.batch ?? '—'}</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CostsDashboard() {
  const [models, setModels] = useState<ModelCard[]>(DEFAULT_MODELS);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'live' | 'default' | 'error'>('loading');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<ModelCard | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function fetchPricing() {
    setLoadState('loading');
    try {
      const res = await fetch(`${API_BASE}/pricing`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.pricing?.models) {
        setModels(mergeModelLists(DEFAULT_MODELS, data.pricing.models));
        setUpdatedAt(data.pricing.updatedAt ?? null);
        setLoadState('live');
      } else {
        setLoadState('default');
      }
    } catch {
      setLoadState('error');
    }
  }

  useEffect(() => { fetchPricing(); }, []);

  function startEdit(i: number) {
    setEditingIndex(i);
    setDraft({ ...models[i] });
    setSaveError(null);
  }

  function cancelEdit() {
    setEditingIndex(null);
    setDraft(null);
    setSaveError(null);
  }

  async function saveEdit() {
    if (draft === null || editingIndex === null) return;
    const updated = models.map((m, i) => i === editingIndex ? draft : m);
    setSaving(true);
    setSaveError(null);
    try {
      const now = new Date().toISOString();
      const res = await fetch(`${API_BASE}/pricing`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ models: updated, updatedAt: now }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setModels(updated);
      setUpdatedAt(now);
      setLoadState('live');
      setEditingIndex(null);
      setDraft(null);
    } catch (e: any) {
      setSaveError(e?.message ?? 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  const statusLabel = {
    loading: 'Loading…',
    live: updatedAt ? `Last updated ${new Date(updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : 'Live from API',
    default: 'Showing defaults — not yet saved to API',
    error: 'Could not reach API — showing defaults',
  }[loadState];

  const statusColor = { loading: T.sub, live: T.batchText, default: T.sub, error: T.deprecatedText }[loadState];
  const groupedModels = groupByProvider(models);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: T.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: T.heading, marginBottom: '5px' }}>Model Pricing</h2>
              <p style={{ color: T.sub, fontSize: '14px', margin: 0 }}>
                Image generation cost comparison. Click <Pencil size={11} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> on any card to update prices and save them to the API.
              </p>
            </div>
            <button
              onClick={fetchPricing}
              disabled={loadState === 'loading'}
              title="Refresh from API"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 12px', borderRadius: '8px', border: `1px solid ${T.border}`, background: T.card, cursor: 'pointer', color: T.sub, fontSize: '13px' }}
            >
              <RefreshCw size={13} style={{ animation: loadState === 'loading' ? 'spin 1s linear infinite' : 'none' }} />
              Refresh
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor, flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: statusColor }}>{statusLabel}</span>
          </div>

          {Object.entries(groupedModels).map(([provider, providerModels]) => (
            <div key={provider}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: T.sub, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
                {provider}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {providerModels.map((m) => {
                  const i = models.indexOf(m);
                  return (
                    <div key={`${m.provider}-${m.name}`}>
                      <EditableModelCard
                        model={editingIndex === i && draft ? draft : m}
                        editing={editingIndex === i}
                        onEdit={() => startEdit(i)}
                        onChange={updated => setDraft(updated)}
                      />
                      {editingIndex === i && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                          {saveError && <span style={{ fontSize: '12px', color: T.deprecatedText, flex: 1 }}>{saveError}</span>}
                          <button onClick={cancelEdit} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '8px', border: `1px solid ${T.border}`, background: T.card, cursor: 'pointer', fontSize: '13px', color: T.sub }}>
                            <X size={12} /> Cancel
                          </button>
                          <button onClick={saveEdit} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: '8px', border: 'none', background: T.accent, cursor: 'pointer', fontSize: '13px', color: '#fff', fontWeight: 600 }}>
                            <Save size={12} /> {saving ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ background: T.batchBg, border: `1px solid ${T.batchBorder}`, borderRadius: '12px', padding: '14px 18px', fontSize: '13px', color: T.batchText }}>
            <strong>Batch API</strong> - Gemini and OpenAI image models support discounted async batch processing. Other providers listed here use per-image, credit, or subscription pricing.
          </div>

          <p style={{ fontSize: '12px', color: T.sub, textAlign: 'center', margin: 0 }}>
            Pricing sources: <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noreferrer" style={{ color: T.accent }}>Google</a>{' | '}<a href="https://openai.com/api/pricing/" target="_blank" rel="noreferrer" style={{ color: T.accent }}>OpenAI</a>{' | '}<a href="https://docs.bfl.ai/quick_start/pricing" target="_blank" rel="noreferrer" style={{ color: T.accent }}>Black Forest Labs</a>{' | '}<a href="https://ideogram.ai/api-pricing/" target="_blank" rel="noreferrer" style={{ color: T.accent }}>Ideogram</a>{' | '}<a href="https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans" target="_blank" rel="noreferrer" style={{ color: T.accent }}>Midjourney</a>{' | '}<a href="https://www.recraft.ai/pricing" target="_blank" rel="noreferrer" style={{ color: T.accent }}>Recraft</a>
          </p>

        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
