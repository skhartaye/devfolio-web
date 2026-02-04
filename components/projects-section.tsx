"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      title: "Aeroband - IoT Air Quality Monitor",
      description:
        "Real-time air quality monitoring system with mobile app and web dashboard. Winner of IoTCon 2025 1st Runner Up. Built with React, TypeScript, Netlify, Neon Postgres, and Move.",
      image: "/iot-air-quality-monitoring-device-dashboard.jpg",
      technologies: ["React", "TypeScript", "Netlify", "Neon Postgres", "Move"],
      github: "https://github.com/skhartaye/aeroband",
      demo: "https://www.youtube.com/watch?v=Sz5kBviUIdI",
      featured: true,
    },
    {
      title: "Smoki - Smart Smoke Detection System",
      description:
        "Advanced vehicle smoke detection system using IoT sensors and machine learning algorithms. Real-time monitoring with instant alerts and automated safety responses.",
      image: "/iot-air-quality-monitoring-device-dashboard.jpg", // Using IoT image since it's similar
      technologies: ["Python", "C++", "PostgreSQL", "Docker", "IoT", "Machine Learning"],
      github: "https://github.com/skhartaye/smoki",
      demo: "https://github.com/skhartaye/smoki",
      featured: true,
    },
    {
      title: "Aerocore - GameFi on Aptos",
      description:
        "A GameFi platform powered by Aptos blockchain. Stake your assets to earn rewards with secure smart contracts built in Move language.",
      image: "/weather-analytics-dashboard-with-charts-and-graphs.jpg", // Dashboard-style image for crypto/finance
      technologies: ["Aptos", "Move", "React", "TypeScript", "Next.js", "Tailwind CSS"],
      github: "https://github.com/skhartaye/aerocore",
      demo: "https://github.com/skhartaye/aerocore",
      featured: false,
    },
    {
      title: "Fintech Platform",
      description:
        "A comprehensive platform for buying and selling projects in the Philippines. Features secure transactions, project listings, and user management.",
      image: "/modern-ecommerce-interface.png", // E-commerce style fits fintech platform
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Shadcn UI"],
      github: "https://github.com/skhartaye/fintech",
      demo: "https://github.com/skhartaye/fintech",
      featured: false,
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">Featured Projects</h2>

          {/* Featured Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects.filter(project => project.featured).map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ring-2 ring-primary/20"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg h-48">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary z-10">Featured</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3 text-balance">{project.title}</CardTitle>
                  <p className="text-muted-foreground mb-4 text-pretty">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {project.title === "Aeroband - IoT Air Quality Monitor" && (
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  )}
                  {project.title === "Smoki - Smart Smoke Detection System" && (
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="h-4 w-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Other Projects */}
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-balance">Other Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(project => !project.featured).map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg h-40">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 text-balance">{project.title}</CardTitle>
                  <p className="text-muted-foreground mb-3 text-sm text-pretty">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
