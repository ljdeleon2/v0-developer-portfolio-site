"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  showFog?: boolean // Added prop to control fog effect
}

export default function SectionWrapper({ children, className = "", showFog = false }: SectionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffectRef = useRef<any>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible || !showFog) return

    let mounted = true

    const loadVanta = async () => {
      try {
        if (typeof window !== "undefined" && !window.VANTA) {
          const script1 = document.createElement("script")
          script1.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          document.body.appendChild(script1)

          await new Promise((resolve, reject) => {
            script1.onload = resolve
            script1.onerror = reject
          })

          const script2 = document.createElement("script")
          script2.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js"
          document.body.appendChild(script2)

          await new Promise((resolve, reject) => {
            script2.onload = resolve
            script2.onerror = reject
          })
        }

        if (window.VANTA && vantaRef.current && mounted && !vantaEffectRef.current) {
          const effect = window.VANTA.FOG({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0xffffff,
            midtoneColor: 0xaaaaaa,
            lowlightColor: 0x666666,
            baseColor: 0x000000,
            blurFactor: 0.4,
            speed: 0.5,
            zoom: 2.0,
          })
          vantaEffectRef.current = effect
        }
      } catch (error) {
        console.error("[v0] Failed to load Vanta.js:", error)
      }
    }

    loadVanta()

    return () => {
      mounted = false
      if (vantaEffectRef.current) {
        try {
          vantaEffectRef.current.destroy()
        } catch (error) {
          console.error("[v0] Error destroying Vanta effect:", error)
        }
        vantaEffectRef.current = null
      }
    }
  }, [isVisible, showFog]) // Added showFog to dependencies

  return (
    <div
      ref={sectionRef}
      className={`relative transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {showFog && <div ref={vantaRef} className="absolute inset-0 z-0" />}
      {!showFog && <div className="absolute inset-0 bg-black z-0" />}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
