import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BookOpen, Briefcase, GraduationCap, Users, ArrowLeft, Moon, Sun, ExternalLink, Linkedin, Code, Palette, TrendingUp, ShoppingCart, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const digitalServicesLinks = [
  { title: "Courses", url: "/digital-services/courses", icon: BookOpen },
  { title: "Services", url: "/digital-services/services", icon: Briefcase },
  { title: "Internships", url: "/digital-services/internships", icon: GraduationCap },
  { title: "Team", url: "/digital-services/team", icon: Users },
];

const departmentIcons: Record<string, any> = {
  'Web Development': Code,
  'UI UX Designing': Palette,
  'Graphic Designing': Palette,
  'Digital Marketing': TrendingUp,
  'Amazon': ShoppingCart,
  'Bookkeeping': Calculator,
};

interface Freelancer {
  _id: string;
  id?: string;
  name: string;
  title: string;
  skills: string[];
  department: string;
  linkedin: string;
  image?: string;
}

const DigitalServicesServices = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [hoveredFreelancer, setHoveredFreelancer] = useState<string | null>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/freelancers`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setFreelancers(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching freelancers:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedFreelancers = freelancers.reduce((acc, freelancer) => {
    const dept = freelancer.department || 'Other';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(freelancer);
    return acc;
  }, {} as Record<string, Freelancer[]>);

  const departmentOrder = [
    'Web Development',
    'UI UX Designing',
    'Graphic Designing',
    'Digital Marketing',
    'Amazon',
    'Bookkeeping',
  ];

  const orderedDepartments = departmentOrder.filter(dept => groupedFreelancers[dept]);

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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Our Services
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Connect with our talented freelancers for your next project. 
              Quality work delivered by certified professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Freelancers Section */}
      <section className="py-16 container mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading freelancers...</p>
          </div>
        ) : Object.keys(groupedFreelancers).length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 gap-4"
          >
            <Briefcase className="w-16 h-16 text-muted-foreground/50" />
            <p className="text-muted-foreground text-lg">No freelancers available at the moment.</p>
          </motion.div>
        ) : (
          <div className="space-y-20">
            {orderedDepartments.map((department, deptIdx) => {
              const DeptIcon = departmentIcons[department] || Briefcase;
              
              return (
                <motion.div 
                  key={department}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: deptIdx * 0.1 }}
                >
                  {/* Department Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-blue flex items-center justify-center">
                      <DeptIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{department}</h2>
                      <p className="text-foreground/60">{groupedFreelancers[department].length} freelancer{groupedFreelancers[department].length > 1 ? 's' : ''} available</p>
                    </div>
                  </div>
                  
                  {/* Freelancer Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedFreelancers[department].map((freelancer, fIdx) => {
                      const freelancerId = freelancer._id || freelancer.id || `${fIdx}`;
                      const imageUrl = freelancer.image ? `${API_URL}${freelancer.image}` : null;
                      
                      return (
                        <motion.div
                          key={freelancerId}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: fIdx * 0.05 }}
                          onMouseEnter={() => setHoveredFreelancer(freelancerId)}
                          onMouseLeave={() => setHoveredFreelancer(null)}
                          className="group"
                        >
                          <div className={`
                            relative overflow-hidden rounded-3xl transition-all duration-500 h-full
                            ${hoveredFreelancer === freelancerId 
                              ? "shadow-2xl shadow-brand-orange/30 -translate-y-3" 
                              : "shadow-lg"
                            }
                          `}>
                            {/* Background */}
                            <div className={`
                              absolute inset-0 transition-all duration-500
                              ${hoveredFreelancer === freelancerId 
                                ? "bg-gradient-to-br from-brand-orange via-brand-orange to-brand-blue" 
                                : "bg-gradient-to-br from-black/5 dark:from-white/5 to-black/10 dark:to-white/10"
                              }
                            `} />

                            <div className="relative p-6">
                              {/* Header with Avatar */}
                              <div className="flex items-center gap-4 mb-4">
                                <div className={`
                                  w-16 h-16 rounded-2xl overflow-hidden transition-all duration-500
                                  ${hoveredFreelancer === freelancerId ? "scale-110 rotate-3" : ""}
                                `}>
                                  {imageUrl ? (
                                    <img 
                                      src={imageUrl} 
                                      alt={freelancer.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className={`
                                      w-full h-full flex items-center justify-center text-xl font-bold transition-all duration-500
                                      ${hoveredFreelancer === freelancerId 
                                        ? "bg-white text-brand-orange" 
                                        : "bg-gradient-to-br from-brand-orange to-brand-blue text-white"
                                      }
                                    `}>
                                      {getInitials(freelancer.name)}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h3 className={`
                                    text-xl font-bold transition-colors duration-300
                                    ${hoveredFreelancer === freelancerId ? "text-white" : "text-foreground"}
                                  `}>
                                    {freelancer.name}
                                  </h3>
                                  <p className={`
                                    text-sm transition-colors duration-300
                                    ${hoveredFreelancer === freelancerId ? "text-white/80" : "text-muted-foreground"}
                                  `}>
                                    {freelancer.title}
                                  </p>
                                </div>
                              </div>

                              {/* Skills */}
                              <div className="flex flex-wrap gap-2 mb-6">
                                {freelancer.skills.slice(0, 4).map((skill) => (
                                  <span
                                    key={skill}
                                    className={`
                                      px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                                      ${hoveredFreelancer === freelancerId 
                                        ? "bg-white/20 text-white" 
                                        : "bg-brand-blue/10 text-brand-blue"
                                      }
                                    `}
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {freelancer.skills.length > 4 && (
                                  <span className={`
                                    px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                                    ${hoveredFreelancer === freelancerId 
                                      ? "bg-white/20 text-white" 
                                      : "bg-black/5 dark:bg-white/10 text-foreground/60"
                                    }
                                  `}>
                                    +{freelancer.skills.length - 4}
                                  </span>
                                )}
                              </div>

                              {/* Action Button */}
                              <a
                                href={freelancer.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                                  flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-medium transition-all duration-300
                                  ${hoveredFreelancer === freelancerId 
                                    ? "bg-white text-brand-orange hover:bg-white/90" 
                                    : "bg-brand-orange/10 text-brand-orange hover:bg-brand-orange hover:text-white"
                                  }
                                `}
                              >
                                <Linkedin className="w-4 h-4" />
                                View Portfolio
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            {/* Bottom Accent */}
                            <div className={`
                              h-1 transition-all duration-500
                              ${hoveredFreelancer === freelancerId 
                                ? "bg-white" 
                                : "bg-gradient-to-r from-brand-orange to-brand-blue"
                              }
                            `} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default DigitalServicesServices;
