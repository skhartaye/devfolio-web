"use client"

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ProjectsSection } from "@/components/projects-section"
import { PlansSection } from "@/components/plans-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AchievementsSection />
      <PlansSection />
      <ContactSection />
      <ScrollToTop />
    </main>
  )
}
