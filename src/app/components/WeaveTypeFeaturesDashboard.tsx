import { ExternalLink } from 'lucide-react';

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
  takeawayBg: 'hsl(150,40%,96%)',
  takeawayBorder: 'hsl(150,40%,80%)',
  takeawayText: 'hsl(150,40%,28%)',
  warnBg: 'hsl(0,60%,97%)',
  warnBorder: 'hsl(0,60%,85%)',
  warnText: 'hsl(0,50%,40%)',
};

type Content =
  | { kind: 'p'; text: string }
  | { kind: 'list'; label?: string; items: string[] };

interface Section {
  title: string;
  content: Content[];
}

interface Platform {
  num: string;
  name: string;
  url?: string;
  badge?: string;
  sections: Section[];
}

const PLATFORMS: Platform[] = [
  {
    num: '1',
    name: 'Figma Weave',
    url: 'weave.figma.com',
    sections: [
      {
        title: 'Background & Positioning',
        content: [
          { kind: 'p', text: 'Figma acquired the Israeli startup Weavy in October 2025 for approximately $200M (roughly 50x its $4M seed round). The product relaunched as Figma Weave in April 2026, and at Config 2026 (June 23–25), Figma shipped 20+ AI image tasks as pre-packaged Weave workflows directly inside Figma Design’s left panel. Weave is positioned as the creative production layer — not a replacement for Midjourney or Runway, but the connective tissue that eliminates the manual steps between those tools and the Figma canvas.' },
          { kind: 'p', text: 'Figma CEO Dylan Field framed it explicitly: “AI has lowered the floor, but it has not raised the ceiling. Designers will raise the ceiling.” Weave is not another text-to-UI generator — it’s a composable creative canvas where judgment, taste, and systems thinking compound.' },
        ],
      },
      {
        title: 'UI/UX Design',
        content: [
          {
            kind: 'list',
            label: 'Canvas & Interface',
            items: [
              'Node-based infinite canvas where each node performs one AI operation (generate, edit, transfer style, upscale, composite, etc.)',
              'Nodes connect via directional data flows — drag wires between output handles and input handles',
              'The interface sits between a mind-map tool and a professional design environment — closer to Figma’s polish than ComfyUI’s raw technical feel',
              'Right-click context menus and a left toolbox for adding nodes',
              'Right panel for adjusting per-node parameters (aspect ratio, inference steps, guidance scale, seed, etc.)',
              'Output galleries display generated images inline at each node, so you can inspect every intermediate step',
            ],
          },
          {
            kind: 'list',
            label: 'Weave Tools in Figma Design (simplified UI)',
            items: [
              '20+ pre-built Weave workflows appear in Figma Design’s left panel as simple tools',
              'Each tool packages a complex Weave pipeline behind a simple input UI — no prompt engineering required',
              'Example tasks: swap backgrounds, add logos to products, change aspect ratios, style transfer, product shoots, material extraction, Art Nouveau rendering',
              'Users plug in inputs and get consistent, production-quality output with minimal clicks',
              'This “App Mode” concept is significant: complex workflows packaged into simplified interfaces for non-technical team members',
            ],
          },
          {
            kind: 'list',
            label: 'Collaboration',
            items: [
              'Inherits Figma’s real-time multiplayer collaboration model',
              'Weave workflow templates are shareable on Figma Community (20+ launched at Config)',
              'Upcoming “Figma node” will allow pasting Figma frames directly onto the Weave canvas as live inputs — edits in Figma reflect in real time across the Weave workflow',
            ],
          },
          {
            kind: 'list',
            label: 'User Feedback & Pain Points',
            items: [
              'Reddit users describe it as “powerful for creative production teams with pipeline needs, but overkill for solo designers looking for a quick image fix”',
              'Steep learning curve flagged as a barrier — the node-based paradigm is unfamiliar to many designers',
              'As of mid-2026, building custom Weave workflows inside Figma and the Figma node in Weave are not yet available — the two products still operate somewhat separately',
              'Separate billing from Figma (Weave has its own subscription), which creates friction',
            ],
          },
        ],
      },
      {
        title: 'Image Production Capabilities',
        content: [
          {
            kind: 'list',
            items: [
              'Multi-model support: Access to leading AI image, video, and 3D models — not locked to one provider',
              'Style transfer: Analyze a source image’s visual attributes (texture, color, lighting, composition) and apply them to new generations',
              'Image Describer node: Extracts key visual attributes from reference images and converts them to editable text descriptions — these become reusable style definitions',
              'Any LLM node: Route through any text model to generate master style descriptions',
              'Image-to-video: Select a frame, choose motion style (parallax, camera push, element entrance, full scene), pick duration (5–15 seconds), preview in under 90 seconds. Quality is “social-ready, not broadcast-ready”',
              'Batch generation: Connect to a CSV of data (e.g., localized copy) and auto-generate variants for every region',
              'A/B model testing: Feed one prompt into multiple models simultaneously and compare outputs side-by-side',
              'Non-generative editing nodes: Professional-grade adjustments (color correction, levels, compositing) without leaving the workflow',
              'Consistency layer: References your design system to maintain brand consistency across AI-generated outputs',
              '3D asset creation workflows included in the 20+ templates',
            ],
          },
          {
            kind: 'list',
            label: 'Production Use Cases',
            items: [
              'Lyft reported 70% reduction in asset production time for localized campaigns',
              'NVIDIA uses it for brand asset production at scale',
              'Architects use it for staging visualizations',
              'VFX artists use it for games, TV, and film pre-production',
              'Marketers use it for social videos and banners',
            ],
          },
        ],
      },
      {
        title: 'Modularity & Architecture',
        content: [
          {
            kind: 'list',
            items: [
              'Fully modular node-based architecture — every operation is a discrete, reusable block',
              'Workflow templates are shareable and forkable via Figma Community',
              'Composable pipelines — outputs branch, remix, and refine; inputs can be swapped without rebuilding',
              'Bi-directional integration with Figma: Weave tools flow into Figma Design; Figma frames will flow into Weave as live nodes',
              'MCP support: Figma agent supports Model Context Protocol connectors for external tool integration',
              'Not API-first: As of mid-2026, Weave is canvas-first — no REST API for programmatic execution. This is a notable gap compared to Wireflow',
            ],
          },
        ],
      },
      {
        title: 'Pricing',
        content: [
          {
            kind: 'list',
            items: [
              'Freemium model with a generous free tier (no credit card required)',
              'Separate subscription from Figma',
              'AI credit-based consumption for generations',
              'Weave tools in Figma Design are free during open beta; will consume Figma AI credits when GA',
              'Available on Professional plans and above with Full seats',
            ],
          },
        ],
      },
      {
        title: 'Key Takeaway for Queen One',
        content: [
          { kind: 'p', text: 'Weave’s “App Mode” pattern — packaging complex node-based workflows behind simplified UIs for non-technical users — is directly relevant to how Gen Canopy could expose its image generation capabilities to brand teams. The bi-directional design-to-production pipeline (design system → AI generation → branded output) mirrors Queen One’s Sentinel compliance concept. The multi-model approach (not locked to one AI provider) is also strategically important.' },
        ],
      },
    ],
  },
  {
    num: '2',
    name: 'n8n',
    url: 'n8n.io',
    sections: [
      {
        title: 'Background & Positioning',
        content: [
          { kind: 'p', text: 'n8n (pronounced “n-eight-n,” stands for “nodemation”) is an open-source, fair-code workflow automation platform founded in 2019. It’s the leading open-source alternative to Zapier, with 500+ app integrations, 1,700+ community templates, and native AI agent capabilities built on LangChain. By 2026, n8n has become the go-to platform for technical teams building AI-powered automation — not specifically for creative/image workflows, but as the general-purpose orchestration layer that can run AI image pipelines.' },
        ],
      },
      {
        title: 'UI/UX Design',
        content: [
          {
            kind: 'list',
            label: 'Visual Workflow Builder',
            items: [
              'Drag-and-drop canvas with a flowchart-style layout (not pure dataflow graph like Weave/Flora)',
              'Nodes connect in sequence with clear directional flow',
              'Triggers start workflows (webhooks, schedules, new emails, form submissions, etc.)',
              'Actions perform tasks (API calls, data transforms, AI model invocations, etc.)',
              'Conditional branching, merge nodes, and error handling built in',
              'Inline logs and debug panels show node outputs at each step',
              '“Execute Workflow” button for manual testing before activation',
            ],
          },
          {
            kind: 'list',
            label: 'Key UX Characteristics',
            items: [
              'Interface is functional and developer-oriented rather than designer-polished',
              'Optimized for technical users (IT Ops, DevOps, SecOps, Sales Ops)',
              'Low-code/no-code accessibility with escape hatches to JavaScript/Python for complex logic',
              'ChatHub feature provides built-in chat interface for testing AI workflows — supports image analysis, markdown rendering, conversation history',
              'Natural language workflow creation: “Tell n8n what you want to automate in plain English. Get a working workflow back.”',
            ],
          },
          {
            kind: 'list',
            label: 'Differences from Creative Canvas Tools',
            items: [
              'n8n uses a flowchart metaphor, not an infinite canvas',
              'No visual preview of image/video outputs inline on the canvas',
              'No design-oriented features (no layers, no compositing, no style transfer UI)',
              'Focused on data flow and API orchestration rather than creative iteration',
            ],
          },
        ],
      },
      {
        title: 'Image Production Capabilities',
        content: [
          { kind: 'p', text: 'n8n is not purpose-built for image generation, but it can orchestrate image pipelines through its integration ecosystem:' },
          {
            kind: 'list',
            items: [
              'AI Agent nodes with built-in support for OpenAI (DALL-E), Google Gemini image generation, Anthropic Claude, and local models via Ollama',
              'HTTP Request nodes can call any image generation API (Flux, Stability AI, Midjourney via third-party APIs, etc.)',
              'Community workflow templates exist for image generation pipelines — e.g., “Free AI image generator with Gemini/ChatGPT” template that processes prompts, sends to image models, fetches results, and posts/saves them',
              'Image pipeline example: Manual trigger → set prompt values → AI Agent creates image via Gemini → code nodes process raw image data → HTTP node fetches result → save to disk or post to Telegram/Slack',
              'Post-processing: Convert formats, upload to hosting (Catbox, Cloudflare R2), save metadata to Airtable/Postgres',
              'Batch processing: Iterator nodes process arrays of prompts/products through image generation workflows',
              'No built-in image editing: No inpainting, compositing, style transfer, or upscaling nodes — these require external API calls',
            ],
          },
        ],
      },
      {
        title: 'Modularity & Architecture',
        content: [
          {
            kind: 'list',
            items: [
              'Highly modular: Every operation is a discrete node; nodes are infinitely composable',
              'Sub-workflows: Break complex automation into reusable sub-workflows for modularity',
              '500+ pre-built integration nodes for connecting to any SaaS tool',
              'Custom code nodes: Embed JavaScript or Python for any logic not covered by built-in nodes',
              'Open-source / self-hostable: Full control over data and infrastructure; deploy via Docker on your own servers',
              'Fair-code license: Free self-hosted community edition with unlimited executions; cloud plans start at $20/month',
              'API-accessible: Workflows can be triggered programmatically via webhooks',
              'MCP support: n8n workflows are callable by AI platforms via Model Context Protocol — give Claude, Lovable, or other agents direct access to your automations',
              'Enterprise features: SSO, RBAC, encrypted credentials, audit logs, air-gapped deployments',
            ],
          },
        ],
      },
      {
        title: 'Pricing',
        content: [
          {
            kind: 'list',
            items: [
              'Self-hosted Community Edition: Free (unlimited workflows, unlimited executions — only infrastructure costs of ~$5–10/month for VPS)',
              'Cloud Starter: $20/month for 2,500 executions',
              'Cloud Pro: ~$50/month',
              'Enterprise: Custom pricing with SSO, RBAC, audit logs',
              'AI API costs are separate and variable (typically $50–200/month depending on volume)',
              'Execution-based pricing: charges per full workflow execution, not per individual task/step — significantly cheaper than Zapier at scale',
            ],
          },
        ],
      },
      {
        title: 'Key Takeaway for Queen One',
        content: [
          { kind: 'p', text: 'n8n is relevant as an orchestration and automation layer, not as a direct creative tool competitor. For Queen One, n8n could serve as the backend pipeline that triggers image generation jobs, manages batch processing, routes outputs to QA (Sentinel), and distributes finished assets — all without custom backend code. The MCP server capability is particularly interesting for making Gen Canopy workflows accessible to AI agents. The self-hosted model also means complete data control, which matters for brand-sensitive content.' },
        ],
      },
    ],
  },
  {
    num: '3',
    name: 'Klaviyo',
    url: 'klaviyo.com',
    sections: [
      {
        title: 'Background & Positioning',
        content: [
          { kind: 'p', text: 'Klaviyo is a B2C CRM and marketing automation platform with 165,000+ paying customers, primarily serving e-commerce brands. It’s not an image generation tool — it’s included in this analysis because its flow builder and email template editor represent best-in-class examples of drag-and-drop visual builders designed for non-technical marketing users. Klaviyo’s UI/UX patterns are relevant as benchmarks for how Queen One could design simplified interfaces for brand teams.' },
        ],
      },
      {
        title: 'UI/UX Design',
        content: [
          {
            kind: 'list',
            label: 'Flow Builder (Automation Workflows)',
            items: [
              'Visual canvas with drag-and-drop nodes for building automated customer journeys',
              'Recently redesigned (2026) with a modern, intuitive look',
              'Minimap and navigation toolbar for quickly finding elements in complex flows',
              'Bird’s-eye view for seeing entire flow architecture at a glance',
              'Panning across the canvas with cursor',
              'Improved drag-and-drop menu: New, functional menu layout for adding actions (emails, SMS, push, delays, conditional splits, A/B tests)',
              'Flow configuration side panel: Customize settings, see message previews, create A/B tests, view performance metrics — all without leaving the flow builder',
              'Trigger Setup Preview: See the last 10 profiles who qualified for a flow with reasons why they entered',
              'Show Analytics mode: Toggle to display performance metrics on every node card directly on the canvas',
              'Nodes include: triggers (list, segment, metric, date, price drop), time delays, conditional splits, A/B tests, email/SMS/push actions',
              'Blue outline highlights every valid drop location as you drag',
              '“+” buttons at every node for quick action insertion',
            ],
          },
          {
            kind: 'list',
            label: 'Email Template Editor',
            items: [
              'Drag-and-drop block-based editor — stack blocks (text, images, buttons, product feeds, tables, dividers) into layouts',
              'Blocks and sections can be cloned, deleted, saved, moved',
              'Universal/saved content: Save reusable headers, footers, and sections to use across all templates',
              'Brand Library: Pre-populate brand styles (fonts, colors, logos) across all new templates',
              'Dynamic content blocks: Show/hide content based on recipient profile data',
              'Content loops: Create repeating blocks for products or articles without manual duplication',
              'Mobile preview integrated directly into the editor',
              'Automatic (near-instant) saving — no lost work',
              'AI features: Email AI generates complete section layouts from plain-text descriptions (3 options generated per prompt); text revision tools; AI-built flows from natural language descriptions',
              'Hybrid HTML support: Combine custom HTML with drag-and-drop blocks in the same email',
              '160+ customizable templates for e-commerce use cases',
            ],
          },
          {
            kind: 'list',
            label: 'UX Qualities Worth Noting',
            items: [
              'Extremely low latency — the editor feels responsive and fast',
              'The interface is “sober and clear” with advanced UI polish',
              'Mobile-first responsive design is baked in, not an afterthought',
              'Test email sending with weight estimates and profile-specific previews',
              'The flow builder’s “Review and Turn On” bulk status change is a great pattern for managing complex automation',
              'Conditional display settings per block (desktop vs. mobile, specific segments)',
            ],
          },
        ],
      },
      {
        title: 'Image Production Capabilities',
        content: [
          { kind: 'p', text: 'Klaviyo is not an image generation platform. Its image handling is limited to:' },
          {
            kind: 'list',
            items: [
              'Upload images from device or Image Library',
              'Dynamic image blocks that pull custom images per recipient from event data or profile properties',
              'AI-generated email sections can include image block layouts, but the images themselves are placeholders that must be manually added',
              'No AI image generation, no style transfer, no compositing',
              'Integration with external tools for image assets',
            ],
          },
        ],
      },
      {
        title: 'Modularity & Architecture',
        content: [
          {
            kind: 'list',
            items: [
              'Block-based modular email design: Every element (text, image, button, product, table) is a discrete, reusable block',
              'Section-based composition: Blocks live inside sections (single-column, multi-column); sections have independent styling',
              'Style cascade: Template styles → section styles → block styles (specificity wins)',
              'Universal content: Saved blocks/sections reusable across all templates',
              '350+ integrations with external tools and APIs',
              'Flow templates: Pre-built automation flows (welcome, cart abandonment, browse abandonment, post-purchase, winback) that can be activated and customized immediately',
              'API-accessible: Full programmatic access to campaigns, flows, profiles, segments',
            ],
          },
        ],
      },
      {
        title: 'Pricing',
        content: [
          {
            kind: 'list',
            items: [
              'Free tier: 250 contacts, 500 email sends/month',
              'Email-only: $150/month at 10,000 contacts; $720/month at 50,000 contacts',
              'SMS adds per-message costs on top',
              'AI features included in standard plans',
            ],
          },
        ],
      },
      {
        title: 'Key Takeaway for Queen One',
        content: [
          { kind: 'p', text: 'Klaviyo’s value for Queen One is as a UI/UX benchmark, not a product competitor. Specifically:' },
          {
            kind: 'list',
            items: [
              'The flow builder’s redesign demonstrates how to make complex visual automation accessible: minimap navigation, bird’s-eye view, inline analytics, side-panel configuration, and drag-and-drop that highlights valid drop zones',
              'The email builder’s “Universal Content” pattern — saved, reusable blocks — maps directly to how Gen Canopy could let brands save and reuse image generation presets, brand seed compositions, or approved style templates',
              'The AI content generation pattern (describe what you want in plain text → get 3 options → select and customize) is a proven UX for non-technical users and could be adapted for image generation prompting',
              'The conditional display/content loops approach could inform how Gen Canopy handles batch variant generation (swap product, background, or copy while maintaining layout)',
            ],
          },
        ],
      },
    ],
  },
  {
    num: '4',
    name: 'Flora AI',
    url: 'flora.ai',
    badge: 'Direct Weave Competitor',
    sections: [
      {
        title: 'Background & Positioning',
        content: [
          { kind: 'p', text: 'Flora AI (formerly FloraFauna.ai) is structurally the closest competitor to Figma Weave. Founded in 2024 by Weber Wong (former Menlo Ventures investor) and Alex Li in Brooklyn, NY. Raised $52M total ($6.5M seed from Menlo/Hanabi/a16z speedrun, then $42M Series A from Redpoint Ventures in January 2026). Used by Nike, Netflix, Pentagram, Lionsgate, WPP, AKQA, Alibaba, and Brex. Launched FAUNA (AI creative agent) in March 2026.' },
        ],
      },
      {
        title: 'UI/UX Design',
        content: [
          {
            kind: 'list',
            items: [
              'Infinite canvas with node-based workflow building — connect blocks composed of text/image/video models',
              '50+ AI models integrated (Flux 2 Pro, Seedream 4.5, Nano Banana Pro, GPT-5, Gemini 2.5, Kling, Veo 3.1)',
              'Browser-based — no local GPU required, no technical setup',
              '“ComfyUI’s power with Figma’s polish” — more approachable than ComfyUI, more powerful than simple prompt-and-generate tools',
              'FAUNA agent: Built-in AI creative agent that builds complete workflows in real time on a visible canvas — adds nodes, connects models, executes generations while users watch and steer',
              'Style DNA system: Upload reference images → Flora analyzes lighting, color grade, textures, mood → applies that aesthetic consistently across all subsequent generations. ~85% of outputs require only minor adjustments',
              'Real-time multiplayer collaboration (Figma-like)',
              'Industry templates for advertising, film pre-production, game concept art',
              'Image Editor integrated directly on the canvas',
              'Techniques: Pre-built professional creative workflows',
            ],
          },
          {
            kind: 'list',
            label: 'Weaknesses',
            items: [
              'Collaboration features less robust than Figma (commenting and sharing, but not full real-time co-editing)',
              'Steep learning curve — expect a week to get oriented',
              'No built-in character consistency system',
              'Gap between generation and publishing — still need separate tools for final formatting',
              'API is execution-only (no programmatic workflow composition), poll-based (no webhooks)',
            ],
          },
        ],
      },
      {
        title: 'Image Production',
        content: [
          {
            kind: 'list',
            items: [
              'Text-to-image, image-to-image, style transfer, image-to-video, 3D',
              'Style DNA for brand consistency across all generations',
              'Side-by-side model comparison (A/B testing with identical inputs)',
              'Chain multiple models: e.g., Flux for photorealistic → Seedream for cinematic color grading → upscale for print',
              'Camera-ready file export with preserved metadata, layered versions, color profiles',
              'Product photography workflows with consistent angles, backgrounds, lighting across SKUs',
            ],
          },
        ],
      },
      {
        title: 'Pricing (January 2026 overhaul)',
        content: [
          {
            kind: 'list',
            items: [
              'All plans include unlimited seats (pay for output, not headcount)',
              'Starter: $18/month ($0.90 per 1,000 credits)',
              'Studio: $54/month',
              'Scale: $200/month ($0.75 per 1,000 credits)',
              'Enterprise: Custom',
              'Free tier: 500 credits/month (no API access)',
            ],
          },
        ],
      },
      {
        title: 'Key Takeaway for Queen One',
        content: [
          { kind: 'p', text: 'Flora’s Style DNA system is the most directly relevant competitive feature for Queen One. The concept of analyzing reference images to extract a brand’s visual identity and then enforcing it consistently across AI generations is essentially what Sentinel + Gen Canopy should do together. Flora’s unlimited-seats-per-plan pricing model is also worth studying — it optimizes for creative output volume, not team size.' },
        ],
      },
    ],
  },
  {
    num: '5',
    name: 'Wireflow',
    url: 'wireflow.ai',
    badge: 'API-First Node Canvas',
    sections: [
      {
        title: 'Background & Positioning',
        content: [
          { kind: 'p', text: 'Wireflow is a cloud-based visual node editor built for developers and creative teams who need both a drag-and-drop canvas and programmatic control via REST API. It’s the closest direct swap for Weave for teams that need API-first execution. Founded by Andrew Adams; positions itself as the “build once on canvas, deploy via API” platform.' },
        ],
      },
      {
        title: 'UI/UX Design',
        content: [
          {
            kind: 'list',
            items: [
              'Drag-and-drop node canvas with 157 node types across image, video, audio, 3D, and utility categories',
              '50+ AI models (Recraft V4, Flux Pro, Kling 2.5, Nano Banana 2, Seedance)',
              'Color-coded ports show compatible data types for error-free connections',
              'Live previews at each node during execution',
              'Branching workflows: one node feeds multiple downstream processes',
              'Claude Skill integration: Describe a workflow in natural language from Claude Code → lands in shared cloud workspace',
              'MCP server included for Claude and Cursor integration',
              'Workflow-to-App publishing: Package workflows as standalone applications with custom subdomains',
              'Remotion integration: Pipe AI outputs into video compositions, schedule and auto-render branded videos',
              'Team workspaces with shared workflow libraries, credits, and connected social accounts',
            ],
          },
        ],
      },
      {
        title: 'Key Differentiators',
        content: [
          {
            kind: 'list',
            items: [
              'Dual-access architecture: Build visually, then trigger programmatically via REST API (webhooks, polling, idempotent execution)',
              'Batch processing: Queue hundreds of prompts for parallel processing',
              'Version control: Every workflow change tracked and reversible',
              'Single plan with 100+ models — simple pricing',
            ],
          },
        ],
      },
      {
        title: 'Key Takeaway for Queen One',
        content: [
          { kind: 'p', text: 'Wireflow’s dual-access architecture (visual canvas + production REST API) is the pattern Gen Canopy should follow. Brand teams build/customize workflows visually; engineering triggers them programmatically at scale. The “workflow-to-app” publishing feature is also compelling — packaging a generation pipeline as a standalone tool that non-technical stakeholders can use.' },
        ],
      },
    ],
  },
  {
    num: '6',
    name: 'ComfyUI',
    url: 'github.com/comfyanonymous/ComfyUI',
    badge: 'Open Source Benchmark',
    sections: [
      {
        title: 'Background & Positioning',
        content: [
          { kind: 'p', text: 'ComfyUI is the open-source benchmark for node-based image generation. It’s a self-hosted node graph editor with the largest community model library (60,000+ custom nodes). Dominates Reddit as the most flexible interface for Flux, Stable Diffusion, and ControlNet workflows. Entirely free but requires a local GPU (typically 8GB+ VRAM, ideally 12GB+).' },
        ],
      },
      {
        title: 'UI/UX Design',
        content: [
          {
            kind: 'list',
            items: [
              'Technical node graph interface — functional but not polished',
              'Steepest learning curve of any platform in this space',
              'Every aspect of the diffusion pipeline is exposed as a discrete node (model loader, sampler, VAE decoder, LoRA loader, conditioning, etc.)',
              'Subgraph support for organizing complex workflows',
              'JSON workflow import/export for sharing',
              'Desktop app available for zero-config local use',
              'Managed cloud options exist (RunComfy, ThinkDiffusion) for browser-based access without local GPU',
            ],
          },
        ],
      },
      {
        title: 'Image Production',
        content: [
          {
            kind: 'list',
            items: [
              'Maximum flexibility — any Stable Diffusion/Flux pipeline is buildable',
              'ControlNet, IP-Adapter, regional prompting, inpainting, outpainting as native nodes',
              'Custom samplers, LoRA loading, model merging',
              'Krea 2 Turbo now available as Partner Nodes',
              'Style LoRAs for consistent visual aesthetics',
              'Batch processing via scripting',
            ],
          },
        ],
      },
      {
        title: 'Key Takeaway for Queen One',
        content: [
          { kind: 'p', text: 'ComfyUI is the technical gold standard but the UX anti-pattern. Its power comes from exposing every single parameter, which makes it inaccessible to non-technical users. Queen One should offer ComfyUI-level pipeline control under the hood while presenting Weave/Flora-level simplicity on top — the “App Mode” pattern that Figma Weave pioneered.' },
        ],
      },
    ],
  },
  {
    num: '7',
    name: 'Krea AI',
    url: 'krea.ai',
    badge: 'Real-Time Generation',
    sections: [
      {
        title: 'Background & Positioning',
        content: [
          { kind: 'p', text: 'Krea AI is built around real-time image generation where changes to prompts or sketches update the output in under a second. Recently launched Krea 2, its own foundational image model (12 billion parameters on Diffusion Transformer architecture). Available as both a standalone platform and as Partner Nodes in ComfyUI.' },
        ],
      },
      {
        title: 'UI/UX Design',
        content: [
          {
            kind: 'list',
            items: [
              'Real-time canvas where you sketch, drag reference images, and see AI generations update live',
              'Simplified node system with lowest learning curve in the category',
              'Moodboard conditioning: create visual moodboards on the platform, assign IDs, and reference them in generations',
              'Style reference input: feed a reference image and the model extracts/applies its style',
              'Creativity parameter with four levels (Raw, Low, Medium, High) — balances prompt adherence vs. artistic interpretation',
            ],
          },
        ],
      },
      {
        title: 'Image Production',
        content: [
          {
            kind: 'list',
            items: [
              'Krea 2 Turbo: 8-step inference for fast generation',
              'Natural language prompting (no structured JSON)',
              'Style transfer via reference images',
              'Moodboard-based visual direction',
              'Open-weight model available for local deployment',
              'Two variants: Large (more textured/flexible) and Medium (faster, more consistent)',
              'Strong in illustration, anime, painting, and artistic styles',
            ],
          },
        ],
      },
      {
        title: 'Key Takeaway for Queen One',
        content: [
          { kind: 'p', text: 'Krea’s real-time preview UX is compelling for creative exploration. The moodboard conditioning pattern (define visual direction via curated reference images rather than text prompts) could inform how Gen Canopy handles brand seed composition — visual references rather than verbose prompt engineering.' },
        ],
      },
    ],
  },
];

