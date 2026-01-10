import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Briefcase, Users, ArrowLeft, Moon, Sun, Mail, Phone, Target, Globe, Lightbulb, Award, FileText, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const consultancyLinks = [
  { title: "Home", url: "/consultancy", icon: Home },
  { title: "Services", url: "/consultancy/services", icon: Briefcase },
  { title: "Team", url: "/consultancy/team", icon: Users },
];

// Hero slider images
const heroSlides = [
  {
    image: "/images/consultancy/tehseensir.jpg",
    title: "Research Excellence",
    subtitle: "Evidence-based solutions for sustainable development"
  },
  {
    image: "/images/testi1.jpg",
    title: "Capacity Building",
    subtitle: "Empowering communities with knowledge and skills"
  },
  {
    image: "/images/testi2.jpg",
    title: "Global Impact",
    subtitle: "Local expertise, international standards"
  },
];

const whyChooseUs = [
  {
    icon: Target,
    title: "Evidence-Based Solutions",
    description: "Our research-driven approach ensures all recommendations are backed by rigorous data analysis and proven methodologies."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "PhD researchers, economists, and data scientists with extensive experience in international projects."
  },
  {
    icon: Globe,
    title: "Local & Global Reach",
    description: "We serve projects at local, national, and international levels with deep understanding of regional contexts."
  },
  {
    icon: FileText,
    title: "End-to-End Support",
    description: "From proposal writing to data analysis and report delivery, we handle every aspect of your research project."
  },
  {
    icon: Lightbulb,
    title: "Capacity Building",
    description: "Specialized training on SDGs and climate change to equip organizations with knowledge for sustainable action."
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Successfully completed projects with UNDP, State Bank of Pakistan, and other prestigious organizations."
  },
];

const Consultancy = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </a>
          
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/15 dark:hover:bg-white/15 text-foreground/80 hover:text-foreground transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </NavLink>
            {consultancyLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.url}
                  to={link.url}
                  end={link.url === "/consultancy"}
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
              onClick={() => navigate("/consultancy/messages")}
              className="bg-brand-blue hover:bg-brand-blue-hover text-white rounded-full px-5"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button 
              onClick={toggleTheme} 
              variant="outline" 
              size="icon" 
              className="rounded-full border-black/20 dark:border-white/20 w-10 h-10 ml-2"
            >
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </nav>

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
        
        <div className="md:hidden border-t border-white/10 bg-background/90 backdrop-blur">
          <div className="container mx-auto px-2 py-2 flex gap-1 overflow-x-auto">
            <NavLink
              to="/"
              className="flex items-center gap-1 text-xs px-3 py-2 rounded-full bg-black/10 dark:bg-white/10 whitespace-nowrap"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </NavLink>
            {consultancyLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.url}
                  to={link.url}
                  end={link.url === "/consultancy"}
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
            <button
              onClick={() => navigate("/consultancy/messages")}
              className="flex items-center gap-1 text-xs px-3 py-2 font-medium rounded-full whitespace-nowrap bg-brand-blue text-white"
            >
              <MessageSquare className="h-3 w-3" />
              Message
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Slider */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        {/* Background Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === currentSlide 
                  ? "bg-brand-orange w-12" 
                  : "bg-white/50 w-2 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <motion.div
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                  Binary <span className="text-brand-orange">Consultancy</span> Services
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-4">
                  {heroSlides[currentSlide].title}
                </p>
                <p className="text-lg text-white/70 mb-8">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => navigate("/consultancy/services")}
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white rounded-full px-8"
                >
                  View Our Services
                </Button>
                <Button
                  onClick={() => navigate("/consultancy/team")}
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-white/30 text-white hover:bg-white/10"
                >
                  Meet Our Team
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
            Research Consultancy & Capacity Building
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            At Binary Hub Consultants in Gilgit-Baltistan, our dedicated research team provides comprehensive, 
            expert support for research-based projects at the local, national, and international levels. 
            We specialize in building capacity through specialized training on the Sustainable Development Goals (SDGs) 
            and climate change, equipping communities and organizations with the knowledge to drive meaningful action.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 gradient-text text-center"
          >
            Our Impact in Numbers
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <AnimatedCounter value={50} label="Projects Completed" />
            <AnimatedCounter value={25} label="Research Publications" />
            <AnimatedCounter value={15} label="International Projects" />
            <AnimatedCounter value={100} label="Training Programs" />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center"
        >
          Why Choose Us
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {whyChooseUs.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group"
              >
                <div className={`
                  relative overflow-hidden rounded-3xl p-6 h-full transition-all duration-500
                  ${hoveredFeature === idx 
                    ? "shadow-2xl shadow-brand-orange/20 -translate-y-2 bg-gradient-to-br from-brand-orange to-brand-blue" 
                    : "shadow-lg bg-black/5 dark:bg-white/5"
                  }
                `}>
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                    ${hoveredFeature === idx 
                      ? "bg-white/20" 
                      : "bg-gradient-to-br from-brand-orange to-brand-blue"
                    }
                  `}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className={`
                    text-xl font-bold mb-3 transition-colors duration-300
                    ${hoveredFeature === idx ? "text-white" : "text-foreground"}
                  `}>
                    {feature.title}
                  </h3>
                  
                  <p className={`
                    text-sm leading-relaxed transition-colors duration-300
                    ${hoveredFeature === idx ? "text-white/90" : "text-foreground/70"}
                  `}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 gradient-text text-center">
              Get In Touch
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.a
                href="mailto:consultancy@binaryhub.pk"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-brand-orange to-brand-orange-hover text-white text-center"
              >
                <Mail className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-white/90">consultancy@binaryhub.pk</p>
              </motion.a>
              
              <motion.a
                href="tel:+92-21-3586-2100"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-brand-blue to-brand-blue-hover text-white text-center"
              >
                <Phone className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-white/90">+92-21-3586-2100</p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Consultancy;
