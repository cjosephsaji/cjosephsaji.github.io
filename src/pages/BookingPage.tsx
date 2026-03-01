import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MapPin, Calendar, Users, ShieldCheck, Lock, Sparkles, ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { ProgressiveImage } from "@/components/ui/ProgressiveImage";

import serengetiImg from "@/assets/safari-serengeti.jpg";
import okavango from "@/assets/safari-okavango.jpg";
import kilimanjaro from "@/assets/safari-kilimanjaro.jpg";
import masaiMara from "@/assets/safari-masai-mara.jpg";

const steps = ["Destination", "Dates", "Guests", "Summary"];

const destinations = [
  { id: "serengeti", name: "Serengeti Migration", location: "Tanzania", price: "₹4,200", image: serengetiImg, aiDescription: "✨ AI Insights: Ranked #1 for witnessing the Great Migration. High predator density." },
  { id: "okavango", name: "Okavango Delta", location: "Botswana", price: "₹3,800", image: okavango, aiDescription: "✨ AI Insights: Unique water-based safaris in mokoros. Exceptional birdwatching." },
  { id: "kilimanjaro", name: "Kilimanjaro & Safari", location: "Tanzania", price: "₹5,600", image: kilimanjaro, aiDescription: "✨ AI Insights: Challenging summit adventure paired with rewarding savanna wildlife." },
  { id: "masai-mara", name: "Masai Mara Big Five", location: "Kenya", price: "₹3,500", image: masaiMara, aiDescription: "✨ AI Insights: Quintessential safari experience. Unmatched year-round big cat sightings." },
  { id: "kruger", name: "Kruger Wilderness", location: "South Africa", price: "₹4,500", image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg", aiDescription: "✨ AI Insights: Exceptional infrastructure and one of the best places for guaranteed Big Five encounters." },
  { id: "etosha", name: "Etosha Salt Pans", location: "Namibia", price: "₹3,200", image: okavango, aiDescription: "✨ AI Insights: Striking stark landscapes offering vivid, unobstructed nocturnal wildlife photography." },
  { id: "bwindi", name: "Bwindi Gorilla Trekking", location: "Uganda", price: "₹5,200", image: kilimanjaro, aiDescription: "✨ AI Insights: Deep rainforest trekking for emotional, rare mountain gorilla close encounters." },
  { id: "south-luangwa", name: "South Luangwa Walking", location: "Zambia", price: "₹4,800", image: masaiMara, aiDescription: "✨ AI Insights: The original home of walking safaris; highly immersive, rugged, and intimate." },
];

const aiSuggestions: Record<number, Record<string, string>> = {
  0: {
    default: "🌍 Searching for the right vibe? Ask about 'Migratory', 'Water', 'Mountain', or 'Walking'.",
    serengeti: "✨ Great choice! June–October is peak migration season for the Serengeti.",
    okavango: "🛶 The Okavango is perfect for a unique water-based safari experience.",
    kilimanjaro: "🏔️ This combo trip is ideal for adventurers seeking both summit and savanna.",
    "masai-mara": "🦁 The Masai Mara offers year-round Big Five sightings — excellent value!",
    kruger: "🦏 Kruger offers the best infrastructure and accessibility for Big Five sightings.",
    etosha: "🦓 The sparse vegetation of Etosha makes spotting wildlife significantly easier.",
    bwindi: "🦍 Trekking permits in Bwindi are highly limited; booking early is critical.",
    "south-luangwa": "🥾 Get ready for raw thrills — nothing beats being on foot in Luangwa.",
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
  kruger: "May–September is dry season, drawing animals to waterholes.",
  etosha: "May–October is best, as the dry winter forces wildlife to congregate at permanent water sources.",
  bwindi: "June–August and December–February for drier trails and better trekking conditions.",
  "south-luangwa": "July–October is the classic dry-season walking safari window.",
};

const bookingSchema = z.object({
  destinationId: z.string().min(1, "Please select a destination"),
  month: z.string().min(1, "Please select a travel month"),
  guests: z.object({
    adults: z.number().min(1, "At least 1 adult is required").max(8),
    children: z.number().min(0).max(8),
  }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBestTime, setShowBestTime] = useState(false);

  const onSubmit = (data: BookingFormValues) => {
    console.log("Form submitted with:", data);
    // Here you would typically send data to an API
    alert("Booking request submitted! We will contact you soon.");
  };

  const location = useLocation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      destinationId: "",
      month: "",
      guests: { adults: 2, children: 0 },
    },
    mode: "onChange",
  });

  useEffect(() => {
    const state = location.state as { destinationId?: string };
    if (state?.destinationId) {
      setValue("destinationId", state.destinationId);
      setCurrentStep(1); // Jump to Dates
    }
  }, [location.state, setValue]);

  const selectedDest = watch("destinationId");
  const selectedMonth = watch("month");
  const guests = watch("guests");

  const canProceed = async () => {
    if (currentStep === 0) return await trigger("destinationId");
    if (currentStep === 1) return await trigger("month");
    if (currentStep === 2) return await trigger("guests");
    return true;
  };

  const next = async () => {
    const valid = await canProceed();
    if (valid && currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const selectedDestination = destinations.find((d) => d.id === selectedDest);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.aiDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar forceScrolled />

        <main className="flex-1 pt-28 pb-32 md:pb-16 px-4 md:px-8">
          <form className="max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
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

            {/* Selection Preview List */}
            {(selectedDest || selectedMonth || (guests.adults + guests.children > 0)) && currentStep > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-card border border-border rounded-2xl shadow-sm space-y-3"
              >
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Your Selection</p>
                <div className="flex flex-wrap gap-4">
                  {selectedDest && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-2 bg-primary/5 px-3 py-2 rounded-lg border border-primary/10">
                      <MapPin size={14} className="text-primary" />
                      <span className="text-xs font-semibold text-primary">{selectedDestination?.name}</span>
                    </motion.div>
                  )}
                  {selectedMonth && currentStep > 1 && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-2 bg-primary/5 px-3 py-2 rounded-lg border border-primary/10">
                      <Calendar size={14} className="text-primary" />
                      <span className="text-xs font-semibold text-primary">{selectedMonth}</span>
                    </motion.div>
                  )}
                  {(guests.adults + guests.children > 0) && currentStep > 2 && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-2 bg-primary/5 px-3 py-2 rounded-lg border border-primary/10">
                      <Users size={14} className="text-primary" />
                      <span className="text-xs font-semibold text-primary">{guests.adults} Adults, {guests.children} Kids</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-3">
                {steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm font-semibold transition-all duration-300 ${i < currentStep
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
                    <p className="font-sans text-muted-foreground mb-6">
                      Select the safari experience that calls to you.
                    </p>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        type="text"
                        placeholder="Search by name, location, or AI keywords (e.g., 'Big Five', 'Mountain')..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card border border-border rounded-xl py-3 pl-11 pr-4 text-sm font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Controller
                        name="destinationId"
                        control={control}
                        render={({ field }) => (
                          <>
                            {filteredDestinations.map((d) => (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => {
                                  field.onChange(d.id);
                                  trigger("destinationId");
                                }}
                                className={`relative overflow-hidden rounded-2xl text-left transition-all duration-200 group flex flex-col h-full ${field.value === d.id
                                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background bg-card"
                                  : "bg-card hover:shadow-safari-lg border border-transparent hover:border-border"
                                  }`}
                              >
                                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
                                  <ProgressiveImage
                                    src={d.image}
                                    alt={d.name}
                                    className="transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                  <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="flex items-center gap-1 text-primary-foreground/90 text-xs mb-1 font-medium">
                                      <MapPin size={11} className="text-secondary" /> {d.location}
                                    </div>
                                    <p className="font-serif text-xl font-semibold text-primary-foreground leading-tight">{d.name}</p>
                                    <p className="font-sans text-sm text-primary-foreground/80 mt-1 font-medium">From {d.price}</p>
                                  </div>
                                  {selectedDest === d.id && (
                                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                                      <Check size={14} />
                                    </div>
                                  )}
                                </div>
                                {/* AI Insight inside card */}
                                <div className="p-4 bg-primary/[0.03] border-t border-border/50 grow">
                                  <p className="font-sans text-xs text-foreground/80 leading-relaxed">
                                    {d.aiDescription}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </>
                        )}
                      />
                      {filteredDestinations.length === 0 && (
                        <div className="col-span-full py-10 text-center text-muted-foreground bg-card rounded-2xl border border-dashed border-border flex flex-col items-center gap-2">
                          <Search size={24} className="text-muted-foreground/50" />
                          <p>No destinations found matching "{searchQuery}"</p>
                        </div>
                      )}
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
                    <Controller
                      name="month"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {months.map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => {
                                field.onChange(m);
                                trigger("month");
                              }}
                              className={`py-4 px-3 rounded-xl font-sans text-sm font-medium transition-all duration-200 ${field.value === m
                                ? "bg-primary text-primary-foreground shadow-safari"
                                : "bg-card text-foreground hover:bg-muted border border-border"
                                }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      )}
                    />
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
                              type="button"
                              onClick={() => {
                                const newValue = Math.max(g.key === "adults" ? 1 : 0, guests[g.key] - 1);
                                setValue(`guests.${g.key}`, newValue);
                                trigger("guests");
                              }}
                              className="w-10 h-10 rounded-full border border-border flex items-center justify-center font-sans text-lg text-foreground hover:bg-muted transition-colors"
                            >
                              −
                            </button>
                            <span className="font-sans text-lg font-semibold w-6 text-center text-foreground">
                              {guests[g.key]}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const newValue = Math.min(8, guests[g.key] + 1);
                                setValue(`guests.${g.key}`, newValue);
                                trigger("guests");
                              }}
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
                          <p className="font-serif text-xl font-bold text-primary">₹{budgetPerPerson.total.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-sans text-xs text-muted-foreground">Per Person</p>
                          <p className="font-sans text-sm font-semibold text-foreground">₹{budgetPerPerson.perPerson.toLocaleString()}</p>
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
                        <div className="w-full h-48">
                          <ProgressiveImage
                            src={selectedDestination.image}
                            alt={selectedDestination.name}
                          />
                        </div>
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
                              ₹{budgetPerPerson.total.toLocaleString()}
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
                type="button"
                onClick={back}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 font-sans text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 ${currentStep === 0
                  ? "text-muted-foreground cursor-not-allowed"
                  : "text-foreground hover:bg-muted"
                  }`}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type={currentStep === 3 ? "submit" : "button"}
                onClick={(e) => {
                  if (currentStep < 3) {
                    e.preventDefault();
                    next();
                  }
                }}
                className={`flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3 rounded-xl transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90 ${currentStep === 3 ? "bg-accent text-accent-foreground shadow-safari-gold" : ""}`}
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
          </form>
        </main>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-4 z-40">
          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={back}
                className="flex items-center justify-center w-12 h-12 rounded-xl border border-border text-foreground"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <button
              type={currentStep === 3 ? "submit" : "button"}
              onClick={(e) => {
                if (currentStep < 3) {
                  e.preventDefault();
                  next();
                } else {
                  handleSubmit(onSubmit)(e);
                }
              }}
              className={`flex-1 flex items-center justify-center gap-2 font-sans font-semibold py-4 rounded-xl transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90 ${currentStep === 3 ? "bg-accent text-accent-foreground shadow-safari-gold" : ""}`}
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
    </PageTransition>
  );
};

export default BookingPage;
