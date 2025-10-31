import { Home, Users, ImageIcon, BookOpen, Briefcase, GraduationCap } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface AppSidebarProps {
  type: "binary-hub" | "digital-services";
}

const binaryHubLinks = [
  { title: "Home", url: "/binary-hub", icon: Home },
  { title: "Our Team", url: "/binary-hub/team", icon: Users },
  { title: "Gallery", url: "/binary-hub/gallery", icon: ImageIcon },
];

const digitalServicesLinks = [
  { title: "Our Courses", url: "/digital-services/courses", icon: BookOpen },
  { title: "Our Services", url: "/digital-services/services", icon: Briefcase },
  { title: "Internships", url: "/digital-services/internships", icon: GraduationCap },
];

export function AppSidebar({ type }: AppSidebarProps) {
  const location = useLocation();
  const links = type === "binary-hub" ? binaryHubLinks : digitalServicesLinks;

  return (
    <aside className="w-64 min-h-screen glass-card border-r border-white/10 p-6">
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.url;
          
          return (
            <NavLink
              key={link.url}
              to={link.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "text-muted hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{link.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
