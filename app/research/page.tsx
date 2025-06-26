import { fetchPublications } from "@/lib/publications"
import { ResearchPageClient } from "./research-client"
import { ArrowDown, ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateResearchAnalytics } from "@/lib/research-analytics"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { PublicationsByYearChart } from '@/components/analytics/publications-by-year-chart'

export const metadata = {
  title: "Research - OpenSourceLeg",
  description: "Publications and research using the OpenSourceLeg platform. Discover academic work and contribute your own research.",
}

export default async function ResearchPage() {
  // Fetch all publications at build time
  const allPublications = await fetchPublications()
  
  // Generate analytics data
  const analytics = generateResearchAnalytics(allPublications)

  return (
    <div className="min-h-screen pt-12">
      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-gray-900">
            Research &{" "}
            <span className="font-bold italic">Publications</span>
          </h1>
          <p className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed text-balance">
            Explore academic research and publications that use or cite the Open-Source Leg platform. 
            Our open-source approach enables researchers worldwide to advance the field of prosthetics.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 items-center justify-center">
            <Button 
              href="#insights-section"
              className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
              View Analytics
            </Button>
            <Button
              href={process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="text-black border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Publication
            </Button>
          </div>
        </div>
      </div>

      {/* Publications Section */}
      <div className="py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ResearchPageClient publications={allPublications} />
        </div>
      </div>

            {/* Analytics Section */}
      <div id="insights-section" className="py-16 px-4 sm:px-6 mt-8 bg-gray-50">
        <AnalyticsDashboard analytics={analytics} />
      </div>
        {/* Join Research Community Section */}
        <div className="bg-[var(--black)] py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white">
                  <span className="font-medium italic text-[var(--light-green)]">Join</span>{" "}the community!
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                  Access our open-source hardware and software to build upon, and share your findings with a global community of researchers.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <Button
                    href="/hardware"
                    className="bg-[var(--light-green)] text-black border border-white hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Hardware <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                  <Button
                    href="/software"
                    variant="outline"
                    className="bg-transparent text-white border border-white hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Software <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                  <Button
                    href="https://discourse.opensourceleg.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="bg-transparent text-white border border-white hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Forum <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Right Content - Chart */}
              <div className="relative">
                <PublicationsByYearChart data={analytics.publicationsByYear} />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
} 