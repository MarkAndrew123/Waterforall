import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, School, Home, Hospital } from "lucide-react";
import type { WaterStatistics } from "@shared/schema";

export default function ImpactStats() {
  const { data: statistics = [], isLoading } = useQuery<WaterStatistics[]>({
    queryKey: ["/api/water-statistics"],
  });

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Trigger counter animation
          const counterElements = entry.target.querySelectorAll(".counter-number");
          counterElements.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-target") || "0");
            animateCounter(counter as HTMLElement, target);
          });
        }
      });
    }, observerOptions);

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounter = (element: HTMLElement, target: number) => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  };

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "clean_water_access":
        return <Users className="text-water-blue text-4xl" />;
      case "schools_water":
        return <School className="text-clean-green text-4xl" />;
      case "decent_toilets":
        return <Home className="text-impact-orange text-4xl" />;
      case "health_hygiene":
        return <Hospital className="text-purple-600 text-4xl" />;
      default:
        return <Users className="text-water-blue text-4xl" />;
    }
  };

  const mainStats = statistics.filter(stat => 
    ["clean_water_access", "schools_water", "decent_toilets", "health_hygiene"].includes(stat.category)
  );

  if (isLoading) {
    return (
      <div className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-12 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">Our Global Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time data showing the lives we've transformed through clean water, sanitation, and hygiene programs worldwide.
          </p>
        </div>
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 fade-in">
          {mainStats.map((stat) => (
            <Card key={stat.id} className="bg-white rounded-xl shadow-lg p-6 text-center card-hover smooth-transition">
              <CardContent className="p-0">
                <div className="mb-4">
                  {getIconForCategory(stat.category)}
                </div>
                <div className="counter-number" data-target={stat.value}>
                  0
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
