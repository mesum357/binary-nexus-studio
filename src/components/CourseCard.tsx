import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  slug: string;
  title: string;
  duration: string;
  price: string;
  summary: string;
  image?: string;
}

export const CourseCard = ({ slug, title, duration, price, summary }: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass-card p-6 shadow-soft-ios hover:shadow-glow transition-all cursor-pointer group"
      onClick={() => navigate(`/digital-services/enroll/${slug}`)}
    >
      <div className="mb-4 h-48 bg-gradient-soft rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="text-6xl gradient-text font-bold">
          {title.split(" ")[0].charAt(0)}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:gradient-text transition-all">
        {title}
      </h3>
      
      <p className="text-muted mb-4 line-clamp-2">{summary}</p>
      
      <div className="flex items-center gap-4 mb-4 text-sm text-muted">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          <span>{price}</span>
        </div>
      </div>
      
      <Button
        className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/digital-services/enroll/${slug}`);
        }}
      >
        Enroll Now
      </Button>
    </motion.div>
  );
};
