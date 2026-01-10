import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Briefcase, Users, ArrowLeft, Moon, Sun, FileText, BarChart3, Target, BookOpen, Globe, CheckCircle2, Mail, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceChatBox } from "@/components/ServiceChatBox";

const consultancyLinks = [
  { title: "Home", url: "/consultancy", icon: Home },
  { title: "Services", url: "/consultancy/services", icon: Briefcase },
  { title: "Team", url: "/consultancy/team", icon: Users },
];

const services = [
  {
    id: "project-proposals",
    title: "Project Proposal Writing",
    description: "We craft compelling and fundable project proposals that clearly articulate your research objectives, methodology, and expected outcomes. Our team has extensive experience in writing successful proposals for national and international funding agencies.",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    features: [
      "Grant proposal development",
      "Research methodology design",
      "Budget planning and justification",
      "Timeline and work plan creation",
      "Stakeholder engagement strategies"
    ]
  },
  {
    id: "data-analysis",
    title: "Data Analysis & Research",
    description: "Our expert data scientists and economists provide rigorous quantitative and qualitative data analysis using advanced statistical methods and econometric techniques.",
    icon: BarChart3,
    color: "from-purple-500 to-purple-600",
    features: [
      "Quantitative data analysis",
      "Econometric modeling",
      "Statistical inference",
      "Data visualization",
      "Policy impact assessment"
    ]
  },
  {
    id: "field-surveys",
    title: "Field Survey Management",
    description: "We manage comprehensive field surveys from design to execution, ensuring high-quality data collection with experience from UNDP, AKRSP, and GLOF-II projects.",
    icon: Users,
    color: "from-green-500 to-green-600",
    features: [
      "Survey design and development",
      "Field data collection",
      "Quality assurance and control",
      "Data processing and cleaning",
      "Survey team training"
    ]
  },
  {
    id: "report-writing",
    title: "Report Writing & Documentation",
    description: "We deliver meticulously written research reports that effectively communicate findings, recommendations, and policy implications meeting international standards.",
    icon: BookOpen,
    color: "from-orange-500 to-orange-600",
    features: [
      "Research report writing",
      "Executive summaries",
      "Policy briefs",
      "Academic publications",
      "Technical documentation"
    ]
  },
  {
    id: "capacity-building",
    title: "Capacity Building & Training",
    description: "We provide specialized training programs on Sustainable Development Goals (SDGs) and climate change, equipping communities and organizations with knowledge.",
    icon: Target,
    color: "from-cyan-500 to-cyan-600",
    features: [
      "SDG training programs",
      "Climate change workshops",
      "Research methodology training",
      "Data analysis workshops",
      "Policy development training"
    ]
  },
  {
    id: "research-consultancy",
    title: "Research Consultancy",
    description: "We offer comprehensive research consultancy services for projects at local, national, and international levels with end-to-end support.",
    icon: Globe,
    color: "from-indigo-500 to-indigo-600",
    features: [
      "Research project management",
      "Literature review and synthesis",
      "Research design and methodology",
      "Policy analysis",
      "Impact evaluation studies"
    ]
  }
];

const ConsultancyServices = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [openChatBox, setOpenChatBox] = useState<string | null>(null);

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
              Our Services
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Comprehensive research consultancy and capacity building services. 
              From proposal writing to data analysis and report delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="space-y-8 max-w-6xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group"
              >
                <div className={`
                  relative overflow-hidden rounded-3xl transition-all duration-500
                  ${hoveredService === service.id 
                    ? "shadow-2xl -translate-y-2" 
                    : "shadow-lg"
                  }
                `}>
                  {/* Background */}
                  <div className={`
                    absolute inset-0 transition-all duration-500
                    ${hoveredService === service.id 
                      ? `bg-gradient-to-r ${service.color}` 
                      : "bg-black/5 dark:bg-white/5"
                    }
                  `} />

                  <div className="relative p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left: Icon and Title */}
                      <div className="lg:w-72 flex-shrink-0">
                        <div className={`
                          w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                          ${hoveredService === service.id 
                            ? "bg-white/20" 
                            : `bg-gradient-to-br ${service.color}`
                          }
                        `}>
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className={`
                          text-2xl font-bold mb-2 transition-colors duration-300
                          ${hoveredService === service.id ? "text-white" : "text-foreground"}
                        `}>
                          {service.title}
                        </h3>
                        <span className={`
                          inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                          ${hoveredService === service.id 
                            ? "bg-white/20 text-white" 
                            : "bg-brand-orange/10 text-brand-orange"
                          }
                        `}>
                          Research Service
                        </span>
                      </div>

                      {/* Right: Description and Features */}
                      <div className="flex-1">
                        <p className={`
                          text-base leading-relaxed mb-6 transition-colors duration-300
                          ${hoveredService === service.id ? "text-white/90" : "text-foreground/80"}
                        `}>
                          {service.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-2 mb-6">
                          {service.features.map((feature, fIdx) => (
                            <div 
                              key={fIdx}
                              className={`
                                flex items-center gap-2 transition-colors duration-300
                                ${hoveredService === service.id ? "text-white/90" : "text-foreground/70"}
                              `}
                            >
                              <CheckCircle2 className={`
                                h-4 w-4 flex-shrink-0 transition-colors duration-300
                                ${hoveredService === service.id ? "text-white" : "text-green-500"}
                              `} />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setOpenChatBox(service.id)}
                            className={`
                              inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300
                              ${hoveredService === service.id 
                                ? "bg-white text-gray-900 hover:bg-white/90" 
                                : "bg-brand-orange text-white hover:bg-brand-orange-hover"
                              }
                            `}
                          >
                            <Mail className="w-4 h-4" />
                            Contact Us
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className={`
                    h-1 transition-all duration-500
                    ${hoveredService === service.id 
                      ? "bg-white/50" 
                      : `bg-gradient-to-r ${service.color}`
                    }
                  `} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Ready to Start Your Research Project?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Let's discuss how our research consultancy services can help you achieve your project goals and maximize your impact.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:consultancy@binaryhub.pk"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </a>
              <a
                href="tel:+92-21-3586-2100"
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Call: +92-21-3586-2100
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Chat Boxes */}
      {services.map((service) => (
        <ServiceChatBox
          key={service.id}
          open={openChatBox === service.id}
          onOpenChange={(open) => setOpenChatBox(open ? service.id : null)}
          serviceTitle={service.title}
          serviceId={service.id}
        />
      ))}
    </div>
  );
};

export default ConsultancyServices;