interface OtherPlatform {
  name: string;
  url?: string;
  items: string[];
}

const OTHER_PLATFORMS: OtherPlatform[] = [
  {
    name: 'Higgsfield Canvas',
    items: [
      'Node-based pipeline tool for cinematic output (VFX, product photography, fashion campaigns, brand animation)',
      'Directed camera control system',
      'Best-in-class for AI video with specific camera moves',
      'Closed source, free tier available',
    ],
  },
  {
    name: 'Freepik Spaces',
    items: [
      'Node-based AI canvas integrated with Freepik’s 247M stock assets',
      'Useful for marketing teams needing brand-safe, licensed visuals alongside AI generation',
      'Real-time collaboration (up to 10 users)',
      'Models include FLUX, Google Imagen, Freepik’s own variants',
      'Bundles with Freepik Premium subscriptions',
    ],
  },
  {
    name: 'InvokeAI',
    items: [
      'Open-source Stable Diffusion frontend with both simple UI and node-based workflow editor',
      '“Workflow Library” for saving, sharing, versioning node graphs',
      'Canvas mode with inpainting/outpainting',
      'ControlNet, IP-Adapter, regional prompting as native nodes',
      'Simpler installation than ComfyUI (one-click installer)',
      'Commercial InvokeAI Pro tier adds cloud hosting',
      'Best for artists who want ComfyUI-level power with a friendlier interface',
    ],
  },
  {
    name: 'Martini',
    url: 'martini.art',
    items: [
      'Browser-based node canvas with 50+ frontier models (Sora 2, Runway Gen-4, Kling 3.0, Veo 3.1)',
      '“Fan-out” feature runs one prompt across multiple models simultaneously',
      'Free tier: 200 credits/month',
      'Strongest ComfyUI alternative for video (native frontier video model support)',
      'No custom LoRA uploads',
    ],
  },
  {
    name: 'Fal.ai',
    items: [
      'API-first serverless inference platform',
      'Developer-focused with usage-based pricing',
      'No visual canvas — pure programmatic access',
      'Best for backend integration where visual workflow building isn’t needed',
    ],
  },
  {
    name: 'Dify',
    items: [
      'Visual canvas for building LLM-powered applications',
      'Focus on text-based AI apps, not media generation',
      'Production-ready with built-in monitoring and 50+ model providers',
      'Both cloud and self-hosted',
      'Less relevant for image generation but interesting for agentic AI application patterns',
    ],
  },
];

