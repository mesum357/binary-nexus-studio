import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import seedData from "@/data/seed.json";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const ImpactDetail = () => {
    const { impactId } = useParams();
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        const current = document.documentElement.classList.contains("dark");
        setIsDark(current);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        setIsDark(next);
    };

    const impact = seedData.impacts.find((imp) => imp.id === impactId);

    if (!impact) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Impact Not Found</h1>
                    <Button onClick={() => navigate("/binary-hub")}>Back to Binary Hub</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate("/binary-hub")}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/15 dark:hover:bg-white/15 text-foreground/80 hover:text-foreground transition-all"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Binary Hub
                    </button>

                    <Button
                        onClick={toggleTheme}
                        variant="outline"
                        size="icon"
                        className="rounded-full border-black/20 dark:border-white/20 w-10 h-10"
                    >
                        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <img
                        src={impact.images[0]}
                        alt={impact.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/60" />
                </motion.div>

                <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-end pb-12">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                            {impact.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow">
                            {impact.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-6 gradient-text">Overview</h2>
                        <p className="text-lg md:text-xl leading-relaxed text-foreground/80 mb-12">
                            {impact.details?.fullDescription}
                        </p>

                        <div className="grid gap-8 mb-20">
                            {impact.details?.longContent.map((paragraph, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ x: idx % 2 === 0 ? -20 : 20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="glass-card p-6 md:p-8"
                                >
                                    <p className="text-lg leading-relaxed">{paragraph}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Image Gallery */}
                        <h2 className="text-3xl font-bold mb-8 gradient-text text-center">Visual Impact</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {impact.details?.additionalImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="relative group overflow-hidden rounded-3xl aspect-video shadow-xl"
                                >
                                    <img
                                        src={img}
                                        alt={`${impact.title} detail ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-20 text-center"
                    >
                        <Button
                            onClick={() => navigate("/binary-hub")}
                            size="lg"
                            className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-6 text-lg rounded-2xl shadow-glow transition-all"
                        >
                            Explore More Impact Areas
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Footer-like space */}
            <div className="h-20" />
        </div>
    );
};

export default ImpactDetail;
