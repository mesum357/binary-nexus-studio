import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Briefcase, Users, ArrowLeft, Moon, Sun, MessageSquare, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const consultancyLinks = [
  { title: "Home", url: "/consultancy", icon: Home },
  { title: "Services", url: "/consultancy/services", icon: Briefcase },
  { title: "Team", url: "/consultancy/team", icon: Users },
];

const founder = {
  name: "Tehseen Abbas",
  title: "Founder and CEO",
  description: "Tehseen Abbas is the visionary Founder and CEO of Binary Hub, leading the organization with a profound commitment to empowering individuals and communities through innovative technology education and strategic consulting. With extensive experience in IT education and enterprise solutions, Tehseen has established Binary Hub as a premier institution that bridges the gap between academic learning and practical industry skills.",
  image: "/images/consultancy/tehseensir.jpg"
};

const coreTeam = [
  {
    id: "abid",
    name: "Abid Hussain",
    title: "Researcher",
    description: "Abid Hussain is a researcher with a focus on economics and development, currently pursuing a Ph.D. exploring socio-economic and cultural determinants of multidimensional energy poverty in Gilgit-Baltistan.",
    image: "/images/consultancy/abidhussain.jpg"
  },
  {
    id: "kifayat",
    name: "Kifayat Ullah",
    title: "Department of Economics",
    description: "Dr. Kifayat Ullah is a Faculty Member at the Department of Economics, KIU. His research focuses on development economics, environmental sustainability, and rural development.",
    image: "/images/consultancy/kifayat.jpg"
  },
  {
    id: "tariq",
    name: "Dr. Muhammad Tariq",
    title: "Economist and Researcher",
    description: "Dr. Muhammad Tariq earned his PhD in Applied Economics from Southeast University, China. He has a proven track record of securing research grants from national and international organizations.",
    image: "/images/consultancy/tariq.jpg"
  },
  {
    id: "shahabbas",
    name: "Dr. Shah Abbas",
    title: "Data Scientist",
    description: "Dr. Shah Abbas is a data scientist with a PhD in Economics. He specializes in data modeling, econometrics, and policy analysis with over five years of international experience.",
    image: "/images/consultancy/shahabbas2.jpg"
  },
  {
    id: "alina",
    name: "Alina",
    title: "Researcher",
    description: "Ms. Alina possesses solid research foundation with experience in UNDP, AKRSP, and GLOF-II projects, specializing in rural livelihoods and climate resilience research.",
    image: "/images/consultancy/alina.jpg"
  },
  {
    id: "marifa",
    name: "Marifa Ali",
    title: "Economics & Finance",
    description: "Marifa Ali is an Economics & Finance Management student with training in Applied Economics and qualitative research techniques.",
    image: "/images/consultancy/marifali.jpg"
  }
];

const ConsultancyTeam = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        
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
              Meet the expert consultants and researchers who drive Binary Consultancy Services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 gradient-text">Founder & CEO</h2>
          
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 border border-white/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-brand-orange to-brand-blue rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="relative w-48 h-48 rounded-2xl object-cover border-4 border-white/20"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange text-white text-sm font-medium mb-3">
                    {founder.title}
                  </span>
                  <h3 className="text-3xl font-bold mb-4">{founder.name}</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {founder.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Core Team Section */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 gradient-text text-center"
          >
            Core Team
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coreTeam.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                className="group"
              >
                <div className={`
                  relative overflow-hidden rounded-3xl transition-all duration-500 h-full
                  ${hoveredMember === member.id 
                    ? "shadow-2xl shadow-brand-blue/30 -translate-y-3" 
                    : "shadow-lg"
                  }
                `}>
                  {/* Background */}
                  <div className={`
                    absolute inset-0 transition-all duration-500
                    ${hoveredMember === member.id 
                      ? "bg-gradient-to-br from-brand-blue via-brand-blue to-brand-orange" 
                      : "bg-gradient-to-br from-black/5 dark:from-white/5 to-black/10 dark:to-white/10"
                    }
                  `} />

                  <div className="relative p-6">
                    {/* Avatar */}
                    <div className={`
                      relative w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden transition-all duration-500
                      ${hoveredMember === member.id ? "scale-110" : ""}
                    `}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className={`
                        hidden w-full h-full absolute inset-0 flex items-center justify-center text-2xl font-bold
                        ${hoveredMember === member.id 
                          ? "bg-white text-brand-blue" 
                          : "bg-gradient-to-br from-brand-blue to-brand-orange text-white"
                        }
                      `}>
                        {getInitials(member.name)}
                      </div>
                    </div>

                    {/* Name & Title */}
                    <div className="text-center mb-4">
                      <h3 className={`
                        text-xl font-bold mb-1 transition-colors duration-300
                        ${hoveredMember === member.id ? "text-white" : "text-foreground"}
                      `}>
                        {member.name}
                      </h3>
                      <span className={`
                        inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                        ${hoveredMember === member.id 
                          ? "bg-white/20 text-white" 
                          : "bg-brand-blue/10 text-brand-blue"
                        }
                      `}>
                        {member.title}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`
                      text-sm leading-relaxed text-center transition-colors duration-300
                      ${hoveredMember === member.id ? "text-white/90" : "text-foreground/70"}
                    `}>
                      {member.description}
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className={`
                    h-1 transition-all duration-500
                    ${hoveredMember === member.id 
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

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            Work With Our Experts
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Our team is ready to help you achieve your research and development goals. 
            Get in touch to discuss your project requirements.
          </p>
          <Button
            onClick={() => navigate("/consultancy/messages")}
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange-hover text-white rounded-full px-8"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Send Us a Message
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default ConsultancyTeam;
