import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ParticleField } from "@/components/ui/ParticleField";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/Services";
import { CaseStudySection } from "@/components/sections/CaseStudy";
import { ProcessSection } from "@/components/sections/Process";
import { FaqSection } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ParticleField />
      <Navbar />
      <main id="main">
        <Hero />
        <ServicesSection />
        <CaseStudySection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
