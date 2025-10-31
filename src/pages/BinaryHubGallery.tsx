import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import seedData from "@/data/seed.json";

const categories = ["All", "Branches", "Projects", "Events", "Team", "Courses"];

const BinaryHubGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<{image: string; alt: string} | null>(null);

  const filteredGallery = selectedCategory === "All"
    ? seedData.gallery
    : seedData.gallery.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="binary-hub" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Gallery</h1>
          <p className="text-xl text-muted mb-8">
            Explore our facilities, events, and success stories
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-primary text-white shadow-glow"
                    : "glass-card hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="glass-card overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxImage({ image: item.image, alt: item.alt })}
                >
                  <div className="h-64 bg-gradient-soft flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity" />
                    <div className="text-6xl font-bold text-white/20">
                      {item.category.charAt(0)}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-brand-orange mb-1">{item.category}</p>
                    <p className="text-foreground/90">{item.alt}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-full glass-card hover:bg-white/10"
                onClick={() => setLightboxImage(null)}
              >
                <X className="h-6 w-6" />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-soft rounded-3xl p-2">
                  <div className="aspect-video bg-background/50 rounded-2xl flex items-center justify-center">
                    <p className="text-muted text-center p-8">{lightboxImage.alt}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BinaryHubGallery;
