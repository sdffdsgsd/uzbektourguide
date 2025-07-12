import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DestinationCard from "@/components/destination-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import type { Destination } from "@shared/schema";

export default function Destinations() {
  const [location, setLocation] = useLocation();
  const [, params] = useRoute("/destinations");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = urlParams.get('category') || 'all';
    const searchParam = urlParams.get('search') || '';
    
    setSelectedCategory(categoryParam);
    setSearchQuery(searchParam);
  }, [location]);

  const { data: allDestinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  const { data: searchResults } = useQuery<Destination[]>({
    queryKey: ["/api/destinations/search", searchQuery],
    queryFn: () => 
      searchQuery 
        ? fetch(`/api/destinations/search?q=${encodeURIComponent(searchQuery)}`).then(res => res.json())
        : Promise.resolve([]),
    enabled: !!searchQuery,
  });

  const { data: categoryDestinations } = useQuery<Destination[]>({
    queryKey: ["/api/destinations/category", selectedCategory],
    queryFn: () => 
      selectedCategory !== 'all'
        ? fetch(`/api/destinations/category/${selectedCategory}`).then(res => res.json())
        : Promise.resolve([]),
    enabled: selectedCategory !== 'all',
  });

  // Update filtered destinations based on search and category
  useEffect(() => {
    if (searchQuery && searchResults) {
      setFilteredDestinations(searchResults);
    } else if (selectedCategory !== 'all' && categoryDestinations) {
      setFilteredDestinations(categoryDestinations);
    } else if (allDestinations) {
      setFilteredDestinations(allDestinations);
    }
  }, [searchQuery, searchResults, selectedCategory, categoryDestinations, allDestinations]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    
    setLocation(`/destinations?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setLocation("/destinations");
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "historical":
        return "Historical Sites";
      case "natural":
        return "Natural Wonders";
      case "cultural":
        return "Cultural Experiences";
      default:
        return "All Categories";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Explore Uzbekistan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing destinations across the country, from ancient historical sites to stunning natural landscapes.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-12">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex-1 lg:max-w-xs">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="historical">Historical Sites</SelectItem>
                    <SelectItem value="natural">Natural Wonders</SelectItem>
                    <SelectItem value="cultural">Cultural Experiences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSearch}
                  className="bg-uzbek-blue hover:bg-blue-700 text-white"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                {(searchQuery || selectedCategory !== 'all') && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Search Results for "${searchQuery}"` : getCategoryLabel(selectedCategory)}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Filter results</span>
              </div>
            </div>
          </div>

          {/* Destinations Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or browse all destinations.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Show All Destinations
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
