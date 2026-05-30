import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { RecentWorksSection } from "@/components/recent-works-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResearchSection } from "@/components/research-section";
import { BlogsSection } from "@/components/blogs-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative w-full">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <RecentWorksSection />
        <ProjectsSection />
        <ResearchSection />
        <BlogsSection />
        <ContactSection />
      </main>
    </>
  );
}
