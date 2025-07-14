import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { GalleryImage } from "@shared/schema";

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery-images"],
  });

  const filters = [
    { id: "all", label: "All" },
    { id: "projects", label: "Water Projects" },
    { id: "access", label: "Clean Water Access" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "communities", label: "Communities" },
  ];

  const filteredImages = images.filter(
    (image) => activeFilter === "all" || image.category === activeFilter
  );

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <div key={filter.id} className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-xl"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Gallery Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`${
              activeFilter === filter.id
                ? "bg-water-blue text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="card-hover smooth-transition overflow-hidden">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                  )}
                  {image.location && (
                    <p className="text-sm text-gray-500 mt-2">Location: {image.location}</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
              {image.description && (
                <p className="text-sm text-gray-600">{image.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No images found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}
