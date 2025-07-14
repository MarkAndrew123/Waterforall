import { useEffect } from "react";
import HeroSection from "@/components/hero-section";
import ImpactStats from "@/components/impact-stats";
import MissionSection from "@/components/mission-section";
import CrisisFacts from "@/components/crisis-facts";
import CTASection from "@/components/cta-section";

export default function Home() {
  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-16"> {/* Account for fixed navigation */}
      <HeroSection />
      <ImpactStats />
      <MissionSection />
      <CrisisFacts />
      <CTASection />
    </div>
  );
}
