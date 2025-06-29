import { Button } from "@/components/ui/button"
import { Github, Users, BookOpen, ExternalLink, Code, Building2, MapPin, ArrowDown } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import EcosystemFlow from "@/components/ecosystem-flow"
import NSFTimeline from "@/components/nsf-timeline"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            About{" "}
            <span className="font-bold italic">Open-Source Leg</span>
          </>
        }
        description="A collaborative effort to lower the barrier to entry for researchers studying the control of robotic prosthetic legs"
        primaryButton={{
          href: "#team-section",
          text: "View Team",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
        secondaryButton={{
          href: "mailto:opensourceleg@gmail.com",
          text: "Contact Us",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />,
          target: "_blank"
        }}
      />      

      {/* Project Overview */}
      <div className="bg-[var(--light-blue)] py-24 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 sm:my-10">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image 
              src="/make.webp" 
              alt="Research lab with robotic leg systems" 
              width={600}
              height={400}
              className=" border-3 border-[var(--white)] rounded-2xl shadow-2xl w-full h-auto"
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
      <div className="bg-[var(--black)] text-white py-16 sm:py-24 px-4 sm:px-6">
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
              Our{" "}
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
              Our platform is actively used by researchers, engineers, students, and institutions worldwide, 
              fostering collaboration and advancing prosthetics research globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <Card className="@container/card bg-[var(--black)] text-white border-gray-700">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-300 text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Research Institutions
                </CardDescription>
                <CardTitle className="py-1 sm:py-2 text-2xl sm:text-3xl font-bold tabular-nums @[250px]/card:text-4xl text-[var(--white)]">
                  28+
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-xs sm:text-sm pt-2">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  <a href="/research" className="text-white hover:text-[var(--light-blue)] transition-colors">
                    View Research →
                  </a>
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  Universities worldwide using OSL
                </div>
              </CardFooter>
            </Card>

            <Card className="@container/card bg-[var(--black)] text-white border-gray-700">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-300 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Active Contributors
                </CardDescription>
                <CardTitle className="py-1 sm:py-2 text-2xl sm:text-3xl font-bold tabular-nums @[250px]/card:text-4xl text-[var(--white)]">
                  20+
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-xs sm:text-sm pt-2">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  <a href="https://github.com/neurobionics/opensourceleg" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--light-blue)] transition-colors">
                    View Contributors →
                  </a>
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  Researchers, engineers & developers
                </div>
              </CardFooter>
            </Card>

            <Card className="@container/card bg-[var(--black)] text-white border-gray-700">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-300 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Countries
                </CardDescription>
                <CardTitle className="py-1 sm:py-2 text-2xl sm:text-3xl font-bold tabular-nums @[250px]/card:text-4xl text-[var(--white)]">
                  18+
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-xs sm:text-sm pt-2">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  <a href="https://opensourceleg.discourse.group/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--light-blue)] transition-colors">
                    Global Reach →
                  </a>
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  Countries using the platform
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>


       {/* Governance Section */}
       <div className="py-16 sm:py-20 px-4 sm:px-6">
         <div className="max-w-7xl mx-auto flex flex-col gap-8">
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 sm:mb-12 text-left">
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
                   stroke="var(--light-blue)" 
                   strokeWidth="6" 
                   strokeLinecap="round"
                   fill="none"
                 />
               </svg>
             </span>
           </h2>
           
           <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-start">
             {/* Left Content */}
             <div className="space-y-6 flex flex-col justify-between h-full">
               <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-justify">
                 Our project operates under a <span className="font-bold italic">Benevolent Dictator for Life (BDFL)</span> model with <span className="font-bold">Prof. Elliott Rouse</span> serving as the principal investigator, supported by a Governance Advisory Board comprising esteemed professors and directors from research groups that contributed during the project&apos;s foundational phase.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                 <Button
                   href="http://oss-watch.ac.uk/resources/benevolentdictatorgovernancemodel"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                 >
                   <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                   Read More
                 </Button>
                 <Button
                   href="mailto:opensourceleg@gmail.com"
                   className="bg-transparent text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                 >
                   <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                   Contact Team
                 </Button>
               </div>
             </div>
             
             {/* Right Content - Image */}
             <div>
               <Image 
                 src="/governance.webp" 
                 alt="Research lab with robotic leg systems" 
                 width={600}
                 height={400}
                 className="border-3 border-[var(--black)] rounded-lg shadow-2xl w-full h-auto"
               />
             </div>
           </div>
           
           {/* Full-width bottom content */}
           <div className="mt-8">
             <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-justify">
               This structure balances focused leadership with collaborative decision-making, ensuring both efficiency and inclusivity in our development process. While the BDFL model provides clear direction and consistent vision, we distribute core responsibilities among key community members to minimize dependency on single leadership and foster project resilience. Through biannual board meetings, transparent communication channels, and active community engagement, we maintain alignment with our original goals while adapting to new challenges and opportunities.
             </p>
           </div>
         </div>
       </div>

        {/* Code of Conduct Section */}
       <div className="py-16 sm:py-20 px-4 sm:px-6">
         <div className="max-w-7xl mx-auto flex flex-col gap-8">
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 sm:mb-12 text-right">
             <span className="relative font-medium italic">
               Code of Conduct
               <svg 
                 className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                 viewBox="0 0 200 12" 
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path 
                   d="M2 10C60 6 140 6 198 8" 
                   stroke="var(--light-blue)" 
                   strokeWidth="6" 
                   strokeLinecap="round"
                   fill="none"
                 />
               </svg>
             </span>
           </h2>
           
           <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-start">
             {/* Left Content - Image */}
             <div>
               <Image 
                 src="/coc.jpg" 
                 alt="Research lab with robotic leg systems" 
                 width={600}
                 height={400}
                 className="border-3 border-[var(--black)] rounded-lg shadow-2xl w-full h-auto"
               />
             </div>
             
             {/* Right Content */}
             <div className="space-y-6 flex flex-col justify-between h-full">
               <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-justify">
                 We are committed to making participation in our project a <span className="font-bold italic">harassment-free experience for everyone</span>, regardless of age, disability, ethnicity, gender identity, experience level, education, nationality, race, religion, or sexual orientation. Our standards emphasize <span className="font-bold">welcoming and inclusive language</span>, respect for differing viewpoints, graceful acceptance of constructive criticism, and empathy towards community members.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
                 <Button
                   href="https://www.contributor-covenant.org/version/1/4/code-of-conduct/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                 >
                   <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                   Read More
                 </Button>
                 <Button
                   href="mailto:opensourceleg@gmail.com?subject=Code%20of%20Conduct%20Report"
                   className="bg-transparent text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                 >
                   <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                   Report Issue
                 </Button>
               </div>
             </div>
           </div>
           
           {/* Full-width bottom content */}
           <div className="mt-8">
             <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-justify">
               Project maintainers are responsible for clarifying standards of acceptable behavior and taking appropriate corrective action in response to violations. Instances of unacceptable behavior may be reported by contacting the project team at <span className="font-bold">opensourceleg@gmail.com</span>. All complaints will be reviewed confidentially and investigated, resulting in responses deemed necessary and appropriate to the circumstances.
             </p>
           </div>
         </div>
       </div>

       {/* Licensing Section */}
       <div className="py-16 sm:py-20 px-4 sm:px-6">
         <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12 sm:mb-16">
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
               Open Source{" "}
               <span className="relative font-medium italic">
                 Licensing
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
               All components of the Open-Source Leg are released under permissive open-source licenses to maximize 
               accessibility and enable both academic research and commercial applications.
             </p>
           </div>

           <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             {/* Software Licenses */}
             <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-gray-200 shadow-sm">
               <div className="flex items-center mb-6">
                 <Code className="w-8 h-8 text-[var(--light-blue)] mr-3" />
                 <h3 className="text-2xl font-semibold text-gray-900">Software Components</h3>
               </div>
               <div className="space-y-4">
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Python Libraries</h4>
                   <p className="text-sm text-gray-600 mb-2">MIT License - Maximum flexibility for integration</p>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Control Algorithms</h4>
                   <p className="text-sm text-gray-600 mb-2">Apache 2.0 - Patent protection included</p>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Documentation</h4>
                   <p className="text-sm text-gray-600 mb-2">Creative Commons - Free sharing and adaptation</p>
                 </div>
               </div>
             </div>

             {/* Hardware Licenses */}
             <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-gray-200 shadow-sm">
               <div className="flex items-center mb-6">
                 <Users className="w-8 h-8 text-[var(--light-green)] mr-3" />
                 <h3 className="text-2xl font-semibold text-gray-900">Hardware Components</h3>
               </div>
               <div className="space-y-4">
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Mechanical Designs</h4>
                   <p className="text-sm text-gray-600 mb-2">CERN-OHL-P v2 - Permissive hardware license</p>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Electronics</h4>
                   <p className="text-sm text-gray-600 mb-2">CERN-OHL-P v2 - Open hardware standard</p>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Manufacturing Guides</h4>
                   <p className="text-sm text-gray-600 mb-2">CC BY-SA 4.0 - Share-alike documentation</p>
                 </div>
               </div>
             </div>
           </div>

           {/* License Resources */}
           <div className="mt-12 text-center">
             <p className="text-gray-600 mb-6">
               For detailed licensing information and legal terms:
             </p>
             <Button
               href="https://github.com/neurobionics/opensourceleg/blob/main/LICENSE"
               target="_blank"
               rel="noopener noreferrer"
               variant="outline"
               className="border-gray-300 text-gray-700 hover:bg-gray-50"
             >
               <Code className="w-4 h-4 mr-2" />
               View License Terms
             </Button>
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

    </div>
  )
}