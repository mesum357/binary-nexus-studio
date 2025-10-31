import { AppSidebar } from "@/components/AppSidebar";
import { MentorCard } from "@/components/MentorCard";
import { motion } from "framer-motion";
import seedData from "@/data/seed.json";

const BinaryHubTeam = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="binary-hub" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Our Team</h1>
          <p className="text-xl text-muted mb-12">
            Meet the expert mentors who will guide you on your learning journey
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seedData.mentors.map((mentor, idx) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <MentorCard {...mentor} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BinaryHubTeam;
