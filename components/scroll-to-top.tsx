"use client"

import { useState, useEffect } from "react"
import { ChevronUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 100px (very sensitive)
      if (window.pageYOffset > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Listen for scroll events with passive option for better mobile performance
    window.addEventListener('scroll', toggleVisibility, { passive: true })

    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
          size="icon"
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        </Button>
      )}
    </>
  )
}
