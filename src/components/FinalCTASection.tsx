import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="safari-section bg-primary text-primary-foreground">
      <div className="safari-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <p className="safari-label text-accent mb-4">Begin Your Journey</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-6">
            Your African Adventure
            <br />
            <span className="italic font-medium">Starts Here</span>
          </h2>
          <p className="font-sans text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Let our experts design a bespoke safari tailored to your dreams.
            No commitment required — just a conversation to start.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-sans font-semibold text-base transition-all duration-200 hover:opacity-90 hover:shadow-safari-gold group"
            >
              Start Planning
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-primary-foreground/50 font-sans text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>Free Cancellation</span>
            </div>
            <div className="w-px h-4 bg-primary-foreground/20" />
            <span>Secure Payment</span>
            <div className="w-px h-4 bg-primary-foreground/20" />
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
