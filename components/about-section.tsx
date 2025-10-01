"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import SectionWrapper from "@/components/section-wrapper"

export default function AboutSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const highlights = [
    {
      title: "Full-Stack Developer",
      description: "Experienced in building responsive web applications and e-commerce platforms",
    },
    {
      title: "Problem Solver",
      description: "Strong foundation in algorithms, data structures, and system design",
    },
    {
      title: "Team Leader",
      description: "Proven leadership through volunteer work and collaborative projects",
    },
    {
      title: "Innovator",
      description: "Passion for building creative, real-world solutions.",
    },
  ]

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
    <SectionWrapper showFog={true}>
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-zinc-950"></div>

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/80 z-20 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-xl">
                <p className="text-lg text-white/90 mb-6 leading-relaxed">
                  I'm Leo De Leon, a Computer Information Systems major at Illinois Institute of Technology, passionate
                  about full-stack web development and scalable, user-centered applications. Skilled in Java, Python,
                  JavaScript, and modern frameworks, I focus on responsive design, database optimization, and
                  problem-solving that turns complex challenges into impactful solutions.
                </p>
              </div>

              <div className="grid gap-4 mt-6">
                {highlights.map((highlight, index) => (
                  <Card
                    key={index}
                    className="p-4 bg-white/5 backdrop-blur-md border-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-white">{highlight.title}</h3>
                    <p className="text-white/80">{highlight.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <Image src="/images/profile-about.jpg" alt="Leo De Leon" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  )
}