const MATRIX_COLUMNS = ['Figma Weave', 'n8n', 'Klaviyo', 'Flora AI', 'Wireflow', 'ComfyUI', 'Krea AI'];

const MATRIX_ROWS: { feature: string; values: string[] }[] = [
  { feature: 'Primary Use', values: ['Creative production', 'General automation', 'Marketing automation', 'Creative production', 'Creative + API', 'Image generation', 'Real-time generation'] },
  { feature: 'Interface Type', values: ['Node canvas', 'Flowchart canvas', 'Drag-and-drop blocks', 'Infinite canvas', 'Node canvas', 'Node graph', 'Real-time canvas'] },
  { feature: 'Learning Curve', values: ['Medium-High', 'Medium', 'Low', 'Medium-High', 'Medium', 'Very High', 'Low'] },
  { feature: 'Target User', values: ['Designers/teams', 'Developers/ops', 'Marketers', 'Creatives/agencies', 'Dev + creative', 'Technical users', 'Designers/artists'] },
  { feature: 'AI Models', values: ['Multi-model', 'Via integrations', 'N/A (text AI only)', '50+ models', '50+ models', 'Open-weight', 'Krea 2 + others'] },
  { feature: 'Image Generation', values: ['Yes (core)', 'Via API calls', 'No', 'Yes (core)', 'Yes (core)', 'Yes (core)', 'Yes (core)'] },
  { feature: 'Style Consistency', values: ['Design system layer', 'Manual', 'Brand Library', 'Style DNA', 'Via workflows', 'LoRAs/ControlNet', 'Moodboards/refs'] },
  { feature: 'REST API', values: ['No (canvas-only)', 'Yes (webhooks)', 'Yes', 'Limited (execute only)', 'Yes (full)', 'Scriptable', 'Limited'] },
  { feature: 'Self-Hostable', values: ['No', 'Yes (free)', 'No', 'No', 'No', 'Yes (free)', 'No'] },
  { feature: 'Real-Time Collab', values: ['Yes (Figma-native)', 'No', 'No', 'Yes', 'Team workspaces', 'No', 'No'] },
  { feature: 'Batch Processing', values: ['Yes (CSV-driven)', 'Yes (iterators)', 'Yes (flows)', 'Yes', 'Yes (API)', 'Yes (scripting)', 'No'] },
  { feature: 'Video Generation', values: ['Yes (5–15s social)', 'Via API', 'No', 'Yes', 'Yes', 'Limited', 'Limited'] },
  { feature: 'Pricing Entry', values: ['Free tier', 'Free (self-host)', 'Free (250 contacts)', 'Free (500 credits)', 'Subscription', 'Free (need GPU)', 'Free tier'] },
];

