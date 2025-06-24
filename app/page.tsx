"use client"

import { Button } from "@/components/ui/button"
import {
  Move3DIcon,
  Github,
  BookOpen,
  ArrowRight,
  Check,
  Wrench,
} from "lucide-react"

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Main content */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-32">
          {/* Main headline */}
          <h1 className="text-3xl md:text-5xl mb-6 font-semibold max-w-5xl">
            <span className="text-black">Open-Source Leg</span>{" "}
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
            An end-to-end open-source platform that makes
            prosthetics research more accessible, collaborative, and reproducible.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              href="https://github.com/neurobionics/opensourceleg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--light-green)] text-black border hover:bg-gray-50 rounded-lg px-6 py-6 text-lg flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </Button>
            <Button
              href="https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="text-black border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-6 py-6 text-lg flex items-center gap-2"
            >
              <Move3DIcon className="w-5 h-5" />
              View on Onshape
            </Button>
          </div>

          <p className="text-gray-500 text-sm">Built by researchers, for researchers</p>
        </main>
      </div>

      {/* Features Section */}
      <div className="bg-[var(--black)] text-white relative overflow-hidden -mt-28">
        <div className="max-w-7xl mx-auto px-6 h-[90vh] flex items-center -mt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full h-full py-20">
            {/* Left Content - Video */}
            <div className="h-full flex items-center">
              {/* YouTube Video Embed */}
              <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  src="https://www.youtube.com/embed/xFliFk65l3Q?autoplay=1&mute=1"
                  title="OpenSource Leg Intro"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Right Content - Quote */}
            <div className="h-full flex items-center">
              <div className="relative w-full">
                {/* Quote SVG Icon */}
                <svg 
                  className="absolute -top-6 -left-6 w-16 h-16 text-white/20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
                
                <blockquote className="text-white pl-12">
                  <p className="text-2xl md:text-3xl font-semibold leading-relaxed mb-8">
                    To give people access to the tools needed to overcome the barriers preventing these technologies from impacting the lives of people with disabilities.
                  </p>
                  <footer className="text-white/60 text-lg">
                    <cite>— Prof. Elliott Rouse, University of Michigan</cite>
                  </footer>
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Community & Partners Section */}
      <div className="bg-[var(--light-blue)] text-white py-16 relative z-0 -mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8">
            {/* Centered heading */}
            <h3 className="text-2xl md:text-3xl font-light">
              Trusted by researchers and institutions worldwide
            </h3>

            {/* Partners carousel */}
            <div className="flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-12 animate-scroll whitespace-nowrap">
                {/* First set */}
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">MIT</span>
                </div>
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">Stanford</span>
                </div>
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">Carnegie Mellon</span>
                </div>
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">Johns Hopkins</span>
                </div>
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">ETH Zurich</span>
                </div>

                {/* Duplicate set for seamless loop */}
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">MIT</span>
                </div>
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">Stanford</span>
                </div>
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">Carnegie Mellon</span>
                </div>
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">Johns Hopkins</span>
                </div>
                <div className="text-white/80 whitespace-nowrap">
                  <span className="text-lg font-medium">ETH Zurich</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Benefits Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main headline */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light mb-8">
              <span className="relative">
                10x
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-300 rounded-full"></div>
              </span>{" "}
              faster development
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Open-source collaboration accelerates innovation in prosthetic technology.
              <br />
              When researchers share code, hardware designs, and data, everyone benefits.
              <br />
              Join the movement to democratize assistive technology.
            </p>
          </div>

          {/* Comparison panels */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Traditional panel */}
            <div className="bg-[#f8f6f0] rounded-3xl p-8 h-80 flex flex-col justify-between border border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">Traditional Development</h3>
                <div className="text-5xl font-light text-black mb-8">5-7 years</div>
              </div>
              <div className="text-gray-500 text-base">Proprietary, siloed research</div>
            </div>

            {/* Open Source panel */}
            <div className="relative rounded-3xl h-80 overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-purple-900 to-indigo-800"></div>
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Floating elements */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"></div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-lg font-medium text-white/80 mb-2">Open Source</h3>
                  <div className="text-5xl font-light mb-8">6-12 months</div>
                </div>

                {/* Features */}
                <div className="space-y-2 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Collaborative development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Shared knowledge base</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Rapid iteration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Users Section */}
      <div className="bg-black text-white rounded-[3rem] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Main headline */}
              <h2 className="text-4xl md:text-5xl font-light leading-tight">
                Built <span className="text-blue-400 italic">for innovators</span>
              </h2>

              {/* Category tags */}
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-400 text-black px-4 py-2 rounded-full text-sm font-medium">
                  Researchers
                </span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Engineers</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Students</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Clinicians</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Makers</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Startups</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Universities</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Medical Centers</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Prosthetists</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Bioengineers</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Roboticists</span>
                <span className="border border-white/30 text-white px-4 py-2 rounded-full text-sm">Hackers</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              {/* Illustration */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {/* Main circle */}
                  <div className="w-48 h-48 bg-blue-300 rounded-full flex items-center justify-center relative">
                    {/* Inner circle */}
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center relative">
                      {/* Circuit pattern */}
                      <div className="absolute inset-4 border-2 border-blue-400 rounded-full"></div>
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      
                      {/* Connection lines */}
                      <div className="absolute top-4 left-1/2 w-0.5 h-6 bg-blue-400 transform -translate-x-1/2"></div>
                      <div className="absolute bottom-4 left-1/2 w-0.5 h-6 bg-blue-400 transform -translate-x-1/2"></div>
                      <div className="absolute left-4 top-1/2 w-6 h-0.5 bg-blue-400 transform -translate-y-1/2"></div>
                      <div className="absolute right-4 top-1/2 w-6 h-0.5 bg-blue-400 transform -translate-y-1/2"></div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -right-8 top-8 w-16 h-20 bg-white rounded-lg border-4 border-blue-500 transform rotate-12">
                      <div className="p-2 space-y-1">
                        <div className="w-8 h-1 bg-blue-400 rounded-full"></div>
                        <div className="w-6 h-1 bg-blue-400 rounded-full"></div>
                        <div className="w-7 h-1 bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-light">For Research & Development</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Whether you&apos;re developing new control algorithms, testing sensor configurations, or studying
                  gait patterns, our platform provides the tools and community support you need to innovate.
                </p>
                <Button 
                  href="/docs/getting-started"
                  className="bg-blue-400 text-black hover:bg-blue-300 rounded-full px-8 py-3 text-lg flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Showcase Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Tech Demo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Code snippet */}
                <div className="relative z-10 mb-8">
                  <div className="text-white text-sm font-mono leading-relaxed bg-gray-900/50 rounded-xl p-4">
                    <div className="text-green-400"># Initialize prosthetic control system</div>
                    <div className="text-blue-300">from opensourceleg import ProstheticLeg</div>
                    <div className="text-white">leg = ProstheticLeg()</div>
                    <div className="text-white">leg.calibrate_sensors()</div>
                    <div className="text-green-400"># Real-time gait control</div>
                    <div className="text-white">leg.start_walking_mode()</div>
                  </div>
                </div>

                {/* Feature highlights */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-white text-sm space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Real-time sensor fusion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Machine learning integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Modular hardware design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-light leading-tight">
                  <span className="relative">
                    Advanced Technology Stack
                    <div className="absolute -top-4 -left-4 w-8 h-8">
                      <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-0 left-0"></div>
                      <div className="w-1 h-4 bg-blue-500 rounded-full absolute top-1 left-3 rotate-45"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full absolute bottom-0 right-0"></div>
                    </div>
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Built on proven robotics frameworks with real-time control capabilities. Our modular design
                  allows researchers to focus on innovation rather than infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Left Content */}
            <div className="max-w-md">
              <div className="space-y-6 mb-8">
                <h2 className="text-4xl md:text-5xl font-light leading-tight">Quick Start Guide</h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Get up and running with the OpenSource Leg platform in minutes with our comprehensive documentation.
                </p>
              </div>

              {/* Quick start steps */}
              <div className="bg-gray-900 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-xl font-medium">Installation Steps</h3>
                  <div className="bg-gray-700 rounded-full p-2">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span>Clone the repository</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span>Install dependencies</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span>Run calibration</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <span>Start developing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Documentation Preview */}
            <div className="lg:absolute lg:right-0 lg:top-1/2 lg:w-1/2 lg:h-full mt-16 lg:mt-0">
              <div className="lg:h-full lg:flex lg:flex-col lg:justify-start">
                <div className="space-y-6 mb-8">
                  <h2 className="text-4xl md:text-5xl font-light leading-tight">Comprehensive Documentation</h2>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    From hardware assembly to advanced control algorithms. Everything you need to get started.
                  </p>
                </div>

                {/* Documentation preview */}
                <div className="bg-gray-900 rounded-3xl p-8 max-w-md">
                  <div className="flex justify-center">
                    <div className="bg-white rounded-xl px-6 py-4 flex items-center gap-3 w-full">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">API Reference</div>
                        <div className="text-sm text-gray-500">Complete function library</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
