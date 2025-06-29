import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Calendar, Clock, User, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getPaginatedPosts, getAllPosts } from '@/lib/mdx'
import { Pagination } from '@/components/pagination'

type Props = {
  params: Promise<{ page?: string[] }>
}

// Generate static params for all possible pagination pages
export async function generateStaticParams() {
  const allPosts = getAllPosts()
  const postsPerPage = 4
  const totalPages = Math.ceil(allPosts.length / postsPerPage)
  
  const params = []
  
  // Generate params for page 1 (base route)
  params.push({ page: undefined })
  
  // Generate params for pages 2, 3, 4, etc.
  for (let i = 2; i <= Math.max(1, totalPages); i++) {
    params.push({ page: [i.toString()] })
  }
  
  return params
}

export default async function ArticlesPage({ params }: Props) {
  const resolvedParams = await params
  const pageParam = resolvedParams.page?.[0]
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1
  
  const { posts, totalPages, currentPage: validatedPage, hasNextPage, hasPreviousPage } = getPaginatedPosts(currentPage, 4)

  return (
    <div className="min-h-screen pt-12">
      {/* Hero Section */}
      <div className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Community Articles
          </h1>
          <p className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
            Discover insights, tutorials, and research findings from the Open-Source Leg community.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Pagination - Top */}
          {posts.length > 0 && totalPages > 1 && (
            <Pagination 
              currentPage={validatedPage}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              basePath="/articles/page"
            />
          )}

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-600 mb-4">No articles yet</h3>
              <p className="text-gray-500 mb-8">
                Be the first to contribute! Add your MDX file to the posts directory.
              </p>
              <Button
                href="https://github.com/neurobionics/opensourceleg"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--light-blue)] text-white border-2 border-black hover:text-black hover:bg-[var(--light-green)] rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
              >
                Contribute on GitHub
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 mb-12">
              {posts.map((post) => {
                const publishedDate = new Date(post.date)
                const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true })
                
                return (
                  <Link key={post.slug} href={`/articles/${post.slug}`} className="group block">
                    <Card className="h-full hover:shadow-xl hover:scale-105 transition-all duration-200 border-black hover:border-[var(--light-blue)] cursor-pointer flex flex-col">
                      <CardHeader className="flex-grow">
                        <CardTitle className="text-xl font-bold transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        
                        {post.excerpt && (
                          <CardDescription className="text-gray-600 line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        )}
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          {post.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.date}>
                            {timeAgo}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}


        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[var(--black)] max-w-6xl mx-auto rounded-2xl sm:rounded-[2rem] py-16 px-4 sm:px-6 mt-18">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-white">
             <span className="relative font-medium italic">
                 Share
                 <svg 
                       className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                       viewBox="0 0 200 12" 
                       fill="none" 
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path 
                         d="M2 10C60 6 140 6 198 8" 
                         stroke="var(--light-green)" 
                         strokeWidth="12" 
                         strokeLinecap="round"
                         fill="none"
                       />
                     </svg>
             </span> Your Knowledge
            </h2>
          <p className="text-lg text-white/70 mb-8 leading-relaxed text-balance">
            Have insights about prosthetics, robotics, or the Open-Source Leg platform? <br/>
            Contribute your knowledge to help the community grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              href="https://github.com/neurobionics/opensourceleg"
              variant='outline'
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--light-green)] text-black border border-black hover:text-white hover:bg-[var(--light-blue)] rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
            >
              Contribute on GitHub
            </Button>
            <Button
              href="https://discourse.opensourceleg.org"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="bg-transparent text-white border border-white hover:bg-[var(--light-blue)] hover:text-white rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
            >
              Join Discussions
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 