const RECOMMENDATIONS: { title: string; text: string }[] = [
  { title: '1. Adopt the “App Mode” Pattern (from Figma Weave)', text: 'Package complex Gen Canopy workflows behind simplified UIs. Brand teams shouldn’t need to understand node graphs — they should see a simple tool that says “Product Photo on White Background” with an image input and a generate button. The complexity lives underneath.' },
  { title: '2. Build a Style DNA / Brand Seed System (from Flora AI)', text: 'Flora’s approach of analyzing reference images to extract visual identity and then enforcing it consistently is exactly what Sentinel + Gen Canopy should do. Upload brand references → extract the “seed” (lighting, color, texture, composition) → apply consistently across all generations → score compliance automatically.' },
  { title: '3. Implement Dual-Access Architecture (from Wireflow)', text: 'Build Gen Canopy with both a visual interface for human users AND a REST API for programmatic access. This lets brand teams create and customize workflows visually, while engineering triggers batch generation jobs, integrates with SKU stores, and automates production pipelines.' },
  { title: '4. Study Klaviyo’s Flow Builder UX for Sentinel Workflows', text: 'Klaviyo’s recently redesigned flow builder demonstrates how to make complex multi-step automation feel accessible: minimap navigation, inline analytics, side-panel configuration, valid-drop-zone highlighting, and bulk status management. Apply these patterns to Sentinel’s QA workflows.' },
  { title: '5. Consider n8n as Orchestration Infrastructure', text: 'Rather than building custom backend automation from scratch, n8n could serve as the orchestration layer for Queen One’s image pipeline: trigger generation → route to QA → score with Sentinel → approve/reject → distribute. Self-hosted, free, API-accessible, and MCP-compatible.' },
  { title: '6. Prioritize Multi-Model Flexibility', text: 'Every serious platform in this space supports multiple AI models. Gen Canopy should not be locked to a single provider. Allow model selection per workflow step (e.g., Flux for photorealism, Seedream for color grading, Krea for artistic styles) and make it easy to swap in new models as they ship.' },
  { title: '7. Real-Time Preview for Creative Exploration (from Krea AI)', text: 'For the creative exploration phase (before production), offer real-time or near-real-time generation previews. This is the difference between “submit and wait” and “sketch and iterate.” Krea’s sub-second feedback loop is the gold standard here.' },
];

