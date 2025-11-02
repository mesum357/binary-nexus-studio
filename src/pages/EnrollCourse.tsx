import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import seedData from "@/data/seed.json";

const EnrollCourse = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [showRenewalForm, setShowRenewalForm] = useState(false);
  const [existingEnrollment, setExistingEnrollment] = useState<{
    status: string;
    expired?: boolean;
    expirationDate?: string;
  } | null>(null);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to enroll in courses");
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName,
        email: user.email,
      }));
    }
  }, [user]);

  // Check for existing enrollment
  useEffect(() => {
    const checkExistingEnrollment = async () => {
      if (!user || !courseSlug) {
        setCheckingEnrollment(false);
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/enrollments/my-courses`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Find enrollment for this course
            const enrollment = data.data.find(
              (e: any) => e.course.slug === courseSlug
            );

            if (enrollment) {
              setExistingEnrollment({
                status: enrollment.status,
                expired: enrollment.expired,
                expirationDate: enrollment.expirationDate,
              });
            }
          }
        }
      } catch (error) {
        console.error('Error checking existing enrollment:', error);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    if (user && courseSlug) {
      checkExistingEnrollment();
    } else {
      setCheckingEnrollment(false);
    }
  }, [user, courseSlug]);
  
  const course = seedData.courses.find((c) => c.slug === courseSlug);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    paymentMethod: "",
    paymentScreenshot: null as File | null,
    consentToContact: false,
  });

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

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    if (!formData.paymentScreenshot) {
      newErrors.paymentScreenshot = "Please upload payment screenshot";
    }

    if (formData.paymentScreenshot && formData.paymentScreenshot.size > 5 * 1024 * 1024) {
      newErrors.paymentScreenshot = "Screenshot must be less than 5MB";
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (formData.paymentScreenshot && !allowedTypes.includes(formData.paymentScreenshot.type)) {
      newErrors.paymentScreenshot = "Please upload an image file (JPG, PNG, or WEBP)";
    }

    if (!formData.consentToContact) {
      newErrors.consentToContact = "You must consent to be contacted";
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

    if (!user) {
      toast.error("Please sign in to enroll");
      navigate("/signin");
      return;
    }

    setIsSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const formDataToSend = new FormData();
      formDataToSend.append('courseSlug', courseSlug || '');
      formDataToSend.append('courseTitle', course?.title || '');
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      if (formData.phone) {
        formDataToSend.append('phone', formData.phone);
      }
      formDataToSend.append('paymentMethod', formData.paymentMethod);
      if (formData.message) {
        formDataToSend.append('message', formData.message);
      }
      if (formData.paymentScreenshot) {
        formDataToSend.append('screenshot', formData.paymentScreenshot);
      }

      const response = await fetch(`${API_URL}/api/enrollments`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        toast.success("Enrollment submitted successfully!");
      } else {
        toast.error(result.message || "Failed to submit enrollment");
      }
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      toast.error("Failed to submit enrollment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking auth or enrollment
  if (loading || checkingEnrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

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

  // Check if user already has an enrollment
  if (existingEnrollment) {
    if (existingEnrollment.status === 'approved' && !existingEnrollment.expired) {
      const expirationDate = existingEnrollment.expirationDate
        ? new Date(existingEnrollment.expirationDate)
        : null;
      const daysRemaining = expirationDate
        ? Math.ceil((expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : null;

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-12 text-center max-w-2xl"
          >
            <h1 className="text-4xl font-bold mb-4 gradient-text">Already Enrolled</h1>
            <p className="text-xl text-foreground/90 mb-6">
              You already have an active enrollment for <strong>{course.title}</strong>.
            </p>
            {expirationDate && daysRemaining !== null && daysRemaining > 0 && (
              <p className="text-lg text-muted-foreground mb-6">
                Your enrollment expires on {expirationDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })} ({daysRemaining} days remaining).
              </p>
            )}
            <p className="text-lg text-muted-foreground mb-8">
              Please wait until your current enrollment expires before re-enrolling in this course.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/my-courses")}
                className="bg-brand-orange hover:bg-brand-orange-hover rounded-xl"
              >
                View My Courses
              </Button>
              <Button
                onClick={() => navigate("/digital-services/courses")}
                variant="outline"
                className="rounded-xl border-white/20"
              >
                Browse Other Courses
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    // Show renewal option for expired courses
    if (existingEnrollment.status === 'approved' && existingEnrollment.expired && !showRenewalForm) {
      const expirationDate = existingEnrollment.expirationDate
        ? new Date(existingEnrollment.expirationDate)
        : null;

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-12 text-center max-w-2xl"
          >
            <h1 className="text-4xl font-bold mb-4 gradient-text">Renew Course</h1>
            <p className="text-xl text-foreground/90 mb-6">
              Your enrollment for <strong>{course.title}</strong> has expired.
            </p>
            {expirationDate && (
              <p className="text-lg text-muted-foreground mb-6">
                Your enrollment expired on {expirationDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}.
              </p>
            )}
            <p className="text-lg text-muted-foreground mb-8">
              Would you like to renew your enrollment for this course?
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setShowRenewalForm(true)}
                className="bg-brand-orange hover:bg-brand-orange-hover rounded-xl"
              >
                Renew Course
              </Button>
              <Button
                onClick={() => navigate("/my-courses")}
                variant="outline"
                className="rounded-xl border-white/20"
              >
                View My Courses
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    if (existingEnrollment.status === 'pending') {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-12 text-center max-w-2xl"
          >
            <h1 className="text-4xl font-bold mb-4 gradient-text">Pending Enrollment</h1>
            <p className="text-xl text-foreground/90 mb-8">
              You already have a pending enrollment request for <strong>{course.title}</strong>.
              <br />
              Please wait for our team to review your request.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/my-courses")}
                className="bg-brand-orange hover:bg-brand-orange-hover rounded-xl"
              >
                View My Courses
              </Button>
              <Button
                onClick={() => navigate("/digital-services/courses")}
                variant="outline"
                className="rounded-xl border-white/20"
              >
                Browse Other Courses
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">Enrollment Submitted!</h1>
          <p className="text-xl text-foreground/90 mb-8">
            Thank you for enrolling in <strong>{course.title}</strong>. 
            Our team will verify your payment and contact you within 24-48 hours.
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

          <h1 className="text-5xl font-bold mb-4 gradient-text">
            {existingEnrollment?.status === 'approved' && existingEnrollment?.expired 
              ? `Renew ${course.title}` 
              : `Enroll in ${course.title}`}
          </h1>
          <p className="text-xl text-muted mb-8">
            {existingEnrollment?.status === 'approved' && existingEnrollment?.expired
              ? `Renew your enrollment for ${course.title}. Please submit your payment details below.`
              : course.summary}
          </p>

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

              {/* Payment Details Info Box */}
              <div className="glass-card p-6 mt-6 sticky top-96">
                <h3 className="text-2xl font-bold mb-4">Payment Details</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold mb-2">Easy Paisa:</p>
                    <p className="text-muted">Account: 0312-1234567</p>
                    <p className="text-muted">Name: Binary Hub</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Bank Account:</p>
                    <p className="text-muted">Bank: Allied Bank</p>
                    <p className="text-muted">Account: 1234-5678901-2</p>
                    <p className="text-muted">IBAN: PK12ALDO1234567890123456</p>
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

                {/* Payment Method Selection */}
                <div>
                  <Label className="mb-3 block">Payment Method *</Label>
                  <RadioGroup 
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10">
                      <RadioGroupItem value="easypaisa" id="easypaisa" />
                      <Label htmlFor="easypaisa" className="cursor-pointer font-normal">Easy Paisa</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="cursor-pointer font-normal">Bank Transfer</Label>
                    </div>
                  </RadioGroup>
                  {errors.paymentMethod && <p className="text-destructive text-sm mt-1">{errors.paymentMethod}</p>}
                </div>

                <div>
                  <Label htmlFor="paymentScreenshot">Upload Payment Screenshot *</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="paymentScreenshot"
                      className="flex items-center justify-center gap-2 glass-card p-4 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
                    >
                      <Upload className="h-5 w-5" />
                      <span>
                        {formData.paymentScreenshot 
                          ? formData.paymentScreenshot.name 
                          : "Upload Screenshot (JPG, PNG, or WEBP)"}
                      </span>
                      <input
                        id="paymentScreenshot"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={(e) => setFormData({ ...formData, paymentScreenshot: e.target.files?.[0] || null })}
                        className="hidden"
                      />
                    </label>
                    {errors.paymentScreenshot && <p className="text-destructive text-sm mt-1">{errors.paymentScreenshot}</p>}
                  </div>
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
                  {isSubmitting 
                    ? (existingEnrollment?.status === 'approved' && existingEnrollment?.expired ? "Renewing..." : "Submitting...")
                    : (existingEnrollment?.status === 'approved' && existingEnrollment?.expired ? "Renew Enrollment" : "Submit Enrollment")
                  }
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
