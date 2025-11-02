import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberCardProps {
  name: string;
  designation: string;
  linkedin: string;
}

export const TeamMemberCard = ({ name, designation, linkedin }: TeamMemberCardProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass p-6 hover:shadow-xl transition-all duration-300 text-center">
        <CardContent className="p-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
            {initials}
          </div>
          
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{designation}</p>
          
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn Profile
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
};


