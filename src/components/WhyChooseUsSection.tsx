import { motion } from "framer-motion";
import { Binoculars, Shield, MapPinned, Users } from "lucide-react";
import Tilt from "react-parallax-tilt";

const features = [
  {
    icon: Binoculars,
    title: "Expert Guides",
    description: "Certified naturalists with decades of field experience leading every expedition.",
  },
  {
    icon: MapPinned,
    title: "Handpicked Lodges",
    description: "Personally vetted accommodations that blend luxury with authentic wilderness.",
  },
  {
    icon: Shield,
    title: "Seamless Planning",
    description: "End-to-end logistics, permits, and transfers — you just show up and explore.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description: "Intimate group sizes of 6–8 guests for an exclusive, personal experience.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="pt-8 md:pt-12 lg:pt-16 pb-20 md:pb-28 lg:pb-32 bg-background topo-pattern relative overflow-hidden">
      {/* Light Leak Layer */}
      <div className="light-leak bottom-0 left-0 w-[700px] h-[700px] opacity-25 translate-x-[-10%] translate-y-[20%]" />

      {/* Cinematic Bloom Accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-bloom-gold -translate-y-1/3 -translate-x-1/3 pointer-events-none opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-bloom-forest translate-y-1/3 translate-x-1/3 pointer-events-none opacity-30 blur-3xl animate-pulse-slow" />

      <div className="safari-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="safari-label mb-4">Why Joining Safaris</p>
          <h2 className="safari-heading text-3xl md:text-5xl font-bold mb-4">
            Crafted With Intention
          </h2>
          <p className="safari-subheading mx-auto">
            Every detail is designed to create transformative moments in nature.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group h-full"
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                transitionSpeed={1500}
                className="text-center h-full p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
                  <f.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {f.title}
                </h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                  {f.description}
                </p>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
