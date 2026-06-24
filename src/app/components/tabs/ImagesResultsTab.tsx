const platforms = [
  'Canva', 'Adobe Firefly', 'AdCreative.ai', 'ChatGPT / GPT-4o',
  'MidJourney V7', 'DALL-E 3 (OpenAI)', 'Krea AI', 'Stable Diffusion', 'DaVinci.ai',
  'Runway', 'Kling AI', 'Claid.ai', 'NightJar', 'Flair.ai',
  'Photoroom', 'Pebblely', 'Kive.ai',
];

export function ImagesResultsTab() {
  return (
    <div className="space-y-6">
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '16px', padding: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '8px' }}>
          Images & Generation Results
        </h2>
        <p style={{ color: 'hsl(30,20%,45%)', fontSize: '15px' }}>
          Side-by-side image outputs and generation samples from each platform.
        </p>
      </div>

      <div style={{
        background: 'hsl(30,40%,97%)',
        border: '2px dashed hsl(30,40%,75%)',
        borderRadius: '14px',
        padding: '48px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '36px', marginBottom: '12px' }}>📸</div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'hsl(30,40%,30%)', marginBottom: '8px' }}>
          Images Coming Soon
        </h3>
        <p style={{ fontSize: '14px', color: 'hsl(30,20%,50%)', maxWidth: '480px', margin: '0 auto' }}>
          This section will display generation results and sample images from each platform. Per the research to-do list, images still need to be added for each product.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {platforms.map((name) => (
          <div key={name} style={{
            background: '#fff',
            border: '1px solid hsl(30,40%,85%)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            <div style={{
              background: 'hsl(30,30%,93%)',
              borderRadius: '8px',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'hsl(30,20%,65%)',
              fontSize: '28px',
            }}>
              🖼️
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'hsl(30,40%,28%)' }}>{name}</span>
            <span style={{ fontSize: '11px', color: 'hsl(30,20%,60%)' }}>No images added yet</span>
          </div>
        ))}
      </div>
    </div>
  );
}
