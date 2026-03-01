import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

const questions = [
  {
    question: "What's your ideal safari vibe?",
    options: ["Classic Wildlife", "Adventure & Hiking", "Relaxation & Luxury", "Cultural Immersion"],
  },
  {
    question: "How long would you like to travel?",
    options: ["3–5 Days", "6–8 Days", "9–12 Days", "2+ Weeks"],
  },
  {
    question: "What's your budget per person?",
    options: ["Under $3,000", "$3,000–$5,000", "$5,000–$8,000", "$8,000+"],
  },
  {
    question: "Who are you traveling with?",
    options: ["Solo", "Couple", "Family", "Group of Friends"],
  },
  {
    question: "What matters most to you?",
    options: ["Big Five Sightings", "Stunning Landscapes", "Premium Lodges", "Expert Guides"],
  },
];

// Mapping answers to safari recommendations (frontend-only logic)
const getRecommendations = (answers: Record<number, string>) => {
  const scores: Record<string, number> = {
    serengeti: 0,
    okavango: 0,
    kilimanjaro: 0,
    "masai-mara": 0,
  };

  // Vibe
  if (answers[0] === "Classic Wildlife") { scores.serengeti += 3; scores["masai-mara"] += 2; }
  if (answers[0] === "Adventure & Hiking") { scores.kilimanjaro += 3; }
  if (answers[0] === "Relaxation & Luxury") { scores.okavango += 3; }
  if (answers[0] === "Cultural Immersion") { scores["masai-mara"] += 3; scores.serengeti += 1; }

  // Duration
  if (answers[1] === "3–5 Days") { scores.okavango += 2; scores["masai-mara"] += 2; }
  if (answers[1] === "6–8 Days") { scores.serengeti += 2; scores["masai-mara"] += 1; }
  if (answers[1] === "9–12 Days") { scores.kilimanjaro += 3; }
  if (answers[1] === "2+ Weeks") { scores.kilimanjaro += 2; scores.serengeti += 1; }

  // Budget
  if (answers[2] === "Under $3,000") { scores["masai-mara"] += 2; }
  if (answers[2] === "$3,000–$5,000") { scores.serengeti += 2; scores.okavango += 2; }
  if (answers[2] === "$5,000–$8,000") { scores.kilimanjaro += 2; scores.okavango += 1; }
  if (answers[2] === "$8,000+") { scores.kilimanjaro += 2; }

  // Priority
  if (answers[4] === "Big Five Sightings") { scores["masai-mara"] += 2; scores.serengeti += 2; }
  if (answers[4] === "Stunning Landscapes") { scores.kilimanjaro += 2; scores.okavango += 2; }
  if (answers[4] === "Premium Lodges") { scores.okavango += 2; }
  if (answers[4] === "Expert Guides") { scores.serengeti += 1; scores["masai-mara"] += 1; }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
};

interface FindSafariModalProps {
  open: boolean;
  onClose: () => void;
  onResult: (recommended: string[]) => void;
}

const FindSafariModal = ({ open, onClose, onResult }: FindSafariModalProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [step]: option };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      const recommendations = getRecommendations(newAnswers);
      onResult(recommendations);
      setTimeout(() => {
        setStep(0);
        setAnswers({});
        onClose();
      }, 300);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background rounded-2xl shadow-safari-lg max-w-lg w-full overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-accent" />
              <h3 className="font-serif text-lg font-semibold text-foreground">Find My Perfect Safari</h3>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Progress */}
          <div className="px-6 pt-4">
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="font-sans text-xs text-muted-foreground mt-2">
              Question {step + 1} of {questions.length}
            </p>
          </div>

          {/* Question */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-serif text-xl font-semibold text-foreground mb-6">
                  {questions[step].question}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 font-sans text-sm font-medium ${
                        answers[step] === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-muted"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FindSafariModal;
