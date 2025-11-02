import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Freelancer {
  _id: string;
  id?: string;
  name: string;
  title: string;
  skills: string[];
  department: string;
  linkedin: string;
  image?: string;
}

const DigitalServicesServices = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/freelancers`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setFreelancers(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching freelancers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group freelancers by department
  const groupedFreelancers = freelancers.reduce((acc, freelancer) => {
    const dept = freelancer.department || 'Other';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(freelancer);
    return acc;
  }, {} as Record<string, Freelancer[]>);

  // Department order (optional: to control display order)
  const departmentOrder = [
    'Web Development',
    'UI UX Designing',
    'Graphic Designing',
    'Digital Marketing',
    'Amazon',
    'Bookkeeping',
  ];

  const orderedDepartments = departmentOrder.filter(dept => groupedFreelancers[dept]);

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

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading freelancers...</p>
            </div>
          ) : Object.keys(groupedFreelancers).length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">No freelancers available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {orderedDepartments.map((department, idx) => (
                <motion.div
                  key={department}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-brand-orange">
                    {department}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedFreelancers[department].map((freelancer, fIdx) => (
                      <motion.div
                        key={freelancer._id || freelancer.id || fIdx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (idx * 0.1) + (fIdx * 0.05) }}
                        whileHover={{ y: -4 }}
                        className="glass-card p-6 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="w-16 h-16 border-2 border-brand-orange/20">
                            {freelancer.image ? (
                              <AvatarImage
                                src={`${API_URL}${freelancer.image}`}
                                alt={freelancer.name}
                                className="object-cover"
                              />
                            ) : null}
                            <AvatarFallback className="bg-gradient-to-br from-brand-orange to-brand-blue text-white text-xl font-bold">
                              {freelancer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{freelancer.name}</h3>
                            <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {freelancer.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="px-3 py-1 bg-brand-blue/20 text-brand-blue-light rounded-lg text-sm font-medium border-brand-blue/30"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white rounded-xl"
                          onClick={() => window.open(freelancer.linkedin, "_blank", "noopener,noreferrer")}
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
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default DigitalServicesServices;
