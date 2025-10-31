import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MentorCardProps {
  name: string;
  title: string;
  department: string;
  image: string;
  linkedin: string;
}

export const MentorCard = ({ name, title, department, image, linkedin }: MentorCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card p-6 text-center shadow-soft-ios"
    >
      <div className="mb-4 relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/10">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-brand-orange font-medium mb-1">{title}</p>
      <p className="text-sm text-muted mb-4">{department}</p>
      
      <Button
        variant="outline"
        size="sm"
        className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl"
        onClick={() => window.open(linkedin, "_blank", "noopener,noreferrer")}
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
    </motion.div>
  );
};
