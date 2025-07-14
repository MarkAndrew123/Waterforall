import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Upload } from "lucide-react";

export default function CTASection() {
  return (
    <div className="py-16 bg-light-gray">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Every donation, no matter the size, brings us one step closer to a world where everyone has access to clean water.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button className="bg-impact-orange text-white px-8 py-3 text-lg font-semibold hover:bg-yellow-600 transition-colors smooth-transition">
            <Heart className="mr-2 h-5 w-5" />
            Make a Donation
          </Button>
          <Link href="/dashboard">
            <Button className="bg-water-blue text-white px-8 py-3 text-lg font-semibold hover:bg-blue-600 transition-colors smooth-transition">
              <Upload className="mr-2 h-5 w-5" />
              Upload Excel Data
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
