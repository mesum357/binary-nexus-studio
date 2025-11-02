import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

        {/* Our Services Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl w-full mt-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Our Services</h2>
            <p className="text-xl text-muted">
              Comprehensive IT solutions and strategic consulting for businesses of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Custom Software Development",
                description: "Build tailored software solutions that align with your business objectives.",
                icon: "💻"
              },
              {
                title: "Cloud Solutions & Migration",
                description: "Leverage cloud infrastructure for enhanced scalability and efficiency.",
                icon: "☁️"
              },
              {
                title: "Digital Transformation Strategy",
                description: "Navigate your organization's digital journey with expert guidance.",
                icon: "📈"
              },
              {
                title: "Data Analytics & BI",
                description: "Transform raw data into actionable insights for decision-making.",
                icon: "📊"
              },
              {
                title: "Enterprise Integration",
                description: "Seamlessly connect disparate systems for unified workflows.",
                icon: "🔗"
              },
              {
                title: "Cybersecurity & Compliance",
                description: "Protect your digital assets with robust security measures.",
                icon: "🔒"
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <Card className="glass-card h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/consultancy/services")}
              className="bg-brand-orange hover:bg-brand-orange-hover rounded-xl"
              size="lg"
            >
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Consultancy;
