"use client"

import { useEffect, useRef } from "react"
import SectionWrapper from "@/components/section-wrapper"

export default function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const skillCategories = [
    {
      category: "Languages",
      skills: ["Java", "Python", "JavaScript", "C++", "HTML", "CSS", "SQL"],
    },
    {
      category: "Frameworks & Tools",
      skills: [
        "Git",
        "GitHub",
        "VS Code",
        "NetBeans",
        "Eclipse",
        "JavaFX",
        "HubSpot CMS",
        "GoDaddy",
        "Agile Methodologies",
      ],
    },
    {
      category: "Databases",
      skills: ["MySQL", "PostgreSQL", "SQL Server"],
    },
    {
      category: "Core Competencies",
      skills: [
        "Responsive Web Design",
        "E-Commerce Development",
        "Full-Stack Development",
        "Version Control",
        "UI/UX Design",
        "Accessibility",
      ],
    },
    {
      category: "Collaboration & Design Tools",
      skills: ["Slack", "Microsoft Teams", "Figma"],
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
    <SectionWrapper showFog={false}>
      <section id="skills" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Skills</h2>
          <p className="text-lg text-white/70 mb-12 text-center max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {skillCategories.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">{category.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-black/60 text-white rounded-lg border border-white/20 hover:border-white/60 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 text-sm font-medium animate-pulse-slow"
                      style={{
                        animationDelay: `${skillIndex * 0.1}s`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionWrapper>
  )
}
