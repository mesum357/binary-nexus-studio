import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, Phone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceChatBoxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceTitle: string;
  serviceId: string;
}

export const ServiceChatBox = ({
  open,
  onOpenChange,
  serviceTitle,
  serviceId,
}: ServiceChatBoxProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - in production, this would send to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create mailto link with the message
    const subject = `Inquiry: ${serviceTitle}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}\n\nService: ${serviceTitle}`;
    const mailtoLink = `mailto:consultancy@binaryhub.pk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitted(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Contact Us</DialogTitle>
              <DialogDescription className="text-base mt-1">
                Inquiry about: <span className="font-semibold text-foreground">{serviceTitle}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground">
              Your email client should open shortly. If not, please email us at{" "}
              <a
                href="mailto:consultancy@binaryhub.pk"
                className="text-brand-orange hover:underline"
              >
                consultancy@binaryhub.pk
              </a>
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 XXX XXXXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us about your project requirements, timeline, and any specific questions you have..."
                rows={6}
                className="resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-brand-orange hover:bg-brand-orange-hover"
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.href = "tel:+92-21-3586-2100"}
                className="flex-1"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Us
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center pt-2">
              By submitting this form, you agree to be contacted by our team regarding your inquiry.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

