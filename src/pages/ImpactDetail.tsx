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

            {/* Blog Post Content Section */}
            <section className="py-20 relative px-4">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-orange/5 blur-[120px]" />
                    <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-brand-blue/5 blur-[100px]" />
                </div>

                <article className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Introduction/Subheading */}
                        <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/80 mb-16 border-l-4 border-brand-orange pl-6 py-2">
                            {impact.details?.fullDescription}
                        </p>
                    </motion.div>

                    {/* The long content interleaved with images */}
                    {impact.details?.longContent.map((paragraph, idx) => (
                        <div key={idx} className="mb-16">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="text-lg md:text-xl leading-loose text-foreground/90 mb-16 tracking-wide"
                            >
                                {paragraph}
                            </motion.p>

                            {/* Interleave an image if available at this index */}
                            {impact.details?.additionalImages && impact.details.additionalImages[idx] && (
                                <motion.figure
                                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="my-16"
                                >
                                    <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 group relative">
                                        <img
                                            src={impact.details.additionalImages[idx]}
                                            alt={`${impact.title} detail ${idx + 1}`}
                                            className="w-full h-auto max-h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    <figcaption className="text-center text-sm text-muted-foreground mt-4 italic">
                                        {impact.title} - Visual Impact {idx + 1}
                                    </figcaption>
                                </motion.figure>
                            )}
                        </div>
                    ))}

                    {/* Leftover Images if any */}
                    {impact.details?.additionalImages && impact.details.additionalImages.length > (impact.details?.longContent.length || 0) && (
                        <motion.div
                            className="grid md:grid-cols-2 gap-6 my-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {impact.details.additionalImages.slice(impact.details?.longContent.length).map((img, idx) => (
                                <figure key={idx} className="rounded-3xl overflow-hidden shadow-xl border border-black/5 dark:border-white/10 group">
                                    <img
                                        src={img}
                                        alt={`${impact.title} additional detail`}
                                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </figure>
                            ))}
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-24 pt-12 border-t border-black/10 dark:border-white/10 text-center"
                    >
                        <Button
                            onClick={() => navigate("/binary-hub")}
                            size="lg"
                            className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-6 text-lg rounded-2xl shadow-glow transition-all"
                        >
                            Explore More Impact Areas
                        </Button>
                    </motion.div>
                </article>
            </section>

            {/* Footer-like space */}
            <div className="h-20" />
        </div>
    );
};

export default ImpactDetail;
