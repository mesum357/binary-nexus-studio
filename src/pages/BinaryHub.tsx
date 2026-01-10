import { motion, AnimatePresence } from "framer-motion";
import seedData from "@/data/seed.json";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Users, ImageIcon, ArrowLeft, Moon, Sun, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const binaryHubLinks = [
  { title: "Home", url: "/binary-hub", icon: Home },
  { title: "Our Team", url: "/binary-hub/team", icon: Users },
  { title: "Gallery", url: "/binary-hub/gallery", icon: ImageIcon },
];

// Background images for the hero slider
const heroImages = [
  "/images/branch-karachi.jpg",
  "/images/testi1.jpg",
  "/images/testi2.jpg",
  "/images/testi3.jpg",
];

const BinaryHub = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  const [hoveredImpact, setHoveredImpact] = useState<string | null>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

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

      {/* Hero Section with Background Slider */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide 
                  ? "bg-brand-orange w-8" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              Welcome to <span className="text-brand-orange">Binary Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow">
              Pakistan's premier technology education and freelance development company. 
              Empowering individuals with cutting-edge IT skills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chairman Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-brand-orange to-brand-blue rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src={seedData.company.chairman.image}
                  alt={seedData.company.chairman.name}
                  className="relative w-40 h-40 rounded-2xl object-cover border-4 border-white/20"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2 gradient-text">Our Chairman</h2>
                <h3 className="text-2xl font-bold mb-1">{seedData.company.chairman.name}</h3>
                <p className="text-brand-orange font-medium mb-4">Chairman & Founder</p>
                <p className="text-foreground/80 leading-relaxed">
                  {seedData.company.chairman.mission}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Branches Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Our Branches
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {seedData.binaryHubBranches?.map((branch, idx) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredBranch(branch.id)}
                onMouseLeave={() => setHoveredBranch(null)}
                className="group relative"
              >
                <div className={`
                  relative overflow-hidden rounded-3xl border-2 transition-all duration-500
                  ${hoveredBranch === branch.id 
                    ? "border-brand-orange shadow-2xl shadow-brand-orange/20 scale-[1.02]" 
                    : "border-white/10 shadow-lg"
                  }
                `}>
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={branch.images[0]} 
                      alt={branch.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredBranch === branch.id ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div className={`absolute inset-0 transition-opacity duration-500 ${
                      hoveredBranch === branch.id 
                        ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent" 
                        : "bg-gradient-to-t from-black/60 to-transparent"
                    }`} />
                    
                    {/* Location Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                      <MapPin className="h-4 w-4 text-brand-orange" />
                      <span className="text-white text-sm font-medium">{branch.location}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-background/80 backdrop-blur-sm">
                    <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                      hoveredBranch === branch.id ? "text-brand-orange" : ""
                    }`}>
                      {branch.name}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {branch.description}
                    </p>
                    
                    {/* Animated underline */}
                    <div className={`h-1 bg-gradient-to-r from-brand-orange to-brand-blue rounded-full mt-4 transition-all duration-500 ${
                      hoveredBranch === branch.id ? "w-full" : "w-0"
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Our Impact
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {seedData.impacts?.map((imp, idx) => (
              <motion.div
                key={imp.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredImpact(imp.id)}
                onMouseLeave={() => setHoveredImpact(null)}
                className="group cursor-pointer"
              >
                <div className={`
                  relative h-full overflow-hidden rounded-3xl transition-all duration-500
                  ${hoveredImpact === imp.id 
                    ? "shadow-2xl shadow-brand-orange/30 -translate-y-2" 
                    : "shadow-lg"
                  }
                `}>
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={imp.images[0]} 
                      alt={imp.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredImpact === imp.id ? "scale-110 blur-sm" : "scale-100"
                      }`}
                    />
                    <div className={`absolute inset-0 transition-all duration-500 ${
                      hoveredImpact === imp.id 
                        ? "bg-gradient-to-t from-brand-orange/90 via-brand-orange/70 to-brand-blue/60" 
                        : "bg-gradient-to-t from-black/80 via-black/50 to-transparent"
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="relative h-80 p-6 flex flex-col justify-end">
                    {/* Icon/Number Badge */}
                    <div className={`
                      absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center
                      font-bold text-lg transition-all duration-500
                      ${hoveredImpact === imp.id 
                        ? "bg-white text-brand-orange scale-110" 
                        : "bg-white/20 backdrop-blur-sm text-white"
                      }
                    `}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    <motion.div
                      animate={{
                        y: hoveredImpact === imp.id ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {imp.title}
                      </h3>
                      <p className={`text-white/90 leading-relaxed transition-all duration-500 ${
                        hoveredImpact === imp.id ? "opacity-100 max-h-40" : "opacity-70 max-h-20 overflow-hidden"
                      }`}>
                        {imp.description}
                      </p>
                    </motion.div>

                    {/* Learn More indicator */}
                    <div className={`
                      flex items-center gap-2 mt-4 text-white font-medium transition-all duration-300
                      ${hoveredImpact === imp.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                    `}>
                      <span>Learn More</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BinaryHub;
