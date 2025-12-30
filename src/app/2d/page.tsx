"use client"

import { Github, Linkedin, Mail, ArrowUpRight, Phone } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import BackButton from "@/components/ui/back-button"
import Image from "next/image"

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "works"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <div className="relative mx-auto max-w-7xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 border shadow-lg">
        <BackButton />
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Sidebar / Navigation */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Jonel Hatwell
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-primary sm:text-xl">
                Web Developer
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-muted-foreground">
                I build digital experiences that are accessible, aesthetically pleasing, and technically sound.
              </p>

              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  <li>
                    <a
                      className={`group flex items-center py-3 ${activeSection === "about" ? "active" : ""}`}
                      href="#about"
                    >
                      <span
                        className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-foreground group-focus-visible:w-16 group-focus-visible:bg-foreground motion-reduce:transition-none ${activeSection === "about" ? "w-16 bg-foreground" : "w-8 bg-muted-foreground"}`}
                      ></span>
                      <span
                        className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-foreground group-focus-visible:text-foreground ${activeSection === "about" ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        About Me
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className={`group flex items-center py-3 ${activeSection === "skills" ? "active" : ""}`}
                      href="#skills"
                    >
                      <span
                        className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-foreground group-focus-visible:w-16 group-focus-visible:bg-foreground motion-reduce:transition-none ${activeSection === "skills" ? "w-16 bg-foreground" : "w-8 bg-muted-foreground"}`}
                      ></span>
                      <span
                        className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-foreground group-focus-visible:text-foreground ${activeSection === "skills" ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        Skills
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className={`group flex items-center py-3 ${activeSection === "works" ? "active" : ""}`}
                      href="#works"
                    >
                      <span
                        className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-foreground group-focus-visible:w-16 group-focus-visible:bg-foreground motion-reduce:transition-none ${activeSection === "works" ? "w-16 bg-foreground" : "w-8 bg-muted-foreground"}`}
                      ></span>
                      <span
                        className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-foreground group-focus-visible:text-foreground ${activeSection === "works" ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        My Works
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
              <TooltipProvider>
                <li className="mr-5 text-xs">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        className="block hover:text-primary transition-colors"
                        href="https://github.com/hatwell-jonel"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="sr-only">GitHub</span>
                        <Github className="h-6 w-6" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="font-bold text-primary">GitHub</TooltipContent>
                  </Tooltip>
                </li>
                <li className="mr-5 text-xs">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        className="block hover:text-primary transition-colors"
                        href="https://www.linkedin.com/in/jonel-hatwell/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-6 w-6" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="font-bold  text-primary">LinkedIn</TooltipContent>
                  </Tooltip>
                </li>
                <li className="mr-5 text-xs">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        className="block hover:text-primary transition-colors"
                        href="mailto:jonelhatwell@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        title="Email"
                      >
                        <span className="sr-only">Email</span>
                        <Mail className="h-6 w-6" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="font-bold  text-primary">G-mail | jonelhatwell@gmail.com</TooltipContent>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-pointer">
                        <span className="sr-only">🇵🇭</span>
                        <Phone className="h-6 w-6" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="font-bold  text-primary">🇵🇭 | (+63) 906-0280-894</TooltipContent>
                  </Tooltip>
                </li>
              </TooltipProvider>
            </ul>
          </header>

          {/* Content Area */}
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">About Me</h2>
              </div>
              <div>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  I&apos;m a developer who thrives at the intersection of design and technology. My journey started with a
                  fascination for how things work on the web, which evolved into a career dedicated to crafting{" "}
                  <span className="text-foreground font-medium">seamless user interfaces</span> and{" "}
                  <span className="text-foreground font-medium">robust digital solutions</span>.
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Currently, I&apos;m focused on exploring the potential of AI-driven interfaces and minimalist design
                  systems. I believe that the best products are those that solve complex problems with elegant, simple
                  solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I&apos;m not coding, you can find me experimenting with digital photography, reading about
                  architecture, or searching for the perfect cup of coffee.
                </p>
              </div>
            </section>

            {/* Skills Section */}
            <section
              id="skills"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="My skills"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">Skills</h2>
              </div>
              <div>
                <div className="grid grid-cols-1 gap-8">
                  {[
                    {
                      category: "Frontend",
                      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
                    },
                    {
                      category: "Backend & Tools",
                      skills: ["Node.js", "PostgreSQL", "Prisma", "AWS", "Docker", "Git"],
                    },
                    {
                      category: "Design",
                      skills: ["Figma", "Adobe Creative Suite", "UI/UX Design", "Motion Graphics"],
                    },
                  ].map((group) => (
                    <div key={group.category}>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                        {group.category}
                      </h3>
                      <ul className="flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
                        {group.skills.map((skill) => (
                          <li key={skill}>
                            <Badge
                              variant="secondary"
                              className="px-3 py-1 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-default"
                            >
                              {skill}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Works Section */}
            <section
              id="works"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Selected projects"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">My Works</h2>
              </div>
              <div>
                <ul className="group/list">
                  {[
                    {
                      title: "Nova Dashboard",
                      description:
                        "A comprehensive analytics platform for modern SaaS companies. Featuring real-time data visualization and customizable reporting modules.",
                      tags: ["React", "Next.js", "Tailwind CSS", "Recharts"],
                      image: "/modern-analytics-dashboard-preview.jpg",
                    },
                    {
                      title: "Aether CMS",
                      description:
                        "A headless content management system designed for speed and developer experience. Built with a focus on performance and extensibility.",
                      tags: ["TypeScript", "Node.js", "PostgreSQL", "Prisma"],
                      image: "/code-editor-and-cms-interface.jpg",
                    },
                    {
                      title: "Lumina Portfolio",
                      description:
                        "An award-winning minimalist portfolio template for creative professionals. Focuses on typography and smooth transitions.",
                      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
                      image: "/minimalist-typography-portfolio-layout.jpg",
                    },
                  ].map((project, index) => (
                    <li key={index} className="mb-12">
                      <Card className="group relative border-none bg-transparent shadow-none transition-all lg:hover:opacity-100! lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-muted/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <CardHeader className="p-0 z-10 grid gap-4 sm:grid-cols-8 sm:gap-8 md:gap-4">
                          <div className="z-10 sm:order-2 sm:col-span-6">
                            <CardTitle>
                              <Link
                                className="inline-flex items-baseline font-medium leading-tight text-foreground hover:text-primary focus-visible:text-primary group/link text-base"
                                href="#"
                              >
                                <span className="absolute -inset-x-4 -inset-y-4 hidden rounded md:-inset-x-6 md:-inset-y-6 lg:block"></span>
                                <span>
                                  {project.title}{" "}
                                  <span className="inline-block">
                                    <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                  </span>
                                </span>
                              </Link>
                            </CardTitle>
                            <CardDescription className="mt-2 text-sm leading-normal text-muted-foreground">
                              {project.description}
                            </CardDescription>
                            <CardContent className="p-0 mt-2 flex flex-wrap gap-1.5" aria-label="Technologies used">
                              {project.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </CardContent>
                          </div>
                          <div className="z-10 sm:order-1 sm:col-span-2">
                            <Image
                              alt={project.title}
                              loading="lazy"
                              width="200"
                              height="48"
                              decoding="async"
                              className="rounded border-2 border-muted/50 transition group-hover:border-primary/50 sm:translate-y-1"
                              src={project.image || "/placeholder.svg"}
                            />
                          </div>
                        </CardHeader>
                      </Card>
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <Button variant="ghost" asChild className="p-0 hover:bg-transparent hover:text-primary group">
                    <Link href="#">
                      <span>View Full Project Archive</span>
                      <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            <footer className="max-w-md pb-16 text-sm text-muted-foreground sm:pb-0">
              <p>
                Loosely designed in Figma and coded in{" "}
                <a href="#" className="font-medium text-foreground hover:text-primary focus-visible:text-primary">
                  Visual Studio Code
                </a>
                . Built with{" "}
                <a href="#" className="font-medium text-foreground hover:text-primary focus-visible:text-primary">
                  Next.js
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-foreground hover:text-primary focus-visible:text-primary">
                  Tailwind CSS
                </a>
                , deployed with{" "}
                <a href="#" className="font-medium text-foreground hover:text-primary focus-visible:text-primary">
                  Vercel
                </a>
                .
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
