const platforms = [
  {
    name: 'Canva',
    category: 'Cat 1',
    firstTime: 'Sign up → land on homepage → choose a template or blank canvas → use Magic Media to type a text prompt → image generated inline → resize for platform using Magic Switch → download. The user never leaves the canvas environment.',
    returning: 'Open existing Brand Kit → open or duplicate a previous design → swap the AI-generated image using Magic Media with a new prompt → resize → download. Brand Kit stores colors and fonts but does not remember the photographic style of previous generations.',
    uiApproach: 'Canvas-first. Everything happens inside a design workspace. Generation is a feature embedded in a design tool, not the primary purpose of the interface.',
    clicks: '6–8 clicks',
    keyLimitation: 'The user has to rebuild the visual context every time. There is no saved photographic formula; the Brand Kit stores identity assets but not scene, style, or composition settings.',
  },
  {
    name: 'Adobe Firefly',
    category: 'Cat 1',
    firstTime: 'Sign up → go to Firefly homepage → choose a module (Text to Image, Generative Fill, etc.) → type a text prompt → select a style reference if desired → generate → download or open in Photoshop for further editing.',
    returning: 'Open saved Style Kit → load reference images → generate with existing style locked → edit regionally using Generative Fill → export. For enterprise users running Firefly Services API, the returning flow is fully automated with no manual steps.',
    uiApproach: 'Module-based. Each capability (text to image, fill, expand, recolor) lives in a separate panel. The user navigates between modules depending on the task rather than working in one unified workspace.',
    clicks: '5–7 clicks (API: 0 manual)',
    keyLimitation: 'No product SKU library. Every generation starts from a text prompt or reference image upload; there is no persistent product identity that carries over between sessions.',
  },
  {
    name: 'AdCreative.ai',
    category: 'Cat 1',
    firstTime: 'Sign up → connect a brand (upload logo, set brand colors) → select a platform and format (Facebook, Google, etc.) → upload a product image or describe it → generate multiple ad variants → review conversion scores → download the highest-scoring variants.',
    returning: 'Select saved brand → choose a new product or campaign brief → generate variants → download. The brand connection is persistent so colors, fonts, and logos carry over automatically.',
    uiApproach: 'Form-based. The user fills out a structured brief (platform, format, headline, product image) and the system generates a batch of variants. Less creative control, more automation.',
    clicks: '7–10 clicks (4–5 returning)',
    keyLimitation: 'Built entirely around ad performance metrics, not photographic quality or brand consistency. No concept of a scene, composition, or photographic style — the output is an ad layout, not a product photograph.',
  },
  {
    name: 'ChatGPT / GPT-4o',
    category: 'Cat 2',
    firstTime: 'Open ChatGPT → type a description of the image you want in plain English → image generated inline in the chat thread → download. No sign-up friction beyond an OpenAI account.',
    returning: 'Open a previous conversation or start a new one → describe the change or new image in plain English → iterate through conversation → download. There is no saved style or formula; the only continuity is what is visible in the current conversation thread.',
    uiApproach: 'Conversation-first. The entire creation experience is a chat interface. No menus, no settings panels, no format selectors. Canvas mode (ChatGPT Plus) adds a persistent workspace for iterative editing.',
    clicks: '2–3 clicks (lowest in analysis)',
    keyLimitation: 'Zero structural memory between sessions. Each new conversation starts completely fresh with no knowledge of previous product images, brand styles, or compositions.',
  },
  {
    name: 'Midjourney V7',
    category: 'Cat 2',
    firstTime: 'Create Discord account → join Midjourney server → navigate to a newbie channel → type /imagine followed by a text prompt → image generated as a Discord message → upscale preferred variant → download.',
    returning: 'Open web app → type prompt with --sref (style reference URL) and --cref (character reference URL) appended → generate → upscale → download. Returning users must maintain their own reference library outside the platform.',
    uiApproach: 'Prompt-first. The entire creation experience is driven by text commands and parameter flags. The web app adds a gallery and some visual controls but the core interaction model is still writing a prompt.',
    clicks: '4–6 clicks (higher effective effort due to prompt complexity)',
    keyLimitation: 'The user must know how to write effective prompts and parameter flags. All style, composition, and scene parameters are encoded in the text of the prompt itself.',
  },
  {
    name: 'DALL-E 3 (OpenAI)',
    category: 'Cat 2',
    firstTime: 'Open ChatGPT or access via API → type a description of the image in plain English → image generated inline → download. No setup, no configuration, no template selection.',
    returning: 'Open a previous conversation or start a new one → describe the new image or reference the previous one in the same thread → iterate through conversation → download. If the conversation is closed, all context is lost.',
    uiApproach: 'Identical to ChatGPT — conversation-first. DALL-E has no standalone interface of its own; it operates entirely through the ChatGPT chat window or via API call.',
    clicks: '2–3 clicks (tied with ChatGPT for lowest in analysis)',
    keyLimitation: 'No structural memory whatsoever between sessions. Closing the conversation window resets everything. At catalog scale this is not a workflow — it is repeated manual effort with no compounding efficiency.',
  },
  {
    name: 'Krea AI',
    category: 'Cat 2',
    firstTime: 'Sign up → choose a tool such as Image, Realtime, Edit, Upscale, Video, or 3D → type a prompt or start drawing in the realtime canvas → optionally add image/style references or train a LoRA for a product/style → generate → enhance, edit, or download.',
    returning: 'Open existing assets or trained LoRA → choose Image, Realtime, Nodes, or an editing workflow → reuse the model/style reference → generate or automate a batch through Nodes/Apps → download. Returning flow improves once the user has organized assets and trained models.',
    uiApproach: 'Suite-first and realtime-first. Krea behaves like a creative AI command center: image, video, 3D, enhancement, realtime canvas, asset management, and model training live together. It gives more control than a chat tool, but less product-production structure than a SKU or recipe-driven platform.',
    clicks: '4–7 clicks, plus LoRA setup when product consistency is needed',
    keyLimitation: 'Power is broad rather than product-specific. Krea can train products/styles and manage assets, but it does not provide a native SKU library, saved product photography recipe system, or e-commerce approval workflow.',
  },
  {
    name: 'Stable Diffusion',
    category: 'Cat 2',
    firstTime: 'Download and install AUTOMATIC1111 or ComfyUI (30–90 minutes depending on hardware and technical skill) → download a base model → configure settings → type prompt → generate → download.',
    returning: 'Load saved workflow (ComfyUI) or saved settings (AUTOMATIC1111) → swap prompt or reference image → generate → download. Power users with ComfyUI workflows can automate entire pipelines.',
    uiApproach: 'Technical dashboard (AUTOMATIC1111) or node graph (ComfyUI). Neither is designed for non-technical users. Interface assumes knowledge of model weights, samplers, CFG scale, and ControlNet settings.',
    clicks: '0 manual clicks once a workflow is built — but getting there requires hours of setup',
    keyLimitation: 'For a first-time user the path from 0 to first usable image is measured in hours, not clicks.',
  },
  {
    name: 'DaVinci.ai',
    category: 'Cat 2',
    firstTime: 'Sign up → select a model from the model library (Sora, Veo, FLUX, Kling, etc.) → type prompt → generate → download. Auto-resize handles format adaptation for different platforms.',
    returning: 'Open platform → select preferred model → type prompt → generate → auto-resize for target platform → download. There is no saved brief, style lock, or product memory — each session starts fresh.',
    uiApproach: 'Model selector first. The primary interface decision is which underlying model to use. This is the broadest interface in the analysis and the one requiring the most implicit knowledge.',
    clicks: '4–5 clicks',
    keyLimitation: 'User needs to know which model is best for their task before they start. No saved brief, style lock, or product memory.',
  },
  {
    name: 'Runway',
    category: 'Cat 2',
    firstTime: 'Sign up → open text-to-video or image-to-video module → type a prompt or upload a reference image → set duration and aspect ratio → generate → download.',
    returning: 'Open Aleph editing module → upload existing video clip → describe the change in natural language → apply → download. For video campaigns using the same character, reference the character image in Gen-4 to maintain consistency across multiple shots.',
    uiApproach: 'Module-based with a professional editing timeline for post-generation work. The generation interface is simple and prompt-driven but the editing suite underneath is complex.',
    clicks: '4–6 clicks (longer if entering post-generation editing)',
    keyLimitation: 'Credits deplete extremely quickly. Trustpilot score of 1.2/5. "Unlimited" plan is not functionally unlimited.',
  },
  {
    name: 'Kling AI',
    category: 'Cat 2',
    firstTime: 'Sign up → select Text to Video or Image to Video → upload reference image or type prompt → set duration (up to 3 minutes), aspect ratio, and camera motion → optionally add negative prompts → generate → download.',
    returning: 'Open Image to Video → upload a completed product photo (e.g., from Generations) → describe the motion → set duration and format → generate → download.',
    uiApproach: 'Selection-first. Clean, minimal interface with a clear choice between text-to-video and image-to-video as the entry point. Controls for camera motion, negative prompts, and duration are visible without navigating to settings panels.',
    clicks: '4–6 clicks',
    keyLimitation: 'Approximately 30–40% of generations produce usable clips. No saved style or brand system — each generation is independent.',
  },
  {
    name: 'Claid.ai',
    category: 'Cat 3',
    firstTime: 'Sign up → upload product image (JPEG, PNG, or WEBP) → Claid automatically removes background → choose a pre-made template or write a text prompt describing the scene → adjust Creativity Level slider → generate → download.',
    returning: 'Upload new product image → select from saved prompt or template → generate → download. For API users the returning flow is fully automated — new product images enter the pipeline and styled outputs are returned programmatically with no manual steps.',
    uiApproach: 'Upload-first. The moment a product image is uploaded the platform takes action automatically. Simple enough for non-technical users, powerful enough for API integration.',
    clicks: '4–5 clicks',
    keyLimitation: 'API setup requires technical knowledge. Non-technical users report difficulty with the integration.',
  },
  {
    name: 'NightJar',
    category: 'Cat 3',
    firstTime: 'Install Shopify app or access web platform → upload product as an Asset → go to Create tab → select Photography Style → select Composition → select Background (scene) → optionally select Fashion Model → set aspect ratio and resolution → generate → download or push to Shopify listing.',
    returning: 'Go to Create tab → select a saved Recipe → drop in new product image → generate → download. One click selects the Recipe, one click generates. The entire brief — style, composition, model, background, format — is already saved.',
    uiApproach: 'Ingredient-based tabs. Each variable (style, composition, model, background) has its own selection panel. The Create form is structured like a brief where the user fills in the ingredients rather than writing a prompt. Recipes collapse the entire brief into a single saved configuration.',
    clicks: '8–10 clicks first use → 3–4 clicks with saved Recipe (most streamlined returning flow in Cat 3)',
    keyLimitation: 'Single-brand, Shopify-native only. No multi-brand workspace or external agency layer.',
  },
  {
    name: 'Flair.ai',
    category: 'Cat 3',
    firstTime: 'Sign up → open blank canvas → drag and drop product image onto canvas → drag props and background elements from the asset library onto the canvas → arrange elements → write a text prompt describing the scene → click Generate → download.',
    returning: 'Open saved template → swap product image → adjust prompt if needed → generate → download. Templates save the canvas layout but not the full photographic brief.',
    uiApproach: 'Canvas-first, spatial. The interface looks and behaves like Figma — the user physically places and arranges elements on a canvas before generating. The most tactile and hands-on interface in the Category 3 group.',
    clicks: '8–12 clicks (highest in Cat 3 due to canvas placement)',
    keyLimitation: 'Higher click count and more manual arrangement compared to template or recipe-driven tools. No workspace isolation or enterprise batch capacity.',
  },
  {
    name: 'Photoroom',
    category: 'Cat 3',
    firstTime: 'Download mobile app or open web editor → upload or photograph product → background removed automatically → select a background template or type a scene description → apply → download or push to Shopify.',
    returning: 'Open app → upload new product → select from template history or batch apply an existing setup to multiple images → download.',
    uiApproach: 'Action-first. Photoroom\'s interface is oriented around what the tool does to your image rather than what you are building. Every screen is a list of actions — remove, replace, enhance, resize. Mobile UX is optimized for speed.',
    clicks: '3–5 clicks on mobile (one of the fastest 0→100 flows in the analysis)',
    keyLimitation: 'Speed comes at the cost of control. No composition system, no saved brief, and no style lock — the fast flow produces a single image with no structural memory.',
  },
  {
    name: 'Pebblely',
    category: 'Cat 3',
    firstTime: 'Sign up → upload product image → background removed automatically → select a theme from 40+ options or click Custom and type a background description → generate → download.',
    returning: 'Upload new product → select a previously used theme → generate → download. There is no saved brief or formula; the returning user flow is only marginally faster than the first-time flow because themes are persistent but nothing else is.',
    uiApproach: 'Theme gallery. The primary UI decision is choosing from a visual grid of themed backgrounds. The simplest interface in the entire analysis — designed for users who have no design experience and want results in the fewest possible steps.',
    clicks: '3–4 clicks (tied with Photoroom for lowest in Cat 3)',
    keyLimitation: 'Limited to pre-built themes with no ability to customize beyond what\'s offered. Not built for larger teams or professional production workflows.',
  },
  {
    name: 'Kive.ai',
    category: 'Cat 3',
    firstTime: 'Sign up → upload product reference images to train a Product Shot model (requires 5–20 reference images, training takes several minutes) → once trained, go to Studios → select a Studio environment → generate against the trained product model → download.',
    returning: 'Select existing trained product model → select or create a Studio → generate → download. The trained model is persistent and reusable across any Studio environment.',
    uiApproach: 'Library-first. The platform is organized around an asset library that is intelligently tagged and searchable. Generation flows out of the library rather than being the primary entry point. The Moodboard → Brief → Generate flow makes Kive the most research and planning-oriented interface in this analysis.',
    clicks: '6–8 clicks after training is complete (training itself adds setup time on first use)',
    keyLimitation: 'Model training step creates meaningful setup friction for new products. A brand with 200 SKUs needs to train 200 separate models or train one model on multiple products, which reduces specificity.',
  },
];

