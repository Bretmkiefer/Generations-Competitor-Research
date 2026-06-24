const featureMatrix = [
  { platform: 'Gen Canopy', cat: 'Cat 3+', batchGen: '✓', brandLock: '✓', sceneBuilder: '✓', productSKU: '✓', stylePresets: '✓', multiBrand: '✓', pricing: 'Agency / Enterprise', isGenerations: true },
  { platform: 'Canva', cat: 'Cat 1', batchGen: '~', brandLock: '~', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '~', pricing: 'Freemium → Team' },
  { platform: 'Adobe Firefly', cat: 'Cat 1', batchGen: '~', brandLock: '~', sceneBuilder: '✗', productSKU: '✗', stylePresets: '✓', multiBrand: '✓', pricing: 'Subscription + CC' },
  { platform: 'AdCreative.ai', cat: 'Cat 1', batchGen: '✓', brandLock: '~', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '~', pricing: 'Tiered subscription' },
  { platform: 'ChatGPT / GPT-4o', cat: 'Cat 2', batchGen: '✗', brandLock: '✗', sceneBuilder: '✗', productSKU: '✗', stylePresets: '✗', multiBrand: '✗', pricing: 'Free / $20/mo' },
  { platform: 'Midjourney v7', cat: 'Cat 2', batchGen: '✗', brandLock: '✗', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '✗', pricing: '$10–$120/mo' },
  { platform: 'Krea AI', cat: 'Cat 2', batchGen: '~', brandLock: '~', sceneBuilder: '~', productSKU: '✗', stylePresets: '✓', multiBrand: '~', pricing: 'Free–$200/mo + enterprise' },
  { platform: 'Stable Diffusion', cat: 'Cat 2', batchGen: '~', brandLock: '✗', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '✗', pricing: 'Free (self-hosted)' },
  { platform: 'Claid.ai', cat: 'Cat 3', batchGen: '✓', brandLock: '✓', sceneBuilder: '~', productSKU: '~', stylePresets: '✓', multiBrand: '~', pricing: '$9–$49/mo + API' },
  { platform: 'Nightjar', cat: 'Cat 3', batchGen: '✓', brandLock: '✓', sceneBuilder: '~', productSKU: '~', stylePresets: '✓', multiBrand: '✗', pricing: '$25–$50/mo' },
  { platform: 'Flair.ai', cat: 'Cat 3', batchGen: '~', brandLock: '~', sceneBuilder: '✓', productSKU: '✗', stylePresets: '~', multiBrand: '✗', pricing: 'Free–$10/mo' },
  { platform: 'Photoroom', cat: 'Cat 3', batchGen: '✓', brandLock: '~', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '~', pricing: '$7.50–$99/mo' },
  { platform: 'Pebblely', cat: 'Cat 3', batchGen: '~', brandLock: '✗', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '✗', pricing: 'Free–$39/mo' },
  { platform: 'Kaptured AI', cat: 'Cat 3', batchGen: '✓', brandLock: '✓', sceneBuilder: '✗', productSKU: '~', stylePresets: '~', multiBrand: '✗', pricing: 'Enterprise only' },
  { platform: 'Kive.ai', cat: 'Cat 3', batchGen: '✓', brandLock: '~', sceneBuilder: '~', productSKU: '✓', stylePresets: '✓', multiBrand: '✗', pricing: 'From $20/mo' },
];

