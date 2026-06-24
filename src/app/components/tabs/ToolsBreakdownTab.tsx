export function ToolsBreakdownTab() {
  const toolsData = [
    {
      category: 'Batch Generation',
      description: 'Ability to generate multiple product images at scale efficiently',
      leaders: ['Gen Canopy', 'Claid.ai', 'Nightjar', 'Kaptured AI', 'Photoroom', 'Kive.ai', 'AdCreative.ai'],
      partial: ['Canva', 'Adobe Firefly', 'Krea AI', 'Flair.ai', 'Pebblely', 'Stable Diffusion'],
      missing: ['ChatGPT', 'Midjourney']
    },
    {
      category: 'Brand Lock',
      description: 'Maintain consistent brand identity across all generated assets',
      leaders: ['Gen Canopy', 'Claid.ai', 'Nightjar', 'Kaptured AI'],
      partial: ['Canva', 'Adobe Firefly', 'AdCreative.ai', 'Krea AI', 'Photoroom', 'Kive.ai', 'Flair.ai'],
      missing: ['ChatGPT', 'Midjourney', 'Stable Diffusion', 'Pebblely']
    },
    {
      category: 'Scene Builder',
      description: 'Visual tool to construct product scenes and environments',
      leaders: ['Gen Canopy', 'Flair.ai'],
      partial: ['Claid.ai', 'Nightjar', 'Krea AI', 'Kive.ai'],
      missing: ['Canva', 'Adobe Firefly', 'AdCreative.ai', 'ChatGPT', 'Midjourney', 'Stable Diffusion', 'Photoroom', 'Pebblely', 'Kaptured AI']
    },
    {
      category: 'Product SKU Library',
      description: 'Centralized management of product catalog and assets',
      leaders: ['Gen Canopy', 'Kive.ai'],
      partial: ['Claid.ai', 'Nightjar', 'Kaptured AI'],
      missing: ['Canva', 'Adobe Firefly', 'AdCreative.ai', 'ChatGPT', 'Midjourney', 'Krea AI', 'Stable Diffusion', 'Flair.ai', 'Photoroom', 'Pebblely']
    },
    {
      category: 'Style Presets',
      description: 'Pre-configured visual styles for consistent output',
      leaders: ['Gen Canopy', 'Adobe Firefly', 'Krea AI', 'Claid.ai', 'Nightjar', 'Kive.ai'],
      partial: ['Canva', 'AdCreative.ai', 'Midjourney', 'Stable Diffusion', 'Flair.ai', 'Photoroom', 'Pebblely', 'Kaptured AI'],
      missing: ['ChatGPT']
    },
    {
      category: 'Multi-Brand Support',
      description: 'Manage multiple brands within single platform',
      leaders: ['Gen Canopy', 'Adobe Firefly'],
      partial: ['Canva', 'AdCreative.ai', 'Krea AI', 'Claid.ai', 'Photoroom'],
      missing: ['ChatGPT', 'Midjourney', 'Stable Diffusion', 'Nightjar', 'Flair.ai', 'Pebblely', 'Kaptured AI', 'Kive.ai']
    }
  ];

  const pricingTiers = [
    { tier: 'Free / Freemium', platforms: ['Canva', 'ChatGPT', 'Krea AI', 'Stable Diffusion', 'Flair.ai', 'Pebblely'] },
    { tier: '$10 - $50/mo', platforms: ['Midjourney', 'Claid.ai', 'Nightjar', 'Kive.ai', 'Photoroom'] },
    { tier: '$50 - $120/mo', platforms: ['Adobe Firefly (CC)', 'AdCreative.ai', 'Krea AI (Max)', 'Photoroom (high tier)'] },
    { tier: 'Agency / Enterprise', platforms: ['Gen Canopy', 'Krea AI Business/Enterprise', 'Kaptured AI'] }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-2xl border border-amber-200 p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tools & Features Breakdown</h2>
        <p className="text-gray-600">
          Detailed analysis of core capabilities across the competitive landscape, organized by feature category.
        </p>
      </div>

      {/* Feature Breakdown */}
      <div className="space-y-6">
        {toolsData.map((tool, index) => (
          <div key={index} className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.category}</h3>
            <p className="text-gray-600 mb-4">{tool.description}</p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Native Support */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Native Support
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tool.leaders.map((platform, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        platform === 'Gen Canopy'
                          ? 'bg-amber-700 text-white'
                          : 'bg-green-200 text-green-900'
                      }`}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Partial Support */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <span className="text-yellow-600">~</span>
                  Partial / Workaround
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tool.partial.map((platform, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-xs font-medium"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* No Support */}
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <span className="text-red-600">✗</span>
                  Not Available
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tool.missing.map((platform, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-200 text-red-900 rounded-full text-xs font-medium"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Analysis */}
      <div className="bg-white rounded-2xl border border-amber-200 p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Pricing Tier Analysis</h3>

        <div className="space-y-4">
          {pricingTiers.map((tier, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-5">
              <h4 className="text-lg font-bold text-gray-900 mb-3">{tier.tier}</h4>
              <div className="flex flex-wrap gap-2">
                {tier.platforms.map((platform, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      platform === 'Gen Canopy'
                        ? 'bg-amber-700 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="text-amber-800 font-bold">1.</span>
            <span><strong>Gen Canopy is the only platform with native support across all 6 core features</strong>, establishing clear differentiation in the Cat 3+ space.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-800 font-bold">2.</span>
            <span><strong>Scene Builder remains a major differentiator</strong> with only Flair.ai offering comparable functionality, but lacking enterprise features.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-800 font-bold">3.</span>
            <span><strong>Product SKU Library support is rare</strong>, with Kive.ai closest beyond Gen Canopy and Krea AI stopping at asset/model management rather than SKU operations.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-800 font-bold">4.</span>
            <span><strong>Agency/Enterprise pricing creates natural moat</strong> against freemium tools, focusing on high-value customer segments.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-800 font-bold">5.</span>
            <span><strong>Multi-brand support gaps</strong> across most Cat 3 competitors create opportunities for agency-focused marketing.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
