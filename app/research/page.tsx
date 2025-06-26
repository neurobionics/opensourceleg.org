import { fetchPublications } from "@/lib/publications"
import { ResearchPageClient } from "./research-client"

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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Research & Publications
          </h1>
          <p className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
            Discover academic research and publications that utilize the Open-Source Leg platform. 
            Our open-source approach enables researchers worldwide to advance the field of prosthetics.
          </p>
        </div>
      </div>

      {/* Publications Section */}
      <div className="py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ResearchPageClient publications={allPublications} />
        </div>
      </div>
    </div>
  )
} 