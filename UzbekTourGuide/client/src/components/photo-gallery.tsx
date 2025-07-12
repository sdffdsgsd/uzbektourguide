import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Aerial view of Registan Square",
    large: true
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Islamic geometric patterns"
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Traditional bazaar with spices"
  },
  {
    src: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Ancient minaret tower"
  },
  {
    src: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Traditional carpet weaving"
  }
];

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Visual Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the beauty of Uzbekistan through stunning photography
            showcasing the country's most iconic landmarks.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div
                  className={`${
                    image.large ? "col-span-2 row-span-2" : ""
                  } cursor-pointer`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full ${
                      image.large ? "h-full" : "h-48"
                    } object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto rounded-lg"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-uzbek-blue hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
            View Full Gallery <Images className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
