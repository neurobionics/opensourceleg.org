import { Button } from "@/components/ui/button"
import { Github, Users, BookOpen, ExternalLink, Globe, Code } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import EcosystemFlow from "@/components/ecosystem-flow"
import NSFTimeline from "@/components/nsf-timeline"
import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title="About"
        description="A collaborative effort to lower the barrier to entry for researchers studying the control of robotic prosthetic legs."
      />

      {/* Project Overview */}
      <div className="bg-[var(--light-blue)] py-24 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 sm:my-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="order-2 lg:order-1 border-3 border-[var(--white)] rounded-lg">
            <Image 
              src="/make.webp" 
              alt="Research lab with robotic leg systems" 
              width={600}
              height={400}
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-light mb-6">
              The{" "}
              <span className="relative text-[var(--light-green)] italic font-medium">
                Problem
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--white)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-sm sm:text-lg text-white leading-relaxed text-justify">
              Research groups focused on prosthetic control algorithms were each developing their own robotic leg systems in isolation, making it nearly 
              impossible to compare control strategies, replicate findings, or build upon each other&apos;s work.
              This fragmentation was preventing controls researchers from focusing on their core expertise. 
              Each custom hardware development required <span className="font-bold text-xl italic">$300k+</span> in funding 
              and years of dedicated work from multiple PhD researchers, forcing controls-focused labs to spend resources on hardware engineering rather than advancing control algorithms.
            </p>
          </div>
        </div>
      </div>

      {/* Our Solution */}
      <div className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
              Our{" "}
              <span className="relative font-medium italic">
                Solution
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-xl text-gray-700 leading-relaxed max-w-6xl mx-auto">
              An end-to-end open-source platform that provides researchers worldwide with standardized 
              hardware designs, software libraries, electronics, and comprehensive documentation to ease the development
              of state-of-the-art prosthetic control algorithms, ultimately improving the lives of people with disabilities.
            </p>
          </div>

          {/* Ecosystem Flow Chart */}
          <EcosystemFlow />
        </div>
      </div>

      {/* NSF Support */}
      <div className="bg-[var(--black)] text-white py-16 sm:py-24 px-4 sm:px-6 mx-auto max-w-7xl rounded-3xl">
        <div className="mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8">
              Backed by the{" "}
              <span className="relative text-[var(--light-green)] italic font-medium">
                National Science Foundation
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-blue)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              The Open-Source Leg project has been continuously supported by the NSF through multiple grant programs, 
              enabling sustained development and community growth over seven years.
            </p>
          </div>

          {/* Timeline */}
          <NSFTimeline />
        </div>
      </div>

      {/* Community Stats */}
      <div className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
              Research{" "}
              <span className="relative font-medium italic">
                Community
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our platform is actively used by researchers and institutions worldwide, 
              fostering collaboration and advancing prosthetics research globally.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border border-gray-200 shadow-sm">
              <div className="text-3xl sm:text-4xl font-bold text-[var(--light-blue)] mb-2">25+</div>
              <div className="text-gray-600 font-medium">Research Institutions</div>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border border-gray-200 shadow-sm">
              <div className="text-3xl sm:text-4xl font-bold text-[var(--light-green)] mb-2">50+</div>
              <div className="text-gray-600 font-medium">Active Contributors</div>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border border-gray-200 shadow-sm">
              <div className="text-3xl sm:text-4xl font-bold text-[var(--light-blue)] mb-2">15+</div>
              <div className="text-gray-600 font-medium">Published Studies</div>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border border-gray-200 shadow-sm">
              <div className="text-3xl sm:text-4xl font-bold text-[var(--light-green)] mb-2">12</div>
              <div className="text-gray-600 font-medium">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Involved */}
      <div className="bg-[var(--light-green)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-6 sm:mb-8">
              Get{" "}
              <span className="relative font-medium italic">
                Involved
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--black)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-black/80 max-w-4xl mx-auto leading-relaxed">
              The Open-Source Leg project welcomes contributions from researchers, engineers, students, and anyone 
              interested in advancing prosthetics technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-black/10 rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-black mb-4">For Researchers</h4>
              <ul className="space-y-3 text-black/80">
                <li>• Use OSL hardware for control algorithm development</li>
                <li>• Contribute datasets and experimental results</li>
                <li>• Participate in collaborative studies</li>
                <li>• Share improvements and modifications</li>
              </ul>
            </div>
            <div className="bg-black/10 rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-black mb-4">For Developers</h4>
              <ul className="space-y-3 text-black/80">
                <li>• Contribute to software libraries and tools</li>
                <li>• Improve documentation and tutorials</li>
                <li>• Develop testing and validation frameworks</li>
                <li>• Create educational resources</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href="https://github.com/neurobionics/opensourceleg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--black)] text-white border border-black hover:bg-[var(--light-blue)] rounded-lg px-6 py-4 text-lg flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              View Source Code
            </Button>
            <Button
              href="https://discourse.opensourceleg.org"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="bg-transparent text-black border border-black hover:bg-[var(--black)] hover:text-white rounded-lg px-6 py-4 text-lg flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Join Forum
            </Button>
            <Button
              href="https://neurobionics.github.io/opensourceleg/"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="bg-transparent text-black border border-black hover:bg-[var(--black)] hover:text-white rounded-lg px-6 py-4 text-lg flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Documentation
            </Button>
            <Button
              href="https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="bg-transparent text-black border border-black hover:bg-[var(--black)] hover:text-white rounded-lg px-6 py-4 text-lg flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Hardware Designs
            </Button>
          </div>
        </div>
             </div>

       {/* Governance, Code of Conduct & License */}
       <div className="py-16 sm:py-20 px-4 sm:px-6">
         <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12 sm:mb-16">
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
               Project{" "}
               <span className="relative font-medium italic">
                 Governance
                 <svg 
                   className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                   viewBox="0 0 200 12" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path 
                     d="M2 10C60 6 140 6 198 8" 
                     stroke="var(--light-green)" 
                     strokeWidth="6" 
                     strokeLinecap="round"
                     fill="none"
                   />
                 </svg>
               </span>
             </h2>
             <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
               Our open-source project operates under clear governance structures, community guidelines, and licensing terms 
               to ensure transparency, inclusivity, and sustainable development.
             </p>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
             {/* Governance */}
             <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-gray-200 shadow-sm">
               <div className="flex items-center mb-6">
                 <Users className="w-8 h-8 text-[var(--light-blue)] mr-3" />
                 <h3 className="text-2xl font-semibold text-gray-900">Governance</h3>
               </div>
               <p className="text-gray-600 mb-6 leading-relaxed">
                 The project follows a Benevolent Dictator for Life (BDFL) model with Prof. Elliott Rouse as the PI, 
                 supported by a technical steering committee and community advisory board.
               </p>
               <div className="space-y-4">
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Decision Making</h4>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Technical decisions by steering committee</li>
                     <li>• Community input through forums and issues</li>
                     <li>• Regular governance reviews</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Contribution Process</h4>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Pull request review system</li>
                     <li>• Automated testing and validation</li>
                     <li>• Documentation requirements</li>
                   </ul>
                 </div>
               </div>
             </div>

             {/* Code of Conduct */}
             <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-gray-200 shadow-sm">
               <div className="flex items-center mb-6">
                 <Globe className="w-8 h-8 text-[var(--light-green)] mr-3" />
                 <h3 className="text-2xl font-semibold text-gray-900">Code of Conduct</h3>
               </div>
               <p className="text-gray-600 mb-6 leading-relaxed">
                 We are committed to fostering an inclusive, respectful, and collaborative environment for all contributors, 
                 regardless of background, experience level, or affiliation.
               </p>
               <div className="space-y-4">
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Our Standards</h4>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Respectful and professional communication</li>
                     <li>• Inclusive language and behavior</li>
                     <li>• Constructive feedback and collaboration</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Enforcement</h4>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Clear reporting mechanisms</li>
                     <li>• Fair and transparent investigation process</li>
                     <li>• Graduated response to violations</li>
                   </ul>
                 </div>
               </div>
             </div>

             {/* License */}
             <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-gray-200 shadow-sm">
               <div className="flex items-center mb-6">
                 <Code className="w-8 h-8 text-[var(--light-blue)] mr-3" />
                 <h3 className="text-2xl font-semibold text-gray-900">Licensing</h3>
               </div>
               <p className="text-gray-600 mb-6 leading-relaxed">
                 All components of the Open-Source Leg are released under permissive open-source licenses to maximize 
                 accessibility and enable both academic research and commercial applications.
               </p>
               <div className="space-y-4">
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Software Components</h4>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Python libraries: MIT License</li>
                     <li>• Control algorithms: Apache 2.0</li>
                     <li>• Documentation: Creative Commons</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Hardware Components</h4>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Mechanical designs: CERN-OHL-P v2</li>
                     <li>• Electronics: CERN-OHL-P v2</li>
                     <li>• Manufacturing guides: CC BY-SA 4.0</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>

           {/* Additional Resources */}
           <div className="mt-12 text-center">
             <p className="text-gray-600 mb-6">
               For detailed information about our governance, policies, and licensing terms:
             </p>
             <div className="flex flex-wrap gap-4 justify-center">
               <Button
                 href="https://github.com/neurobionics/opensourceleg/blob/main/GOVERNANCE.md"
                 target="_blank"
                 rel="noopener noreferrer"
                 variant="outline"
                 className="border-gray-300 text-gray-700 hover:bg-gray-50"
               >
                 <BookOpen className="w-4 h-4 mr-2" />
                 Governance Guidelines
               </Button>
               <Button
                 href="https://github.com/neurobionics/opensourceleg/blob/main/CODE_OF_CONDUCT.md"
                 target="_blank"
                 rel="noopener noreferrer"
                 variant="outline"
                 className="border-gray-300 text-gray-700 hover:bg-gray-50"
               >
                 <Users className="w-4 h-4 mr-2" />
                 Code of Conduct
               </Button>
               <Button
                 href="https://github.com/neurobionics/opensourceleg/blob/main/LICENSE"
                 target="_blank"
                 rel="noopener noreferrer"
                 variant="outline"
                 className="border-gray-300 text-gray-700 hover:bg-gray-50"
               >
                 <Code className="w-4 h-4 mr-2" />
                 License Terms
               </Button>
             </div>
           </div>
         </div>
       </div>

    </div>
  )
}