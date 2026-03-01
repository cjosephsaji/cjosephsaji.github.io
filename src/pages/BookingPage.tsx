import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MapPin, Calendar, Users, ShieldCheck, Lock, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import serengetiImg from "@/assets/safari-serengeti.jpg";
import okavango from "@/assets/safari-okavango.jpg";
import kilimanjaro from "@/assets/safari-kilimanjaro.jpg";
import masaiMara from "@/assets/safari-masai-mara.jpg";

const steps = ["Destination", "Dates", "Guests", "Summary"];

const destinations = [
  { id: "serengeti", name: "Serengeti Migration", location: "Tanzania", price: "$4,200", image: serengetiImg },
  { id: "okavango", name: "Okavango Delta", location: "Botswana", price: "$3,800", image: okavango },
  { id: "kilimanjaro", name: "Kilimanjaro & Safari", location: "Tanzania", price: "$5,600", image: kilimanjaro },
  { id: "masai-mara", name: "Masai Mara Big Five", location: "Kenya", price: "$3,500", image: masaiMara },
];

const aiSuggestions: Record<number, Record<string, string>> = {
  0: {
    default: "🌍 First-timers love the Serengeti — it's the classic African safari experience.",
    serengeti: "✨ Great choice! June–October is peak migration season for the Serengeti.",
    okavango: "🛶 The Okavango is perfect for a unique water-based safari experience.",
    kilimanjaro: "🏔️ This combo trip is ideal for adventurers seeking both summit and savanna.",
    "masai-mara": "🦁 The Masai Mara offers year-round Big Five sightings — excellent value!",
  },
  1: {
    default: "📅 Peak season (Jun–Oct) offers the best wildlife viewing and dry weather.",
  },
  2: {
    default: "👨‍👩‍👧‍👦 Groups of 2–4 get the most intimate guide experience.",
  },
  3: {
    default: "🎉 Everything looks great! Book now to lock in availability.",
  },
};

