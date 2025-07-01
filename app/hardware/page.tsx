import { PageHero } from "@/components/page-hero";
import { ArrowDown, ExternalLink, Zap, Plane, DollarSign, Download, FileText, ArrowUpRight } from "lucide-react";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { hardwareCostData, getTotalCost, formatPrice } from "@/lib/hardware-cost";
import { hardwareSpecs, specNotes } from "@/lib/hardware-specs";
import { buildSteps, diyBenefits, mermaidDiagram } from "@/lib/build-process";
import BuildProcessDiagram from "@/components/build-process-diagram";

export default function Hardware() {
    return (
      <div className="min-h-screen pt-12">
        <PageHero 
          title={
            <>
              Open-Source Leg{" "}
              <span className="font-bold italic">Hardware</span>
            </>
          }
          description="Designed to be easy to manufacture, assemble, and repair"
          primaryButton={{
            href: "#specsheet",
            text: "View Specsheet",
            icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
          }}
          secondaryButton={{
            href: "https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4",
            text: "View on Onshape",
            icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />,
            target: "_blank"
          }}
        />
        
        {/* Hardware Video Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <video 
              className="w-full rounded-2xl shadow-2xl border-2 border-black"
              autoPlay
              muted
              loop
              preload="metadata"
            >
              <source src="/videos/opensourceleg-hardware.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Text Content */}
            <div className="space-y-6 max-w-6xl mx-auto">
              <p className="text-base text-gray-600 leading-relaxed text-justify">
                The Open-Source Leg hardware is a robust and relatively inexpensive system that can be easily manufactured, assembled, and controlled. Through this website, researchers have access to downloadable hardware files so that they can enter the research field without having to design a prosthetic leg themselves. Ultimately, having a ubiquitous leg will help facilitate comparison between control strategies, potentially streamlining the field towards highly functional robotic prosthetic legs.
              </p>
            </div>
          </div>
        </section>
        
        {/* Design Philosophy Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                Design{" "}
                <span className="relative font-medium italic">
                  Philosophy
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
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                The OSL is assembled from both machined and stock components. In selecting components, we minimized 
                price, lead times for machined parts, and the number of vendors. To ensure broad accessibility for 
                researchers across diverse backgrounds, we adhered to key design principles.
              </p>
            </div>
            
            {/* Design Principles */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Simplicity */}
              <div className="bg-[var(--black)] border border-black rounded-2xl p-6 space-y-4 shadow-2xl">
                <h3 className="text-xl sm:text-2xl text-[var(--light-green)] font-semibold flex items-center gap-2 justify-center">
                  Simplicity
                  <Zap className="w-5 h-5" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  The OSL is designed to be assembled, controlled, and maintained with moderate 'hands-on' skills. 
                  We streamlined the number of components and suppliers, with the majority of parts machined from 
                  a single supplier, minimizing dependencies on precision machine components.
                </p>
              </div>
              
              {/* Portability */}
              <div className="bg-[var(--black)] border border-black rounded-2xl p-6 space-y-4 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--light-green)] flex items-center gap-2 justify-center">
                  Portability
                  <Plane className="w-5 h-5" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  We prioritized portability by ensuring the OSL weighs less than its biological counterpart. 
                  Each joint is equipped with on-board batteries, sensing, and control, facilitating research 
                  activities outside of traditional laboratory settings.
                </p>
              </div>
              
              {/* Economical */}
              <div className="bg-[var(--black)] border border-black rounded-2xl p-6 space-y-4 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--light-green)] flex items-center gap-2 justify-center">
                  Economical
                  <DollarSign className="w-5 h-5" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  The OSL is a cost-effective solution, ranging from approximately $10,500 to $21,000, depending 
                  on degrees of freedom and sensing options. This stands in stark contrast to commercial powered 
                  prostheses, which can cost up to $100,000.
                </p>
              </div>
            </div>
            
            {/* Cost Breakdown Table */}
            <div className="bg-transparent rounded-2xl p-8 border border-black shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-semibold text-black text-center">Hardware Cost Breakdown</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left font-semibold text-gray-900">Component</TableHead>
                    <TableHead className="text-right font-semibold text-gray-900">Price (USD)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hardwareCostData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-700">{item.component}</TableCell>
                      <TableCell className="text-right text-gray-700">{formatPrice(item.price)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 border-gray-300 font-semibold">
                    <TableCell className="sm:text-xl text-black font-medium italic">Total</TableCell>
                    <TableCell className="sm:text-xl text-right text-black font-bold italic">{formatPrice(getTotalCost())}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-sm text-gray-500 mt-4 italic text-center">
                Thanks to <span className="font-bold italic">Rachel Gehlhar Humann</span> for providing the latest prices for machined parts, actuators, bearings, and fasteners.
              </p>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                  <Button 
                    variant="outline"
                    href="https://docs.google.com/spreadsheets/d/1qVSoAV6mRzleJ215N53O3MT-OEZ30ZFP/edit?usp=share_link&ouid=101976074095932955884&rtpof=true&sd=true"
                    target="_blank"
                    className="bg-transparent border-black text-black hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-6 text-base flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    View Detailed BOM
                  </Button>
                  
                  <Button 
                    className="bg-[var(--light-blue)] text-black border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-6 text-base flex items-center justify-center gap-2"
                    href="/hardware/downloads"
                    target="_blank"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                    Downloads
                  </Button>
                </div>              
            </div>
            
            {/* Customization Note */}
            <p className="bg-transparent text-black/70 leading-relaxed text-justify">
              The OSL is designed to be highly customizable. Researchers have the flexibility to tailor the device to their 
              specific needs, including adjusting the knee's series elastic element, selecting the foot type, and incorporating 
              a load cell, among other options. Both the knee and ankle function either as a series elastic actuator (SEA) or 
              rigid actuator, and the stiffness can be selected using custom designed spring disks that fit inside the output 
              pulley without changing the OSL's volume.
            </p>
          </div>
        </section>



        {/* Build Your OSL Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                Build{" "}
                <span className="relative font-medium italic">
                  Your
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
                {" "}Open-Source Leg
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Build your own Open-Source Leg with complete design files, detailed documentation, and video tutorials.
                This approach offers maximum flexibility and learning opportunities.
              </p>
            </div>
            
            {/* Build Process Diagram */}
            <div className="mb-16">
              <BuildProcessDiagram />
            </div>
            
            {/* Benefits and Actions Section */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                {/* Left Column - Action Buttons */}
                <div className="flex flex-col h-full justify-between">
                  <Button 
                    href="https://docs.google.com/spreadsheets/d/1qVSoAV6mRzleJ215N53O3MT-OEZ30ZFP/edit?usp=share_link&ouid=101976074095932955884&rtpof=true&sd=true"
                    target="_blank"
                    className="w-full flex-1 bg-[var(--white)] text-black hover:bg-[var(--light-green)] hover:text-black border border-black rounded-lg px-6 py-8 text-base font-medium flex items-center justify-center gap-2 mb-4"
                  >
                    <FileText className="w-5 h-5" />
                    Bill of Materials
                  </Button>
                  
                  <Button 
                    href="/hardware/downloads"
                    target="_blank"
                    className="w-full flex-1 bg-[var(--light-blue)] text-black hover:bg-[var(--light-green)] hover:text-black border border-black rounded-lg px-6 py-8 text-base font-medium flex items-center justify-center gap-2 mb-4"
                  >
                    <Download className="w-5 h-5" />
                    Download Design Files
                  </Button>
                  
                  <Button 
                    href="/tutorials"
                    className="w-full flex-1 bg-[var(--black)] text-white hover:bg-[var(--light-green)] hover:text-black border border-black rounded-lg px-6 py-8 text-base font-medium flex items-center justify-center gap-2"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                    Tutorials on How to Assemble
                  </Button>
                </div>
                
                {/* Right Column - Benefits */}
                <div className="space-y-4 border border-black rounded-2xl p-8 shadow-xl">
                  {diyBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Commercial Option & Partnership */}
            <div className="mt-12 bg-[var(--black)] text-white border-2 border-black rounded-2xl px-8 shadow-2xl py-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
                    <span className="relative font-medium italic">
                      Commercial
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
                    {" "}Option
                  </h3>
                </div>
                <div className="p-3">
                  <img 
                    src="/logo/humotech-logo.svg" 
                    alt="Humotech Logo" 
                    className="h-8 w-auto"
                  />
                </div>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6 flex flex-col gap-4 justify-between h-full">
                  <p className="text-white/90 leading-relaxed text-justify">
                    For research groups who prefer to purchase rather than build, we have partnered with{" "}
                    <span className="text-[var(--light-green)] font-semibold">Humotech</span> to offer professional 
                    assembly and support services. Humotech has successfully supplied 7+ OSL systems across the USA, 
                    Canada, and Europe.
                  </p>
                  
                  <div className="bg-transparent border border-white rounded-2xl p-6">
                    <h4 className="text-[var(--light-green)] font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Partnership Note
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Our collaboration with Humotech exists purely to expand access to OSL technology for the research 
                      community. We do not profit from these commercial services—this partnership is designed to support 
                      researchers with technical questions and make the Open-Source Leg readily available for those who prefer to purchase.
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      href="https://humotech.com"
                      target="_blank"
                      className="flex-1 bg-[var(--light-blue)] text-black border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-6 text-base flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Humotech
                    </Button>
                    
                    <Button 
                      variant="outline"
                      href="/contact"
                      className="flex-1 bg-transparent border-white text-white hover:bg-[var(--light-green)] hover:text-black hover:border-black rounded-lg px-6 py-6 text-base flex items-center justify-center gap-2"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                      Contact Us
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 flex flex-col gap-4 justify-between h-full">
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-xl">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 text-lg mb-1">Fully Assembled</h4>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-3xl font-semibold text-[var(--black)] mb-1">$100,000+</p>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">USD</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-xl">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 text-lg mb-1">Parts Kit</h4>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-3xl font-semibold text-[var(--black)] mb-1">$55,000+</p>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">USD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Spec Sheet Section */}
        <section id="specsheet" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                Technical{" "}
                <span className="relative font-medium italic">
                  Specifications
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
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Complete technical specifications for the Open-Source Leg hardware platform
              </p>
            </div>
            
            {/* Spec Table */}
            <div className="bg-[var(--black)] rounded-2xl p-8 border-2 border-black shadow-2xl">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/20">
                    <TableHead className="text-left font-light text-white/70 text-lg">Property</TableHead>
                    <TableHead className="text-right font-light text-white/70 text-lg">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hardwareSpecs.map((spec, index) => (
                    <TableRow key={index} className="border-b border-white/10 hover:bg-white/5">
                      <TableCell className="text-white font-light py-4">{spec.property}</TableCell>
                      <TableCell className="text-right text-white py-4">
                        <span className="font-semibold text-[var(--light-green)]">{spec.value}</span>
                        {spec.unit && <span className="text-[var(--light-green)] ml-1">{spec.unit}</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Notes Section */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="space-y-2">
                  {specNotes.map((note, index) => (
                    <p key={index} className="text-sm text-white/70 leading-relaxed">
                      • {note}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </div>
      
    );
  }