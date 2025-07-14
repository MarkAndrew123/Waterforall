import { Droplets, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark-gray text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Droplets className="text-water-blue text-2xl mr-3" />
              <h3 className="text-xl font-bold">Water Aid Impact</h3>
            </div>
            <p className="text-gray-300">
              Transforming lives through clean water, sanitation, and hygiene programs worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-water-blue transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-water-blue transition-colors">Our Work</a></li>
              <li><a href="#" className="text-gray-300 hover:text-water-blue transition-colors">Impact Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-water-blue transition-colors">Get Involved</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                +1-800-WATER-AID
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                info@wateraidimpact.org
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                123 Water Street, Global City
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-water-blue transition-colors text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-300 hover:text-water-blue transition-colors text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-300 hover:text-water-blue transition-colors text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-300 hover:text-water-blue transition-colors text-xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Water Aid Impact. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
