import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { CourseCard } from "@/components/CourseCard";
import { MentorCard } from "@/components/MentorCard";
import { motion } from "framer-motion";
import seedData from "@/data/seed.json";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Mentor {
  _id: string;
  id?: string;
  name: string;
  department: string;
  linkedin: string;
  image?: string;
}

const DigitalServicesCourses = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/mentors`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMentors(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group mentors by department
  const groupedMentors = mentors.reduce((acc, mentor) => {
    const dept = mentor.department || 'Other';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(mentor);
    return acc;
  }, {} as Record<string, Mentor[]>);

  // Department order (optional: to control display order)
  const departmentOrder = [
    'Web Development',
    'UI UX Designing',
    'Graphic Designing',
    'Digital Marketing',
    'Amazon',
    'Bookkeeping',
  ];

  const orderedDepartments = departmentOrder.filter(dept => groupedMentors[dept]);

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
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading mentors...</p>
            </div>
          ) : Object.keys(groupedMentors).length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">No mentors available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {orderedDepartments.map((department, idx) => (
                <div key={department}>
                  <h2 className="text-3xl font-bold mb-6 gradient-text">
                    {department} Mentors
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {groupedMentors[department].map((mentor, mentorIdx) => {
                      // Use department as title for MentorCard
                      const imageUrl = mentor.image 
                        ? `${API_URL}${mentor.image}` 
                        : '/placeholder.svg';
                      
                      return (
                        <MentorCard
                          key={mentor._id || mentor.id || mentorIdx}
                          name={mentor.name}
                          title="" // No separate title field in mentor model
                          department={mentor.department}
                          image={imageUrl}
                          linkedin={mentor.linkedin}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default DigitalServicesCourses;
