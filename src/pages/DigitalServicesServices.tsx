import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import seedData from "@/data/seed.json";

const DigitalServicesServices = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="digital-services" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Our Services</h1>
          <p className="text-xl text-muted mb-12">
            Connect with our talented freelancers for your next project
          </p>

          <div className="space-y-12">
            {seedData.services.map((service, idx) => (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-brand-orange">
                  {service.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.freelancers.map((freelancer, fIdx) => (
                    <motion.div
                      key={fIdx}
                      whileHover={{ y: -4 }}
                      className="glass-card p-6"
                    >
                      <h3 className="text-xl font-bold mb-3">{freelancer.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {freelancer.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-brand-blue/20 text-brand-blue-light rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white rounded-xl"
                        onClick={() => window.open(freelancer.profile, "_blank", "noopener,noreferrer")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Portfolio
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DigitalServicesServices;
