"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RocketIcon, TargetIcon, BookOpenIcon, UsersIcon } from "lucide-react"

export function PlansSection() {
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

  const plans = [
    {
      icon: RocketIcon,
      title: "Launch SaaS Platform",
      description: "Building a comprehensive project management tool for small teams with AI-powered insights.",
      timeline: "Q2 2025 and continuing",
      status: "In Progress",
      category: "Project",
    },
    {
      icon: BookOpenIcon,
      title: "Master Machine Learning and AI",
      description: "Completing advanced ML courses and building AI-powered applications to expand my skill set.",
      timeline: "2025 and continuing",
      status: "Learning",
      category: "Skill",
    },
    {
      icon: UsersIcon,
      title: "Tech Community Leadership",
      description: "Organizing local developer meetups and student developers in the community.",
      timeline: "Ongoing",
      status: "Active",
      category: "Community",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-primary text-primary-foreground"
      case "Learning":
        return "bg-accent text-accent-foreground"
      case "Active":
        return "bg-chart-1 text-white"
      case "Planning":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <section id="plans" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">Plans & Goals</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-balance">{plan.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {plan.category}
                          </Badge>
                        </div>
                      </div>
                      <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3 text-pretty">{plan.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">Timeline: {plan.timeline}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
