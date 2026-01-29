import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Droplets } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/strategic-springboard", label: "Strategic Springboard" },
    { path: "/wash-league", label: "WASH League" },
    { path: "/dashboard", label: "Testimonials" },
    { path: "/wash-analysis", label: "WASH Analysis" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed w-full top-[40px] z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100"
        : "bg-white/80 backdrop-blur-sm"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="p-2 bg-blue-600 rounded-xl group-hover:bg-blue-700 transition-colors">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 leading-tight">WAFI</span>
                <span className="text-[10px] text-slate-500 leading-tight">Water For All Initiative</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${location === item.path
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Contact Button - Desktop */}
          <div className="hidden md:block">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 font-medium transition-all hover:scale-105">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2 hover:bg-slate-100 rounded-full"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="bg-white border-t border-slate-100 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${location === item.path
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </div>
            </Link>
          ))}
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 mt-4 font-medium">
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  );
}
