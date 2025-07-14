import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-water-blue to-clean-green text-white parallax-bg min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-water-blue/80 to-clean-green/80"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 128, 199, 0.8), rgba(0, 166, 81, 0.8)), url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
            Change Starts with Water
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto fade-in">
            Just <span className="font-bold impact-orange">$50</span> can provide one person with safe & reliable water. Together, we can end the water crisis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 fade-in">
            <Button className="bg-impact-orange text-white px-8 py-3 text-lg font-semibold hover:bg-yellow-600 transition-colors smooth-transition">
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white px-8 py-3 text-lg font-semibold hover:bg-white hover:text-water-blue transition-colors smooth-transition">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Impact Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
