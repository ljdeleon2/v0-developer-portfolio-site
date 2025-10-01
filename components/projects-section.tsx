"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import SectionWrapper from "@/components/section-wrapper"

export default function ProjectsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const featuredProjects = [
    {
      title: "La Chapina De Chicago",
      description:
        "Built a responsive e-commerce website for a family business with 100+ product listings. Designed a modern UI inspired by leading retail brands (Gymshark, Uniqlo, Off-White) with focus on scalability, accessibility, and mobile-first design.",
      techStack: ["HTML", "CSS", "JavaScript", "GoDaddy", "SSL"],
      github: "https://github.com/ljdeleon2/v0-chapina",
      demo: "https://v0-guatemalan-online-store.vercel.app",
      date: "March 2025 - Present",
    },
    {
      title: "Fantasy Football Draft Website",
      description:
        "Developed a web app to manage fantasy football rosters with a FIFA-inspired card layout. Features include visualization of 11+ player roster positions, projected weekly scores, and opponent matchups. Delivered live demo to 50+ attendees during IIT Innovation Day.",
      techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      github: "https://github.com/ljdeleon2/Fantasy-Fever-App",
      demo: "https://ljdeleon2.github.io/Fantasy-Fever-App",
      date: "November 2024 - Present",
    },
  ]

  const supportingProjects = [
    {
      title: "Ju Restores",
      date: "Nov 2024 – Dec 2024",
      bullets: [
        "Built a clean, responsive website to showcase professional sneaker restoration services",
        "Highlighted before/after visuals and service details with a user-focused layout",
      ],
      techStack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/ljdeleon2/JulianProject",
      demo: "https://ljdeleon2.github.io/JulianProject",
    },
    {
      title: "Corozal, Puerto Rico Travel Guide",
      date: "Jun 2023 – Aug 2023",
      bullets: [
        "Designed and developed a travel guide site promoting cultural insights",
        "Prioritized accessibility and responsive design for desktop and mobile",
      ],
      techStack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/ljdeleon2/travel",
      demo: "https://ljdeleon2.github.io/travel",
    },
    {
      title: "Level Up Study",
      date: "Nov 2024 – Dec 2024",
      bullets: [
        "Collaborated with a peer to create a sleek media site for an educational platform concept",
        "Designed mission, values, and vision sections while ensuring a fast, polished delivery",
      ],
      techStack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/ljdeleon2/JadenProject",
      demo: "https://ljdeleon2.github.io/JadenProject/index.html",
    },
  ]

  const courseworkProjects = [
    "Student System (Java) - Built a comprehensive student management system with CRUD operations",
    "ML Housing Price Predictor (Python) - Developed machine learning model to predict housing prices",
    "JavaFX Converter - Created GUI application for unit conversions",
    "Bash Automation Scripts - Automated system tasks and file management",
    "Data Structures Implementation (Java) - Implemented various data structures from scratch",
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

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.fill()

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

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
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-zinc-950 z-20 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Projects</h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            A collection of my recent work showcasing various technologies and problem-solving approaches
          </p>

          {/* Featured Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-white">Featured Projects</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredProjects.map((project, index) => (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 flex flex-col group"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.date}</p>
                    <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-white/5 text-white/90 rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    {project.github && (
                      <Button asChild variant="outline" className="flex-1 bg-transparent">
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                    <Button asChild className={project.github ? "flex-1" : "w-full"}>
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Supporting Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-white">Supporting Projects</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {supportingProjects.map((project, index) => (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 flex flex-col"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{project.date}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 mb-4">
                      {project.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-sm text-white/80 leading-relaxed">
                          • {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-white/5 text-white/90 rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    {project.github && (
                      <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent text-xs">
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 mr-1" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                    <Button asChild size="sm" className={project.github ? "flex-1 text-xs" : "w-full text-xs"}>
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Coursework Highlights */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-white">Coursework Highlights</h3>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-w-6xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl">Academic Projects & Labs</CardTitle>
                <CardDescription>Key projects from Computer Science coursework</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  {courseworkProjects.map((project, index) => (
                    <li key={index} className="text-sm text-white/80 leading-relaxed">
                      • {project}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SectionWrapper>
  )
}
