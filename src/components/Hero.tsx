import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Frosted Glass Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="p-0"
          >
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Binary Hub" 
                className="h-48 md:h-64 w-auto"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => navigate("/binary-hub")}
                  size="lg"
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-6 text-lg rounded-2xl shadow-glow transition-all"
                >
                  Binary Hub
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => navigate("/digital-services/courses")}
                  size="lg"
                  className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-6 text-lg rounded-2xl transition-all"
                >
                  Digital Services
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => navigate("/consultancy")}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-black hover:bg-black text-white px-8 py-6 text-lg rounded-2xl transition-all dark:bg-transparent dark:hover:bg-white/10 dark:border-2 dark:border-white/20"
                >
                  Consultancy
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
