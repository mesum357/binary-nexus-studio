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
              Research consultancy and capacity building for sustainable development
            </p>
            
            <div className="bg-gradient-soft rounded-2xl p-8 mb-8">
              <p className="text-lg text-foreground/90 leading-relaxed">
                At Binary Hub Consultants in Gilgit-Baltistan, our dedicated research team provides comprehensive, expert support for research-based projects at the local, national, and international levels. We specialize in building capacity through specialized training on the Sustainable Development Goals (SDGs) and climate change, equipping communities and organizations with the knowledge to drive meaningful action. Furthermore, we offer end-to-end consultancy services to ensure your project's success, from crafting compelling and fundable project proposals to delivering meticulous report writing, rigorous data analysis, and efficient field survey management. Our deep understanding of the unique socio-environmental context of Gilgit-Baltistan and beyond allows us to deliver insightful, evidence-based solutions that empower your initiatives and maximize their sustainable impact.
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
                onClick={() => navigate("/consultancy/services")}
                className="bg-brand-orange hover:bg-brand-orange-hover rounded-xl"
              >
                View Our Services
              </Button>
              <Button
                onClick={() => navigate("/consultancy/team")}
                variant="outline"
                className="rounded-xl border-white/20"
              >
                Meet Our Team
              </Button>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default Consultancy;
