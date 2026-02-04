import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { Security } from "@/components/security"
import { Suspense } from "react"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Skhart Aye Mercado - Full Stack Developer & IoT Specialist",
  description: "Full-stack developer specializing in Python, Move, C++, PHP, and modern web technologies. IoTCon 2025 1st Runner Up. Building innovative IoT solutions and scalable applications.",
  keywords: ["Full Stack Developer", "IoT Developer", "Python", "Move", "C++", "PHP", "React", "TypeScript", "PostgreSQL", "Docker", "Blockchain", "Aptos"],
  authors: [{ name: "Skhart Aye Mercado" }],
  creator: "Skhart Aye Mercado",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skhartaye.dev",
    title: "Skhart Aye Mercado - Full Stack Developer & IoT Specialist",
    description: "Full-stack developer specializing in Python, Move, C++, PHP, and modern web technologies. IoTCon 2025 1st Runner Up.",
    siteName: "Skhart Aye Mercado Portfolio",
    images: [
      {
        url: "/skhart.jpg",
        width: 306,
        height: 248,
        alt: "Skhart Aye Mercado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skhart Aye Mercado - Full Stack Developer & IoT Specialist",
    description: "Full-stack developer specializing in Python, Move, C++, PHP, and modern web technologies.",
    images: ["/skhart.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Skhart Aye Mercado",
    url: "https://skhartaye.dev",
    image: "https://skhartaye.dev/skhart.jpg",
    jobTitle: "Full Stack Developer",
    description: "Full-stack developer specializing in Python, Move, C++, PHP, and modern web technologies",
    sameAs: [
      "https://github.com/skhartaye",
      "https://www.linkedin.com/in/skhart-aye-mercado-b2032b383/",
    ],
    knowsAbout: [
      "Python",
      "Move",
      "C++",
      "PHP",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "PostgreSQL",
      "Docker",
      "IoT",
      "Blockchain",
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Security />
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
