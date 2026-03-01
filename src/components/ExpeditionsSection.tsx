import { motion } from "framer-motion";
import { Heart, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import serengetiImg from "@/assets/safari-serengeti.jpg";
import okavango from "@/assets/safari-okavango.jpg";
import kilimanjaro from "@/assets/safari-kilimanjaro.jpg";
import masaiMara from "@/assets/safari-masai-mara.jpg";

const expeditions = [
  {
    title: "The Great Serengeti Migration",
    location: "Tanzania",
    duration: "7 Days",
    price: "From $4,200",
    image: serengetiImg,
  },
  {
    title: "Okavango Delta Discovery",
    location: "Botswana",
    duration: "5 Days",
    price: "From $3,800",
    image: okavango,
  },
  {
    title: "Kilimanjaro & Safari Combo",
    location: "Tanzania",
    duration: "10 Days",
    price: "From $5,600",
    image: kilimanjaro,
  },
  {
    title: "Masai Mara Big Five",
    location: "Kenya",
    duration: "6 Days",
    price: "From $3,500",
    image: masaiMara,
  },
];

const ExpeditionsSection = () => {
  return (
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expeditions.map((exp, i) => (
            <ExpeditionCard key={exp.title} expedition={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Expedition {
  title: string;
  location: string;
  duration: string;
  price: string;
  image: string;
}

const ExpeditionCard = ({ expedition, index }: { expedition: Expedition; index: number }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to="/book" className="block safari-card group cursor-pointer">
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
          <span className="font-sans text-sm text-muted-foreground">{expedition.price}</span>
          <span className="font-sans text-xs font-semibold text-primary tracking-wide uppercase">
            View Details →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExpeditionsSection;
