const platforms = [
  {
    name: 'Canva',
    category: 'Cat 1',
    keyLanguage: 'Design, Create, Make, Bring Ideas to Life',
    summary: 'Canva positions itself as the democratizer of design — a Creative Operating System where anyone can create. Their AI tools extend this philosophy. Simplicity is the most cited strength by users.',
    verbStyle: 'Creation & empowerment',
    customerRole: 'Creator / everyday user',
  },
  {
    name: 'Adobe Firefly',
    category: 'Cat 1',
    keyLanguage: 'Imagine, Ideate, Create With Confidence, Bring Your Vision To Life',
    summary: 'Adobe leads with aspiration and professional credibility. Safety and scale for enterprise — "create with confidence," "commercially safe." Imagination is the entry point; creation is the follow-through. They say "content" and "assets," not "photography."',
    verbStyle: 'Aspiration & safety',
    customerRole: 'Enterprise creative / ideator',
  },
  {
    name: 'AdCreative.ai',
    category: 'Cat 1',
    keyLanguage: 'Generate, Produce, Optimize, Perform',
    summary: 'AdCreative focuses heavily on outcomes. Marketing copy reads like a data platform: A/B testing, CTR, performance, results. Generating assets that create impact is the driving force behind creativity.',
    verbStyle: 'Outcomes & metrics',
    customerRole: 'Performance marketer',
  },
  {
    name: 'ChatGPT / GPT-4o',
    category: 'Cat 2',
    keyLanguage: 'Generate, Describe, Create, Make',
    summary: '"Simply describe what you want, and ChatGPT generates the image." The user is a movie director; ChatGPT is the assistant. They embrace mass use — 700 million images in week one is the marketing message.',
    verbStyle: 'Casual & conversational',
    customerRole: 'Anyone / mass market',
  },
  {
    name: 'Midjourney V7',
    category: 'Cat 2',
    keyLanguage: 'Explore, Imagine, Generate, Create, Discover',
    summary: 'The most artistic and creative language in the analysis. Midjourney frames image generation as a creative journey, not a production process. Community-first Discord voice. Prompts are creative briefs to a collaborator, not commands. The customer is positioned as an artist or creative director.',
    verbStyle: 'Artistic & exploratory',
    customerRole: 'Artist / creative director',
  },
  {
    name: 'DALL-E 3 (OpenAI)',
    category: 'Cat 2',
    keyLanguage: 'Describe, Generate, Create, Edit, Refine',
    summary: '"Just tell me what you want, and ChatGPT will generate that image." DALL-E is a production assistant that listens and produces. After GPT Image 1.5, they shifted to technical proof-of-capability statements. Where Midjourney says "explore," DALL-E says "describe" — studio language vs. chat language.',
    verbStyle: 'Conversational & technical',
    customerRole: 'User giving orders to a skilled assistant',
  },
  {
    name: 'Stable Diffusion',
    category: 'Cat 2',
    keyLanguage: 'Generate, Run, Fine-tune, Train, Control',
    summary: 'The most technical language of all platforms. Run locally, fine-tune, train your own model, full control. Creating images is described in engineering terms. No creativity or brand language — entirely technical autonomy and cost efficiency.',
    verbStyle: 'Engineering & developer',
    customerRole: 'Developer / power user',
  },
  {
    name: 'DaVinci.ai',
    category: 'Cat 2',
    keyLanguage: 'Generate, Create, Bring Your Vision to Life, Access, Power',
    summary: '"All Your Visual Creation. One Platform." / "You bring the vision. We take it further." Language centers on breadth and access — the appeal is a single powerful hub over any specialist tool. Key verbs: generate, create, access, adapt.',
    verbStyle: 'Breadth & access',
    customerRole: 'Marketing team / creator',
  },
  {
    name: 'Runway',
    category: 'Cat 2',
    keyLanguage: 'Simulate, Generate, Build, Direct, Create',
    summary: '"Building AI to Simulate the World." The most ambitious language in the analysis — not a creative tool but a technology company building foundational models. The user is a film director giving instructions to a world-building AI. "Simulate" is unique to Runway and positions this as world-building, not art or design.',
    verbStyle: 'World-building & cinematic',
    customerRole: 'Film director / world-builder',
  },
  {
    name: 'Kling AI',
    category: 'Cat 2',
    keyLanguage: 'Create, Generate, Imagine, Tools for Creating',
    summary: '"Next-Generation AI Creative Studio." Clean, practical, production-minded — a studio where the user is a director working in a professional environment. Unlike Runway\'s simulation ambition or Midjourney\'s artistic journey, Kling\'s language is about quality and realism of output.',
    verbStyle: 'Professional & production',
    customerRole: 'Director / studio professional',
  },
  {
    name: 'Claid.ai',
    category: 'Cat 3',
    keyLanguage: 'Turn, Transform, Enhance, Automate, Process',
    summary: '"Turn simple shots into photoshoot-quality images." Transformation-focused: you have something ordinary, Claid makes it professional. Dual audience — individual brands get creative language, technical teams get throughput language (process thousands, automate your pipeline, integrate in minutes).',
    verbStyle: 'Transformation & efficiency',
    customerRole: 'Brand or technical pipeline user',
  },
  {
    name: 'NightJar',
    category: 'Cat 3',
    keyLanguage: 'Build, Generate, Preserve, Stay on Brand, Save, Apply',
    summary: '"Every Nightjar photograph is built from ingredients: the product, the light, the pose, the model, the place. Save them, swap them, reuse them." Anti-prompt positioning is explicit: "A long prompt is a poor way to control an image." Key verbs: save, lock, apply, reuse, preserve. Cooking metaphor — ingredients and recipes.',
    verbStyle: 'Systematic & structured',
    customerRole: 'Brand assembler / production team',
  },
  {
    name: 'Flair.ai',
    category: 'Cat 3',
    keyLanguage: 'Create, Design, Drag and Drop, Generate, Build',
    summary: '"Create studio-quality e-commerce photoshoots in seconds with our drag-and-drop AI editor." Speed and ease, paired with "in seconds." The drag-and-drop framing is tactile and intuitive — you place and arrange elements, not type prompts. Appeals to designers who want hands-on control without technical complexity.',
    verbStyle: 'Tactile & intuitive',
    customerRole: 'Designer / visual thinker',
  },
  {
    name: 'Photoroom',
    category: 'Cat 3',
    keyLanguage: 'Remove, Edit, Transform, Create, Generate',
    summary: 'The most action-oriented and task-based language. Marketing focuses on what the tool does to an image: remove, replace, enhance, resize. "Studio-quality images in seconds" / "design superpowers for everyone." The customer has a photo that needs to be made usable — not someone building a brand photography system.',
    verbStyle: 'Task-based & fast',
    customerRole: 'Small seller / quick-edit user',
  },
  {
    name: 'Pebblely',
    category: 'Cat 3',
    keyLanguage: 'Generate, Create, Showcase, Make Your Products Stand Out',
    summary: '"Create beautiful product photos in seconds with AI." Warm, simple, aimed at small business owners (Etsy, Shopify, Amazon). Uses "beautiful" frequently, alongside "like magic" and "make your products stand out." Actively amplifies testimonials using words like game-changer, miracle worker, and magic.',
    verbStyle: 'Warm & magical',
    customerRole: 'Small business owner / beginner',
  },
  {
    name: 'Kive.ai',
    category: 'Cat 3',
    keyLanguage: 'Create, Generate, Train, On-brand, In Seconds',
    summary: '"On-brand visuals made by AI." The word "on-brand" appears repeatedly. Kive positions AI not as a creative tool but as a brand execution engine — you define the brand, it executes it. Bridges beautiful and fast. Customer is a brand manager or creative director, not a designer or developer.',
    verbStyle: 'Brand-execution & quality',
    customerRole: 'Brand manager / creative director',
  },
];

