const incomplete = [
  'Add images of the products',
  'Document each screen that I have clicked through for these products',
];

const complete = [
  'How does the company talk about / market these products? How do they describe the action of creating things',
  'Make the charts a regular table',
  'Put in the URLs',
  'Ask AI to get customer opinions from real users — what are they saying, get real quotes (Reddit, other) (Use Claude)',
  'Threat analysis (was done well)',
  'Add DaVinci, Runway ML, Kling AI',
  'Find the tools and tactics that each platform uses — see what is relevant to us',
  'What models are each of these companies using',
  'The path of creation — how long it takes for a user to conceive to produce something (what options do they give you to go from 0–100, 50–100)',
  'How do they do this UI-wise',
  'How many clicks does it take from start to finish',
];

const needsVerification = [
  'Do it in Linear?',
  'Put images on Figma Docs (Figma, FigJam)',
];

export function TodosTab() {
  return (
    <div className="space-y-6">
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '16px', padding: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '8px' }}>
          To Do's
        </h2>
        <p style={{ color: 'hsl(30,20%,45%)', fontSize: '15px' }}>
          Tracked research tasks — incomplete, complete, and needing verification.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {/* Incomplete */}
        <div style={{ background: '#fff', border: '1px solid #fecdd3', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px' }}>⏳</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#9f1239', margin: 0 }}>Incomplete</h3>
            <span style={{
              fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px',
              background: '#fff1f2', color: '#9f1239', border: '1px solid #fecdd3'
            }}>{incomplete.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {incomplete.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                background: '#fff1f2', borderRadius: '8px', padding: '10px 14px',
              }}>
                <span style={{ fontSize: '14px', marginTop: '1px', flexShrink: 0 }}>◻️</span>
                <span style={{ fontSize: '14px', color: '#881337', lineHeight: '1.5' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Verification */}
        <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px' }}>🔍</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#92400e', margin: 0 }}>Needs Verification</h3>
            <span style={{
              fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px',
              background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a'
            }}>{needsVerification.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {needsVerification.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                background: '#fef9c3', borderRadius: '8px', padding: '10px 14px',
              }}>
                <span style={{ fontSize: '14px', marginTop: '1px', flexShrink: 0 }}>❓</span>
                <span style={{ fontSize: '14px', color: '#78350f', lineHeight: '1.5' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complete */}
        <div style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px' }}>✅</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#166534', margin: 0 }}>Complete</h3>
            <span style={{
              fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px',
              background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0'
            }}>{complete.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {complete.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                background: '#f0fdf4', borderRadius: '8px', padding: '10px 14px',
              }}>
                <span style={{ fontSize: '14px', marginTop: '1px', flexShrink: 0 }}>✔️</span>
                <span style={{ fontSize: '14px', color: '#14532d', lineHeight: '1.5', textDecoration: 'line-through', opacity: 0.75 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
