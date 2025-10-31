import { AppSidebar } from "@/components/AppSidebar";
import { CourseCard } from "@/components/CourseCard";
import { MentorCard } from "@/components/MentorCard";
import { motion } from "framer-motion";
import seedData from "@/data/seed.json";

const DigitalServicesCourses = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="digital-services" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Our Courses</h1>
          <p className="text-xl text-muted mb-12">
            Industry-leading programs designed to launch your tech career
          </p>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {seedData.courses.map((course, idx) => (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>

          {/* Mentors by Department */}
          <div className="space-y-12">
            {Object.entries(
              seedData.mentors.reduce((acc, mentor) => {
                if (!acc[mentor.department]) acc[mentor.department] = [];
                acc[mentor.department].push(mentor);
                return acc;
              }, {} as Record<string, typeof seedData.mentors>)
            ).map(([department, mentors]) => (
              <div key={department}>
                <h2 className="text-3xl font-bold mb-6 gradient-text">
                  {department} Mentors
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} {...mentor} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DigitalServicesCourses;
