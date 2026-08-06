import { Navbar } from "@/components/ui/Navbar";
import { Background } from "@/components/ui/Background";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/Services";
import { CaseStudySection } from "@/components/sections/CaseStudy";
import { WhyMeSection } from "@/components/sections/WhyMe";
import { MetricsSection } from "@/components/sections/Metrics";
import { ContactSection } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />

      <main id="main">
        <Hero />
        <ServicesSection />
        <CaseStudySection />
        <WhyMeSection />
        <MetricsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
