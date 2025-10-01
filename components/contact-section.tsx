import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import SectionWrapper from "@/components/section-wrapper"

export default function ContactSection() {
  return (
    <SectionWrapper showFog={true}>
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Get In Touch</h2>
          <p className="text-lg text-white/70 mb-12 text-center max-w-2xl mx-auto">
            I'm always open to discussing new projects, opportunities, or collaborations
          </p>

          <Card className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Let's Connect</CardTitle>
              <CardDescription className="text-base text-white/80">
                Feel free to reach out through any of these platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center w-full h-14 text-base text-white bg-white/10 border-2 border-white/30 rounded-md select-all">
                <Mail className="w-5 h-5 mr-3" />
                leodeleoncareer@gmail.com
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full h-14 text-base text-white bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
                size="lg"
              >
                <Link href="https://linkedin.com/in/ldeleon10" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 mr-3" />
                  Connect on LinkedIn
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full h-14 text-base text-white bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
                size="lg"
              >
                <Link href="https://github.com/ljdeleon2" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-3" />
                  Follow on GitHub
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </SectionWrapper>
  )
}
