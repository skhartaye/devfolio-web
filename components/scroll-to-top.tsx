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
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] h-14 w-14 sm:h-12 sm:w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white"
          size="icon"
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="h-7 w-7 sm:h-6 sm:w-6 text-white" />
        </Button>
      )}
    </>
  )
}
