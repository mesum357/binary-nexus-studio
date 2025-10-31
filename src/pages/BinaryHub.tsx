import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import seedData from "@/data/seed.json";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const BinaryHub = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar type="binary-hub" />
      
      <main className="flex-1 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-8 gradient-text">Welcome to Binary Hub</h1>
          
          <div className="glass-card p-8 mb-8">
            <p className="text-xl text-foreground/90 leading-relaxed mb-6">
              Binary Hub is Pakistan's premier technology education and freelance development company. 
              We bridge the gap between aspiring tech professionals and industry demands through 
              comprehensive training programs and real-world project experience.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Our mission is to empower individuals with cutting-edge IT skills, enabling them to 
              thrive in the digital economy as successful freelancers and industry professionals.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Our Chairman</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={seedData.company.chairman.image}
                alt={seedData.company.chairman.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white/10"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{seedData.company.chairman.name}</h3>
                <p className="text-brand-orange font-medium mb-4">Chairman & Founder</p>
                <p className="text-foreground/90 leading-relaxed">
                  {seedData.company.chairman.mission}
                </p>
              </div>
            </div>
          </div>

          {/* Our Branches (Binary Hub) */}
          <section className="py-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text"
            >
              Our Branches
            </motion.h2>

            {/* Stacked cards within content area; each card has its own image slider */}
            <div className="flex flex-col gap-8">
              {seedData.binaryHubBranches?.map((branch) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-white/10 bg-background/60 w-full overflow-hidden">
                    <div className="relative">
                      <Carousel className="px-10">
                        <CarouselContent>
                          {branch.images.map((src: string, idx: number) => (
                            <CarouselItem key={idx}>
                              <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                                <img src={src} alt={branch.name} className="w-full h-full object-cover" />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="border-white/20" />
                        <CarouselNext className="border-white/20" />
                      </Carousel>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{branch.name}</CardTitle>
                      <CardDescription className="text-sm">{branch.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <p className="text-base text-foreground/80">{branch.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Our Impact */}
          <section className="py-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
            >
              Our Impact
            </motion.h2>

            {/* Stacked impact cards; each card has its own image slider */}
            <div className="flex flex-col gap-8">
              {seedData.impacts?.map((imp) => (
                <motion.div
                  key={imp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-white/10 bg-background/60 w-full overflow-hidden">
                    <div className="relative">
                      <Carousel className="px-10">
                        <CarouselContent>
                          {imp.images.map((src: string, idx: number) => (
                            <CarouselItem key={idx}>
                              <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                                <img src={src} alt={imp.title} className="w-full h-full object-cover" />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="border-white/20" />
                        <CarouselNext className="border-white/20" />
                      </Carousel>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{imp.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <p className="text-base text-foreground/80">{imp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default BinaryHub;
