'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ResearchAnalytics } from '@/lib/research-analytics'
import { TreemapChart, CountryTreemapChart, SummaryStats } from './analytics-charts'

// Utility function to extract acronym from funding source names
function extractAcronym(text: string): string {
  // Find all text in parentheses, brackets, or braces
  const allMatches = text.match(/\(([^)]+)\)|\[([^\]]+)\]|\{([^}]+)\}/g)
  
  if (allMatches) {
    // Extract the content from each match and find the best acronym
    const acronyms = allMatches.map(match => {
      const content = match.slice(1, -1) // Remove brackets/parentheses
      return content.trim()
    }).filter(content => {
      // Look for likely acronyms: short, mostly caps, letters/numbers/common symbols
      return content.length <= 8 && /^[A-Z][A-Z0-9&\-\s]*$/i.test(content)
    }).sort((a, b) => a.length - b.length) // Prefer shorter acronyms
    
    if (acronyms.length > 0) {
      return acronyms[0]
    }
  }
  
  // If no suitable acronym found, try to truncate intelligently
  const words = text.split(' ')
  if (words.length <= 3) {
    return text // Short enough already
  }
  
  // Return first 3 words + "..." if longer
  return words.slice(0, 3).join(' ') + '...'
}

interface AnalyticsDashboardProps {
  analytics: ResearchAnalytics
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  const [firstChart, setFirstChart] = useState<'topics' | 'funding'>('topics')
  const [secondChart, setSecondChart] = useState<'geographic' | 'labs'>('geographic')
  const [isFirstTransitioning, setIsFirstTransitioning] = useState(false)
  const [isSecondTransitioning, setIsSecondTransitioning] = useState(false)

  const handleFirstChartToggle = () => {
    setIsFirstTransitioning(true)
    setTimeout(() => {
      setFirstChart(firstChart === 'topics' ? 'funding' : 'topics')
      setIsFirstTransitioning(false)
    }, 150)
  }

  const handleSecondChartToggle = () => {
    setIsSecondTransitioning(true)
    setTimeout(() => {
      setSecondChart(secondChart === 'geographic' ? 'labs' : 'geographic')
      setIsSecondTransitioning(false)
    }, 150)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-gray-900">
          <span className="font-bold italic">Research</span> Analytics
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
          Key insights and trends within the Open-Source Leg research community.
        </p>
      </div>

      {/* Summary Statistics */}
      <SummaryStats analytics={analytics} />

      <div className="space-y-16">
        {/* First Section: Text Left, Chart Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center my-12">
          {/* Text Content */}
          <div className="lg:col-span-1 flex flex-col justify-between mx-auto min-h-[400px]">
            <div className={`transition-all duration-300 ease-in-out ${isFirstTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
              <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">
                {firstChart === 'topics' ? (
                  <span className="font-light">Research Topics</span>
                ) : (
                  <span className="font-light">Funding Sources</span>
                )}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {firstChart === 'topics' ? (
                  <>
                    <span className="font-semibold text-gray-900">{analytics.keywords[0]?.name}</span> emerges as the most prominent research area with <span className="font-semibold text-gray-900">{analytics.keywords[0]?.value} publications</span> ({analytics.keywords[0]?.percentage.toFixed(1)}% of total research). This reflects the community&rsquo;s primary focus and research priorities within the Open-Source Leg ecosystem.
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-gray-900">{analytics.funding[0]?.name ? extractAcronym(analytics.funding[0].name) : 'N/A'}</span> leads research funding with <span className="font-semibold text-gray-900">{analytics.funding[0]?.value} supported publications</span> ({analytics.funding[0]?.percentage.toFixed(1)}% of funded research). This highlights the key organizations driving innovation in prosthetic technology research.
                  </>
                )}
              </p>
            </div>
            <button
              onClick={handleFirstChartToggle}
              className="cursor-pointer bg-[var(--light-blue)] text-white border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-3 text-base font-medium transition-colors duration-200 flex items-center gap-2 mt-6"
            >
              {firstChart === 'topics' ? 'Show Funding Agencies' : 'Show Research Topics'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Chart */}
          <div className={`lg:col-span-2 p-4 transition-all duration-300 ease-in-out ${isFirstTransitioning ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}>
            {firstChart === 'topics' ? (
              <TreemapChart 
                data={analytics.keywords} 
                height={400}
              />
            ) : (
              <TreemapChart 
                data={analytics.funding} 
                height={400}
                isFundingData={true}
              />
            )}
          </div>
        </div>

        {/* Second Section: Chart Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center my-12">
          {/* Chart */}
          <div className={`lg:col-span-2 p-4 transition-all duration-300 ease-in-out ${isSecondTransitioning ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}>
            {secondChart === 'geographic' ? (
              <CountryTreemapChart 
                data={analytics.countries} 
                height={400}
              />
            ) : (
              <TreemapChart 
                data={analytics.researchLabs} 
                height={400}
              />
            )}
          </div>

          {/* Text Content */}
          <div className="lg:col-span-1 flex flex-col justify-between mx-auto min-h-[400px]">
            <div className={`transition-all duration-300 ease-in-out ${isSecondTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
              <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">
                {secondChart === 'geographic' ? (
                  <span className="font-light">Research Reach</span>
                ) : (
                  <span className="font-light">Research Labs</span>
                )}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {secondChart === 'geographic' ? (
                  <>
                    <span className="font-semibold text-gray-900">{analytics.countries[0]?.country}</span> leads the global research community with <span className="font-semibold text-gray-900">{analytics.countries[0]?.value} publications</span> ({analytics.countries[0]?.percentage.toFixed(1)}% of total). This demonstrates the international collaboration and widespread adoption of open-source prosthetic research.
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-gray-900">{analytics.researchLabs[0]?.name}</span> stands out as the most active research institution with <span className="font-semibold text-gray-900">{analytics.researchLabs[0]?.value} publications</span> ({analytics.researchLabs[0]?.percentage.toFixed(1)}% of institutional research). This highlights the key academic partnerships advancing the field.
                  </>
                )}
              </p>
            </div>
            <button
              onClick={handleSecondChartToggle}
              className="cursor-pointer bg-[var(--light-blue)] text-white border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-3 text-base font-medium transition-colors duration-200 flex items-center gap-2 mt-6"
            >
              {secondChart === 'geographic' ? 'Show Research Labs' : 'Show Geographic Data'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 