const catColors: Record<string, { bg: string; text: string; border: string }> = {
  'Cat 1': { bg: '#fef3e2', text: '#92400e', border: '#f59e0b' },
  'Cat 2': { bg: '#fdf2f8', text: '#86198f', border: '#d946ef' },
  'Cat 3': { bg: '#f0fdf4', text: '#166534', border: '#22c55e' },
};

export function CompanyLanguageTab() {
  return (
    <div className="space-y-6">
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '16px', padding: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '8px' }}>
          Company Language Analysis
        </h2>
        <p style={{ color: 'hsl(30,20%,45%)', fontSize: '15px' }}>
          How each competitor talks about what they do — key verbs, customer framing, and messaging philosophy.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {platforms.map((p) => {
          const cat = catColors[p.category] ?? catColors['Cat 3'];
          return (
            <div key={p.name} style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '14px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '17px', fontWeight: 700, color: 'hsl(30,40%,22%)' }}>{p.name}</span>
                <span style={{
                  fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px',
                  background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`
                }}>{p.category}</span>
                <span style={{ fontSize: '12px', color: 'hsl(30,20%,50%)', fontStyle: 'italic' }}>{p.verbStyle}</span>
              </div>
              <div style={{
                background: 'hsl(30,40%,97%)', border: '1px solid hsl(30,40%,88%)',
                borderRadius: '8px', padding: '10px 14px', marginBottom: '12px'
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'hsl(30,40%,40%)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key Language: </span>
                <span style={{ fontSize: '13px', color: 'hsl(30,30%,30%)', fontStyle: 'italic' }}>{p.keyLanguage}</span>
              </div>
              <p style={{ fontSize: '14px', color: 'hsl(30,15%,38%)', lineHeight: '1.65' }}>{p.summary}</p>
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'hsl(30,40%,45%)' }}>Customer role:</span>
                <span style={{ fontSize: '12px', color: 'hsl(30,20%,45%)' }}>{p.customerRole}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
