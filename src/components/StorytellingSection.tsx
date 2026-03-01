import { motion } from "framer-motion";
import lodgeImage from "@/assets/storytelling-lodge.jpg";

const StorytellingSection = () => {
  return (
    <section id="stories" className="safari-section bg-background overflow-hidden">
      <div className="safari-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-safari-lg">
              <img
                src={lodgeImage}
                alt="Luxury safari lodge under starry skies"
                className="w-full h-[400px] lg:h-[550px] object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-6 bg-card rounded-2xl shadow-safari-lg p-5">
              <p className="font-serif text-3xl font-bold text-primary">15+</p>
              <p className="font-sans text-xs text-muted-foreground mt-1">Years of<br />African Expertise</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="safari-label mb-4">Our Story</p>
            <h2 className="safari-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Born From a Love
              <br />
              <span className="italic font-medium">of the Wild</span>
            </h2>
            <div className="space-y-5">
              <p className="font-sans text-muted-foreground leading-relaxed">
                Joining Safaris was founded on a simple belief: that encountering Africa's wildlife
                in its natural habitat is one of life's most profound experiences. Every
                expedition we design is a deeply personal journey — not a tourist itinerary.
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed">
                From the thundering herds of the Serengeti to the tranquil waterways of the
                Okavango Delta, we guide you through landscapes that have inspired explorers
                for centuries. Our lodges are sanctuaries, our guides are storytellers, and
                every sunset is a chapter worth remembering.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="font-serif text-2xl font-bold text-primary">98%</p>
                <p className="font-sans text-xs text-muted-foreground">Guest Satisfaction</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-serif text-2xl font-bold text-primary">42</p>
                <p className="font-sans text-xs text-muted-foreground">Curated Lodges</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-serif text-2xl font-bold text-primary">8</p>
                <p className="font-sans text-xs text-muted-foreground">Countries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection;
