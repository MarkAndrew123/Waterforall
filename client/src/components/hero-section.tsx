import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MessageSquare, Trophy, ArrowRight, Droplets } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-white overflow-hidden flex items-center">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]" />
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-4 h-4 bg-blue-500 rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-40 w-2 h-2 bg-cyan-500 rounded-full animate-float-delayed opacity-60" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-float-delayed opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Water For All Initiative</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 animate-fade-in-up animation-delay-100">
              Safe <span className="text-blue-800">Water</span>,
              <br />
              <span className="text-amber-700">Sanitation</span>
              <br />
              <span className="text-blue-600">&amp; Hygiene</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-xl animate-fade-in-up animation-delay-200">
              for Healthy Living
            </p>

            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl animate-fade-in-up animation-delay-300">
              Empowering communities across the World with Safe Water,
              Improved Sanitation Services and Hygiene practices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
              <Link href="/wash-league">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                  <Trophy className="mr-2 h-5 w-5" />
                  WASH League
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Testimonials
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Water Drop Illustration */}
          <div className="relative hidden lg:flex items-center justify-center animate-fade-in-up animation-delay-300">
            <div className="relative w-[400px] h-[500px]">
              {/* Main water drop shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-96 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-2xl shadow-blue-500/30 animate-pulse-slow" />
              </div>

              {/* Orbiting stats */}
              <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="text-3xl font-bold text-slate-900">703M+</div>
                <div className="text-sm text-slate-500">Need Clean Water</div>
              </div>

              <div className="absolute bottom-20 left-0 bg-white rounded-2xl shadow-xl p-4 animate-float-delayed">
                <div className="text-3xl font-bold text-slate-900">2B+</div>
                <div className="text-sm text-slate-500">Lack Sanitation</div>
              </div>

              <div className="absolute top-1/3 -right-8 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="text-3xl font-bold text-blue-600">WAFI</div>
                <div className="text-sm text-slate-500">Making Impact</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-slate-400 rounded-full animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
