import { ArrowDown, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export default function Tutorials() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            Hardware{" "}
            <span className="font-bold italic">Tutorials</span>
          </>
        }
        description="Check out our tutorials on how to assemble your Open-Source Leg system"
        primaryButton={{
          href: "#datasheets",
          text: "View Electrical Assembly",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />,     
        }}
        secondaryButton={{
          href: "https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4",
          target: "_blank",
          text: "View CAD on Onshape",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
      />

      <div id="configurator" className="bg-[var(--light-blue)] py-24 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 sm:my-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Tutorials
          </h2>
        </div>
      </div>
    </div>
  );
}