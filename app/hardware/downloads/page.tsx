"use client";

import { PageHero } from "@/components/page-hero";
import { useState } from "react";
import { Download, ExternalLink, Settings, Zap, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  type DownloadConfig, 
  type JointSelection, 
  type SEASelection,
  jointOptions,
  seaOptions,
  getDownloadInfo,
  defaultConfig
} from "@/lib/hardware-downloads";

export default function Downloads() {
  const [config, setConfig] = useState<DownloadConfig>(defaultConfig);

  const downloadInfo = getDownloadInfo(config);

  // Helper function to render icons
  const renderIcon = (iconType: 'zap' | 'zap-off', iconColor: string) => {
    const className = `w-4 h-4 ${iconColor}`;
    return iconType === 'zap' ? <Zap className={className} /> : <ZapOff className={className} />;
  };

  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            Hardware{" "}
            <span className="font-bold italic">Downloads</span>
          </>
        }
        description="Configure and download the hardware files for your Open-Source Leg system"
        primaryButton={{
          href: "https://docs.google.com/spreadsheets/d/1qVSoAV6mRzleJ215N53O3MT-OEZ30ZFP/edit?usp=drive_link&ouid=101976074095932955884&rtpof=true&sd=true",
          target: "_blank",
          text: "View Bill of Materials",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
        secondaryButton={{
          href: "https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4",
          text: "View CAD Models",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />,
          target: "_blank"
        }}
      />

      <div id="configurator" className="bg-[var(--light-blue)] py-24 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 sm:my-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Main Title */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
              <span className="relative font-medium italic">
                Configure
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
              {" "}your System
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl mx-auto">
              Select the joints you want to build and whether you need Series Elastic Actuators.
            </p>
          </div>

        {/* Configuration Cards */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Joint Selection */}
            <Card className="h-full bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-xl italic font-semibold text-gray-900 flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" />
                  Joint Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jointOptions.map((option) => (
                    <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="joints"
                        value={option.value}
                        checked={config.joints === option.value}
                        onChange={(e) => setConfig(prev => ({ ...prev, joints: e.target.value as JointSelection }))}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SEA Selection */}
            <Card className="h-full bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-xl italic font-semibold text-gray-900 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Series Elasticity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seaOptions.map((option) => (
                    <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sea"
                        value={option.value}
                        checked={config.sea === option.value}
                        onChange={(e) => setConfig(prev => ({ ...prev, sea: e.target.value as SEASelection }))}
                        className="mt-1"
                      />
                      <div className="flex items-start gap-2">
                        {renderIcon(option.iconType, option.iconColor)}
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flowchart Arrows */}
          <div className="hidden md:block absolute -bottom-16 left-0 right-0 h-16 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 100" preserveAspectRatio="none">
              {/* Left arrow from Joint Selection */}
              <g stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 200 0 L 200 40 Q 200 50 210 50 L 390 50 Q 400 50 400 60 L 400 76" />
                <path d="M 395 72 L 400 82 L 405 72" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              
              {/* Right arrow from Series Elasticity */}
              <g stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 600 0 L 600 40 Q 600 50 590 50 L 400 50" />
              </g>
            </svg>
          </div>
        </div>

        {/* Downloadable Files Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="h-full bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold italic text-gray-900 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Downloadable Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900 mb-1 text-center">{downloadInfo.title}</div>
                  <div className="text-sm text-gray-600 text-center">{downloadInfo.description}</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <Button 
                    href={downloadInfo.cadDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    Download STEP + DWG Files
                  </Button>
                  <Button 
                    href={downloadInfo.quotesDownloadUrl}
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    Example Quotes from a Machine Shop
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
}