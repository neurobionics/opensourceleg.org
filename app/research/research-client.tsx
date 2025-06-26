"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatAuthors, getPublicationUrl, type Publication } from "@/lib/publications"
import { ExternalLink, X } from "lucide-react"
import Link from "next/link"
import { Pagination } from "@/components/pagination"

interface ResearchPageClientProps {
  publications: Publication[]
}

const PUBLICATIONS_PER_PAGE = 10

type SortOption = 'year-desc' | 'year-asc' | 'citations-desc' | 'citations-asc'

export function ResearchPageClient({ publications }: ResearchPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('year-desc')
  
  // Calculate top 7 most common keywords
  const topKeywords = useMemo(() => {
    const keywordCounts = new Map<string, number>()
    
    publications.forEach(pub => {
      pub.tags?.forEach(tag => {
        const cleanTag = tag.trim().toLowerCase()
        if (cleanTag) {
          keywordCounts.set(cleanTag, (keywordCounts.get(cleanTag) || 0) + 1)
        }
      })
    })
    
    return Array.from(keywordCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 7)
      .map(([keyword]) => keyword)
  }, [publications])
  
  // Filter and sort publications
  const filteredAndSortedPublications = useMemo(() => {
    let filtered = publications
    
    // Apply filter
    if (activeFilter) {
      filtered = publications.filter(pub => 
        pub.tags?.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      )
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'year-desc':
          return (b.year || 0) - (a.year || 0)
        case 'year-asc':
          return (a.year || 0) - (b.year || 0)
        case 'citations-desc':
          return (b.citations || 0) - (a.citations || 0)
        case 'citations-asc':
          return (a.citations || 0) - (b.citations || 0)
        default:
          return 0
      }
    })
    
    return sorted
  }, [publications, activeFilter, sortBy])
  
  // Calculate pagination for filtered results
  const totalPublications = filteredAndSortedPublications.length
  const totalPages = Math.ceil(totalPublications / PUBLICATIONS_PER_PAGE)
  const startIndex = (currentPage - 1) * PUBLICATIONS_PER_PAGE
  const endIndex = startIndex + PUBLICATIONS_PER_PAGE
  const currentPublications = filteredAndSortedPublications.slice(startIndex, endIndex)
  
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFilterChange = (keyword: string) => {
    setActiveFilter(keyword === activeFilter ? null : keyword)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort)
    setCurrentPage(1) // Reset to first page when sort changes
  }

  // Create a custom pagination component that mimics the URL-based one but uses state
  const PaginationWrapper = () => {
    if (totalPages <= 1) return null

    return (
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          basePath=""
          useSearchParams={false}
          onPageChange={goToPage}
        />
      </div>
    )
  }

  if (totalPublications === 0) {
    return (
      <Card className="border-black mt-8">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">No publications found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {/* Filters and Sort */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Keyword Filters */}
          {topKeywords.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-center font-light italic text-black/50">Filter By Top Keywords</span>
              <div className="flex flex-wrap gap-2">
                {topKeywords.map((keyword) => (
                  <Button
                    key={keyword}
                    size="sm"
                    variant={activeFilter === keyword ? "default" : "outline"}
                    onClick={() => handleFilterChange(keyword)}
                    className={`text-xs cursor-pointer ${
                      activeFilter === keyword 
                        ? "bg-[var(--light-blue)] text-white border-black hover:bg-[var(--light-blue)]" 
                        : "bg-white text-black border-black hover:bg-[var(--light-green)] hover:text-black"
                    }`}
                  >
                    {keyword}
                    {activeFilter === keyword && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="flex flex-col gap-2">
            <span className="text-sm italic text-center font-light text-black/50">Sort By</span>
            <select 
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="text-sm bg-white border border-black rounded-md px-3 py-1.5 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black transition-colors cursor-pointer"
            >
              <option value="year-desc">Year ↓</option>
              <option value="year-asc">Year ↑</option>
              <option value="citations-desc">Citations ↓</option>
              <option value="citations-asc">Citations ↑</option>
            </select>
          </div>
        </div>
      </div>

      {/* Publications Table */}
      <Card className="border-black mt-8">
        <CardContent>
          <div className="rounded-md border border-gray-200">
            <Table>
                                <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="w-[30%] text-gray-900 font-semibold">Title & Authors</TableHead>
                      <TableHead className="w-[20%] text-gray-900 font-semibold">Journal/Conference</TableHead>
                      <TableHead className="w-[10%] text-gray-900 font-semibold">Citations</TableHead>
                      <TableHead className="w-[8%] text-gray-900 font-semibold">Year</TableHead>
                      <TableHead className="w-[25%] text-gray-900 font-semibold">Keywords</TableHead>
                      <TableHead className="w-[7%] text-gray-900 font-semibold">Link</TableHead>
                    </TableRow>
                  </TableHeader>
              <TableBody>
                {currentPublications.map((publication) => (
                  <TableRow key={publication.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell>
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm leading-tight text-gray-900">
                          {publication.title || "NO TITLE"}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {formatAuthors(publication.authors) || "NO AUTHORS"}
                        </p>
                      </div>
                    </TableCell>
                                          <TableCell>
                        <div className="text-sm text-gray-900">{publication.journal || "NO JOURNAL"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900 text-center">
                          {publication.citations !== undefined ? publication.citations : "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">{publication.year || "NO YEAR"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(publication.tags || []).slice(0, 4).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-[var(--white)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-white">
                              {tag}
                            </Badge>
                          ))}
                          {(!publication.tags || publication.tags.length === 0) && (
                            <span className="text-xs text-gray-400">NO KEYWORDS</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={getPublicationUrl(publication)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="ghost" className="hover:bg-[var(--light-green)] border border-black cursor-pointer">
                            <ExternalLink className="h-4 w-4 text-black" />
                          </Button>
                        </Link>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Simple Contribution CTA */}
          <div className="mt-6 text-center p-4 bg-[var(--light-blue)] rounded-lg">
            <p className="text-sm text-white mb-3">
              Would you like to add a publication to our database?
            </p>
            <Link
              href={process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[var(--white)] text-black border-2 border-black hover:text-black hover:bg-[var(--light-green)] rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Add Publication
            </Link>
          </div>

          {/* Pagination */}
          <PaginationWrapper />

          {/* Pagination Info */}
          {totalPages > 1 && (
            <div className="mt-4 text-center text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, totalPublications)} of {totalPublications} publications
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
} 