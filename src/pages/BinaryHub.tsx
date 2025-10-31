import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import seedData from "@/data/seed.json";

const BinaryHub = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="binary-hub" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-8 gradient-text">Welcome to Binary Hub</h1>
          
          <div className="glass-card p-8 mb-8">
            <p className="text-xl text-foreground/90 leading-relaxed mb-6">
              Binary Hub is Pakistan's premier technology education and freelance development company. 
              We bridge the gap between aspiring tech professionals and industry demands through 
              comprehensive training programs and real-world project experience.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Our mission is to empower individuals with cutting-edge IT skills, enabling them to 
              thrive in the digital economy as successful freelancers and industry professionals.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Our Chairman</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={seedData.company.chairman.image}
                alt={seedData.company.chairman.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white/10"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{seedData.company.chairman.name}</h3>
                <p className="text-brand-orange font-medium mb-4">Chairman & Founder</p>
                <p className="text-foreground/90 leading-relaxed">
                  {seedData.company.chairman.mission}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BinaryHub;
