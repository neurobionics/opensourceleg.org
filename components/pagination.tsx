import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationProps = {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  baseUrl?: string
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  hasNextPage, 
  hasPreviousPage,
  baseUrl = '/articles'
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    return page === 1 ? baseUrl : `${baseUrl}?page=${page}`
  }

  const getPageNumbers = () => {
    const pages = []
    const showPages = 5
    let start = Math.max(1, currentPage - Math.floor(showPages / 2))
    const end = Math.min(totalPages, start + showPages - 1)
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  return (
    <ShadcnPagination className="">
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          {hasPreviousPage ? (
            <PaginationPrevious href={getPageUrl(currentPage - 1)} />
          ) : (
            <PaginationPrevious 
              href="#" 
              className="pointer-events-none opacity-50 border border-gray-300 text-gray-400"
              aria-disabled="true"
            />
          )}
        </PaginationItem>

        {/* Show first page if not in range */}
        {currentPage > 3 && (
          <>
            <PaginationItem>
              <PaginationLink href={getPageUrl(1)}>1</PaginationLink>
            </PaginationItem>
            {currentPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Page numbers */}
        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink 
              href={getPageUrl(pageNum)} 
              isActive={pageNum === currentPage}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Show last page if not in range */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={getPageUrl(totalPages)}>{totalPages}</PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next button */}
        <PaginationItem>
          {hasNextPage ? (
            <PaginationNext href={getPageUrl(currentPage + 1)} />
          ) : (
            <PaginationNext 
              href="#" 
              className="pointer-events-none opacity-50 border border-gray-300 text-gray-400"
              aria-disabled="true"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
} 