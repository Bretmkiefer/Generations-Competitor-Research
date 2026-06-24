export function CustomerFeedbackTab() {
  const feedback = [
    {
      platform: 'Canva',
      positive: [
        '"Simple, effective, fast and reliable editor that I depend on for my social media photos editing and content creation." (Capterra)',
        '"Being able to create posters, logos, gift vouchers, and lots of other advertisements for my business for free is a game changer." (Capterra)',
        '"I use Canva every day. For personal use and work, it never disappoints." (Trustpilot)'
      ],
      negative: [
        '"Many times I would start with the Canva AI Photo Editor and it would give me an image that had absolutely nothing to do with what I was referencing." (Capterra)',
        '"Their specific AI photo editor was a flop. I continue using DALL-E and other AI photo tools instead." (Capterra)',
        '"A good chunk of images and stickers have recently been moved to the paid version, which can be disappointing." (Capterra)'
      ]
    },
    {
      platform: 'Adobe Firefly',
      positive: [
        '"Firefly is great for ideation and helping get a concept moving with a client. Adobe empowers artists to create something and then take it into one of the many apps to add their own creative flair." (Adobe Community)',
        '"I find using simple prompts works best for Adobe Firefly. It delivers solid results when you keep things focused." (Adobe Community)'
      ],
      negative: [
        '"Firefly ignores most of my prompts and gives me simple low quality images that don\'t even make sense. I describe what I want with great detail and it ignores what I want and gives me random stuff." (Adobe Community)',
        '"Firefly is so embarrassingly bad, I can\'t believe Adobe would release it." (Adobe Community)',
        '"Being able to compare all the major models to Firefly, you see just how behind and primitive it is. Adobe Firefly is useless and maddening, producing so much unusable garbage." (Adobe Community)'
      ]
    },
    {
      platform: 'AdCreative.ai',
      positive: [
        'Users report it is effective for quickly generating multiple ad variants for paid media campaigns and A/B testing across Facebook and Google.'
      ],
      negative: [
        'No widely circulated public reviews specific to product photography use cases, which itself confirms it is not being used or evaluated in that context.'
      ]
    },
    {
      platform: 'ChatGPT / GPT-4o',
      positive: [
        '"What started as casual experimentation quickly turned into amazement when the results were virtually indistinguishable from real photos. There\'s no need for the more technical jargon you need when prompting other AI image tools." (Tom\'s Guide)',
        '"Each one took just one prompt and no refinements to achieve including the text in the images." (Substack / Cassie Kozyrkov)',
        'Users flooded social media praising its ability to turn product photos into styled lifestyle scenes within seconds, with many noting it had replaced their previous go-to tools overnight.'
      ],
      negative: [
        'Product photographers and brand teams consistently note that every generation is a fresh interpretation: logos distort, product geometry shifts, and colors drift with no way to lock them across a batch.',
        '"You can\'t rely on it to keep your product looking like your product from one image to the next. It\'s great for one-offs but useless for a catalog." (Reddit r/ecommerce)'
      ]
    },
    {
      platform: 'Midjourney v7',
      positive: [
        '"V7 pushed material realism further. Users found camera filename prompts produced results described as almost impossible to detect as synthetic." (CheckThat.ai)',
        '"Midjourney interprets prompts more like an art director than a literal translator; it adds compositional choices, lighting decisions, and stylistic flourishes that many creative professionals actually prefer." (CheckThat.ai)',
        '"I\'ve been using Midjourney for about a year to produce artistic pictures and as of May 2026, it is once again producing quality images." (Trustpilot)'
      ],
      negative: [
        '"One of the worst AI image tools I\'ve used. The quality is extremely inconsistent and nowhere near the level people hype it up to be. I spent an entire week trying to get decent results and mostly got disappointing outputs." (Trustpilot)',
        '"It doesn\'t understand any of my prompts. Even simple prompts like keep the camera angle the same it just ignores it." (Trustpilot)',
        '"They blocked my account after three hours of buying a paid plan with no explanation and no refund." (Trustpilot)'
      ]
    },
    {
      platform: 'Krea AI',
      positive: [
        'Krea\'s own positioning highlights a broad all-in-one creative suite: image generation, video generation, 3D, upscaling, editing, realtime rendering, LoRA fine-tuning, and an asset manager in one subscription.',
        'The realtime canvas is a meaningful UX differentiator for rapid visual exploration because users can steer generations through typing or drawing instead of waiting on a prompt-only loop.',
        'LoRA fine-tuning supports product or style training from a few images, making Krea more relevant for product preservation than most general AI art tools.'
      ],
      negative: [
        'Krea is not organized around a persistent SKU catalog, reusable production recipes, or e-commerce campaign workflows, so product teams still need to assemble their own process around the tool.',
        'The breadth of models and compute-unit pricing can create decision overhead for non-technical users who only want repeatable product photography.',
        'Brand consistency depends on LoRA setup, prompt discipline, and asset management rather than a dedicated brand-lock or multi-product catalog system.'
      ]
    },
    {
      platform: 'Stable Diffusion',
      positive: [
        'Praised across developer communities for being fully free, locally runnable, and endlessly customizable through fine-tuning and LoRA models.',
        'Technical users appreciate having full control over training data, model weights, and output resolution without any subscription or usage limits.'
      ],
      negative: [
        'Consistently flagged as inaccessible to non-technical users — requires GPU hardware, command-line setup, and significant time investment before producing usable results.',
        'No brand structure, no saved styles, and no product preservation without custom development work on top of the base model.'
      ]
    },
    {
      platform: 'Claid.ai',
      positive: [
        '"This software is extremely good. I\'ve been using Claid for some months now, and the quality it gives is outstanding, unmatched by anything I\'ve ever seen before. The images, reflections, and lighting all look real." (Trustpilot)',
        '"I love how user-friendly the API is. Even with limited technical knowledge, I was able to integrate it into our e-commerce site without much hassle." (AITools.xyz)',
        '"Claid has allowed us to consistently produce high-quality images that accurately represent our products. This reliability has improved customer trust and satisfaction." (AITools.xyz)'
      ],
      negative: [
        '"Surprised by all the positive reviews. The tool\'s outcomes always look ridiculous and super unnatural." (Trustpilot)',
        '"The service has occasional downtimes which can disrupt my workflow when I need to process images quickly." (AITools.xyz)',
        'Users without technical backgrounds report the API setup as a barrier, noting that those who cannot code struggle to access the platform\'s most powerful features.'
      ]
    },
    {
      platform: 'Nightjar',
      positive: [
        'Nightjar is too new to have a large public review base; it launched on the Shopify App Store in December 2025 and currently has no public ratings there yet.',
        'Among professional reviewers and e-commerce blogs, it receives consistent praise for its reusable ingredient model: "For e-commerce brands that need catalog-level consistency across hundreds of SKUs, Nightjar is the strongest option because of its dual consistency systems."',
        '"A Nightjar Recipe applies one photographic brief across all products. The real cost difference versus Photoroom is labor, not subscription fees." (Nightjar vs Photoroom independent review)'
      ],
      negative: [
        'No mass negative reviews yet due to its recent launch, but the single-brand Shopify-only model is flagged by industry analysts as a ceiling for teams managing multiple clients.',
        'Generation limits on the base tier (150/month at $25) are noted as restrictive for high-volume catalog production.'
      ]
    },
    {
      platform: 'Flair.ai',
      positive: [
        '"Simple, drag and drop, easy to use and such awesome results." (G2)',
        '"Very helpful website for any product design — simple upload, product automatically generates background and suggests templates." (G2)',
        '"Excellent customer service — made a slight error with my plan and it was sorted within two hours." (Trustpilot)'
      ],
      negative: [
        '"Poor results at a great expense. I have now spent many dollars using their advice, still with very poor results." (Trustpilot)',
        '"The pricing is unreasonably high for what the service offers. The results do not justify the cost." (Trustpilot)',
        '"Extremely greedy with subscriptions and annoyingly restrictive against free users by limiting every basic feature including downloads." (Trustpilot)',
        '"Just purchased it and have done two images. It keeps saying you need to buy more coins to do more images but surely once you pay a weekly amount you don\'t need to pay more after just doing two images." (Trustpilot)'
      ]
    },
    {
      platform: 'Photoroom',
      positive: [
        '"The background removal and workflow for creating social media posts from photos are fantastic, really well thought out and executed." (Product Hunt)',
        '"Great for photo editing and producing content. Easy to navigate. Cleans up photos nicely. Many options to choose from." (Capterra)',
        '"I love it and use it often for my social media content. The paid version has a lot more options but the free one is great too." (Capterra)'
      ],
      negative: [
        'Trustpilot shows 1.3 out of 5 across 164 reviews, with 80% being one-star — primarily driven by billing complaints and mid-subscription feature changes.',
        '"There was a bug with their pro subscription for the three weeks I paid for the app. It is not possible to use pro features. Despite following their instructions, it didn\'t work, and support was very poor." (Product Hunt)',
        '"Sometimes it takes out more than you wanted, specifically when cutting out a person to put in a different background." (Capterra)'
      ]
    },
    {
      platform: 'Pebblely',
      positive: [
        'Users consistently praise its simplicity and the 40 free images per month as a low-risk entry point for small sellers with no design experience.',
        'The automated background themes are noted as clean and professional for basic marketplace listings on Amazon and Etsy.'
      ],
      negative: [
        'Experienced users and growing brands quickly hit the ceiling of the pre-built theme library, noting there is no way to create a custom look that reflects their brand identity.',
        'Not built for teams — single-user focused with no collaboration or workspace features.'
      ]
    },
    {
      platform: 'Kaptured AI',
      positive: [
        'Enterprise-focused features',
        'Strong batch generation',
        'Excellent brand lock',
        'Built for large-scale operations'
      ],
      negative: [
        'Enterprise-only pricing (not accessible)',
        'No public pricing transparency',
        'Limited multi-brand support',
        'Overkill for small teams'
      ]
    },
    {
      platform: 'Kive.ai',
      positive: [
        '"For the first time in years, I realized I could take control of our brand." (Live customer — Bee Inspired)',
        '"Kive is the best AI visual platform we\'ve tried." (Senior Marketing Manager, Braun Büffel)',
        '"Kive was the first platform where I was like, wait, this is actually worth using." (Art Director, Onia)',
        '"I really like how easy it is to find beautiful content and inspiration for my everyday work. The keywords are really good and very practical to use." (G2)'
      ],
      negative: [
        '"Sometimes I find it a little difficult to navigate throughout the platform because of the design." (G2)',
        'Users note that while the product model training is powerful, it requires multiple reference uploads and iteration before output quality becomes consistent enough for production use.',
        'No structured formula system — users wanting to lock a complete creative brief across a catalog batch report having to rebuild settings manually for each new product.'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-2xl border border-amber-200 p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Feedback Analysis</h2>
        <p className="text-gray-600">
          Real user feedback collected from reviews, forums, and customer interviews across all competitive platforms.
        </p>
      </div>

      {/* Feedback Cards */}
      <div className="grid gap-6">
        {feedback.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl border border-amber-200 p-6 shadow-sm ${
              item.platform === 'Gen Canopy' ? 'ring-2 ring-indigo-500/20' : ''
            }`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${
              item.platform === 'Gen Canopy' ? 'text-amber-900' : 'text-gray-900'
            }`}>
              {item.platform}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Positive Feedback */}
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  Positive Feedback
                </h4>
                <ul className="space-y-2">
                  {item.positive.map((comment, idx) => (
                    <li key={idx} className="flex gap-2 text-gray-700">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{comment}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Negative Feedback */}
              <div>
                <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <span className="text-xl">✗</span>
                  Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {item.negative.map((comment, idx) => (
                    <li key={idx} className="flex gap-2 text-gray-700">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{comment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
