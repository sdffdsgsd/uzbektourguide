import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [, setLocation] = useLocation();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (category !== "all") params.set("category", category);
    
    setLocation(`/destinations?${params.toString()}`);
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.4), rgba(37, 99, 235, 0.6)), url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover the <span className="text-uzbek-gold">Heart</span> of Central Asia
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Explore ancient Silk Road cities, magnificent architecture, and rich cultural heritage across Uzbekistan's most captivating destinations.
        </p>
        
        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-uzbek-blue text-gray-900"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex-1">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-uzbek-blue text-gray-900">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="historical">Historical Sites</SelectItem>
                  <SelectItem value="natural">Natural Wonders</SelectItem>
                  <SelectItem value="cultural">Cultural Centers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-uzbek-blue hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              <Search className="h-4 w-4 mr-2" />
              Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
