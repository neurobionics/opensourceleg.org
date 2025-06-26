import { fetchPublications } from "@/lib/publications"
import { ResearchPageClient } from "./research-client"
import { ArrowDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Research - OpenSourceLeg",
  description: "Publications and research using the OpenSourceLeg platform. Discover academic work and contribute your own research.",
}

export default async function ResearchPage() {
  // Fetch all publications at build time
  const allPublications = await fetchPublications()

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
              View Insights
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

      {/* Insights Section */}
      <div id="insights-section" className="py-16 px-4 sm:px-6 mt-8">
        <div className="max-w-6xl mx-auto text-center">
                     <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-gray-900">
             <span className="font-bold italic">Research</span> Analytics
           </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Key insights and trends within the Open-Source Leg research community.
          </p>
        </div>
      </div>
    </div>
  )
} 