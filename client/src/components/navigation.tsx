import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Droplets } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Analytics Dashboard" },
    { path: "/wash-analysis", label: "WASH Analysis" },
    { path: "/gallery", label: "Photo Gallery" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Droplets className="text-water-blue text-2xl mr-3" />
            <h1 className="text-xl font-semibold text-dark-gray">Water for All Initiative</h1>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <button
                  className={`nav-tab px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-water-blue text-white"
                      : "text-gray-700 hover:bg-water-blue hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
            <Button className="bg-impact-orange text-white hover:bg-yellow-600 transition-colors">
              Donate Now
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <button
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-water-blue text-white"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </button>
              </Link>
            ))}
            <Button className="w-full bg-impact-orange text-white hover:bg-yellow-600 transition-colors">
              Donate Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
