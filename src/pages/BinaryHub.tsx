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
  "/images/binary hub/SliderBinaryHub/FXMM3110.JPG",
  "/images/binary hub/SliderBinaryHub/GKMB9938.JPG",
  "/images/binary hub/SliderBinaryHub/GKSY9432.JPG",
  "/images/binary hub/SliderBinaryHub/GOWG6427.JPG",
  "/images/binary hub/SliderBinaryHub/GPFZ4546.JPG",
  "/images/binary hub/SliderBinaryHub/GQEE4953.JPG",
  "/images/binary hub/SliderBinaryHub/GYMV1106.JPG",
  "/images/binary hub/SliderBinaryHub/HEJR9268.JPG",
  "/images/binary hub/SliderBinaryHub/HUZE4057.JPG",
  "/images/binary hub/SliderBinaryHub/HXND1033.JPG",
  "/images/binary hub/SliderBinaryHub/IHUU0624.JPG",
  "/images/binary hub/SliderBinaryHub/IMG_0120.JPG",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.35 PM (1).jpeg",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.35 PM.jpeg",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.37 PM.jpeg",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.38 PM.jpeg",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.39 PM (1).jpeg",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.39 PM.jpeg",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.40 PM (1).jpeg",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.43 PM.jpeg",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.45 PM (2).jpeg",
  "/images/binary hub/SliderBinaryHub/WhatsApp Image 2026-01-28 at 1.51.45 PM.jpeg",
];

const BranchCard = ({ branch, idx, navigate }: any) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!branch.images || branch.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % branch.images.length);
    }, 4000 + (idx % 2) * 500);
    return () => clearInterval(timer);
  }, [branch.images, idx]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      onClick={() => navigate(`/binary-hub/branches/${branch.id}`)}
      className="group relative cursor-pointer h-full"
    >
      <div className={`
        relative overflow-hidden border-2 transition-all duration-700 flex flex-col h-full
        border-brand-orange/20 shadow-xl group-hover:border-brand-orange group-hover:shadow-[0_20px_50px_rgba(255,107,0,0.3)] group-hover:scale-[1.03] group-hover:-translate-y-2
        ${idx % 2 === 0
          ? "rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-2xl rounded-br-2xl group-hover:rounded-tr-2xl group-hover:rounded-bl-2xl group-hover:rounded-tl-[5rem] group-hover:rounded-br-[5rem]"
          : "rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-2xl rounded-bl-2xl group-hover:rounded-tl-2xl group-hover:rounded-br-2xl group-hover:rounded-tr-[5rem] group-hover:rounded-bl-[5rem]"}
      `}>
        {/* Image */}
        <div className="relative h-72 overflow-hidden bg-black/10 dark:bg-white/5">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              src={branch.images[currentImg]}
              alt={branch.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
            />
          </AnimatePresence>
          <div className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 group-hover:via-black/40 group-hover:to-transparent z-10" />

          {/* Location Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 z-20">
            <MapPin className="h-4 w-4 text-brand-orange" />
            <span className="text-white text-sm font-medium">{branch.location}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 bg-background/90 backdrop-blur-md relative z-20 flex-grow flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-brand-orange">
            {branch.name}
          </h3>
          <p className="text-foreground/70 leading-relaxed">
            {branch.description}
          </p>

          {/* Animated underline */}
          <div className="h-1 bg-gradient-to-r from-brand-orange to-brand-blue rounded-full mt-4 transition-all duration-500 w-0 group-hover:w-full" />
        </div>
      </div>
    </motion.div>
  );
};

const BinaryHub = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);


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
                    `flex items-center gap-2 text-sm px-5 py-2.5 font-medium transition-all duration-200 rounded-full ${isActive
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
                    `flex items-center gap-1 text-xs px-3 py-2 font-medium rounded-full whitespace-nowrap ${isActive
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
              style={{ backgroundImage: `url("${heroImages[currentSlide]}")` }}
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
              className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide
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
              <BranchCard
                key={branch.id}
                branch={branch}
                idx={idx}

                navigate={navigate}
              />
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

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {seedData.impacts?.map((imp, idx) => (
              <motion.div
                key={imp.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => navigate(`/binary-hub/impact/${imp.id}`)}
                className="group cursor-pointer flex"
              >
                <div className="w-full relative flex flex-col bg-background/60 dark:bg-black/20 backdrop-blur-md rounded-[2rem] border border-black/5 dark:border-white/10 overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-orange/20 hover:-translate-y-2 hover:border-brand-orange/30">
                  {/* Image Top Half */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 bg-black/5 dark:bg-white/5">
                    <img
                      src={imp.images[0]}
                      alt={imp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Subtle gradient so the image isn't too harsh */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Badge */}
                    <div className="absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl backdrop-blur-md bg-white/90 text-brand-orange shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white border border-black/5">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content Bottom Half */}
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground transition-colors duration-300 group-hover:text-brand-orange">
                        {imp.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed text-lg line-clamp-3">
                        {imp.description}
                      </p>
                    </div>

                    {/* Footer/Action */}
                    <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-brand-orange font-medium transition-colors">
                        <span className="text-sm uppercase tracking-wider font-bold group-hover:text-brand-orange-hover">Read Story</span>
                        <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-2 group-hover:bg-brand-orange group-hover:text-white">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
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
