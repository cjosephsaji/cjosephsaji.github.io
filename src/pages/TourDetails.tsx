import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, CheckCircle2, Calendar, ShieldCheck, Heart, Share2 } from "lucide-react";
import { expeditions } from "@/data/expeditions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";

const TourDetails = () => {
    const { id } = useParams();
    const tour = expeditions.find((e) => e.id === id);

    if (!tour) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="font-serif text-4xl mb-4">Tour Not Found</h1>
                    <Link to="/" className="text-primary hover:underline">Return to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar forceScrolled={true} />

            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ProgressiveImage
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                </div>

                <div className="relative z-10 safari-container h-full flex flex-col justify-end pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-2 text-white/90 font-sans text-sm font-bold uppercase tracking-widest mb-4">
                            <MapPin size={16} className="text-accent" />
                            {tour.location}
                        </div>
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl">
                            {tour.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-sans text-sm font-bold shadow-lg">
                                <Clock size={16} /> {tour.duration}
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-sans text-sm font-bold shadow-lg">
                                <ShieldCheck size={16} /> Certified Eco-Tour
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 safari-section relative pt-12">
                <div className="safari-container grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="font-serif text-3xl font-bold border-b border-border pb-4">Experience Overview</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {tour.description || "This meticulously crafted journey takes you deep into the heart of Africa's most iconic landscapes. Every detail has been considered to ensure an unforgettable experience, combining luxury accommodation with authentic wilderness encounters."}
                            </p>

                            {tour.highlights && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                    {tour.highlights.map((highlight, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10 transition-colors hover:bg-primary/10">
                                            <CheckCircle2 size={20} className="text-accent mt-0.5 shrink-0" />
                                            <span className="font-sans font-semibold text-foreground/90">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Itinerary */}
                        {tour.itinerary && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between border-b border-border pb-4">
                                    <h2 className="font-serif text-3xl font-bold">Planned Journey</h2>
                                    <span className="text-sm font-sans font-bold text-accent uppercase tracking-widest">{tour.duration} Route</span>
                                </div>

                                <div className="space-y-10 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-border/50">
                                    {tour.itinerary.map((item, i) => (
                                        <div key={i} className="relative pl-12 group">
                                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-xs text-primary z-10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                {item.day}
                                            </div>
                                            <h4 className="font-serif text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Gallery Placeholder */}
                        <div className="space-y-6 pt-12">
                            <h2 className="font-serif text-3xl font-bold border-b border-border pb-4">Visual Journey</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted group">
                                    <ProgressiveImage src={tour.image} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted group">
                                    <ProgressiveImage src="https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg" alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted group hidden md:block">
                                    <ProgressiveImage src="https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg" alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-card p-8 rounded-3xl border border-border shadow-safari flex flex-col gap-6"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-sans text-sm font-bold text-muted-foreground uppercase tracking-widest">Pricing From</span>
                                    <span className="bg-accent/10 px-3 py-1 rounded-md text-[10px] font-bold text-accent uppercase tracking-tighter">
                                        {tour.budgetTier}
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <span className="font-serif text-4xl font-black text-foreground">{tour.price}</span>
                                    <span className="text-muted-foreground font-sans text-sm">/ person</span>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                                        <Calendar size={18} className="text-accent" />
                                        Available: June - October 2026
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                                        <UsersIcon size={18} className="text-accent" />
                                        Group Size: Max 6 Guests
                                    </div>
                                </div>

                                <Link
                                    to="/book"
                                    state={{ destinationId: tour.id }}
                                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-center font-sans font-bold text-base shadow-safari-accent hover:opacity-90 transition-opacity mt-4 active:scale-95"
                                >
                                    Book This Expedition
                                </Link>

                                <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                                    <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                                        <Heart size={14} /> Wishlist
                                    </button>
                                    <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                                        <Share2 size={14} /> Share Experience
                                    </button>
                                </div>
                            </motion.div>

                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h5 className="font-serif font-bold text-sm">Safari Protection</h5>
                                    <p className="font-sans text-[11px] text-muted-foreground">Comprehensive travel insurance included with all premium bookings.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const UsersIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export default TourDetails;
