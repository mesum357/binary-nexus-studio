import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Consultancy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="consultancy" />

      <main className="flex-1 p-6 md:p-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full"
        >
          <div className="glass-card p-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Binary Consultancy Services
            </h1>
            <p className="text-2xl text-foreground/90 mb-8">
              Enterprise solutions and strategic technology consulting
            </p>
            
            <div className="bg-gradient-soft rounded-2xl p-8 mb-8">
              <p className="text-lg text-foreground/90 mb-6">
                Our consultancy division provides comprehensive IT solutions for businesses looking to 
                transform their digital presence. From custom software development to digital transformation 
                strategies, we help organizations leverage technology for growth.
              </p>
              <p className="text-lg text-muted">
                This service is currently being expanded. For inquiries about enterprise solutions, 
                please contact us directly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-6">
                <Mail className="h-8 w-8 text-brand-orange mb-3 mx-auto" />
                <h3 className="font-bold mb-2">Email Us</h3>
                <a
                  href="mailto:consultancy@binaryhub.pk"
                  className="text-brand-blue hover:underline"
                >
                  consultancy@binaryhub.pk
                </a>
              </div>
              
              <div className="glass-card p-6">
                <Phone className="h-8 w-8 text-brand-blue mb-3 mx-auto" />
                <h3 className="font-bold mb-2">Call Us</h3>
                <a
                  href="tel:+92-21-3586-2100"
                  className="text-brand-orange hover:underline"
                >
                  +92-21-3586-2100
                </a>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/digital-services/courses")}
                className="bg-brand-orange hover:bg-brand-orange-hover rounded-xl"
              >
                Explore Courses
              </Button>
              <Button
                onClick={() => navigate("/binary-hub")}
                variant="outline"
                className="rounded-xl border-white/20"
              >
                About Binary Hub
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Consultancy;
