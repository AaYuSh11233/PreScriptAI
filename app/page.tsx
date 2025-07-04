import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
