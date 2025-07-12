import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-uzbek-gold">
              Discover Uzbekistan
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your gateway to exploring the rich cultural heritage and stunning
              landscapes of Uzbekistan. We're committed to providing authentic
              travel experiences that connect you with local culture.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-uzbek-blue p-3 rounded-full transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-uzbek-blue p-3 rounded-full transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-uzbek-blue p-3 rounded-full transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-uzbek-blue p-3 rounded-full transition-colors duration-200"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations">
                  <a className="text-gray-300 hover:text-uzbek-gold transition-colors duration-200">
                    Destinations
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-uzbek-gold transition-colors duration-200"
                >
                  Tour Packages
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-uzbek-gold transition-colors duration-200"
                >
                  Travel Tips
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-uzbek-gold transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-uzbek-gold transition-colors duration-200"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-uzbek-gold transition-colors duration-200"
                >
                  Booking Help
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-uzbek-gold transition-colors duration-200"
                >
                  Travel Insurance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-uzbek-gold transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 Discover Uzbekistan. All rights reserved. | Proudly
            promoting Uzbekistan's cultural heritage.
          </p>
        </div>
      </div>
    </footer>
  );
}
