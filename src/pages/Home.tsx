import { Hero } from "@/components/Hero";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Moon, Sun, Menu, X, User, LogOut, BookOpen } from "lucide-react";
import { MapPin, Phone } from "lucide-react";
import seedData from "@/data/seed.json";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationDropdown } from "@/components/NotificationDropdown";

const Home = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
              to="/binary-hub"
              className={({ isActive }) =>
                `text-sm md:text-base px-5 py-2.5 font-medium transition-all duration-200 bg-brand-orange text-white rounded-full ${
                  isActive
                    ? "shadow-lg brightness-110"
                    : "hover:brightness-110 hover:shadow-md"
                }`
              }
            >
              Binary Hub
            </NavLink>
            <NavLink
              to="/digital-services/courses"
              className={({ isActive }) =>
                `text-sm md:text-base px-5 py-2.5 font-medium transition-all duration-200 bg-brand-orange text-white rounded-full ${
                  isActive
                    ? "shadow-lg brightness-110"
                    : "hover:brightness-110 hover:shadow-md"
                }`
              }
            >
              Digital Services
            </NavLink>
            <NavLink
              to="/consultancy"
              className={({ isActive }) =>
                `text-sm md:text-base px-5 py-2.5 font-medium transition-all duration-200 bg-brand-orange text-white rounded-full ${
                  isActive
                    ? "shadow-lg brightness-110"
                    : "hover:brightness-110 hover:shadow-md"
                }`
              }
            >
              Consultancy
            </NavLink>
            {user ? (
              <>
                <NotificationDropdown user={user} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-none hover:bg-black/10 dark:hover:bg-white/10 p-1">
                      <Avatar className="h-9 w-9 rounded-none">
                        <AvatarFallback className="bg-brand-orange text-white rounded-none font-bold">
                          {user.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/my-courses')} className="cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>My Courses</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/signin')} className="rounded-none border-black/20 dark:border-white/20 px-5 py-2.5 h-auto font-medium">
                  Sign In
                </Button>
                <Button onClick={() => navigate('/signup')} className="bg-brand-orange hover:bg-brand-orange-hover text-white rounded-none px-5 py-2.5 h-auto font-medium shadow-md">
                  Sign Up
                </Button>
              </>
            )}
            <Button onClick={toggleTheme} variant="outline" size="icon" className="rounded-none border-black/20 dark:border-white/20 w-10 h-10" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <Button onClick={toggleTheme} variant="outline" size="icon" className="rounded-none border-black/20 dark:border-white/20 w-10 h-10" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-none border-black/20 dark:border-white/20 w-10 h-10"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-nav" className="md:hidden border-t border-black/10 dark:border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <NavLink
                to="/binary-hub"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-5 py-3 font-medium transition-all duration-200 bg-brand-orange text-white rounded-xl ${
                    isActive
                      ? "shadow-lg brightness-110"
                      : "hover:brightness-110 hover:shadow-md"
                  }`
                }
              >
                Binary Hub
              </NavLink>
              <NavLink
                to="/digital-services/courses"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-5 py-3 font-medium transition-all duration-200 bg-brand-orange text-white rounded-xl ${
                    isActive
                      ? "shadow-lg brightness-110"
                      : "hover:brightness-110 hover:shadow-md"
                  }`
                }
              >
                Digital Services
              </NavLink>
              <NavLink
                to="/consultancy"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-5 py-3 font-medium transition-all duration-200 bg-brand-orange text-white rounded-xl ${
                    isActive
                      ? "shadow-lg brightness-110"
                      : "hover:brightness-110 hover:shadow-md"
                  }`
                }
              >
                Consultancy
              </NavLink>
              {user ? (
                <>
                  <div className="px-5 py-3 border-t border-black/10 dark:border-white/10 mt-3 bg-black/[0.03] dark:bg-white/[0.03]">
                    <div className="text-xs text-muted-foreground mb-1">Signed in as</div>
                    <div className="text-sm font-medium">{user.fullName}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setMobileOpen(false);
                    }}
                    className="w-full justify-start text-left rounded-none px-5 py-3 h-auto"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <div className="flex gap-2 mt-3 pt-3 border-t border-black/10 dark:border-white/10">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/signin');
                      setMobileOpen(false);
                    }}
                    className="flex-1 rounded-none border-black/20 dark:border-white/20 py-3 h-auto font-medium"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/signup');
                      setMobileOpen(false);
                    }}
                    className="flex-1 rounded-none bg-brand-orange hover:bg-brand-orange-hover text-white py-3 h-auto font-medium"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <Hero />

      {/* Chairman Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Our Vision
                </motion.h2>
                <motion.p 
                  className="text-lg text-foreground/90 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {seedData.company.chairman.mission}
                </motion.p>
                <motion.div 
                  className="border-l-4 border-brand-orange pl-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <p className="font-semibold text-xl">{seedData.company.chairman.name}</p>
                  <p className="text-muted">Chairman, Binary Hub</p>
                </motion.div>
              </motion.div>
              <motion.div 
                className="order-1 md:order-2"
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
              >
                <div className="relative w-full max-w-sm mx-auto group">
                  {/* Animated rotating border frame */}
                  <div className="absolute -inset-3 rounded-3xl opacity-75">
                    <div 
                      className="absolute inset-0 rounded-3xl animate-spin-slow"
                      style={{
                        background: 'conic-gradient(from 0deg, hsl(20 79% 54%), hsl(203 100% 30%), hsl(20 79% 54%))',
                        animationDuration: '8s'
                      }}
                    />
                  </div>
                  {/* Inner glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange rounded-3xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  {/* Image container */}
                  <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-white/20 shadow-glow">
                    <img
                      src={seedData.company.chairman.image}
                      alt={seedData.company.chairman.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Corner accents */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-brand-orange rounded-tl-xl" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-brand-blue rounded-tr-xl" />
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-brand-blue rounded-bl-xl" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-brand-orange rounded-br-xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Clients & Achievements */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Our Clients
          </motion.h2>
          <motion.div 
            className="relative py-6 mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Edge fades for nicer flow */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10" />

            {/* Row 1 - left to right */}
            <div className="marquee">
              <div className="marquee-track marquee-track-ltr">
                <img src="/images/clients/sco.jpg" alt="SCO" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbgov.png" alt="GB Government" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbpolice.png" alt="GB Police" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbrsp.png" alt="GB RSP" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/vfo.png" alt="VFO" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/pseb.jpg" alt="PSEB" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/technation.png" alt="TechNation" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/navttc.png" alt="NAVTTC" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/yri.jpg" alt="YRI" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                {/* duplicate for seamless loop */}
                <img src="/images/clients/sco.jpg" alt="SCO" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbgov.png" alt="GB Government" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbpolice.png" alt="GB Police" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbrsp.png" alt="GB RSP" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/vfo.png" alt="VFO" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/pseb.jpg" alt="PSEB" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/technation.png" alt="TechNation" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/navttc.png" alt="NAVTTC" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/yri.jpg" alt="YRI" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
              </div>
            </div>

            {/* Single continuous row only (second row removed) */}
          </motion.div>
          {/* Removed achievements counters as requested */}
        </div>
      </section>


      {/* Projects Showcase */}
      <section className="py-20 bg-gradient-soft overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {seedData.projects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="h-48 bg-gradient-primary flex items-center justify-center relative overflow-hidden">
                  <motion.div 
                    className="text-4xl font-bold text-white"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.title.charAt(0)}
                  </motion.div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm">{project.summary}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 container mx-auto px-4 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          What Our Students Say
        </motion.h2>
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TestimonialCarousel testimonials={seedData.testimonials} />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
