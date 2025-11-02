import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface TeamMember {
  _id: string;
  id?: string;
  name: string;
  designation: string;
  linkedin: string;
  team: string;
}

const DigitalServicesTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/team-members?team=binary-digital`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTeamMembers(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="digital-services" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Our Team</h1>
          <p className="text-xl text-muted mb-12">
            Meet the talented team members who drive Binary Digital Service
          </p>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">No team members found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={member._id || member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <TeamMemberCard
                    name={member.name}
                    designation={member.designation}
                    linkedin={member.linkedin}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default DigitalServicesTeam;

