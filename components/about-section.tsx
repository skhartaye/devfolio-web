"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
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

  const skills = [
    "Python",
    "Move",
    "C++",
    "PHP",
    "PostgreSQL",
    "Docker",
    "JavaScript",
    "TypeScript",
    "React",
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mx-auto mb-6" style={{ width: '306px', height: '248px' }}>
                    <img
                      src="/skhart.jpg"
                      alt="Skhart"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="text-lg text-muted-foreground space-y-4 text-pretty">
                <p>
                  I'm a passionate developer specializing in Python, Move, C++, and PHP. I create robust applications 
                  with PostgreSQL databases and containerized deployments using Docker. I love solving complex problems 
                  with clean, efficient code.
                </p>
                <p>
                  My expertise spans from low-level systems programming in C++ to modern web development with JavaScript 
                  and TypeScript. I enjoy building scalable solutions and exploring new technologies in the blockchain 
                  and IoT space.
                </p>
                <p>
                  I believe in writing maintainable, well-documented code and creating applications that are both 
                  performant and user-friendly. My goal is to build solutions that make a real impact.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
