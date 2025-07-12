import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Calendar, DollarSign, Star, Heart, ArrowLeft, Share2 } from "lucide-react";
import type { Destination } from "@shared/schema";
import { useState } from "react";

export default function DestinationDetail() {
  const [match, params] = useRoute("/destination/:id");
  const [isFavorite, setIsFavorite] = useState(false);
  
  const destinationId = params?.id ? parseInt(params.id) : null;

  const { data: destination, isLoading, error } = useQuery<Destination>({
    queryKey: ["/api/destinations", destinationId],
    enabled: !!destinationId,
  });

  if (!match || !destinationId) {
    return <div>Invalid destination</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 md:h-96 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
            <p className="text-gray-600 mb-8">The destination you're looking for doesn't exist.</p>
            <Link href="/destinations">
              <Button>Browse All Destinations</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "historical":
        return "bg-uzbek-gold";
      case "natural":
        return "bg-uzbek-emerald";
      case "cultural":
        return "bg-uzbek-terracotta";
      default:
        return "bg-uzbek-blue";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "historical":
        return "Historical Site";
      case "natural":
        return "Natural Wonder";
      case "cultural":
        return "Cultural Experience";
      default:
        return "Destination";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/destinations">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Destinations
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className={`${getCategoryColor(destination.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
              {getCategoryLabel(destination.category)}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-uzbek-red text-uzbek-red' : ''}`} />
            </Button>
            <Button variant="secondary" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {destination.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-uzbek-blue" />
                {destination.region}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2 text-uzbek-blue" />
                {destination.duration}
              </div>
              <div className="flex items-center text-gray-600">
                <Star className="h-5 w-5 mr-2 text-uzbek-gold" />
                4.8 (256 reviews)
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {destination.description}
            </p>

            {/* Highlights */}
            {destination.highlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-uzbek-blue rounded-full mr-3"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {destination.gallery.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.gallery.map((imageUrl, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={`${destination.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visitor Information</h3>
                
                <div className="space-y-4">
                  {destination.openingHours && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Clock className="h-4 w-4 mr-2 text-uzbek-blue" />
                        <span className="font-semibold text-gray-900">Opening Hours</span>
                      </div>
                      <p className="text-gray-600 ml-6">{destination.openingHours}</p>
                    </div>
                  )}

                  {destination.entryFee && (
                    <div>
                      <div className="flex items-center mb-2">
                        <DollarSign className="h-4 w-4 mr-2 text-uzbek-blue" />
                        <span className="font-semibold text-gray-900">Entry Fee</span>
                      </div>
                      <p className="text-gray-600 ml-6">{destination.entryFee}</p>
                    </div>
                  )}

                  {destination.bestTimeToVisit && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 mr-2 text-uzbek-blue" />
                        <span className="font-semibold text-gray-900">Best Time to Visit</span>
                      </div>
                      <p className="text-gray-600 ml-6">{destination.bestTimeToVisit}</p>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <Button className="w-full bg-uzbek-blue hover:bg-blue-700 text-white">
                    Book Tour
                  </Button>
                  <Button variant="outline" className="w-full">
                    Get Directions
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            {destination.latitude && destination.longitude && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-uzbek-blue mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">Interactive map</p>
                      <p className="text-gray-500 text-xs">
                        {destination.latitude}, {destination.longitude}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
