"use client"

import { Button } from "@/components/ui/button"
import {
  Move3DIcon,
  Github,
  Zap,
  Cpu,
  BookOpen,
  ArrowRight,
  Check,
  Play,
  Code,
  Wrench,
  Activity,
  Shield,
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
      <div className="bg-black text-white min-h-screen relative overflow-hidden rounded-[3rem]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Feature badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                  <Cpu className="w-4 h-4" />
                  Real-time Control
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                  <Zap className="w-4 h-4" />
                  Low Latency
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                  <Shield className="w-4 h-4" />
                  Safety First
                </div>
              </div>

              {/* Main headline */}
              <h2 className="text-4xl md:text-5xl font-light leading-tight">
                Advanced control system for next-generation prosthetics
              </h2>

              {/* Description */}
              <p className="text-xl text-gray-300 leading-relaxed">
                Real-time sensor fusion, adaptive gait control, and machine learning-powered movement prediction.
              </p>

              {/* CTA button */}
              <Button 
                href="#demo"
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 text-lg flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Right Content - Technical Visualization */}
            <div className="relative">
              {/* Floating tech icons */}
              <div className="absolute -top-10 -left-10 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-20 -left-20 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-5 left-20 w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-10 left-40 w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>

              {/* Device mockup */}
              <div className="bg-gray-900 rounded-[2.5rem] p-6 max-w-sm mx-auto border-4 border-gray-700">
                <div className="bg-black rounded-[2rem] p-6 h-[400px] flex flex-col">
                  {/* Status display */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm">System Active</span>
                    </div>
                    <div className="text-green-400 text-sm">98% Battery</div>
                  </div>

                  {/* Sensor readings */}
                  <div className="flex-1 space-y-4">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">IMU Sensor</span>
                        <span className="text-green-400 text-sm">Active</span>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-2 bg-green-500 rounded-sm"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Pressure Sensors</span>
                        <span className="text-blue-400 text-sm">Calibrated</span>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-3 bg-blue-500 rounded-sm"
                            style={{
                              height: `${Math.random() * 15 + 5}px`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Control interface */}
                  <div className="mt-4 bg-gray-800 rounded-xl px-4 py-3 flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Gait Mode: Normal</span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community & Partners Section */}
      <div className="bg-blue-700 text-white py-16 relative z-0 -mt-24">
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
