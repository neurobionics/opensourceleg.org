import { PageHero } from "@/components/page-hero";
import { ArrowDown, ExternalLink } from "lucide-react";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

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
        
        {/* Hardware Comparison Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-black">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage 
                    src="/hardware/osl-v1-info.svg" 
                    alt="Open-Source Leg Version 1" 
                    style={{ objectFit: 'contain' }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage 
                    src="/hardware/osl-v2-info.svg" 
                    alt="Open-Source Leg Version 2" 
                    style={{ objectFit: 'contain' }}
                  />
                }
                position={35}
                className="w-full aspect-auto"
              />
              
              {/* Labels */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                Version 1
              </div>
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                Version 2
              </div>
            </div>
          </div>
        </section>
      </div>
      
    );
  }