import { Link } from "wouter";
import { MapPin, Clock, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Destination } from "@shared/schema";
import { useState } from "react";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

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
        return "Historical";
      case "natural":
        return "Natural";
      case "cultural":
        return "Cultural";
      default:
        return "Other";
    }
  };

  return (
    <Card className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${getCategoryColor(destination.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
            {getCategoryLabel(destination.category)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all duration-200"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? 'fill-uzbek-red text-uzbek-red' : 'text-gray-700'} hover:text-uzbek-red`} 
            />
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {destination.name}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {destination.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1 text-uzbek-blue" />
            <span>{destination.region}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1 text-uzbek-blue" />
            <span>{destination.duration}</span>
          </div>
        </div>
        <Link href={`/destination/${destination.id}`}>
          <Button className="w-full bg-uzbek-blue hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
