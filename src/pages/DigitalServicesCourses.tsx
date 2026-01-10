import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Briefcase, GraduationCap, Users, ArrowLeft, Moon, Sun, Clock, Banknote, ArrowRight, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import seedData from "@/data/seed.json";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const digitalServicesLinks = [
  { title: "Courses", url: "/digital-services/courses", icon: BookOpen },
  { title: "Services", url: "/digital-services/services", icon: Briefcase },
  { title: "Internships", url: "/digital-services/internships", icon: GraduationCap },
  { title: "Team", url: "/digital-services/team", icon: Users },
];

interface Mentor {
  _id: string;
  id?: string;
  name: string;
  department: string;
  linkedin: string;
  image?: string;
}

const DigitalServicesCourses = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [hoveredMentor, setHoveredMentor] = useState<string | null>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  useEffect(() => {
    fetchMentors();
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/mentors`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMentors(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group mentors by department
  const groupedMentors = mentors.reduce((acc, mentor) => {
    const dept = mentor.department || 'Other';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(mentor);
    return acc;
  }, {} as Record<string, Mentor[]>);

  const departmentOrder = [
    'Web Development',
    'UI UX Designing',
    'Graphic Designing',
    'Digital Marketing',
    'Amazon',
    'Bookkeeping',
  ];

  const orderedDepartments = departmentOrder.filter(dept => groupedMentors[dept]);

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
          
          {/* Desktop nav */}
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
              Our Courses
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Industry-leading programs designed to launch your tech career. 
              Learn from experts and build real-world projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 container mx-auto px-4">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          {seedData.courses.map((course, idx) => (
            <motion.div
              key={course.slug}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onMouseEnter={() => setHoveredCourse(course.slug)}
              onMouseLeave={() => setHoveredCourse(null)}
              onClick={() => navigate(`/digital-services/enroll/${course.slug}`)}
              className="group cursor-pointer"
            >
              <div className={`
                relative overflow-hidden rounded-3xl transition-all duration-500 h-full
                ${hoveredCourse === course.slug 
                  ? "shadow-2xl shadow-brand-orange/30 -translate-y-3" 
                  : "shadow-lg"
                }
              `}>
                {/* Card Header with Gradient */}
                <div className={`
                  relative h-48 overflow-hidden transition-all duration-500
                  ${hoveredCourse === course.slug 
                    ? "bg-gradient-to-br from-brand-orange via-brand-orange to-brand-blue" 
                    : "bg-gradient-to-br from-brand-orange/80 to-brand-blue/80"
                  }
                `}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '24px 24px'
                    }} />
                  </div>

                  {/* Course Icon */}
                  <div className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    text-8xl font-bold text-white/30 transition-all duration-500
                    ${hoveredCourse === course.slug ? "scale-125 text-white/40" : ""}
                  `}>
                    {course.title.split(" ")[0].charAt(0)}
                  </div>

                  {/* Price Badge */}
                  <div className={`
                    absolute top-4 right-4 px-4 py-2 rounded-full font-bold transition-all duration-300
                    ${hoveredCourse === course.slug 
                      ? "bg-white text-brand-orange" 
                      : "bg-white/20 backdrop-blur-sm text-white"
                    }
                  `}>
                    {course.price}
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm text-white text-sm">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 bg-background/80 backdrop-blur-sm">
                  <h3 className={`
                    text-2xl font-bold mb-3 transition-colors duration-300
                    ${hoveredCourse === course.slug ? "text-brand-orange" : "text-foreground"}
                  `}>
                    {course.title}
                  </h3>

                  <p className="text-foreground/60 mb-6 line-clamp-2">
                    {course.summary}
                  </p>

                  {/* Enroll Button */}
                  <div className={`
                    flex items-center justify-between transition-all duration-300
                    ${hoveredCourse === course.slug ? "opacity-100" : "opacity-80"}
                  `}>
                    <span className="text-sm text-foreground/50">Start Learning Today</span>
                    <div className={`
                      flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300
                      ${hoveredCourse === course.slug 
                        ? "bg-brand-orange text-white" 
                        : "bg-brand-orange/10 text-brand-orange"
                      }
                    `}>
                      Enroll Now
                      <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${
                        hoveredCourse === course.slug ? "translate-x-1" : ""
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className={`
                  h-1 transition-all duration-500
                  ${hoveredCourse === course.slug 
                    ? "bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange" 
                    : "bg-brand-orange/30"
                  }
                `} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mentors Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Our Mentors
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Learn from industry experts who are passionate about teaching
            </p>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground">Loading mentors...</p>
            </div>
          ) : Object.keys(groupedMentors).length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 gap-4"
            >
              <Users className="w-16 h-16 text-muted-foreground/50" />
              <p className="text-muted-foreground text-lg">No mentors available at the moment.</p>
            </motion.div>
          ) : (
            <div className="space-y-16">
              {orderedDepartments.map((department, deptIdx) => (
                <motion.div 
                  key={department}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: deptIdx * 0.1 }}
                >
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-brand-orange rounded-full" />
                    {department}
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {groupedMentors[department].map((mentor, mentorIdx) => {
                      const imageUrl = mentor.image 
                        ? `${API_URL}${mentor.image}` 
                        : null;
                      const mentorId = mentor._id || mentor.id || `${mentorIdx}`;
                      
                      return (
                        <motion.div
                          key={mentorId}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: mentorIdx * 0.05 }}
                          onMouseEnter={() => setHoveredMentor(mentorId)}
                          onMouseLeave={() => setHoveredMentor(null)}
                          className="group"
                        >
                          <div className={`
                            relative overflow-hidden rounded-3xl transition-all duration-500 text-center
                            ${hoveredMentor === mentorId 
                              ? "shadow-2xl shadow-brand-blue/30 -translate-y-2" 
                              : "shadow-lg"
                            }
                          `}>
                            {/* Background */}
                            <div className={`
                              absolute inset-0 transition-all duration-500
                              ${hoveredMentor === mentorId 
                                ? "bg-gradient-to-br from-brand-blue via-brand-blue to-brand-orange" 
                                : "bg-gradient-to-br from-black/5 dark:from-white/5 to-black/10 dark:to-white/10"
                              }
                            `} />

                            <div className="relative p-6">
                              {/* Avatar */}
                              <div className={`
                                relative w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden transition-all duration-500
                                ${hoveredMentor === mentorId ? "scale-110 rotate-3" : ""}
                              `}>
                                {imageUrl ? (
                                  <img 
                                    src={imageUrl} 
                                    alt={mentor.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className={`
                                    w-full h-full flex items-center justify-center text-2xl font-bold transition-all duration-500
                                    ${hoveredMentor === mentorId 
                                      ? "bg-white text-brand-blue" 
                                      : "bg-gradient-to-br from-brand-blue to-brand-orange text-white"
                                    }
                                  `}>
                                    {getInitials(mentor.name)}
                                  </div>
                                )}
                              </div>

                              {/* Name */}
                              <h4 className={`
                                text-lg font-bold mb-1 transition-colors duration-300
                                ${hoveredMentor === mentorId ? "text-white" : "text-foreground"}
                              `}>
                                {mentor.name}
                              </h4>

                              {/* Department */}
                              <p className={`
                                text-sm mb-4 transition-colors duration-300
                                ${hoveredMentor === mentorId ? "text-white/80" : "text-muted-foreground"}
                              `}>
                                {mentor.department}
                              </p>

                              {/* LinkedIn Button */}
                              <a
                                href={mentor.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`
                                  inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                  ${hoveredMentor === mentorId 
                                    ? "bg-white text-brand-blue hover:bg-white/90" 
                                    : "bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white"
                                  }
                                `}
                              >
                                <Linkedin className="w-4 h-4" />
                                Connect
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            {/* Bottom Line */}
                            <div className={`
                              h-1 transition-all duration-500
                              ${hoveredMentor === mentorId 
                                ? "bg-white" 
                                : "bg-gradient-to-r from-brand-blue to-brand-orange"
                              }
                            `} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DigitalServicesCourses;
