"use client" 
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { AITechnologySection } from "@/components/landing/ai-technology-section"
import { FreelancerSection } from "@/components/landing/freelancer-section"
import { TrustSecuritySection } from "@/components/landing/trust-security-section"
import { Footer } from "@/components/landing/footer"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function LandingPage() {
    const router = useRouter()
    const { loading, isAuthenticated } = useAuth()
  
    // Если пользователь уже авторизован - отправляем на coming-soon
    useEffect(() => {
      if (!loading && isAuthenticated) {
        router.replace("/coming-soon")
      }
    }, [loading, isAuthenticated, router])
  
    if (loading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )
    }
  
    if (isAuthenticated) {
      return null
    }
  return (
    <div className="flex min-h-screen w-full min-w-0 max-w-full flex-col max-md:overflow-x-hidden">
      <Header />
      <main className="min-w-0 flex-1">
        <HeroSection />
        <HowItWorksSection />
        <AITechnologySection />
        <FreelancerSection />
        <TrustSecuritySection />
      </main>
      <Footer />
    </div>
  )
}