const catColors: Record<string, { bg: string; text: string; border: string }> = {
  'Cat 1': { bg: '#fef3e2', text: '#92400e', border: '#f59e0b' },
  'Cat 2': { bg: '#fdf2f8', text: '#86198f', border: '#d946ef' },
  'Cat 3': { bg: '#f0fdf4', text: '#166534', border: '#22c55e' },
};

export function PathOfCreationTab() {
  return (
    <div className="space-y-6">
      <div style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '16px', padding: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'hsl(30,40%,22%)', marginBottom: '8px' }}>
          The Path of Creation
        </h2>
        <p style={{ color: 'hsl(30,20%,45%)', fontSize: '15px' }}>
          How long it takes a user to go from 0 to 100 — first-time and returning user flows, UI approach, click count, and key limitations.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {platforms.map((p) => {
          const cat = catColors[p.category] ?? catColors['Cat 3'];
          return (
            <div key={p.name} style={{ background: '#fff', border: '1px solid hsl(30,40%,85%)', borderRadius: '14px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '17px', fontWeight: 700, color: 'hsl(30,40%,22%)' }}>{p.name}</span>
                <span style={{
                  fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px',
                  background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`
                }}>{p.category}</span>
                <span style={{
                  fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '999px',
                  background: 'hsl(30,40%,95%)', color: 'hsl(30,40%,35%)', border: '1px solid hsl(30,40%,80%)'
                }}>{p.clicks}</span>
              </div>

              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ background: 'hsl(30,40%,97%)', borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'hsl(30,40%,40%)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>First Time (0 → 100)</div>
                  <p style={{ fontSize: '13px', color: 'hsl(30,15%,35%)', lineHeight: '1.6', margin: 0 }}>{p.firstTime}</p>
                </div>

                <div style={{ background: 'hsl(30,40%,97%)', borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'hsl(30,40%,40%)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Returning User (50 → 100)</div>
                  <p style={{ fontSize: '13px', color: 'hsl(30,15%,35%)', lineHeight: '1.6', margin: 0 }}>{p.returning}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>UI Approach</div>
                    <p style={{ fontSize: '13px', color: '#0c4a6e', lineHeight: '1.6', margin: 0 }}>{p.uiApproach}</p>
                  </div>

                  <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#9f1239', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Key Limitation</div>
                    <p style={{ fontSize: '13px', color: '#881337', lineHeight: '1.6', margin: 0 }}>{p.keyLimitation}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
