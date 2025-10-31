import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import seedData from "@/data/seed.json";

const EnrollCourse = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const course = seedData.courses.find((c) => c.slug === courseSlug);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    branchId: "",
    message: "",
    consentToContact: false,
  });

  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.branchId) {
      newErrors.branchId = "Please select a branch";
    }

    if (!formData.consentToContact) {
      newErrors.consentToContact = "You must consent to be contacted";
    }

    if (resume && resume.size > 5 * 1024 * 1024) {
      newErrors.resume = "Resume must be less than 5MB";
    }

    if (resume && resume.type !== "application/pdf") {
      newErrors.resume = "Resume must be a PDF file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Enrollment data:", { ...formData, courseSlug, resume: resume?.name });
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Enrollment submitted successfully!");
    }, 1500);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate("/digital-services/courses")}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-12 text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">Enrollment Successful!</h1>
          <p className="text-xl text-foreground/90 mb-8">
            Thank you for enrolling in <strong>{course.title}</strong>. 
            Our team will contact you within 2-3 business days with further details.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/digital-services/courses")}
              className="bg-brand-orange hover:bg-brand-orange-hover rounded-xl"
            >
              Browse More Courses
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="rounded-xl border-white/20"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="digital-services" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/digital-services/courses")}
            className="mb-6 hover:bg-white/5 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          <h1 className="text-5xl font-bold mb-4 gradient-text">Enroll in {course.title}</h1>
          <p className="text-xl text-muted mb-8">{course.summary}</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-8">
                <h3 className="text-2xl font-bold mb-4">Course Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted">Duration</p>
                    <p className="text-lg font-semibold">{course.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">Price</p>
                    <p className="text-2xl font-bold gradient-text">{course.price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrollment Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-2 bg-white/5 border-white/10 rounded-xl"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 bg-white/5 border-white/10 rounded-xl"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 bg-white/5 border-white/10 rounded-xl"
                    placeholder="+92-XXX-XXXXXXX"
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="branch">Preferred Branch *</Label>
                  <Select value={formData.branchId} onValueChange={(value) => setFormData({ ...formData, branchId: value })}>
                    <SelectTrigger className="mt-2 bg-white/5 border-white/10 rounded-xl">
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {seedData.branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.branchId && <p className="text-destructive text-sm mt-1">{errors.branchId}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Additional Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 bg-white/5 border-white/10 rounded-xl min-h-24"
                    placeholder="Tell us about your background or any questions..."
                  />
                </div>

                <div>
                  <Label htmlFor="resume">Resume (Optional, PDF only, max 5MB)</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="resume"
                      className="flex items-center justify-center gap-2 glass-card p-4 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
                    >
                      <Upload className="h-5 w-5" />
                      <span>{resume ? resume.name : "Upload Resume"}</span>
                      <input
                        id="resume"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    {errors.resume && <p className="text-destructive text-sm mt-1">{errors.resume}</p>}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consentToContact}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, consentToContact: checked as boolean })
                    }
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                    I consent to Binary Hub contacting me via email or phone regarding my enrollment *
                  </Label>
                </div>
                {errors.consentToContact && (
                  <p className="text-destructive text-sm">{errors.consentToContact}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary text-white py-6 text-lg rounded-xl shadow-glow hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? "Submitting..." : "Submit Enrollment"}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default EnrollCourse;
