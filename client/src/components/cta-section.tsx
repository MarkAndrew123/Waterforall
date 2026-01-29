import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trophy, MessageSquare, ArrowRight, Compass } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 rounded-l-[100px] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
              Get Involved
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Be Part of
              <br />
              <span className="text-slate-400">the Solution</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
              Join our mission to transform lives through sustainable access to clean water,
              sanitation, and hygiene worldwide. Every action counts.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/strategic-springboard">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                  <Compass className="mr-2 h-5 w-5" />
                  Our Strategy
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Action Cards */}
          <div className="space-y-4">
            {/* WASH League Card */}
            <Link href="/wash-league">
              <div className="group bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                    <Trophy className="h-8 w-8 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">WASH League Table</h3>
                    <p className="text-slate-500">Track state performance in water & sanitation access</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>

            {/* Testimonials Card */}
            <Link href="/dashboard">
              <div className="group bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <MessageSquare className="h-8 w-8 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Testimonials</h3>
                    <p className="text-slate-500">Share stories of WAFI projects and impact</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>

            {/* Analysis Card */}
            <Link href="/wash-analysis">
              <div className="group bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                    <svg className="h-8 w-8 text-slate-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">WASH Analysis</h3>
                    <p className="text-slate-500">Explore data insights and trends</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
