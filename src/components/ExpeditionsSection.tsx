import { motion } from "framer-motion";
import { Heart, MapPin, Clock, GitCompareArrows, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FindSafariModal from "@/components/FindSafariModal";
import CompareModal from "@/components/CompareModal";

import serengetiImg from "@/assets/safari-serengeti.jpg";
import okavango from "@/assets/safari-okavango.jpg";
import kilimanjaro from "@/assets/safari-kilimanjaro.jpg";
import masaiMara from "@/assets/safari-masai-mara.jpg";

const expeditions = [
  {
    id: "serengeti",
    title: "The Great Serengeti Migration",
    location: "Tanzania",
    duration: "7 Days",
    price: "From $4,200",
    image: serengetiImg,
    budgetTier: "Mid-Range",
  },
  {
    id: "okavango",
    title: "Okavango Delta Discovery",
    location: "Botswana",
    duration: "5 Days",
    price: "From $3,800",
    image: okavango,
    budgetTier: "Mid-Range",
  },
  {
    id: "kilimanjaro",
    title: "Kilimanjaro & Safari Combo",
    location: "Tanzania",
    duration: "10 Days",
    price: "From $5,600",
    image: kilimanjaro,
    budgetTier: "Premium",
  },
  {
    id: "masai-mara",
    title: "Masai Mara Big Five",
    location: "Kenya",
    duration: "6 Days",
    price: "From $3,500",
    image: masaiMara,
    budgetTier: "Best Value",
  },
];

const ExpeditionsSection = () => {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [recommended, setRecommended] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const compareItems = expeditions.filter((e) => compareIds.includes(e.id));

  return (
    <>
      <section id="expeditions" className="safari-section bg-background">
        <div className="safari-container">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

interface Expedition {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  image: string;
  budgetTier: string;
}

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
        <div className="absolute -top-3 left-4 z-10 flex items-center gap-1 bg-accent text-accent-foreground text-xs font-sans font-semibold px-3 py-1 rounded-full shadow-safari">
          <Sparkles size={12} /> Top Pick For You
        </div>
      )}
      <Link to="/book" className={`block safari-card group cursor-pointer ${isRecommended ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""}`}>
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={expedition.image}
            alt={expedition.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setWishlisted(!wishlisted);
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-background/40"
          >
            <Heart
              size={18}
              className={`transition-all duration-300 ${
                wishlisted ? "fill-destructive text-destructive scale-110" : "text-primary-foreground"
              }`}
            />
          </button>

          {/* Compare checkbox */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleCompare();
            }}
            className={`absolute top-4 left-14 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isComparing
                ? "bg-accent text-accent-foreground"
                : "bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/40"
            }`}
            title="Compare"
          >
            <GitCompareArrows size={14} />
          </button>

          {/* Duration Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/20 backdrop-blur-sm text-primary-foreground text-xs font-sans font-medium px-3 py-1.5 rounded-full">
            <Clock size={12} />
            {expedition.duration}
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs font-sans mb-2">
              <MapPin size={12} />
              {expedition.location}
            </div>
            <h3 className="font-serif text-lg font-semibold text-primary-foreground leading-snug">
              {expedition.title}
            </h3>
          </div>
        </div>

        <div className="p-5 flex items-center justify-between">
          <div>
            <span className="font-sans text-sm text-muted-foreground">{expedition.price}</span>
            <span className="ml-2 font-sans text-xs text-accent font-medium">{expedition.budgetTier}</span>
          </div>
          <span className="font-sans text-xs font-semibold text-primary tracking-wide uppercase">
            View Details →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExpeditionsSection;
