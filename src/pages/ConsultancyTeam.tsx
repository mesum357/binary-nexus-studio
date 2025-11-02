import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConsultancyTeam = () => {
  const founder = {
    name: "Tehseen Abbas",
    title: "Founder and CEO",
    description: "Tehseen Abbas is the visionary Founder and CEO of Binary Hub, leading the organization with a profound commitment to empowering individuals and communities through innovative technology education and strategic consulting. With extensive experience in IT education and enterprise solutions, Tehseen has established Binary Hub as a premier institution that bridges the gap between academic learning and practical industry skills. Under his leadership, Binary Hub has transformed countless careers through comprehensive training programs, digital services, and consultancy solutions. His mission-driven approach focuses on enabling freelancers, students, and businesses to leverage cutting-edge technology for sustainable growth and development. Tehseen's expertise spans technology education, digital transformation, and strategic business consulting, making him a respected leader in the technology and education sectors.",
    image: "/images/consultancy/tehseensir.jpg"
  };

  const coreTeam = [
    {
      name: "Abid Hussain",
      title: "Researcher",
      description: "Abid Hussain is a researcher with a focus on economics and development, currently pursuing a Ph.D. to explore the socio-economic and cultural determinants of multidimensional energy poverty and its impact on well-being in Gilgit-Baltistan, Pakistan. His research experience is highlighted by his role as a Research Associate on the 'CPEC-Tourism-Economic Development Nexus' project, where he investigated the use of tourism as an indigenous tool for economic development. He has also contributed to research projects with the State Bank of Pakistan, focusing on knowledge, attitudes, and practices of Islamic finance, and with the United Nations Development Programme, studying local governance audit and planning.",
      image: "/images/consultancy/abidhussain.jpg"
    },
    {
      name: "Alina",
      title: "Researcher",
      description: "As an Economics Graduate, Ms. Alina possesses a solid research foundation built through academic training and reinforced by practical field experience. Her academic pursuits equipped her with strong analytical skills and a sound understanding of research methodologies. She has directly applied these skills by contributing to multiple funded research surveys for major organizations, including UNDP, AKRSP, and the GLOF-II project. This involvement provided her with hands-on experience in the entire research data cycle—from survey design and field data collection to data processing and analysis on critical issues like rural livelihoods and climate resilience. Alina's background demonstrates a developing yet practical research skillset, ready to be leveraged in professional economic research roles.",
      image: "/images/consultancy/alina.jpg"
    },
    {
      name: "Marifa Ali",
      title: "Economics & Finance Management",
      description: "Marifa Ali, an Economics & Finance Management student, demonstrates a keen interest in research through her academic pursuits and training. She is currently pursuing a Bachelor's Degree in Economics and has successfully completed a student mobility program in Banking and Finance. Her engagement in the 'Two Days of Workshop in Applied Economics Using Qualitative Research Techniques at KIU' and a 'Five-Day Workshop on Applied Economics' highlights her proactive approach to learning and developing research skills. These experiences likely provided her with exposure to research methodologies and data analysis techniques, equipping her with a foundation for future research endeavors in her field. While the CV doesn't detail specific research projects, her academic background and workshop participation suggest a developing research skillset.",
      image: "/images/consultancy/marifali.jpg"
    },
    {
      name: "Kifayat Ullah",
      title: "Department of Economics",
      description: "Dr. Kifayat Ullah is a Faculty Member at the Department of Economics, Karakoram International University, Gilgit-Baltistan, Pakistan. With a PhD in Economics and an MS in Rural Development (with Distinction), his research focuses on development economics, environmental sustainability, rural development, and finance. He is a prolific researcher with numerous publications in high-impact international journals, exploring themes such as low-carbon economies, climate change impacts, financial inclusion, and the socio-economic development of mountain regions. Dr. Ullah has also led and contributed to significant research projects funded by organizations like UNDP and PIDE.",
      image: "/images/consultancy/kifayat.jpg"
    },
    {
      name: "Dr. Muhammad Tariq",
      title: "Economist and Researcher",
      description: "Dr. Muhammad Tariq is a distinguished economist and researcher who earned his PhD in Applied Economics from the prestigious Southeast University in Nanjing, China. With a robust academic foundation, he has established a prolific research career, authoring numerous publications in both reputed national and international peer-reviewed journals. His scholarly work demonstrates a consistent ability to address complex economic issues with rigor and insight. Further solidifying his expertise, Dr. Tariq has a proven track record of securing and successfully executing multiple research grants and funded projects from a diverse portfolio of national and international organizations. This unique combination of academic excellence and hands-on project leadership makes him a valuable asset for delivering evidence-based solutions and driving impactful research initiatives.",
      image: "/images/consultancy/tariq.jpg"
    },
    {
      name: "Dr. Shah Abbas",
      title: "Data Scientist",
      description: "Dr. Shah Abbas is a data scientist and policy analyst with a PhD in Economics from the School of Economics, Zhongnan University of Economics and Law, Wuhan, China. He has over five years of national and international experience in data handling, quantitative research, and policy analysis. Dr. Abbas completed his postdoctoral research from the School of Economics and Management, China University of Geosciences, Wuhan, China, where he further honed his expertise in data modeling, econometrics, and applied economic analysis. Dr. Abbas specializes in leveraging data to inform public policy, particularly in the areas of economic development, environmental economics, climate change, and technological innovation. He has successfully secured and managed several high-profile research projects, including the National Social Sciences Foundation and the National Natural Science Foundation of China Projects.",
      image: "/images/consultancy/shahabbas2.jpg"
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
          className="space-y-12"
        >
          {/* Page Header */}
          <div>
            <h1 className="text-5xl font-bold mb-4 gradient-text">Our Team</h1>
            <p className="text-xl text-muted">
              Meet the expert consultants and researchers who drive Binary Consultancy Services
            </p>
          </div>

          {/* Founder and CEO Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Founder and CEO</h2>
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <Avatar className="w-48 h-48 border-4 border-white/20">
                      <AvatarImage src={founder.image} alt={founder.name} />
                      <AvatarFallback className="text-3xl">
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <Badge className="bg-brand-orange text-white mb-3">
                        {founder.title}
                      </Badge>
                      <CardTitle className="text-3xl mb-3">{founder.name}</CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed text-foreground/90">
                      {founder.description}
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Core Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Core Team</h2>
            <div className="space-y-6">
              {coreTeam.map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <Card className="glass-card hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Side: Image, Name, Title */}
                        <div className="flex-shrink-0 md:w-48">
                          <div className="space-y-4">
                            <Avatar className="w-32 h-32 md:w-full md:h-48 border-2 border-white/20 mx-auto md:mx-0">
                              <AvatarImage src={member.image} alt={member.name} />
                              <AvatarFallback className="text-xl">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-center md:text-left">
                              <CardTitle className="text-xl mb-2">{member.name}</CardTitle>
                              <Badge variant="outline" className="text-sm">
                                {member.title}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Right Side: Description */}
                        <div className="flex-1 flex items-start">
                          <CardDescription className="text-base leading-relaxed text-foreground/90">
                            {member.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ConsultancyTeam;
