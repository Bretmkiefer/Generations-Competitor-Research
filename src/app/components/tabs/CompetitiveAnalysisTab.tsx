export function CompetitiveAnalysisTab() {
  const threats = [
    { name: 'Gen Canopy', score: 10, color: 'bg-indigo-600', threat: 'Market Leader', category: 'Cat 3+' },
    { name: 'Claid.ai', score: 7.5, color: 'bg-orange-500', threat: 'High Threat', category: 'Cat 3' },
    { name: 'Nightjar', score: 7, color: 'bg-orange-500', threat: 'High Threat', category: 'Cat 3' },
    { name: 'Kive.ai', score: 7, color: 'bg-orange-500', threat: 'High Threat', category: 'Cat 3' },
    { name: 'Kaptured AI', score: 6.5, color: 'bg-yellow-500', threat: 'Medium Threat', category: 'Cat 3' },
    { name: 'Flair.ai', score: 6, color: 'bg-yellow-500', threat: 'Medium Threat', category: 'Cat 3' },
    { name: 'Adobe Firefly', score: 5.5, color: 'bg-yellow-500', threat: 'Medium Threat', category: 'Cat 1' },
    { name: 'Canva', score: 5, color: 'bg-yellow-500', threat: 'Medium Threat', category: 'Cat 1' },
    { name: 'Photoroom', score: 5, color: 'bg-yellow-500', threat: 'Medium Threat', category: 'Cat 3' },
    { name: 'AdCreative.ai', score: 4.5, color: 'bg-green-500', threat: 'Low Threat', category: 'Cat 1' },
    { name: 'Midjourney v7', score: 4, color: 'bg-green-500', threat: 'Low Threat', category: 'Cat 2' },
    { name: 'Pebblely', score: 3.5, color: 'bg-green-500', threat: 'Low Threat', category: 'Cat 3' },
    { name: 'ChatGPT / GPT-4o', score: 3, color: 'bg-green-500', threat: 'Low Threat', category: 'Cat 2' },
    { name: 'Stable Diffusion', score: 2.5, color: 'bg-green-500', threat: 'Low Threat', category: 'Cat 2' },
  ];

  const keyInsights = [
    {
      title: 'Market Position',
      insight: 'Gen Canopy leads as the only Cat 3+ platform with full enterprise feature set including batch generation, brand lock, scene builder, and product SKU library.',
      icon: '🎯'
    },
    {
      title: 'Competitive Moat',
      insight: 'The combination of batch generation + brand lock + product SKU library creates a significant moat. No competitor offers all three natively.',
      icon: '🛡️'
    },
    {
      title: 'Threat Landscape',
      insight: 'Claid.ai, Nightjar, and Kive.ai represent the strongest competitive threats in Cat 3, each scoring 7+ but lacking complete feature parity.',
      icon: '⚠️'
    },
    {
      title: 'Category 1 & 2 Analysis',
      insight: 'General-purpose tools (Canva, Adobe Firefly) and AI art tools (Midjourney, ChatGPT) pose minimal threat due to lack of product-specific features.',
      icon: '📊'
    },
    {
      title: 'Enterprise Focus',
      insight: 'Multi-brand support and agency/enterprise pricing models create natural market segmentation, reducing direct competition with freemium tools.',
      icon: '🏢'
    },
    {
      title: 'Feature Gap Analysis',
      insight: 'Scene builder remains a differentiator with only Flair.ai offering comparable functionality, but lacking other critical enterprise features.',
      icon: '🔧'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-2xl border border-indigo-100 p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Competitive Threat Assessment</h2>
        <p className="text-gray-600">
          Quantitative analysis of competitive positioning based on feature completeness, market presence, and direct competition.
        </p>
      </div>

      {/* Threat Score Chart */}
      <div className="bg-white rounded-2xl border border-indigo-100 p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Competitive Threat Scores</h3>

        <div className="space-y-4">
          {threats.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${
                    item.name === 'Gen Canopy' ? 'text-indigo-900' : 'text-gray-900'
                  }`}>
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500">({item.category})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">{item.threat}</span>
                  <span className="text-sm font-bold text-gray-900 w-8 text-right">
                    {item.score}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${item.color} h-3 rounded-full transition-all`}
                  style={{ width: `${(item.score / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Scoring methodology:</strong> Based on feature completeness (40%), market presence (30%), pricing competitiveness (15%), and target market overlap (15%).
          </p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-2xl border border-indigo-100 p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Strategic Insights</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {keyInsights.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-700">{item.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Segmentation */}
      <div className="bg-white rounded-2xl border border-indigo-100 p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Segmentation</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-blue-900 mb-3">Category 1: General Design</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Canva</li>
              <li>• Adobe Firefly</li>
              <li>• AdCreative.ai</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Broad creative tools, not product-focused
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-purple-900 mb-3">Category 2: AI Art Tools</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• ChatGPT / GPT-4o</li>
              <li>• Midjourney v7</li>
              <li>• Stable Diffusion</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Creative exploration, minimal commercial features
            </p>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-emerald-900 mb-3">Category 3/3+: Product Tools</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Gen Canopy (3+)</strong></li>
              <li>• Claid.ai</li>
              <li>• Nightjar</li>
              <li>• Kive.ai</li>
              <li>• Flair.ai</li>
              <li>• Others</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Product photography & e-commerce focused
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
