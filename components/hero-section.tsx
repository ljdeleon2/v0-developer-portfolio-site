"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function HeroSection() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const typedRef = useRef<HTMLHeadingElement>(null)
  const vantaEffectRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const pathname = usePathname()
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    setResetKey((prev) => prev + 1)
    setIsLoaded(false)
    setShowContent(false)
  }, [pathname])

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 1200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(contentTimer)
    }
  }, [resetKey])

  useEffect(() => {
    if (!typedRef.current || !showContent) return

    const loadTyped = async () => {
      if (typeof window !== "undefined" && !window.Typed) {
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/npm/typed.js@2.0.12"
        document.body.appendChild(script)

        await new Promise((resolve) => {
          script.onload = resolve
        })
      }

      if (window.Typed && typedRef.current) {
        new window.Typed(typedRef.current, {
          strings: ["CIS Major | Web Developer | Full-Stack"],
          typeSpeed: 90,
          backSpeed: 40,
          backDelay: 1200,
          smartBackspace: true,
          loop: false,
          showCursor: false,
        })
      }
    }

    loadTyped()
  }, [showContent, resetKey])

  useEffect(() => {
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
  }, [resetKey])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className={`fixed inset-0 bg-black z-50 transition-all duration-1000 pointer-events-none ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`fixed inset-0 backdrop-blur-xl z-40 transition-all duration-1000 pointer-events-none ${
          showContent ? "opacity-0" : "opacity-100"
        }`}
      />

      <div ref={vantaRef} className="absolute inset-0 z-0" />

      <div
        className={`container mx-auto px-6 z-10 transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 md:top-24 lg:left-2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 w-[200px] h-[200px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] backdrop-blur-sm" />
              <Image
                src="/images/design-mode/IMG_8693-Picsart-BackgroundRemover.jpg.png"
                alt="Leo De Leon"
                fill
                className="object-cover object-center rounded-full"
                priority
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center text-center pt-[280px] md:pt-[320px] lg:pl-[42%] lg:pr-8 lg:pb-24 lg:pt-24">
            <h1
              ref={typedRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance min-h-[3.5rem] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            />
            <p className="text-base md:text-lg mb-8 max-w-2xl text-pretty text-white bg-black/40 backdrop-blur-sm px-6 py-4 rounded-lg">
              Building innovative web solutions with modern technologies. Passionate about creating seamless user
              experiences and scalable applications.
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="#projects">See My Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
