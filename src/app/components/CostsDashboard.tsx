export function CostsDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fdf8f3' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '16px', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '8px' }}>
              Model Pricing
            </h2>
            <p style={{ color: 'hsl(30,20%,45%)', fontSize: '15px' }}>
              Price per generation for Generations. Content coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
