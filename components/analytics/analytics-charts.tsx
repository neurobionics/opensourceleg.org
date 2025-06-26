'use client'

import { 
  Treemap, 
  ResponsiveContainer
} from 'recharts'
import { KeywordData, FundingData, CountryData, ResearchLabData } from '@/lib/research-analytics'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

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

// Add CSS for forcing black text
const treemapTextStyle = `
  .treemap-text {
    fill: #000000 !important;
    color: #000000 !important;
    stroke: none !important;
  }
`

const TREEMAP_COLORS = [
  '#E7F77E', '#E1F184ff', '#DBEB8Aff', '#D6E691ff', '#D0E097ff', '#CADA9Dff',
  '#C4D4A3ff', '#BFCEAAff', '#B9C8B0ff', '#B3C3B6ff', '#ADBDBCff', '#A8B7C3ff',
  '#A2B1C9ff', '#9CABCFff', '#96A5D5ff', '#91A0DCff', '#8B9AE2ff', '#8594E8ff'
]

interface TreemapProps {
  data: KeywordData[] | FundingData[] | ResearchLabData[]
  title: string
  height?: number
  isFundingData?: boolean
}

export function TreemapChart({ data, height = 400, isFundingData = false }: Omit<TreemapProps, 'title'>) {
  const treemapData = data.map((item, index) => ({
    name: item.name,
    displayName: isFundingData ? extractAcronym(item.name) : item.name,
    size: item.value,
    percentage: item.percentage,
    fill: TREEMAP_COLORS[index % TREEMAP_COLORS.length]
  }))

  return (
    <div className="bg-transparent">
      <style dangerouslySetInnerHTML={{ __html: treemapTextStyle }} />
      <ResponsiveContainer width="100%" height={height}>
        <Treemap
          data={treemapData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={({ depth, x, y, width, height, index, payload, name }) => {
            if (depth !== 1) return <g />
            
            // Calculate font sizes based on rectangle size with better scaling
            const titleFontSize = Math.max(Math.min(width / 8, height / 4, 14), 9)
            const valueFontSize = Math.max(Math.min(width / 10, height / 5, 12), 8)
            
            // Text wrapping function
            const wrapText = (text: string, maxWidth: number, fontSize: number) => {
              const words = text.split(' ')
              const lines: string[] = []
              let currentLine = ''
              
              // Rough character width estimation (varies by font)
              const charWidth = fontSize * 0.6
              const maxCharsPerLine = Math.floor(maxWidth / charWidth)
              
              for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word
                if (testLine.length <= maxCharsPerLine) {
                  currentLine = testLine
                } else {
                  if (currentLine) {
                    lines.push(currentLine)
                    currentLine = word
                  } else {
                    // Word is too long, truncate it
                    lines.push(word.substring(0, maxCharsPerLine - 3) + '...')
                    currentLine = ''
                  }
                }
              }
              if (currentLine) {
                lines.push(currentLine)
              }
              
              return lines.slice(0, 3) // Max 3 lines
            }
            
            // Add padding around each tile
            const tilePadding = 4
            const tileX = x + tilePadding
            const tileY = y + tilePadding
            const tileWidth = width - (tilePadding * 2)
            const tileHeight = height - (tilePadding * 2)
            
            // Only show text if rectangle is large enough
            const showText = tileWidth > 50 && tileHeight > 30
            const showValue = tileWidth > 70 && tileHeight > 50
            
            // Wrap the title text
            const displayText = payload?.displayName || name || ''
            const titleLines = showText ? wrapText(displayText, tileWidth - 10, titleFontSize) : []
            const lineHeight = titleFontSize + 2
            const totalTextHeight = titleLines.length * lineHeight + (showValue ? valueFontSize + 5 : 0)
            const startY = tileY + (tileHeight - totalTextHeight) / 2 + titleFontSize
            
            return (
              <g>
                <rect
                  x={tileX}
                  y={tileY}
                  width={tileWidth}
                  height={tileHeight}
                  rx={8}
                  ry={8}
                  style={{
                    fill: payload?.fill || TREEMAP_COLORS[index % TREEMAP_COLORS.length],
                    stroke: '#000',
                    strokeWidth: 1,
                    strokeOpacity: 1,
                  }}
                />
                
                {/* Clipping path to prevent text overflow */}
                <defs>
                  <clipPath id={`clip-${x}-${y}`}>
                    <rect x={tileX + 2} y={tileY + 2} width={tileWidth - 4} height={tileHeight - 4} rx={5} ry={5} />
                  </clipPath>
                </defs>
                
                <g clipPath={`url(#clip-${x}-${y})`}>
                  {/* Render title lines */}
                  {titleLines.map((line, i) => (
                    <text
                      key={i}
                      x={tileX + tileWidth / 2}
                      y={startY + i * lineHeight}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize={titleFontSize}
                      fontWeight="400"
                      fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                      className="treemap-text"
                    >
                      {line}
                    </text>
                  ))}
                  
                  {/* Render value */}
                  {showValue && (
                    <text
                      x={tileX + tileWidth / 2}
                      y={startY + titleLines.length * lineHeight + valueFontSize + 5}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize={valueFontSize}
                      opacity={0.9}
                      fontWeight="400"
                      fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                      className="treemap-text"
                    >
                      {payload?.size}
                    </text>
                  )}
                </g>
              </g>
            )
          }}
        />
      </ResponsiveContainer>
    </div>
  )
}

interface CountryTreemapProps {
  data: CountryData[]
  title: string
  height?: number
}

