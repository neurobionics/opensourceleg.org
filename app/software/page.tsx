import { PageHero } from "@/components/page-hero";
import { ExternalLink } from "lucide-react";

export default function Software() {
    return (
      <div className="min-h-screen pt-12">
        <PageHero 
          title={
            <>
              Open-Source Leg{" "}
              <span className="font-bold italic">Software</span>
            </>
          }
          description="Designed to be easy to manufacture, assemble, and repair"
          primaryButton={{
            href: "https://neurobionics.github.io/opensourceleg/",
            text: "View Documentation",
            icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />,
            target: "_blank"
          }}
          secondaryButton={{
            href: "https://github.com/neurobionics/opensourceleg",
            text: "View on Github",
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
              <source src="/videos/opensourceleg-software.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Text Content */}
            <div className="space-y-6 max-w-6xl mx-auto">
              <p className="text-base text-gray-600 leading-relaxed text-justify">
              The Open-Source Leg software platform is designed to be modular and flexible to allow for easy integration with a wide variety of sensors and robotics frameworks.
              The software library is written in Python and is compatible with Python 3.9 and above. The library is designed to run on debian based linux distributions.
              You&apos;ll find instructions below on how to setup a Raspberry Pi to control your OSL and how to install our python library.
              </p>
            </div>
          </div>
        </section>

      </div>
      
    );
  }