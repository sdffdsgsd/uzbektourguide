import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import DestinationCard from "@/components/destination-card";
import CategoryCard from "@/components/category-card";
import PhotoGallery from "@/components/photo-gallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPinned, Route, Bed, Car, Phone, Mail, Clock } from "lucide-react";
import type { Destination } from "@shared/schema";

export default function Home() {
  const { data: featuredDestinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations/featured"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      {/* Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Journey through time and discover the most iconic landmarks that tell
              the story of Uzbekistan's glorious past and vibrant present.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations?.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/destinations">
              <Button variant="outline" className="px-8 py-4 rounded-lg font-semibold">
                View All Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover Uzbekistan through different lenses - from ancient historical
              sites to breathtaking natural landscapes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/destinations?category=historical">
              <CategoryCard
                title="Historical Sites"
                description="Ancient cities and monuments along the Silk Road"
                imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                href="/destinations?category=historical"
              />
            </Link>
            
            <Link href="/destinations?category=natural">
              <CategoryCard
                title="Natural Wonders"
                description="Stunning landscapes and national parks"
                imageUrl="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                href="/destinations?category=natural"
              />
            </Link>
            
            <Link href="/destinations?category=cultural">
              <CategoryCard
                title="Cultural Experiences"
                description="Traditional crafts, music, and local customs"
                imageUrl="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                href="/destinations?category=cultural"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Plan Your Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover attractions across Uzbekistan with our interactive map. Click
              on any location to learn more about its history and visitor information.
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPinned className="h-16 w-16 text-uzbek-blue mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Interactive Map
              </h3>
              <p className="text-gray-600 mb-6">
                Explore all destinations on an interactive map
              </p>
              <Button className="bg-uzbek-blue hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                View Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PhotoGallery />

      {/* Tourist Services Section */}
      <section className="py-20 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tourist Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to make your journey through Uzbekistan unforgettable.
              Contact our local experts for personalized assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Cards */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-uzbek-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Route className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Guided Tours</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Expert local guides will take you through historical sites with
                fascinating stories and cultural insights.
              </p>
              <Button variant="link" className="text-uzbek-blue hover:text-blue-700 font-semibold">
                Learn More
              </Button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-uzbek-gold text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bed className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accommodation</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From traditional guesthouses to luxury hotels, find the perfect
                place to rest during your journey.
              </p>
              <Button variant="link" className="text-uzbek-blue hover:text-blue-700 font-semibold">
                Book Now
              </Button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-uzbek-emerald text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transportation</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comfortable and reliable transportation options to get you safely
                between destinations.
              </p>
              <Button variant="link" className="text-uzbek-blue hover:text-blue-700 font-semibold">
                Get Quote
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-uzbek-blue rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h3>
            <p className="text-xl mb-8 opacity-90">
              Contact our tourism experts for personalized travel planning
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center justify-center">
                <Phone className="h-8 w-8 mr-4" />
                <div className="text-left">
                  <p className="text-sm opacity-75">Call Us</p>
                  <p className="font-semibold">+998 71 123 4567</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="h-8 w-8 mr-4" />
                <div className="text-left">
                  <p className="text-sm opacity-75">Email</p>
                  <p className="font-semibold">info@discoveruzbekistan.uz</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="h-8 w-8 mr-4" />
                <div className="text-left">
                  <p className="text-sm opacity-75">Office Hours</p>
                  <p className="font-semibold">9:00 - 18:00 (GMT+5)</p>
                </div>
              </div>
            </div>

            <Button className="bg-white text-uzbek-blue hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
              Contact Us Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