const bestTimeData: Record<string, string> = {
  serengeti: "Best visited June–October for the Great Migration. January–February for calving season.",
  okavango: "Peak floods July–September create the best water safari conditions.",
  kilimanjaro: "January–March and June–October offer the clearest summit conditions.",
  "masai-mara": "July–October for the wildebeest migration. Year-round for Big Five.",
};

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDest, setSelectedDest] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [showBestTime, setShowBestTime] = useState(false);

  const canProceed = () => {
    if (currentStep === 0) return !!selectedDest;
    if (currentStep === 1) return !!selectedMonth;
    return true;
  };

  const next = () => {
    if (canProceed() && currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const selectedDestination = destinations.find((d) => d.id === selectedDest);

  const aiHint = useMemo(() => {
    const stepSuggestions = aiSuggestions[currentStep];
    if (currentStep === 0 && selectedDest && stepSuggestions[selectedDest]) {
      return stepSuggestions[selectedDest];
    }
    return stepSuggestions?.default || "";
  }, [currentStep, selectedDest]);

  const budgetPerPerson = useMemo(() => {
    if (!selectedDestination) return null;
    const base = parseInt(selectedDestination.price.replace(/[^0-9]/g, ""));
    const total = base * guests.adults + base * 0.6 * guests.children;
    return { total: Math.round(total), perPerson: Math.round(total / (guests.adults + guests.children || 1)) };
  }, [selectedDestination, guests]);

  const months = [
    "Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026",
    "May 2026", "Jun 2026", "Jul 2026", "Aug 2026",
    "Sep 2026", "Oct 2026", "Nov 2026", "Dec 2026",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar forceScrolled />

      <main className="flex-1 pt-28 pb-32 md:pb-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* AI Helper */}
          <AnimatePresence mode="wait">
            <motion.div
              key={aiHint}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-6 flex items-start gap-3 bg-primary/5 border border-primary/10 rounded-xl px-5 py-4"
            >
              <Sparkles size={18} className="text-accent mt-0.5 shrink-0" />
              <p className="font-sans text-sm text-foreground/80">{aiHint}</p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm font-semibold transition-all duration-300 ${
                      i < currentStep
                        ? "bg-primary text-primary-foreground"
                        : i === currentStep
                        ? "bg-primary text-primary-foreground shadow-safari-gold"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < currentStep ? <Check size={14} /> : i + 1}
                  </div>
                  <span className="hidden sm:block font-sans text-xs text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 0: Destination */}
              {currentStep === 0 && (
                <div>
                  <h2 className="safari-heading text-2xl md:text-3xl font-bold mb-2">
                    Choose Your Destination
                  </h2>
                  <p className="font-sans text-muted-foreground mb-8">
                    Select the safari experience that calls to you.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destinations.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDest(d.id)}
                        className={`relative overflow-hidden rounded-2xl text-left transition-all duration-200 group ${
                          selectedDest === d.id
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                            : "hover:shadow-safari-lg"
                        }`}
                      >
                        <img
                          src={d.image}
                          alt={d.name}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-1 text-primary-foreground/70 text-xs mb-1">
                            <MapPin size={11} /> {d.location}
                          </div>
                          <p className="font-serif text-lg font-semibold text-primary-foreground">{d.name}</p>
                          <p className="font-sans text-sm text-primary-foreground/60 mt-1">From {d.price}</p>
                        </div>
                        {selectedDest === d.id && (
                          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Best Time To Visit */}
                  {selectedDest && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6"
                    >
                      <button
                        onClick={() => setShowBestTime(!showBestTime)}
                        className="flex items-center gap-2 font-sans text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <Calendar size={14} />
                        Best Time To Visit
                        <ChevronDown size={14} className={`transition-transform duration-200 ${showBestTime ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {showBestTime && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 bg-accent/10 border border-accent/20 rounded-xl px-5 py-4"
                          >
                            <p className="font-sans text-sm text-foreground/80">
                              {bestTimeData[selectedDest]}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 1: Dates */}
              {currentStep === 1 && (
                <div>
                  <h2 className="safari-heading text-2xl md:text-3xl font-bold mb-2">
                    When Would You Like to Go?
                  </h2>
                  <p className="font-sans text-muted-foreground mb-8">
                    Choose your preferred travel month.
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {months.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMonth(m)}
                        className={`py-4 px-3 rounded-xl font-sans text-sm font-medium transition-all duration-200 ${
                          selectedMonth === m
                            ? "bg-primary text-primary-foreground shadow-safari"
                            : "bg-card text-foreground hover:bg-muted border border-border"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Guests */}
              {currentStep === 2 && (
                <div>
                  <h2 className="safari-heading text-2xl md:text-3xl font-bold mb-2">
                    How Many Travelers?
                  </h2>
                  <p className="font-sans text-muted-foreground mb-8">
                    Tell us about your group.
                  </p>
                  <div className="space-y-6">
                    {[
                      { label: "Adults", sub: "Ages 13+", key: "adults" as const },
                      { label: "Children", sub: "Ages 2–12", key: "children" as const },
                    ].map((g) => (
                      <div
                        key={g.key}
                        className="flex items-center justify-between bg-card rounded-2xl p-6 border border-border"
                      >
                        <div>
                          <p className="font-sans font-semibold text-foreground">{g.label}</p>
                          <p className="font-sans text-sm text-muted-foreground">{g.sub}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              setGuests((prev) => ({
                                ...prev,
                                [g.key]: Math.max(g.key === "adults" ? 1 : 0, prev[g.key] - 1),
                              }))
                            }
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center font-sans text-lg text-foreground hover:bg-muted transition-colors"
                          >
                            −
                          </button>
                          <span className="font-sans text-lg font-semibold w-6 text-center text-foreground">
                            {guests[g.key]}
                          </span>
                          <button
                            onClick={() =>
                              setGuests((prev) => ({
                                ...prev,
                                [g.key]: Math.min(8, prev[g.key] + 1),
                              }))
                            }
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center font-sans text-lg text-foreground hover:bg-muted transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Budget Insight Badge */}
                  {budgetPerPerson && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 bg-accent/10 border border-accent/20 rounded-xl px-5 py-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-sans text-xs text-muted-foreground">Estimated Total</p>
                        <p className="font-serif text-xl font-bold text-primary">${budgetPerPerson.total.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-sans text-xs text-muted-foreground">Per Person</p>
                        <p className="font-sans text-sm font-semibold text-foreground">${budgetPerPerson.perPerson.toLocaleString()}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 3: Summary */}
              {currentStep === 3 && (
                <div>
                  <h2 className="safari-heading text-2xl md:text-3xl font-bold mb-2">
                    Your Safari Summary
                  </h2>
                  <p className="font-sans text-muted-foreground mb-8">
                    Review your selections before proceeding.
                  </p>
                  <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    {selectedDestination && (
                      <img
                        src={selectedDestination.image}
                        alt={selectedDestination.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-primary" />
                        <div>
                          <p className="font-sans text-xs text-muted-foreground">Destination</p>
                          <p className="font-sans font-semibold text-foreground">
                            {selectedDestination?.name} — {selectedDestination?.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-primary" />
                        <div>
                          <p className="font-sans text-xs text-muted-foreground">Travel Date</p>
                          <p className="font-sans font-semibold text-foreground">{selectedMonth}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users size={18} className="text-primary" />
                        <div>
                          <p className="font-sans text-xs text-muted-foreground">Travelers</p>
                          <p className="font-sans font-semibold text-foreground">
                            {guests.adults} Adults{guests.children > 0 ? `, ${guests.children} Children` : ""}
                          </p>
                        </div>
                      </div>
                      {budgetPerPerson && (
                        <div className="border-t border-border pt-4 mt-4 flex items-center justify-between">
                          <p className="font-sans text-sm text-muted-foreground">Estimated Total</p>
                          <p className="font-serif text-2xl font-bold text-primary">
                            ${budgetPerPerson.total.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3 text-muted-foreground font-sans text-xs">
                    <Lock size={14} />
                    <span>Secure checkout · Free cancellation up to 30 days before departure</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between mt-12">
            <button
              onClick={back}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 font-sans text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 ${
                currentStep === 0
                  ? "text-muted-foreground cursor-not-allowed"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={next}
              disabled={!canProceed()}
              className={`flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3 rounded-xl transition-all duration-200 ${
                canProceed()
                  ? currentStep === 3
                    ? "bg-accent text-accent-foreground hover:opacity-90 shadow-safari-gold"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {currentStep === 3 ? (
                <>
                  <ShieldCheck size={16} /> Secure Booking
                </>
              ) : (
                <>
                  Continue <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-4 z-40">
        <div className="flex items-center gap-3">
          {currentStep > 0 && (
            <button
              onClick={back}
              className="flex items-center justify-center w-12 h-12 rounded-xl border border-border text-foreground"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <button
            onClick={next}
            disabled={!canProceed()}
            className={`flex-1 flex items-center justify-center gap-2 font-sans font-semibold py-4 rounded-xl transition-all duration-200 ${
              canProceed()
                ? currentStep === 3
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {currentStep === 3 ? (
              <>
                <ShieldCheck size={16} /> Secure Booking
              </>
            ) : (
              <>
                Continue <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default BookingPage;