function ContentBlock({ content }: { content: Content }) {
  if (content.kind === 'p') {
    return <p style={{ fontSize: '14px', lineHeight: 1.65, color: T.sub, margin: '0 0 10px 0' }}>{content.text}</p>;
  }
  return (
    <div style={{ marginBottom: '10px' }}>
      {content.label && (
        <p style={{ fontSize: '13px', fontWeight: 700, color: T.heading, margin: '0 0 6px 0' }}>{content.label}</p>
      )}
      <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {content.items.map((item, i) => (
          <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.55, color: T.sub }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '26px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff', background: T.accent, borderRadius: '8px', padding: '3px 9px' }}>
          {platform.num}
        </span>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: T.heading, margin: 0 }}>{platform.name}</h2>
        {platform.url && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: T.accent, fontWeight: 600 }}>
            <ExternalLink size={12} /> {platform.url}
          </span>
        )}
        {platform.badge && (
          <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 9px', borderRadius: '99px', background: T.pill, color: T.pillText }}>
            {platform.badge}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {platform.sections.map((section, si) => {
          const isTakeaway = section.title.startsWith('Key Takeaway');
          return (
            <div
              key={si}
              style={isTakeaway ? {
                background: T.takeawayBg,
                border: `1px solid ${T.takeawayBorder}`,
                borderRadius: '12px',
                padding: '16px 18px',
              } : undefined}
            >
              <h3 style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isTakeaway ? T.takeawayText : T.accent,
                margin: '0 0 10px 0',
              }}>
                {section.title}
              </h3>
              {section.content.map((c, ci) => (
                <ContentBlock key={ci} content={c} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WeaveTypeFeaturesDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: T.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Title / header */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '26px 28px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: T.heading, margin: '0 0 6px 0' }}>
              Weave-Type Features
            </h1>
            <p style={{ fontSize: '14px', color: T.sub, margin: '0 0 4px 0' }}>
              Competitive Analysis: Image Generation &amp; Creative Workflow Platforms
            </p>
            <p style={{ fontSize: '13px', color: T.sub, margin: 0 }}>
              Prepared for Queen One — Generations / Gen Canopy Product Development · June 29, 2026
            </p>
          </div>

          {/* Executive Summary */}
          <div style={{ background: T.accentBg, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '22px 26px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: T.accent, margin: '0 0 10px 0' }}>
              Executive Summary
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.65, color: T.sub, margin: 0 }}>
              This document covers six categories of platforms relevant to Queen One’s image generation software development: Figma Weave (node-based creative workflows integrated with design), n8n (open-source general-purpose workflow automation with AI capabilities), Klaviyo (e-commerce marketing automation with drag-and-drop email/flow builders), and several additional competitors discovered during research — Flora AI, Wireflow, ComfyUI, Krea AI, Higgsfield Canvas, and others. Each section covers UI/UX design patterns, image production capabilities, modularity/architecture, pricing, and strategic takeaways for Queen One.
            </p>
          </div>

          {/* Platform deep-dives */}
          {PLATFORMS.map((p) => (
            <PlatformCard key={p.num} platform={p} />
          ))}

          {/* Other notable platforms */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '26px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff', background: T.accent, borderRadius: '8px', padding: '3px 9px' }}>8</span>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: T.heading, margin: 0 }}>Other Notable Platforms</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {OTHER_PLATFORMS.map((op) => (
                <div key={op.name} style={{ background: T.accentBg, border: `1px solid ${T.border}`, borderRadius: '12px', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: T.heading, margin: 0 }}>{op.name}</h3>
                    {op.url && <span style={{ fontSize: '11px', color: T.accent }}>{op.url}</span>}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {op.items.map((it, i) => (
                      <li key={i} style={{ fontSize: '12.5px', lineHeight: 1.5, color: T.sub }}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison matrix */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '26px 28px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: T.heading, margin: '0 0 18px 0' }}>
              Cross-Platform Comparison Matrix
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', minWidth: '820px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 10px', color: T.heading, fontWeight: 700, borderBottom: `2px solid ${T.border}`, position: 'sticky', left: 0, background: T.card }}>
                      Feature
                    </th>
                    {MATRIX_COLUMNS.map((col) => (
                      <th key={col} style={{ textAlign: 'left', padding: '8px 10px', color: T.accent, fontWeight: 700, borderBottom: `2px solid ${T.border}`, whiteSpace: 'nowrap' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX_ROWS.map((row, ri) => (
                    <tr key={row.feature} style={{ background: ri % 2 === 0 ? 'transparent' : T.accentBg }}>
                      <td style={{ padding: '8px 10px', color: T.heading, fontWeight: 600, borderBottom: `1px solid ${T.border}`, position: 'sticky', left: 0, background: ri % 2 === 0 ? T.card : T.accentBg }}>
                        {row.feature}
                      </td>
                      {row.values.map((v, vi) => (
                        <td key={vi} style={{ padding: '8px 10px', color: T.sub, borderBottom: `1px solid ${T.border}` }}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic recommendations */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '26px 28px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: T.heading, margin: '0 0 18px 0' }}>
              Strategic Recommendations for Queen One
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {RECOMMENDATIONS.map((rec) => (
                <div key={rec.title} style={{ background: T.takeawayBg, border: `1px solid ${T.takeawayBorder}`, borderRadius: '12px', padding: '16px 18px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.takeawayText, margin: '0 0 8px 0' }}>{rec.title}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: T.sub, margin: 0 }}>{rec.text}</p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '12px', color: T.sub, textAlign: 'center', fontStyle: 'italic', margin: 0 }}>
            Research compiled June 29, 2026. All pricing and feature details subject to change — verify against current product pages before making strategic decisions.
          </p>

        </div>
      </div>
    </div>
  );
}
