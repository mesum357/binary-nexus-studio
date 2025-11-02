import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Cloud, 
  Database, 
  Smartphone, 
  Globe, 
  Shield, 
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ConsultancyServices = () => {
  const services = [
    {
      id: "custom-software",
      title: "Custom Software Development",
      description: "Build tailored software solutions that align with your business objectives and scale with your growth.",
      icon: Code,
      features: [
        "Web Applications",
        "Mobile Apps (iOS & Android)",
        "Desktop Solutions",
        "API Development",
        "Legacy System Modernization"
      ],
      color: "text-blue-500"
    },
    {
      id: "cloud-solutions",
      title: "Cloud Solutions & Migration",
      description: "Leverage cloud infrastructure for enhanced scalability, security, and cost efficiency.",
      icon: Cloud,
      features: [
        "Cloud Architecture Design",
        "AWS/Azure/GCP Migration",
        "Cloud Security & Compliance",
        "DevOps & CI/CD Setup",
        "Cost Optimization"
      ],
      color: "text-cyan-500"
    },
    {
      id: "data-analytics",
      title: "Data Analytics & Business Intelligence",
      description: "Transform raw data into actionable insights that drive informed decision-making.",
      icon: Database,
      features: [
        "Data Warehousing",
        "BI Dashboard Development",
        "Predictive Analytics",
        "Data Visualization",
        "ETL Pipeline Design"
      ],
      color: "text-purple-500"
    },
    {
      id: "digital-transformation",
      title: "Digital Transformation Strategy",
      description: "Navigate your organization's digital journey with comprehensive strategy and implementation support.",
      icon: TrendingUp,
      features: [
        "Digital Strategy Consulting",
        "Process Automation",
        "Digital Workflow Optimization",
        "Change Management",
        "Technology Roadmap Planning"
      ],
      color: "text-green-500"
    },
    {
      id: "enterprise-integration",
      title: "Enterprise System Integration",
      description: "Seamlessly connect disparate systems to create unified, efficient workflows.",
      icon: Globe,
      features: [
        "System Integration",
        "API Development",
        "Middleware Solutions",
        "ERP/CRM Integration",
        "Third-party Integrations"
      ],
      color: "text-orange-500"
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity & Compliance",
      description: "Protect your digital assets with robust security measures and compliance frameworks.",
      icon: Shield,
      features: [
        "Security Audits",
        "Vulnerability Assessment",
        "Compliance Consulting (GDPR, ISO)",
        "Security Training",
        "Incident Response Planning"
      ],
      color: "text-red-500"
    }
  ];

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="consultancy" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 gradient-text">Our Services</h1>
            <p className="text-xl text-muted mb-4">
              Comprehensive IT solutions and strategic consulting for businesses of all sizes
            </p>
            <p className="text-lg text-foreground/80">
              We help organizations leverage technology to achieve their business goals through expert consultation, 
              custom development, and proven methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="glass-card h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color}/20 ${service.color}/10`}>
                          <Icon className={`h-8 w-8 ${service.color}`} />
                        </div>
                      </div>
                      <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, featureIdx) => (
                          <div key={featureIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm text-foreground/90">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto pt-4 border-t">
                        <Button 
                          variant="outline" 
                          className="w-full group"
                          onClick={() => {
                            window.location.href = "mailto:consultancy@binaryhub.pk?subject=Inquiry: " + service.title;
                          }}
                        >
                          Get a Quote
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12"
          >
            <Card className="glass-card p-8 text-center">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Ready to Transform Your Business?</h2>
              <p className="text-lg text-muted mb-6">
                Let's discuss how our consultancy services can help you achieve your technology goals.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  className="bg-brand-orange hover:bg-brand-orange-hover rounded-xl"
                  onClick={() => window.location.href = "mailto:consultancy@binaryhub.pk"}
                >
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-white/20"
                  onClick={() => window.location.href = "tel:+92-21-3586-2100"}
                >
                  Call Us: +92-21-3586-2100
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ConsultancyServices;

