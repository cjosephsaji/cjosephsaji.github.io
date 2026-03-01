import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-safari.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="African safari landscape at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 safari-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="safari-label text-primary-foreground/80 mb-6"
          >
            Curated African Expeditions
          </motion.p>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Where the Wild
            <br />
            <span className="italic font-medium">Meets the Soul</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-primary-foreground/80 font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Handcrafted safari experiences through Africa's most extraordinary
            landscapes. Expert guides. Iconic lodges. Unforgettable moments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#expeditions" className="btn-hero-primary inline-flex items-center gap-2 group">
              Explore Journeys
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <Link to="/book" className="btn-hero-secondary inline-flex items-center gap-2">
              <Compass size={18} />
              Design My Safari
            </Link>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-6 text-primary-foreground/60 font-sans text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-accent">★★★★★</span>
              <span>4.9 Google Rating</span>
            </div>
            <div className="w-px h-4 bg-primary-foreground/20" />
            <span>Trusted by 12,000+ travelers</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
