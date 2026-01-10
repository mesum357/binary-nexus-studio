import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BookOpen, Briefcase, GraduationCap, Users, ArrowLeft, Moon, Sun, AlertCircle, CheckCircle2, Clock, Banknote, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import seedData from "@/data/seed.json";

const digitalServicesLinks = [
  { title: "Courses", url: "/digital-services/courses", icon: BookOpen },
  { title: "Services", url: "/digital-services/services", icon: Briefcase },
  { title: "Internships", url: "/digital-services/internships", icon: GraduationCap },
  { title: "Team", url: "/digital-services/team", icon: Users },
];

const DigitalServicesInternships = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);
  const { currentOpenings, programs } = seedData.internships;

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
            {digitalServicesLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.url}
                  to={link.url}
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
            {digitalServicesLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.url}
                  to={link.url}
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Internship Programs
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Gain real-world experience and kickstart your tech career with hands-on training
            </p>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`
                inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium
                ${currentOpenings > 0 
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20" 
                  : "bg-brand-orange/10 text-brand-orange border border-brand-orange/20"
                }
              `}
            >
              {currentOpenings > 0 ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{currentOpenings} position{currentOpenings > 1 ? 's' : ''} available!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <span>Currently no openings - Check back soon!</span>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-orange/5 to-brand-blue/5 border border-white/10 p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <h2 className="text-3xl font-bold mb-6 gradient-text">About Our Internships</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Binary Hub's internship programs are designed to bridge the gap between academic learning 
                and industry practice. Interns work on real client projects alongside experienced mentors, 
                gaining hands-on experience in modern development workflows.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Upon successful completion, interns receive certificates and may be considered for 
                freelance opportunities within our network.
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: GraduationCap, label: "Learn from Experts" },
                  { icon: Briefcase, label: "Real Projects" },
                  { icon: CheckCircle2, label: "Certificate" },
                ].map((benefit, idx) => (
                  <motion.div
                    key={benefit.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <benefit.icon className="w-6 h-6 text-brand-orange" />
                    <span className="font-medium">{benefit.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
          >
            Available Programs
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredProgram(program.id)}
                onMouseLeave={() => setHoveredProgram(null)}
                className="group"
              >
                <div className={`
                  relative overflow-hidden rounded-3xl transition-all duration-500 h-full
                  ${hoveredProgram === program.id 
                    ? "shadow-2xl shadow-brand-blue/30 -translate-y-2" 
                    : "shadow-lg"
                  }
                `}>
                  {/* Background */}
                  <div className={`
                    absolute inset-0 transition-all duration-500
                    ${hoveredProgram === program.id 
                      ? "bg-gradient-to-br from-brand-blue via-brand-blue to-brand-orange" 
                      : "bg-gradient-to-br from-black/5 dark:from-white/5 to-black/10 dark:to-white/10"
                    }
                  `} />

                  <div className="relative p-8">
                    {/* Program Number */}
                    <div className={`
                      absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center
                      text-lg font-bold transition-all duration-500
                      ${hoveredProgram === program.id 
                        ? "bg-white text-brand-blue" 
                        : "bg-brand-blue/10 text-brand-blue"
                      }
                    `}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* Title */}
                    <h3 className={`
                      text-2xl font-bold mb-6 pr-16 transition-colors duration-300
                      ${hoveredProgram === program.id ? "text-white" : "text-foreground"}
                    `}>
                      {program.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className={`
                        flex items-center gap-3 transition-colors duration-300
                        ${hoveredProgram === program.id ? "text-white/90" : "text-foreground/70"}
                      `}>
                        <Clock className="h-5 w-5" />
                        <span>Duration: <strong>{program.duration}</strong></span>
                      </div>
                      <div className={`
                        flex items-center gap-3 transition-colors duration-300
                        ${hoveredProgram === program.id ? "text-white/90" : "text-foreground/70"}
                      `}>
                        <Banknote className="h-5 w-5" />
                        <span>Stipend: <strong>{program.stipend}</strong></span>
                      </div>
                    </div>

                    {/* Criteria */}
                    <div className="mb-6">
                      <h4 className={`
                        font-bold mb-3 transition-colors duration-300
                        ${hoveredProgram === program.id ? "text-white" : "text-brand-orange"}
                      `}>
                        Eligibility Criteria:
                      </h4>
                      <ul className="space-y-2">
                        {program.criteria.map((criterion, cIdx) => (
                          <motion.li 
                            key={cIdx} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: cIdx * 0.1 }}
                            className={`
                              flex items-start gap-2 transition-colors duration-300
                              ${hoveredProgram === program.id ? "text-white/90" : "text-foreground/80"}
                            `}
                          >
                            <CheckCircle2 className={`
                              h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300
                              ${hoveredProgram === program.id ? "text-white" : "text-brand-blue"}
                            `} />
                            <span>{criterion}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Apply Info */}
                    {currentOpenings > 0 && (
                      <div className={`
                        pt-6 border-t transition-colors duration-300
                        ${hoveredProgram === program.id ? "border-white/20" : "border-white/10"}
                      `}>
                        <a
                          href="mailto:careers@binaryhub.pk"
                          className={`
                            flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-medium transition-all duration-300
                            ${hoveredProgram === program.id 
                              ? "bg-white text-brand-blue hover:bg-white/90" 
                              : "bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white"
                            }
                          `}
                        >
                          <Mail className="w-4 h-4" />
                          Apply Now
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Bottom Accent */}
                  <div className={`
                    h-1 transition-all duration-500
                    ${hoveredProgram === program.id 
                      ? "bg-white" 
                      : "bg-gradient-to-r from-brand-blue to-brand-orange"
                    }
                  `} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-foreground/70 mb-8">
            Reach out to us for more information about our internship programs
          </p>
          <a
            href="mailto:careers@binaryhub.pk"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default DigitalServicesInternships;
