import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock, DollarSign } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import seedData from "@/data/seed.json";

const DigitalServicesInternships = () => {
  const { currentOpenings, programs } = seedData.internships;

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="digital-services" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Internship Programs</h1>
          <p className="text-xl text-muted mb-8">
            Gain real-world experience and kickstart your tech career
          </p>

          {currentOpenings === 0 ? (
            <Alert className="mb-8 border-brand-orange/30 bg-brand-orange/10">
              <AlertCircle className="h-5 w-5 text-brand-orange" />
              <AlertDescription className="text-lg">
                <strong className="text-brand-orange">Currently no internships available.</strong> 
                <br />
                Please check back later or contact us to express your interest in future opportunities.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="mb-8 border-brand-blue/30 bg-brand-blue/10">
              <CheckCircle2 className="h-5 w-5 text-brand-blue" />
              <AlertDescription className="text-lg">
                <strong className="text-brand-blue">{currentOpenings} internship position{currentOpenings > 1 ? 's' : ''} available!</strong>
              </AlertDescription>
            </Alert>
          )}

          {/* About Internships */}
          <div className="glass-card p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">About Our Internships</h2>
            <p className="text-lg text-foreground/90 leading-relaxed mb-4">
              Binary Hub's internship programs are designed to bridge the gap between academic learning 
              and industry practice. Interns work on real client projects alongside experienced mentors, 
              gaining hands-on experience in modern development workflows.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Upon successful completion, interns receive certificates and may be considered for 
              freelance opportunities within our network.
            </p>
          </div>

          {/* Internship Programs */}
          <h2 className="text-3xl font-bold mb-6 gradient-text">Available Programs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-muted">
                    <Clock className="h-5 w-5" />
                    <span>Duration: {program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted">
                    <DollarSign className="h-5 w-5" />
                    <span>Stipend: {program.stipend}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-2 text-brand-orange">Eligibility Criteria:</h4>
                  <ul className="space-y-1">
                    {program.criteria.map((criterion, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-foreground/90">
                        <CheckCircle2 className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {currentOpenings > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-muted">
                      To apply, please contact us through our main office or send your CV to 
                      <span className="text-brand-blue font-medium"> careers@binaryhub.pk</span>
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DigitalServicesInternships;
