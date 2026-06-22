export function StoryBoardTab() {
  return (
    <div className="space-y-6">
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '16px', padding: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '8px' }}>
          Story Board
        </h2>
        <p style={{ color: 'hsl(30,20%,45%)', fontSize: '15px' }}>
          Narrative and visual storyboard for the Generations product vision.
        </p>
      </div>

      <div style={{
        background: 'hsl(30,40%,97%)',
        border: '2px dashed hsl(30,40%,75%)',
        borderRadius: '14px',
        padding: '48px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎬</div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'hsl(30,40%,30%)', marginBottom: '8px' }}>
          Story Board Coming Soon
        </h3>
        <p style={{ fontSize: '14px', color: 'hsl(30,20%,50%)', maxWidth: '480px', margin: '0 auto' }}>
          This section will contain the product storyboard. Content to be added.
        </p>
      </div>
    </div>
  );
}
