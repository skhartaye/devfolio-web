"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrophyIcon, AwardIcon, BriefcaseIcon as CertificateIcon, StarIcon } from "lucide-react"

export function AchievementsSection() {
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

  const achievements = [
    {
      icon: TrophyIcon,
      title: "IoTCon 2024 - 1st Runner Up",
      description: "Aeroband Project - Innovative IoT solution for air quality monitoring",
      date: "2024",
      type: "Hackathon",
    },
    {
      icon: AwardIcon,
      title: "Best Mobile App Design",
      description: "University Tech Fair - Recognized for outstanding UI/UX design",
      date: "2023",
      type: "Award",
    },
    {
      icon: CertificateIcon,
      title: "AWS Certified Developer",
      description: "Associate level certification for cloud development",
      date: "2023",
      type: "Certification",
    },
    {
      icon: StarIcon,
      title: "Open Source Contributor",
      description: "50+ contributions to popular React and Node.js projects",
      date: "Ongoing",
      type: "Community",
    },
  ]

  return (
    <section id="achievements" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">Achievements & Recognition</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="outline" className="w-fit mx-auto mb-2">
                      {achievement.type}
                    </Badge>
                    <CardTitle className="text-lg text-balance">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm mb-2 text-pretty">{achievement.description}</p>
                    <p className="text-xs text-primary font-medium">{achievement.date}</p>
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