const tacticsMatrix1 = [
  { tool: 'Custom Model Training', gen: '✓', claid: '✓', nightjar: '·', kive: '✓', flair: '·', photoroom: '·', pebblely: '·' },
  { tool: 'Batch Processing', gen: '✓', claid: '✓', nightjar: '✓', kive: '~', flair: '✓', photoroom: '✓', pebblely: '✓' },
  { tool: 'Inpainting / Region Edit', gen: '·', claid: '·', nightjar: '·', kive: '·', flair: '·', photoroom: '✓', pebblely: '·' },
  { tool: 'Style Presets / Lock', gen: '✓', claid: '✓', nightjar: '✓', kive: '✓', flair: '~', photoroom: '~', pebblely: '~' },
  { tool: 'Composition Control', gen: '✓', claid: '~', nightjar: '✓', kive: '·', flair: '✓', photoroom: '·', pebblely: '·' },
  { tool: 'Scene Builder', gen: '✓', claid: '~', nightjar: '~', kive: '~', flair: '✓', photoroom: '✓', pebblely: '·' },
  { tool: 'Product Preservation', gen: '✓', claid: '✓', nightjar: '✓', kive: '✓', flair: '~', photoroom: '~', pebblely: '~' },
  { tool: 'Multi-Brand Workspace', gen: '✓', claid: '~', nightjar: '·', kive: '·', flair: '·', photoroom: '~', pebblely: '·' },
  { tool: 'API / Zapier', gen: '·', claid: '✓', nightjar: '·', kive: '·', flair: '✓', photoroom: '✓', pebblely: '✓' },
  { tool: 'Marketplace Templates', gen: '·', claid: '✓', nightjar: '·', kive: '·', flair: '·', photoroom: '✓', pebblely: '·' },
  { tool: 'Text Label Preservation', gen: '·', claid: '·', nightjar: '·', kive: '·', flair: '·', photoroom: '·', pebblely: '✓' },
  { tool: 'Color Variant Recoloring', gen: '·', claid: '·', nightjar: '✓', kive: '·', flair: '·', photoroom: '·', pebblely: '·' },
  { tool: 'Shopify Integration', gen: '·', claid: '✓', nightjar: '✓', kive: '·', flair: '·', photoroom: '✓', pebblely: '·' },
  { tool: 'Video Generation', gen: '·', claid: '✓', nightjar: '·', kive: '·', flair: '✓', photoroom: '·', pebblely: '·' },
];

