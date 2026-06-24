export function OverviewTab() {
  const platforms = [
    { name: 'Gen Canopy', cat: '3+', batchGen: '✓', brandLock: '✓', sceneBuilder: '✓', productSKU: '✓', stylePresets: '✓', multiBrand: '✓', pricing: 'Agency / enterprise', catColor: 'bg-emerald-500' },
    { name: 'Canva', cat: '1', batchGen: '~', brandLock: '~', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '~', pricing: 'Freemium → team', catColor: 'bg-amber-500' },
    { name: 'Adobe Firefly', cat: '1', batchGen: '~', brandLock: '~', sceneBuilder: '✗', productSKU: '✗', stylePresets: '✓', multiBrand: '✓', pricing: 'Subscription + CC', catColor: 'bg-amber-500' },
    { name: 'AdCreative.ai', cat: '1', batchGen: '✓', brandLock: '~', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '~', pricing: 'Tiered subscription', catColor: 'bg-amber-500' },
    { name: 'ChatGPT / GPT-4o', cat: '2', batchGen: '✗', brandLock: '✗', sceneBuilder: '✗', productSKU: '✗', stylePresets: '✗', multiBrand: '✗', pricing: 'Free / $20/mo', catColor: 'bg-orange-500' },
    { name: 'Midjourney v7', cat: '2', batchGen: '✗', brandLock: '✗', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '✗', pricing: '$10 – $120/mo', catColor: 'bg-orange-500' },
    { name: 'Krea AI', cat: '2', batchGen: '~', brandLock: '~', sceneBuilder: '~', productSKU: '✗', stylePresets: '✓', multiBrand: '~', pricing: 'Free – $200/mo + enterprise', catColor: 'bg-orange-500' },
    { name: 'Stable Diffusion', cat: '2', batchGen: '~', brandLock: '✗', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '✗', pricing: 'Free (self-hosted)', catColor: 'bg-orange-500' },
    { name: 'Claid.ai', cat: '3', batchGen: '✓', brandLock: '✓', sceneBuilder: '~', productSKU: '~', stylePresets: '✓', multiBrand: '~', pricing: '$9 – $49/mo + API', catColor: 'bg-emerald-500' },
    { name: 'Nightjar', cat: '3', batchGen: '✓', brandLock: '✓', sceneBuilder: '~', productSKU: '~', stylePresets: '✓', multiBrand: '✗', pricing: '$25 – $50/mo', catColor: 'bg-emerald-500' },
    { name: 'Flair.ai', cat: '3', batchGen: '~', brandLock: '~', sceneBuilder: '✓', productSKU: '✗', stylePresets: '~', multiBrand: '✗', pricing: 'Free – $10/mo', catColor: 'bg-emerald-500' },
    { name: 'Photoroom', cat: '3', batchGen: '✓', brandLock: '~', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '~', pricing: '$7.50 – $99/mo', catColor: 'bg-emerald-500' },
    { name: 'Pebblely', cat: '3', batchGen: '~', brandLock: '✗', sceneBuilder: '✗', productSKU: '✗', stylePresets: '~', multiBrand: '✗', pricing: 'Free – $39/mo', catColor: 'bg-emerald-500' },
    { name: 'Kaptured AI', cat: '3', batchGen: '✓', brandLock: '✓', sceneBuilder: '✗', productSKU: '~', stylePresets: '~', multiBrand: '✗', pricing: 'Enterprise only', catColor: 'bg-emerald-500' },
    { name: 'Kive.ai', cat: '3', batchGen: '✓', brandLock: '~', sceneBuilder: '~', productSKU: '✓', stylePresets: '✓', multiBrand: '✗', pricing: 'From $20/mo', catColor: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-2xl border border-amber-200 p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Full Feature Comparison Matrix</h2>
        <p className="text-gray-600 mb-6">
          Comprehensive analysis of competitive platforms across key capabilities. Gen Canopy represents the Cat 3+ offering with full enterprise features.
        </p>

        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-gray-600">= native capability</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 font-bold">~</span>
            <span className="text-gray-600">= partial / workaround</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span className="text-gray-600">= not available</span>
          </div>
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-white rounded-2xl border border-amber-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-amber-700 to-amber-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">Platform</th>
                <th className="px-4 py-4 text-center font-semibold">Cat.</th>
                <th className="px-4 py-4 text-center font-semibold">Batch Gen.</th>
                <th className="px-4 py-4 text-center font-semibold">Brand Lock</th>
                <th className="px-4 py-4 text-center font-semibold">Scene Builder</th>
                <th className="px-4 py-4 text-center font-semibold">Product SKU Lib.</th>
                <th className="px-4 py-4 text-center font-semibold">Style Presets</th>
                <th className="px-4 py-4 text-center font-semibold">Multi-Brand</th>
                <th className="px-6 py-4 text-left font-semibold">Pricing Model</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((platform, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 hover:bg-amber-50/30 transition-colors ${
                    platform.name === 'Gen Canopy' ? 'bg-amber-50/50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${platform.catColor}`}></div>
                      <span className={`font-semibold ${
                        platform.name === 'Gen Canopy' ? 'text-amber-900' : 'text-gray-900'
                      }`}>
                        {platform.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${platform.catColor}`}>
                      {platform.cat}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-lg font-bold ${
                      platform.batchGen === '✓' ? 'text-green-600' :
                      platform.batchGen === '~' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {platform.batchGen}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-lg font-bold ${
                      platform.brandLock === '✓' ? 'text-green-600' :
                      platform.brandLock === '~' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {platform.brandLock}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-lg font-bold ${
                      platform.sceneBuilder === '✓' ? 'text-green-600' :
                      platform.sceneBuilder === '~' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {platform.sceneBuilder}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-lg font-bold ${
                      platform.productSKU === '✓' ? 'text-green-600' :
                      platform.productSKU === '~' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {platform.productSKU}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-lg font-bold ${
                      platform.stylePresets === '✓' ? 'text-green-600' :
                      platform.stylePresets === '~' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {platform.stylePresets}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-lg font-bold ${
                      platform.multiBrand === '✓' ? 'text-green-600' :
                      platform.multiBrand === '~' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {platform.multiBrand}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{platform.pricing}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
