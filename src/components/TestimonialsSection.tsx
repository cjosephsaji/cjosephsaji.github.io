import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "London, UK",
    text: "An absolutely life-changing experience. The guides were extraordinary and every detail was perfect. Joining Safaris turned a dream into reality.",
    rating: 5,
    initials: "SM",
  },
  {
    name: "James & Emily Chen",
    location: "San Francisco, US",
    text: "Our honeymoon safari exceeded every expectation. The lodges were stunning, the wildlife encounters were magical, and the team made everything effortless.",
    rating: 5,
    initials: "JC",
  },
  {
    name: "Dr. Amara Okafor",
    location: "Lagos, Nigeria",
    text: "I've traveled extensively across Africa, but Joining Safaris' attention to detail and local knowledge is unmatched. A truly premium experience.",
    rating: 5,
    initials: "AO",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="safari-section bg-muted/50">
      <div className="safari-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="safari-label mb-4">Guest Stories</p>
          <h2 className="safari-heading text-3xl md:text-5xl font-bold mb-4">
            Voices From the Wild
          </h2>
          <p className="safari-subheading mx-auto">
            Hear from travelers who've journeyed with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-safari"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="font-sans text-foreground/80 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-serif text-sm font-semibold text-primary">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
