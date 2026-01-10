import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Home, Users, ImageIcon, ArrowLeft, Moon, Sun, X, ZoomIn, Grid, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import seedData from "@/data/seed.json";

const binaryHubLinks = [
  { title: "Home", url: "/binary-hub", icon: Home },
  { title: "Our Team", url: "/binary-hub/team", icon: Users },
  { title: "Gallery", url: "/binary-hub/gallery", icon: ImageIcon },
];

const categories = ["All", "Branches", "Projects", "Events", "Team", "Courses"];

const BinaryHubGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<{image: string; alt: string; category: string} | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const filteredGallery = selectedCategory === "All"
    ? seedData.gallery
    : seedData.gallery.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </a>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/15 dark:hover:bg-white/15 text-foreground/80 hover:text-foreground transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </NavLink>
            {binaryHubLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.url}
                  to={link.url}
                  end={link.url === "/binary-hub"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm px-5 py-2.5 font-medium transition-all duration-200 rounded-full ${
                      isActive
                        ? "bg-brand-orange text-white shadow-lg"
                        : "bg-brand-orange/80 text-white hover:bg-brand-orange hover:shadow-md"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {link.title}
                </NavLink>
              );
            })}
            <Button 
              onClick={toggleTheme} 
              variant="outline" 
              size="icon" 
              className="rounded-full border-black/20 dark:border-white/20 w-10 h-10 ml-2"
            >
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </nav>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              onClick={toggleTheme} 
              variant="outline" 
              size="icon" 
              className="rounded-full border-black/20 dark:border-white/20 w-10 h-10"
            >
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu bar */}
        <div className="md:hidden border-t border-white/10 bg-background/90 backdrop-blur">
          <div className="container mx-auto px-2 py-2 flex gap-1 overflow-x-auto">
            <NavLink
              to="/"
              className="flex items-center gap-1 text-xs px-3 py-2 rounded-full bg-black/10 dark:bg-white/10 whitespace-nowrap"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </NavLink>
            {binaryHubLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.url}
                  to={link.url}
                  end={link.url === "/binary-hub"}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-xs px-3 py-2 font-medium rounded-full whitespace-nowrap ${
                      isActive
                        ? "bg-brand-orange text-white"
                        : "bg-brand-orange/80 text-white"
                    }`
                  }
                >
                  <Icon className="h-3 w-3" />
                  {link.title}
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Gallery
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Explore our facilities, events, projects, and success stories through our visual journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Controls */}
      <section className="py-8 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filters */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {categories.map((category, idx) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/30"
                      : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {filteredGallery.length}
                    </span>
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-full">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "grid" 
                    ? "bg-brand-orange text-white" 
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "masonry" 
                    ? "bg-brand-orange text-white" 
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 container mx-auto px-4">
        <motion.div 
          layout
          className={`
            ${viewMode === "grid" 
              ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            }
          `}
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  group cursor-pointer
                  ${viewMode === "masonry" ? "break-inside-avoid mb-6" : ""}
                `}
                onClick={() => setLightboxImage({ image: item.image, alt: item.alt, category: item.category })}
              >
                <div className={`
                  relative overflow-hidden rounded-2xl transition-all duration-500
                  ${hoveredItem === item.id 
                    ? "shadow-2xl shadow-brand-orange/20 scale-[1.02]" 
                    : "shadow-lg"
                  }
                `}>
                  {/* Image Container */}
                  <div className={`
                    relative overflow-hidden bg-gradient-to-br from-brand-orange/20 to-brand-blue/20
                    ${viewMode === "grid" ? "aspect-square" : idx % 3 === 0 ? "aspect-[4/5]" : idx % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}
                  `}>
                    {/* Placeholder with category initial */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl font-bold text-white/10">
                        {item.category.charAt(0)}
                      </span>
                    </div>

                    {/* Overlay */}
                    <div className={`
                      absolute inset-0 transition-all duration-500
                      ${hoveredItem === item.id 
                        ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent" 
                        : "bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      }
                    `} />

                    {/* Zoom Icon */}
                    <div className={`
                      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm
                      flex items-center justify-center transition-all duration-300
                      ${hoveredItem === item.id ? "opacity-100 scale-100" : "opacity-0 scale-75"}
                    `}>
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>

                    {/* Category Badge */}
                    <div className={`
                      absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium
                      bg-brand-orange text-white transition-all duration-300
                      ${hoveredItem === item.id ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-80"}
                    `}>
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`
                    absolute bottom-0 left-0 right-0 p-4 transition-all duration-300
                    ${hoveredItem === item.id ? "translate-y-0" : "translate-y-2"}
                  `}>
                    <p className="text-white font-medium line-clamp-2">
                      {item.alt}
                    </p>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className={`
                    absolute bottom-0 left-0 right-0 h-1 transition-all duration-500
                    ${hoveredItem === item.id 
                      ? "bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange" 
                      : "bg-brand-orange/50"
                    }
                  `} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <ImageIcon className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">No images found in this category</p>
          </motion.div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Category Badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-2 rounded-full bg-brand-orange text-white text-sm font-medium">
                  {lightboxImage.category}
                </span>
              </motion.div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-orange/20 to-brand-blue/20">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="text-9xl font-bold text-white/20 block mb-4">
                      {lightboxImage.category.charAt(0)}
                    </span>
                    <p className="text-white/60 text-lg">{lightboxImage.alt}</p>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-white/80 text-center text-lg"
              >
                {lightboxImage.alt}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BinaryHubGallery;
