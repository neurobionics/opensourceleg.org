"use client"

import Lottie from "lottie-react"
import landingAnimation from "@/public/landing.json"

export default function LottieAnimation() {
  return (
    <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-2 sm:mb-4">
      <Lottie animationData={landingAnimation} loop={true} />
    </div>
  )
} 