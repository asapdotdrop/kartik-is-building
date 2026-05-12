import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import MarqueeSection from '@/components/MarqueeSection'
import AboutSection from '@/components/AboutSection'
import WorkSection from '@/components/WorkSection'
import ServicesSection from '@/components/ServicesSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
