import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BookOpen, Briefcase, GraduationCap, Users, ArrowLeft, Moon, Sun, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const digitalServicesLinks = [
  { title: "Courses", url: "/digital-services/courses", icon: BookOpen },
  { title: "Services", url: "/digital-services/services", icon: Briefcase },
  { title: "Internships", url: "/digital-services/internships", icon: GraduationCap },
  { title: "Team", url: "/digital-services/team", icon: Users },
];

interface TeamMember {
  _id: string;
  id?: string;
  name: string;
  designation: string;
  linkedin: string;
  team: string;
}

const DigitalServicesTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/team-members?team=binary-digital`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTeamMembers(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Our Team
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Meet the talented individuals who drive Binary Digital Services. 
              Together, we're shaping the future of technology education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 container mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading team members...</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 gap-4"
          >
            <Users className="w-16 h-16 text-muted-foreground/50" />
            <p className="text-muted-foreground text-lg">No team members found.</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {teamMembers.map((member) => {
              const memberId = member._id || member.id;
              
              return (
                <motion.div
                  key={memberId}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredMember(memberId!)}
                  onMouseLeave={() => setHoveredMember(null)}
                  className="group"
                >
                  <div className={`
                    relative overflow-hidden rounded-3xl transition-all duration-500
                    ${hoveredMember === memberId 
                      ? "shadow-2xl shadow-brand-orange/30 -translate-y-3" 
                      : "shadow-lg"
                    }
                  `}>
                    {/* Card Background */}
                    <div className={`
                      absolute inset-0 transition-all duration-500
                      ${hoveredMember === memberId 
                        ? "bg-gradient-to-br from-brand-orange via-brand-orange to-brand-blue" 
                        : "bg-gradient-to-br from-black/5 dark:from-white/5 to-black/10 dark:to-white/10"
                      }
                    `} />
                    
                    {/* Content */}
                    <div className="relative p-8 text-center">
                      {/* Avatar */}
                      <div className={`
                        relative w-28 h-28 mx-auto mb-6 rounded-2xl overflow-hidden transition-all duration-500
                        ${hoveredMember === memberId ? "scale-110 rotate-3" : ""}
                      `}>
                        {/* Animated border */}
                        <div className={`
                          absolute -inset-1 rounded-2xl transition-opacity duration-500
                          ${hoveredMember === memberId ? "opacity-100" : "opacity-0"}
                        `} style={{
                          background: 'conic-gradient(from 0deg, #fff, transparent, #fff)',
                          animation: 'spin 3s linear infinite'
                        }} />
                        
                        <div className={`
                          relative w-full h-full rounded-2xl flex items-center justify-center text-3xl font-bold transition-all duration-500
                          ${hoveredMember === memberId 
                            ? "bg-white text-brand-orange" 
                            : "bg-gradient-to-br from-brand-orange to-brand-blue text-white"
                          }
                        `}>
                          {getInitials(member.name)}
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className={`
                        text-xl font-bold mb-2 transition-colors duration-300
                        ${hoveredMember === memberId ? "text-white" : "text-foreground"}
                      `}>
                        {member.name}
                      </h3>

                      {/* Designation */}
                      <p className={`
                        text-sm mb-6 transition-colors duration-300
                        ${hoveredMember === memberId ? "text-white/80" : "text-muted-foreground"}
                      `}>
                        {member.designation}
                      </p>

                      {/* LinkedIn Button */}
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300
                          ${hoveredMember === memberId 
                            ? "bg-white text-brand-orange hover:bg-white/90" 
                            : "bg-brand-orange/10 dark:bg-brand-orange/20 text-brand-orange hover:bg-brand-orange hover:text-white"
                          }
                        `}
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>Connect</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Decorative elements */}
                      <div className={`
                        absolute top-4 right-4 w-20 h-20 rounded-full transition-all duration-500
                        ${hoveredMember === memberId 
                          ? "bg-white/10 scale-150" 
                          : "bg-brand-orange/5 scale-100"
                        }
                      `} />
                      <div className={`
                        absolute bottom-4 left-4 w-16 h-16 rounded-full transition-all duration-500
                        ${hoveredMember === memberId 
                          ? "bg-white/10 scale-150" 
                          : "bg-brand-blue/5 scale-100"
                        }
                      `} />
                    </div>

                    {/* Bottom accent line */}
                    <div className={`
                      h-1 transition-all duration-500
                      ${hoveredMember === memberId 
                        ? "bg-white" 
                        : "bg-gradient-to-r from-brand-orange to-brand-blue"
                      }
                    `} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default DigitalServicesTeam;
