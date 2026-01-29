import { useEffect } from "react";
import HeroSection from "@/components/hero-section";
import MissionVisionSection from "@/components/mission-vision-section";
import GlobalScoreCard from "@/components/global-score-card";
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
    <div>
      <HeroSection />
      <MissionVisionSection />
      <GlobalScoreCard />
      <CTASection />
    </div>
  );
}
