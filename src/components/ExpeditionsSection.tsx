import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, MapPin, Clock, GitCompareArrows, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import FindSafariModal from "@/components/FindSafariModal";
import CompareModal from "@/components/CompareModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InteractiveMap } from "./InteractiveMap";
import { ProgressiveImage } from "./ui/ProgressiveImage";

import { expeditions, Expedition } from "@/data/expeditions";

// Data now imported from @/data/expeditions

const ExpeditionsSection = () => {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [recommended, setRecommended] = useState<string[]>([]);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bloomY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bloomY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const compareItems = expeditions.filter((e) => compareIds.includes(e.id));

  return (
    <>
      <section
        id="expeditions"
        ref={sectionRef}
        className="safari-section bg-background topo-pattern relative overflow-hidden"
      >
        {/* Light Leak Layer */}
        <div className="light-leak top-0 left-0 w-full h-[800px] opacity-40 translate-x-[-20%] translate-y-[-20%]" />

        {/* Cinematic Bloom Background Accent */}
        <motion.div
          style={{ y: bloomY1 }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-bloom-gold -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-60" />
        <motion.div
          style={{ y: bloomY2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bloom-forest translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-30" />

        <div className="safari-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="safari-label mb-4">Featured Experiences</p>
            <h2 className="safari-heading text-3xl md:text-5xl font-bold mb-4">
              Curated Expeditions
            </h2>
            <p className="safari-subheading mx-auto">
              Each journey is meticulously crafted by our expert team — from game drives
              at dawn to starlit dinners under the African sky.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setQuizOpen(true)}
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary border border-primary/30 rounded-full px-5 py-2.5 hover:bg-primary/5 transition-colors"
              >
                <Sparkles size={16} />
                Find My Perfect Safari
              </button>
              {compareIds.length >= 2 && (
                <button
                  onClick={() => setCompareOpen(true)}
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent border border-accent/30 rounded-full px-5 py-2.5 hover:bg-accent/5 transition-colors"
                >
                  <GitCompareArrows size={16} />
                  Compare ({compareIds.length})
                </button>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {expeditions.map((exp, i) => (
              <ExpeditionCard
                key={exp.title}
                expedition={exp}
                index={i}
                isComparing={compareIds.includes(exp.id)}
                onToggleCompare={() => toggleCompare(exp.id)}
                isRecommended={recommended.length > 0 && recommended[0] === exp.id}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mt-16"
          >
            <h3 className="font-serif text-3xl font-bold text-center mb-8">
              Explore Across the Continent
            </h3>
            <InteractiveMap />
          </motion.div>
        </div>
      </section>

      <FindSafariModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        onResult={(r) => setRecommended(r)}
      />
      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        items={compareItems}
      />
    </>
  );
};

// Interface now imported from @/data/expeditions

const ExpeditionCard = ({
  expedition,
  index,
  isComparing,
  onToggleCompare,
  isRecommended,
}: {
  expedition: Expedition;
  index: number;
  isComparing: boolean;
  onToggleCompare: () => void;
  isRecommended: boolean;
}) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {isRecommended && (
        <div className="absolute -top-3 left-4 z-10 flex items-center gap-1 bg-accent text-accent-foreground text-xs font-sans font-semibold px-4 py-1.5 rounded-full shadow-lg border border-accent/20">
          <Sparkles size={12} /> Top Pick For You
        </div>
      )}

      <Link
        to={`/tour/${expedition.id}`}
        className={`block safari-card group cursor-pointer ${isRecommended ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""
          }`}
      >
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
          <ProgressiveImage
            src={expedition.image}
            alt={expedition.title}
            className="transition-transform duration-700 group-hover:scale-[1.08]"
            placeholderColor="bg-muted"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />

          {/* Top Left: Duration Pill */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/30 border border-white/20 backdrop-blur-md text-white text-xs font-sans font-medium px-3 py-1.5 rounded-full shadow-lg">
            <Clock size={12} className="text-white/80" />
            {expedition.duration}
          </div>

          {/* Top Right Actions Pill */}
          <TooltipProvider delayDuration={200}>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/20 border border-white/10 backdrop-blur-md p-1 rounded-full shadow-lg z-50" onClick={(e) => e.preventDefault()}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setWishlisted(!wishlisted);
                    }}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                  >
                    <Heart
                      size={14}
                      className={`transition-all duration-300 ${wishlisted ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  <p>{wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleCompare();
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isComparing
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                  >
                    <GitCompareArrows size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  <p>{isComparing ? "Remove from Compare" : "Compare"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>

          {/* Bottom Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 pt-12 flex flex-col justify-end pointer-events-none">
            <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
              <div className="flex items-center gap-1.5 text-white/80 text-xs font-sans font-medium tracking-wide uppercase mb-2">
                <MapPin size={12} className="text-accent" />
                {expedition.location}
              </div>
              <h3 className="font-serif text-2xl font-bold text-white leading-tight drop-shadow-md">
                {expedition.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex items-end justify-between bg-card relative border-t border-border/50 transition-colors duration-300 group-hover:bg-primary/[0.02]">
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              {expedition.budgetTier}
            </span>
            <span className="font-sans text-xl font-bold text-foreground">
              {expedition.price}
            </span>
          </div>

          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm group-hover:shadow-md transform group-hover:-rotate-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExpeditionsSection;