export function CountryTreemapChart({ data, height = 400 }: Omit<CountryTreemapProps, 'title'>) {
  const treemapData = data.map((item, index) => ({
    name: item.country,
    size: item.value,
    percentage: item.percentage,
    fill: TREEMAP_COLORS[index % TREEMAP_COLORS.length]
  }))

  return (
    <div className="bg-transparent">
      <style dangerouslySetInnerHTML={{ __html: treemapTextStyle }} />
      <ResponsiveContainer width="100%" height={height}>
        <Treemap
          data={treemapData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={({ depth, x, y, width, height, index, payload, name }) => {
            if (depth !== 1) return <g />
            
            const titleFontSize = Math.max(Math.min(width / 8, height / 4, 14), 9)
            const valueFontSize = Math.max(Math.min(width / 10, height / 5, 12), 8)
            
            // Text wrapping function
            const wrapText = (text: string, maxWidth: number, fontSize: number) => {
              const words = text.split(' ')
              const lines: string[] = []
              let currentLine = ''
              
              const charWidth = fontSize * 0.6
              const maxCharsPerLine = Math.floor(maxWidth / charWidth)
              
              for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word
                if (testLine.length <= maxCharsPerLine) {
                  currentLine = testLine
                } else {
                  if (currentLine) {
                    lines.push(currentLine)
                    currentLine = word
                  } else {
                    lines.push(word.substring(0, maxCharsPerLine - 3) + '...')
                    currentLine = ''
                  }
                }
              }
              if (currentLine) {
                lines.push(currentLine)
              }
              
              return lines.slice(0, 3)
            }
            
            // Add padding around each tile
            const tilePadding = 4
            const tileX = x + tilePadding
            const tileY = y + tilePadding
            const tileWidth = width - (tilePadding * 2)
            const tileHeight = height - (tilePadding * 2)
            
            const showText = tileWidth > 50 && tileHeight > 30
            const showValue = tileWidth > 70 && tileHeight > 50
            
            const titleLines = showText ? wrapText(name || '', tileWidth - 10, titleFontSize) : []
            const lineHeight = titleFontSize + 2
            const totalTextHeight = titleLines.length * lineHeight + (showValue ? valueFontSize + 5 : 0)
            const startY = tileY + (tileHeight - totalTextHeight) / 2 + titleFontSize
            
            return (
              <g>
                <rect
                  x={tileX}
                  y={tileY}
                  width={tileWidth}
                  height={tileHeight}
                  rx={8}
                  ry={8}
                  style={{
                    fill: payload?.fill || TREEMAP_COLORS[index % TREEMAP_COLORS.length],
                    stroke: '#000',
                    strokeWidth: 1,
                    strokeOpacity: 1,
                  }}
                />
                
                <defs>
                  <clipPath id={`clip-country-${x}-${y}`}>
                    <rect x={tileX + 2} y={tileY + 2} width={tileWidth - 4} height={tileHeight - 4} rx={5} ry={5} />
                  </clipPath>
                </defs>
                
                <g clipPath={`url(#clip-country-${x}-${y})`}>
                  {titleLines.map((line, i) => (
                    <text
                      key={i}
                      x={tileX + tileWidth / 2}
                      y={startY + i * lineHeight}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize={titleFontSize}
                      fontWeight="300"
                      fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                      className="treemap-text"
                    >
                      {line}
                    </text>
                  ))}
                  
                  {showValue && (
                    <text
                      x={tileX + tileWidth / 2}
                      y={startY + titleLines.length * lineHeight + valueFontSize + 5}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize={valueFontSize}
                      opacity={0.9}
                      fontWeight="300"
                      fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                      className="treemap-text"
                    >
                      {payload?.size}
                    </text>
                  )}
                </g>
              </g>
            )
          }}
        />
      </ResponsiveContainer>
    </div>
  )
}


interface SummaryStatsProps {
  analytics: {
    totalPublications: number
    totalCitations: number
    funding: Array<{ name: string; value: number; percentage: number }>
    countries: Array<{ country: string; value: number; percentage: number }>
  }
}

export function SummaryStats({ analytics }: SummaryStatsProps) {
  const stats = [
    { 
      id: 'publications',
      title: 'Total Publications', 
      value: analytics.totalPublications, 
      description: 'Research papers citing or using the Open-Source Leg platform'
    },
    { 
      id: 'citations',
      title: 'Total Citations', 
      value: analytics.totalCitations, 
      description: 'Combined citation count across all publications'
    },
    { 
      id: 'funding',
      title: 'Top Funding Source', 
      value: analytics.funding[0]?.name ? extractAcronym(analytics.funding[0].name) : 'N/A',
      description: `${analytics.funding[0]?.value || 0} publications (${analytics.funding[0]?.percentage.toFixed(1) || 0}% of funded research)`
    },
    { 
      id: 'country',
      title: 'Leading Country', 
      value: analytics.countries[0]?.country || 'N/A',
      description: `${analytics.countries[0]?.value || 0} publications (${analytics.countries[0]?.percentage.toFixed(1) || 0}% of total)`
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
      {stats.map((stat) => {
        const isNumeric = typeof stat.value === 'number'
        
        return (
          <Card key={stat.id} className="@container/card bg-[var(--black)] text-white border-gray-700 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <CardDescription className="text-gray-300 text-sm">{stat.title}</CardDescription>
              <CardTitle className={`py-1 sm:py-2 font-bold text-[var(--white)] ${
                isNumeric 
                  ? 'text-2xl sm:text-3xl tabular-nums @[250px]/card:text-4xl' 
                  : 'text-lg sm:text-xl @[250px]/card:text-2xl'
              }`}>
                {isNumeric ? stat.value.toLocaleString() : stat.value}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-xs sm:text-sm pt-2">
              <div className="text-gray-400 text-xs leading-relaxed">
                {stat.description}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
} 