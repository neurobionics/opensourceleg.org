import { Publication } from './publications'

export interface KeywordData {
  name: string
  value: number
  percentage: number
}

export interface FundingData {
  name: string
  value: number
  percentage: number
}

export interface CountryData {
  country: string
  code: string
  value: number
  percentage: number
}



export interface ResearchLabData {
  name: string
  value: number
  percentage: number
}

export interface YearlyPublicationData {
  year: number
  count: number
}

export interface ResearchAnalytics {
  keywords: KeywordData[]
  funding: FundingData[]
  countries: CountryData[]
  researchLabs: ResearchLabData[]
  publicationsByYear: YearlyPublicationData[]
  totalPublications: number
  totalCitations: number
  averageCitations: number
}

// Country mapping for common variations
const COUNTRY_MAPPINGS: Record<string, { name: string; code: string }> = {
  'usa': { name: 'United States', code: 'US' },
  'united states': { name: 'United States', code: 'US' },
  'us': { name: 'United States', code: 'US' },
  'uk': { name: 'United Kingdom', code: 'GB' },
  'united kingdom': { name: 'United Kingdom', code: 'GB' },
  'germany': { name: 'Germany', code: 'DE' },
  'canada': { name: 'Canada', code: 'CA' },
  'australia': { name: 'Australia', code: 'AU' },
  'japan': { name: 'Japan', code: 'JP' },
  'china': { name: 'China', code: 'CN' },
  'france': { name: 'France', code: 'FR' },
  'italy': { name: 'Italy', code: 'IT' },
  'spain': { name: 'Spain', code: 'ES' },
  'netherlands': { name: 'Netherlands', code: 'NL' },
  'sweden': { name: 'Sweden', code: 'SE' },
  'switzerland': { name: 'Switzerland', code: 'CH' },
  'south korea': { name: 'South Korea', code: 'KR' },
  'korea': { name: 'South Korea', code: 'KR' },
  'brazil': { name: 'Brazil', code: 'BR' },
  'india': { name: 'India', code: 'IN' },
}

function extractCountriesFromText(text: string): string[] {
  if (!text) return []
  
  const countries: string[] = []
  const textLower = text.toLowerCase()
  
  // Check for country matches
  Object.keys(COUNTRY_MAPPINGS).forEach(key => {
    if (textLower.includes(key)) {
      const country = COUNTRY_MAPPINGS[key]
      if (!countries.some(c => c === country.name)) {
        countries.push(country.name)
      }
    }
  })
  
  return countries
}

function extractLastAuthor(authorsString: string): string {
  if (!authorsString) return ''
  
  // Split by common delimiters and get the last author
  const authors = authorsString.split(/[,;]/).map(author => author.trim())
  if (authors.length === 0) return ''
  
  const lastAuthor = authors[authors.length - 1]
  
  // Extract last name (assuming format like "John A. Smith" or "Smith, J.A.")
  const nameParts = lastAuthor.split(/[\s,]/).filter(part => part.length > 1)
  if (nameParts.length > 0) {
    // If comma-separated format (Smith, J.A.), take the first part
    if (lastAuthor.includes(',')) {
      return nameParts[0]
    }
    // Otherwise take the last part (John A. Smith -> Smith)
    return nameParts[nameParts.length - 1]
  }
  
  return lastAuthor
}

export function generateResearchAnalytics(publications: Publication[]): ResearchAnalytics {
  // Filter valid publications
  const validPubs = publications.filter(pub => pub.title && pub.year)
  
  // Keywords analysis
  const keywordCounts: Record<string, number> = {}
  validPubs.forEach(pub => {
    pub.tags.forEach(tag => {
      const cleanTag = tag.toLowerCase().trim()
      if (cleanTag.length > 2) {
        keywordCounts[cleanTag] = (keywordCounts[cleanTag] || 0) + 1
      }
    })
  })
  
  const keywords = Object.entries(keywordCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      percentage: (value / validPubs.length) * 100
    }))
  
  // Funding analysis
  const fundingCounts: Record<string, number> = {}
  validPubs.forEach(pub => {
    if (pub.fundingAgencies) {
      pub.fundingAgencies.forEach(agency => {
        const cleanAgency = agency.trim()
        if (cleanAgency.length > 2) {
          fundingCounts[cleanAgency] = (fundingCounts[cleanAgency] || 0) + 1
        }
      })
    }
  })
  
  const funding = Object.entries(fundingCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15)
    .map(([name, value]) => ({
      name,
      value,
      percentage: (value / validPubs.length) * 100
    }))
  
  // Country analysis
  const countryCounts: Record<string, number> = {}
  validPubs.forEach(pub => {
    const addressText = `${pub.addresses || ''} ${pub.affiliations || ''}`.toLowerCase()
    const countries = extractCountriesFromText(addressText)
    countries.forEach(country => {
      countryCounts[country] = (countryCounts[country] || 0) + 1
    })
  })
  
  const countries = Object.entries(countryCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15)
    .map(([name, value]) => {
      const mapping = Object.values(COUNTRY_MAPPINGS).find(m => m.name === name)
      return {
        country: name,
        code: mapping?.code || name.slice(0, 2).toUpperCase(),
        value,
        percentage: (value / validPubs.length) * 100
      }
    })
  
  // Research Labs analysis (based on last author)
  const labCounts: Record<string, number> = {}
  validPubs.forEach(pub => {
    const lastAuthor = extractLastAuthor(pub.authors)
    if (lastAuthor && lastAuthor.length > 2) {
      labCounts[lastAuthor] = (labCounts[lastAuthor] || 0) + 1
    }
  })
  
  const researchLabs = Object.entries(labCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20)
    .map(([name, value]) => ({
      name: name + ' Lab',
      value,
      percentage: (value / validPubs.length) * 100
    }))
  
  // Summary stats
  const totalCitations = validPubs.reduce((sum, pub) => sum + (pub.citations || 0), 0)
  const averageCitations = validPubs.length > 0 ? totalCitations / validPubs.length : 0
  
  // Publications by year analysis
  const yearCounts: Record<string, number> = {}
  validPubs.forEach(pub => {
    if (pub.year) {
      yearCounts[pub.year] = (yearCounts[pub.year] || 0) + 1
    }
  })

  const publicationsByYear = Object.entries(yearCounts)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year)

  return {
    keywords,
    funding,
    countries,
    researchLabs,
    publicationsByYear,
    totalPublications: validPubs.length,
    totalCitations,
    averageCitations: Math.round(averageCitations * 10) / 10
  }
}

// Generate analytics at build time and save to static JSON
export async function generateStaticAnalytics(publications: Publication[]): Promise<ResearchAnalytics> {
  const analytics = generateResearchAnalytics(publications)
  
  // This would be called during build to generate static files
  // For now, we'll just return the analytics data
  if (typeof window === 'undefined') {
    // Server-side: could write to public/data/analytics.json
    console.log('Analytics generated:', analytics.totalPublications, 'publications processed')
  }
  
  return analytics
} 