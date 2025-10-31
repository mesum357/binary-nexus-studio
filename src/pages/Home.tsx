import { Hero } from "@/components/Hero";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { MapPin, Phone } from "lucide-react";
import seedData from "@/data/seed.json";

const Home = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

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
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8 rounded" />
            <span className="font-semibold">Binary Nexus</span>
          </a>
          <nav className="flex items-center gap-2 md:gap-3">
            <NavLink
              to="/binary-hub"
              className={({ isActive }) =>
                `text-sm md:text-base px-3 py-1 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black/15 dark:bg-white/15 text-foreground"
                    : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground/90"
                }`
              }
            >
              Binary Hub
            </NavLink>
            <NavLink
              to="/digital-services/courses"
              className={({ isActive }) =>
                `text-sm md:text-base px-3 py-1 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black/15 dark:bg-white/15 text-foreground"
                    : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground/90"
                }`
              }
            >
              Binary Digital Services
            </NavLink>
            <NavLink
              to="/consultancy"
              className={({ isActive }) =>
                `text-sm md:text-base px-3 py-1 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black/15 dark:bg-white/15 text-foreground"
                    : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground/90"
                }`
              }
            >
              Consultancy
            </NavLink>
            <Button onClick={toggleTheme} variant="outline" size="icon" className="rounded-xl border-white/20 w-9 h-9" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </header>

      <Hero />

      {/* Chairman Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                  Our Vision
                </h2>
                <p className="text-lg text-foreground/90 mb-4">
                  {seedData.company.chairman.mission}
                </p>
                <div className="border-l-4 border-brand-orange pl-4">
                  <p className="font-semibold text-xl">{seedData.company.chairman.name}</p>
                  <p className="text-muted">Chairman, Binary Hub</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative w-full max-w-sm mx-auto">
                  <div className="aspect-square rounded-3xl overflow-hidden border-4 border-white/10 shadow-glow">
                    <img
                      src={seedData.company.chairman.image}
                      alt={seedData.company.chairman.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Clients & Achievements */}
      <section className="py-20 bg-white dark:bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Our Clients
          </motion.h2>
          <div className="relative py-6 mb-12">
            {/* Edge fades for nicer flow */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

            {/* Row 1 - left to right */}
            <div className="marquee">
              <div className="marquee-track marquee-track-ltr">
                <img src="/images/clients/sco.jpg" alt="SCO" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbgov.png" alt="GB Government" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbpolice.png" alt="GB Police" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbrsp.png" alt="GB RSP" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/vfo.png" alt="VFO" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                {/* duplicate for seamless loop */}
                <img src="/images/clients/sco.jpg" alt="SCO" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbgov.png" alt="GB Government" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbpolice.png" alt="GB Police" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/gbrsp.png" alt="GB RSP" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
                <img src="/images/clients/vfo.png" alt="VFO" className="h-14 md:h-16 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out hover:scale-105" />
              </div>
            </div>

            {/* Single continuous row only (second row removed) */}
          </div>
          {/* Removed achievements counters as requested */}
        </div>
      </section>

      {/* Branches */}
      <section className="py-20 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Our Branches
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {seedData.branches.map((branch, idx) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6"
            >
              <h3 className="text-2xl font-bold mb-4 text-brand-orange">{branch.name}</h3>
              <div className="space-y-2 text-muted">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>{branch.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {seedData.projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="h-48 bg-gradient-primary flex items-center justify-center">
                  <div className="text-4xl font-bold text-white">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm">{project.summary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          What Our Students Say
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <TestimonialCarousel testimonials={seedData.testimonials} />
        </div>
      </section>
    </div>
  );
};

export default Home;
