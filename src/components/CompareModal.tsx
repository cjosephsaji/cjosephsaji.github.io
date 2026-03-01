import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, IndianRupee } from "lucide-react";

interface Expedition {
  title: string;
  location: string;
  duration: string;
  price: string;
  image: string;
}

interface CompareModalProps {
  open: boolean;
  onClose: () => void;
  items: Expedition[];
}

const CompareModal = ({ open, onClose, items }: CompareModalProps) => {
  return createPortal(
    <AnimatePresence>
      {open && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-2xl shadow-safari-lg max-w-4xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background z-10">
              <h3 className="font-serif text-lg font-semibold text-foreground">Compare Experiences</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className={`grid gap-6 ${items.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                {items.map((item) => (
                  <div key={item.title} className="space-y-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <h4 className="font-serif text-base font-semibold text-foreground">{item.title}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                        <MapPin size={14} className="text-primary" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                        <Clock size={14} className="text-primary" />
                        {item.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground font-sans">
                        <IndianRupee size={14} className="text-accent" />
                        {item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison rows */}
              <div className="mt-8 border-t border-border pt-6 space-y-4">
                {[
                  { label: "Best For", values: items.map((_, i) => ["Migration viewing", "Water safari", "Summit + safari", "Big Five game drives"][i] || "Wildlife") },
                  { label: "Difficulty", values: items.map((_, i) => ["Moderate", "Easy", "Challenging", "Easy"][i] || "Moderate") },
                  { label: "Group Size", values: items.map(() => "6–8 guests") },
                ].map((row) => (
                  <div key={row.label} className={`grid gap-6 ${items.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                    {row.values.map((val, i) => (
                      <div key={i}>
                        <p className="font-sans text-xs text-muted-foreground mb-1">{row.label}</p>
                        <p className="font-sans text-sm font-medium text-foreground">{val}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CompareModal;
