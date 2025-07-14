import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function MissionSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=600" 
              alt="Children accessing clean water" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-6">
              We Won't Stop Until Everyone, Everywhere Has Clean Water
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              703 million people are still living without clean water close to home. Working alongside communities, we won't stop until everyone, everywhere has access to clean water, decent toilets and good hygiene.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="text-clean-green text-xl mr-3" />
                <span className="text-gray-700">Sustainable water projects that last for generations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-clean-green text-xl mr-3" />
                <span className="text-gray-700">Complete transparency in every donation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-clean-green text-xl mr-3" />
                <span className="text-gray-700">Working directly with local communities</span>
              </div>
            </div>
            <Button className="mt-8 bg-water-blue text-white px-8 py-3 text-lg font-semibold hover:bg-blue-600 transition-colors smooth-transition">
              Learn More About Our Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
