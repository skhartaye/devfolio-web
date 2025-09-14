"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon, SendIcon } from "lucide-react"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Create mailto link with form data
      const subject = `Contact from ${formData.name} - Portfolio Website`
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      
      // Encode the mailto URL
      const mailtoUrl = `mailto:mercadoskhartaye@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      
      // Open email client
      window.open(mailtoUrl, '_blank')
      
      // Show success message
      setSubmitStatus('success')
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" })
        setSubmitStatus('idle')
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const socialLinks = [
    {
      icon: GithubIcon,
      label: "GitHub",
      href: "https://github.com/skhartaye",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/skhart-aye-mercado-b2032b383/",
      color: "hover:text-blue-600",
    },
    { 
      icon: MailIcon,
      label: "Email",
      href: "mailto:mercadoskhartaye@gmail.com",
      color: "hover:text-primary",
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">Let's Work Together</h2>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get in touch</CardTitle>
                <p className="text-muted-foreground text-pretty">
                  Have a project in mind or just want to chat? Send me a message and I'll get back to you.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hello!"
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isSubmitting}
                  >
                    <SendIcon className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send to Skhart"}
                  </Button>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-md text-green-800 text-sm">
                      ✓ Message ready! Your email client should open with the message addressed to Skhart.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md text-red-800 text-sm">
                      ✗ Please fill in all fields before sending your message.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get in touch</CardTitle>
                  <p className="text-muted-foreground text-pretty">
                    I'm always open to discussing new opportunities, interesting projects, or just having a friendly
                    chat about technology.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Response Time</h3>
                    <p className="text-muted-foreground text-sm">
                      I typically respond within 24 hours during weekdays.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Availability</h3>
                    <p className="text-muted-foreground text-sm">
                      Currently available for freelance projects and full-time opportunities.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Connect with me</h3>
                    <div className="flex space-x-4">
                      {socialLinks.map((link) => {
                        const IconComponent = link.icon
                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-3 rounded-lg bg-background border border-border transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${link.color}`}
                          >
                            <IconComponent className="h-5 w-5" />
                            <span className="sr-only">{link.label}</span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-border text-center">
        <p className="text-muted-foreground">© 2025 Skhart Aye Mercado.</p>
      </div>
    </section>
  )
}