const tacticsMatrix2 = [
  { tool: 'Custom Model Training', gen: '✓', canva: '·', firefly: '✓', adcreative: '·', chatgpt: '·', dalle: '·', midjourney: '·', krea: '✓', stable: '✓', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Batch Processing', gen: '✓', canva: '~', firefly: '~', adcreative: '✓', chatgpt: '·', dalle: '~', midjourney: '·', krea: '~', stable: '~', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Inpainting / Region Edit', gen: '·', canva: '✓', firefly: '✓', adcreative: '·', chatgpt: '✓', dalle: '✓', midjourney: '✓', krea: '✓', stable: '✓', davinci: '·', runway: '✓', kling: '·' },
  { tool: 'Style Presets / Lock', gen: '✓', canva: '~', firefly: '✓', adcreative: '~', chatgpt: '·', dalle: '·', midjourney: '✓', krea: '✓', stable: '~', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Composition Control', gen: '✓', canva: '·', firefly: '✓', adcreative: '·', chatgpt: '·', dalle: '·', midjourney: '·', krea: '~', stable: '✓', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Scene Builder', gen: '✓', canva: '·', firefly: '·', adcreative: '·', chatgpt: '·', dalle: '·', midjourney: '·', krea: '~', stable: '·', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Product Preservation', gen: '✓', canva: '·', firefly: '·', adcreative: '·', chatgpt: '·', dalle: '·', midjourney: '·', krea: '~', stable: '·', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Multi-Brand Workspace', gen: '✓', canva: '~', firefly: '~', adcreative: '~', chatgpt: '·', dalle: '·', midjourney: '·', krea: '~', stable: '·', davinci: '·', runway: '~', kling: '·' },
  { tool: 'API / Zapier', gen: '·', canva: '·', firefly: '✓', adcreative: '·', chatgpt: '·', dalle: '✓', midjourney: '·', krea: '✓', stable: '·', davinci: '·', runway: '✓', kling: '✓' },
  { tool: 'Marketplace Templates', gen: '·', canva: '·', firefly: '·', adcreative: '✓', chatgpt: '·', dalle: '·', midjourney: '·', krea: '·', stable: '·', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Text Label Preservation', gen: '·', canva: '·', firefly: '·', adcreative: '·', chatgpt: '✓', dalle: '✓', midjourney: '·', krea: '·', stable: '·', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Color Variant Recoloring', gen: '·', canva: '·', firefly: '·', adcreative: '·', chatgpt: '·', dalle: '·', midjourney: '·', krea: '·', stable: '·', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Shopify Integration', gen: '·', canva: '·', firefly: '·', adcreative: '·', chatgpt: '·', dalle: '·', midjourney: '·', krea: '·', stable: '·', davinci: '·', runway: '·', kling: '·' },
  { tool: 'Video Generation', gen: '·', canva: '·', firefly: '·', adcreative: '·', chatgpt: '·', dalle: '·', midjourney: '·', krea: '✓', stable: '·', davinci: '✓', runway: '✓', kling: '✓' },
];

const threatScores = [
  { name: 'Gen Canopy', score: 10, threat: 'Market Leader', cat: 'Cat 3+', isGenerations: true },
  { name: 'Claid.ai', score: 7.5, threat: 'High Threat', cat: 'Cat 3' },
  { name: 'Nightjar', score: 7.0, threat: 'High Threat', cat: 'Cat 3' },
  { name: 'Kive.ai', score: 7.0, threat: 'High Threat', cat: 'Cat 3' },
  { name: 'Kaptured AI', score: 6.5, threat: 'Medium Threat', cat: 'Cat 3' },
  { name: 'Flair.ai', score: 6.0, threat: 'Medium Threat', cat: 'Cat 3' },
  { name: 'Adobe Firefly', score: 5.5, threat: 'Medium Threat', cat: 'Cat 1' },
  { name: 'Krea AI', score: 5.5, threat: 'Medium Threat', cat: 'Cat 2' },
  { name: 'Canva', score: 5.0, threat: 'Medium Threat', cat: 'Cat 1' },
  { name: 'Photoroom', score: 5.0, threat: 'Medium Threat', cat: 'Cat 3' },
  { name: 'AdCreative.ai', score: 4.5, threat: 'Low Threat', cat: 'Cat 1' },
  { name: 'Midjourney v7', score: 4.0, threat: 'Low Threat', cat: 'Cat 2' },
  { name: 'Pebblely', score: 3.5, threat: 'Low Threat', cat: 'Cat 3' },
  { name: 'ChatGPT / GPT-4o', score: 3.0, threat: 'Low Threat', cat: 'Cat 2' },
  { name: 'Stable Diffusion', score: 2.5, threat: 'Low Threat', cat: 'Cat 2' },
];

function cellStyle(val: string, isGen = false) {
  if (isGen) return { background: 'hsl(30,50%,92%)', color: 'hsl(30,50%,28%)', fontWeight: 700 };
  if (val === '✓') return { background: '#f0fdf4', color: '#166534' };
  if (val === '~') return { background: '#fefce8', color: '#854d0e' };
  if (val === '✗' || val === '·') return { background: '#fff1f2', color: '#9f1239' };
  return {};
}

const tdBase: React.CSSProperties = {
  padding: '8px 10px',
  fontSize: '13px',
  textAlign: 'center' as const,
  border: '1px solid hsl(30,30%,88%)',
};

const thBase: React.CSSProperties = {
  padding: '8px 10px',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  background: 'hsl(30,40%,95%)',
  color: 'hsl(30,40%,35%)',
  border: '1px solid hsl(30,30%,85%)',
  whiteSpace: 'nowrap' as const,
};

export function TablesGraphicsTab() {
  return (
    <div className="space-y-8">
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '16px', padding: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '8px' }}>
          Tables & Graphics
        </h2>
        <p style={{ color: 'hsl(30,20%,45%)', fontSize: '15px' }}>
          Full feature comparison matrices, competitive threat scores, and tools &amp; tactics breakdowns.
        </p>
      </div>

      {/* Threat Scores */}
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '14px', padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '20px' }}>Competitive Threat Score By Platform</h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          {threatScores.map((item) => {
            const barColor = item.isGenerations ? 'hsl(30,50%,42%)' :
              item.score >= 7 ? '#ef4444' :
              item.score >= 5 ? '#f59e0b' : '#22c55e';
            return (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: item.isGenerations ? 700 : 500, color: 'hsl(30,40%,22%)' }}>{item.name}</span>
                    <span style={{ fontSize: '11px', color: 'hsl(30,20%,55%)' }}>({item.cat})</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'hsl(30,20%,50%)' }}>{item.threat}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'hsl(30,40%,25%)', width: '32px', textAlign: 'right' }}>{item.score}</span>
                  </div>
                </div>
                <div style={{ background: 'hsl(30,30%,90%)', borderRadius: '4px', height: '8px' }}>
                  <div style={{ background: barColor, height: '8px', borderRadius: '4px', width: `${item.score * 10}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Feature Comparison Matrix */}
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '14px', padding: '24px', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '20px' }}>Full Feature Comparison Matrix</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr>
              <th style={{ ...thBase, textAlign: 'left' }}>Platform</th>
              <th style={thBase}>Cat.</th>
              <th style={thBase}>Batch Gen.</th>
              <th style={thBase}>Brand Lock</th>
              <th style={thBase}>Scene Builder</th>
              <th style={thBase}>Product SKU</th>
              <th style={thBase}>Style Presets</th>
              <th style={thBase}>Multi-Brand</th>
              <th style={{ ...thBase, textAlign: 'left' }}>Pricing</th>
            </tr>
          </thead>
          <tbody>
            {featureMatrix.map((row) => (
              <tr key={row.platform} style={{ background: row.isGenerations ? 'hsl(30,40%,96%)' : undefined }}>
                <td style={{ ...tdBase, textAlign: 'left', fontWeight: row.isGenerations ? 700 : 500, color: 'hsl(30,40%,22%)' }}>{row.platform}</td>
                <td style={{ ...tdBase, fontSize: '11px', color: 'hsl(30,30%,45%)' }}>{row.cat}</td>
                <td style={{ ...tdBase, ...cellStyle(row.batchGen, row.isGenerations) }}>{row.batchGen}</td>
                <td style={{ ...tdBase, ...cellStyle(row.brandLock, row.isGenerations) }}>{row.brandLock}</td>
                <td style={{ ...tdBase, ...cellStyle(row.sceneBuilder, row.isGenerations) }}>{row.sceneBuilder}</td>
                <td style={{ ...tdBase, ...cellStyle(row.productSKU, row.isGenerations) }}>{row.productSKU}</td>
                <td style={{ ...tdBase, ...cellStyle(row.stylePresets, row.isGenerations) }}>{row.stylePresets}</td>
                <td style={{ ...tdBase, ...cellStyle(row.multiBrand, row.isGenerations) }}>{row.multiBrand}</td>
                <td style={{ ...tdBase, textAlign: 'left', fontSize: '12px', color: 'hsl(30,20%,40%)' }}>{row.pricing}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '12px', fontSize: '12px', color: 'hsl(30,20%,55%)' }}>
          ✓ = native capability &nbsp;·&nbsp; ~ = partial / workaround &nbsp;·&nbsp; ✗ = not available
        </div>
      </div>

      {/* Tools & Tactics Breakdown Part 1 */}
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '14px', padding: '24px', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '4px' }}>Tools & Tactics Breakdown — Part 1</h3>
        <p style={{ fontSize: '13px', color: 'hsl(30,20%,50%)', marginBottom: '20px' }}>Generations + Category 3 platforms (Claid, Nightjar, Kive, Flair, Photoroom, Pebblely)</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr>
              <th style={{ ...thBase, textAlign: 'left' }}>Tool / Platform</th>
              <th style={thBase}>Generations</th>
              <th style={thBase}>Claid.ai</th>
              <th style={thBase}>Nightjar</th>
              <th style={thBase}>Kive.ai</th>
              <th style={thBase}>Flair.ai</th>
              <th style={thBase}>Photoroom</th>
              <th style={thBase}>Pebblely</th>
            </tr>
          </thead>
          <tbody>
            {tacticsMatrix1.map((row) => (
              <tr key={row.tool}>
                <td style={{ ...tdBase, textAlign: 'left', fontWeight: 500, color: 'hsl(30,30%,30%)' }}>{row.tool}</td>
                <td style={{ ...tdBase, ...cellStyle(row.gen, true) }}>{row.gen}</td>
                <td style={{ ...tdBase, ...cellStyle(row.claid) }}>{row.claid}</td>
                <td style={{ ...tdBase, ...cellStyle(row.nightjar) }}>{row.nightjar}</td>
                <td style={{ ...tdBase, ...cellStyle(row.kive) }}>{row.kive}</td>
                <td style={{ ...tdBase, ...cellStyle(row.flair) }}>{row.flair}</td>
                <td style={{ ...tdBase, ...cellStyle(row.photoroom) }}>{row.photoroom}</td>
                <td style={{ ...tdBase, ...cellStyle(row.pebblely) }}>{row.pebblely}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '12px', fontSize: '12px', color: 'hsl(30,20%,55%)' }}>
          ✓ = native capability &nbsp;·&nbsp; ~ = partial / workaround &nbsp;·&nbsp; · = not available
        </div>
      </div>

      {/* Tools & Tactics Breakdown Part 2 */}
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '14px', padding: '24px', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '4px' }}>Tools & Tactics Breakdown — Part 2</h3>
        <p style={{ fontSize: '13px', color: 'hsl(30,20%,50%)', marginBottom: '20px' }}>Generations + Category 1 & 2 platforms (Canva, Adobe Firefly, AdCreative, ChatGPT, DALL-E, Midjourney, Krea AI, Stable Diffusion, DaVinci.ai, Runway ML, Kling AI)</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
          <thead>
            <tr>
              <th style={{ ...thBase, textAlign: 'left' }}>Tool / Platform</th>
              <th style={thBase}>Generations</th>
              <th style={thBase}>Canva</th>
              <th style={thBase}>Adobe Firefly</th>
              <th style={thBase}>AdCreative</th>
              <th style={thBase}>ChatGPT</th>
              <th style={thBase}>DALL-E</th>
              <th style={thBase}>Midjourney</th>
              <th style={thBase}>Krea AI</th>
              <th style={thBase}>Stable Diff.</th>
              <th style={thBase}>DaVinci.ai</th>
              <th style={thBase}>Runway ML</th>
              <th style={thBase}>Kling AI</th>
            </tr>
          </thead>
          <tbody>
            {tacticsMatrix2.map((row) => (
              <tr key={row.tool}>
                <td style={{ ...tdBase, textAlign: 'left', fontWeight: 500, color: 'hsl(30,30%,30%)' }}>{row.tool}</td>
                <td style={{ ...tdBase, ...cellStyle(row.gen, true) }}>{row.gen}</td>
                <td style={{ ...tdBase, ...cellStyle(row.canva) }}>{row.canva}</td>
                <td style={{ ...tdBase, ...cellStyle(row.firefly) }}>{row.firefly}</td>
                <td style={{ ...tdBase, ...cellStyle(row.adcreative) }}>{row.adcreative}</td>
                <td style={{ ...tdBase, ...cellStyle(row.chatgpt) }}>{row.chatgpt}</td>
                <td style={{ ...tdBase, ...cellStyle(row.dalle) }}>{row.dalle}</td>
                <td style={{ ...tdBase, ...cellStyle(row.midjourney) }}>{row.midjourney}</td>
                <td style={{ ...tdBase, ...cellStyle(row.krea) }}>{row.krea}</td>
                <td style={{ ...tdBase, ...cellStyle(row.stable) }}>{row.stable}</td>
                <td style={{ ...tdBase, ...cellStyle(row.davinci) }}>{row.davinci}</td>
                <td style={{ ...tdBase, ...cellStyle(row.runway) }}>{row.runway}</td>
                <td style={{ ...tdBase, ...cellStyle(row.kling) }}>{row.kling}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '12px', fontSize: '12px', color: 'hsl(30,20%,55%)' }}>
          ✓ = native capability &nbsp;·&nbsp; ~ = partial / workaround &nbsp;·&nbsp; · = not available
        </div>
      </div>
    </div>
  );
}
