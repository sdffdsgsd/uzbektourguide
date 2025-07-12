import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export default function CategoryCard({ title, description, imageUrl, href }: CategoryCardProps) {
  return (
    <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${imageUrl}')`
        }}
      />
      <div className="absolute inset-0 flex items-end p-8">
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-200 mb-4">{description}</p>
          <span className="inline-flex items-center text-sm font-semibold text-uzbek-gold">
            Explore <ArrowRight className="h-4 w-4 ml-2" />
          </span>
        </div>
      </div>
    </div>
  );
}
