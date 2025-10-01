"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"

export default function EducationSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.fill()

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <SectionWrapper showFog={false}>
      <section id="education" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black z-20 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Education</h2>

          <Card className="max-w-3xl mx-auto bg-black/40 backdrop-blur-sm border-white/10">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="relative p-3 bg-white/5 rounded-lg border border-white/20">
                  <GraduationCap className="w-8 h-8 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                </div>
                <div className="flex-grow">
                  <CardTitle className="text-2xl mb-2">Bachelor of Science in Computer Information Systems</CardTitle>
                  <p className="text-lg text-white/70">Illinois Institute of Technology, Chicago, IL</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white/60 mb-1">Expected Graduation</p>
                  <p className="text-lg font-semibold">December 2025</p>
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">Minor</p>
                  <p className="text-lg font-semibold">Internet Application Development</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/60 mb-2">Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Object-Oriented Programming",
                    "Web Development",
                    "Database Systems",
                    "Software Engineering",
                    "Machine Learning",
                    "Artificial Intelligence",
                    "Data Structures & Algorithms",
                    "Web Application Development",
                    "Human-Computer Interaction",
                  ].map((course, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-white/5 text-white/90 rounded-md border border-white/10"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/60 mb-2">Certifications</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
                    <span>IBM Z Xplore (Mainframe Fundamentals & Advanced) - In Progress, 2025</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
                    <span>HubSpot CMS for Developers II - Coursework Completed, 2025</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </SectionWrapper>
  )
}
