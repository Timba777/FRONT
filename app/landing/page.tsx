import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { AITechnologySection } from "@/components/landing/ai-technology-section"
import { FreelancerSection } from "@/components/landing/freelancer-section"
import { TrustSecuritySection } from "@/components/landing/trust-security-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
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
