import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Sparkles, Calendar, Users, MapPin, Search, Check } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-safari.jpg";
import heroVideo1 from "../../167124-836005738.mp4";
import heroVideo2 from "../../158530-816999763.mp4";
import heroVideo3 from "../../290520.mp4";
import FindSafariModal from "@/components/FindSafariModal";

const heroVideos = [heroVideo1, heroVideo2, heroVideo3];
const VIDEO_DURATION = 10000; // 10 seconds

const upcomingTours = [
  {
    id: "serengeti-1",
    title: "Serengeti Migration",
    location: "Tanzania",
    date: "15 - 22 July, 2026",
    duration: "7 Days",
    price: "₹4,200",
    spots: "4 spots left",
    tag: "Peak Season"
  },
  {
    id: "masai-mara-1",
    title: "Masai Mara Big Five",
    location: "Kenya",
    date: "05 - 11 Sept, 2026",
    duration: "6 Days",
    price: "₹3,500",
    spots: "2 spots left",
    tag: "High Demand"
  },
  {
    id: "okavango-1",
    title: "Okavango Waterways",
    location: "Botswana",
    date: "10 - 15 Oct, 2026",
    duration: "5 Days",
    price: "₹3,800",
    spots: "6 spots left",
    tag: "Exclusive"
  }
];

const DESTINATIONS = [
  { name: "Serengeti, Tanzania", id: "serengeti" },
  { name: "Masai Mara, Kenya", id: "masai-mara" },
  { name: "Okavango, Botswana", id: "okavango" },
  { name: "Kruger, South Africa", id: "kruger" },
  { name: "Bwindi, Uganda", id: "bwindi" },
  { name: "Etosha, Namibia", id: "etosha" },
];

const TRAVEL_PERIODS = [
  "June 2026", "July 2026", "August 2026", "September 2026", "October 2026"
];

const GUEST_OPTIONS = [
  "1 Guest", "2 Guests", "3 Guests", "4 Guests", "5+ Guests"
];

const HeroSection = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Selection State
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selections, setSelections] = useState({
    destination: "Serengeti, Mara...",
    dates: "Select Dates",
    guests: "Add Travelers"
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, VIDEO_DURATION);

    return () => clearTimeout(timer);
  }, [currentVideoIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveSection(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
  };

  const handleQuizResult = (recommended: string[]) => {
    const el = document.getElementById("expeditions");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const selectOption = (key: keyof typeof selections, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    setActiveSection(null);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pb-20">
        {/* Background Video Queue with Cross-fade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <video
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="w-full h-full object-cover"
              >
                <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
                <img
                  src={heroImage}
                  alt="African safari landscape"
                  className="w-full h-full object-cover"
                />
              </video>
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-20 safari-container pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full mx-auto px-4 text-center"
          >
            <div className="max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-accent/30 text-accent font-sans text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Calendar size={12} /> Upcoming Expeditions
              </motion.div>
              <h1 className="font-serif text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl tracking-tight">
                Your Next Journey <span className="italic font-medium text-white/90">Begins Here</span>
              </h1>
              <p className="text-white/70 font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Check our upcoming departure dates and secure your spot in Africa's most iconic landscapes.
              </p>
            </div>

            {/* QUICK BOOKING SEARCH BAR */}
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="max-w-5xl mx-auto mb-10 bg-white/95 backdrop-blur-md border border-white rounded-2xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-2 z-30 relative p-2"
            >
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-black/5 divide-black/5">
                {/* Destination Selector */}
                <div
                  onClick={() => setActiveSection(activeSection === 'dest' ? null : 'dest')}
                  className={`relative flex items-center gap-4 px-8 py-5 text-left group cursor-pointer hover:bg-black/5 transition-colors rounded-t-2xl md:rounded-l-full ${activeSection === 'dest' ? 'bg-black/5' : ''}`}
                >
                  <MapPin size={22} className="text-accent shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Destination</span>
                    <span className="font-serif text-base font-bold text-primary truncate max-w-[150px]">{selections.destination}</span>
                  </div>

                  <AnimatePresence>
                    {activeSection === 'dest' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-3 w-72 bg-popover border border-border/80 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-1">
                          {DESTINATIONS.map(dest => (
                            <button
                              key={dest.id}
                              onClick={(e) => { e.stopPropagation(); selectOption('destination', dest.name); }}
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 text-left transition-all group"
                            >
                              <span className="font-serif text-sm text-foreground group-hover:text-primary transition-colors">{dest.name}</span>
                              {selections.destination === dest.name && <Check size={14} className="text-accent" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Date Selector */}
                <div
                  onClick={() => setActiveSection(activeSection === 'dates' ? null : 'dates')}
                  className={`relative flex items-center gap-4 px-8 py-5 text-left group cursor-pointer hover:bg-black/5 transition-colors ${activeSection === 'dates' ? 'bg-black/5' : ''}`}
                >
                  <Calendar size={22} className="text-accent shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Travel Period</span>
                    <span className="font-serif text-base font-bold text-primary truncate max-w-[150px]">{selections.dates}</span>
                  </div>

                  <AnimatePresence>
                    {activeSection === 'dates' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 mt-3 w-64 bg-popover border border-border/80 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-1">
                          {TRAVEL_PERIODS.map(period => (
                            <button
                              key={period}
                              onClick={(e) => { e.stopPropagation(); selectOption('dates', period); }}
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 text-left transition-all group"
                            >
                              <span className="font-serif text-sm text-foreground group-hover:text-primary transition-colors">{period}</span>
                              {selections.dates === period && <Check size={14} className="text-accent" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Guest Selector */}
                <div
                  onClick={() => setActiveSection(activeSection === 'guests' ? null : 'guests')}
                  className={`relative flex items-center gap-4 px-8 py-5 text-left group cursor-pointer hover:bg-black/5 transition-colors md:rounded-r-full ${activeSection === 'guests' ? 'bg-black/5' : ''}`}
                >
                  <Users size={22} className="text-accent shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Guests</span>
                    <span className="font-serif text-base font-bold text-primary truncate max-w-[150px]">{selections.guests}</span>
                  </div>

                  <AnimatePresence>
                    {activeSection === 'guests' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-56 bg-popover border border-border/80 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-1">
                          {GUEST_OPTIONS.map(opt => (
                            <button
                              key={opt}
                              onClick={(e) => { e.stopPropagation(); selectOption('guests', opt); }}
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 text-left transition-all group"
                            >
                              <span className="font-serif text-sm text-foreground group-hover:text-primary transition-colors">{opt}</span>
                              {selections.guests === opt && <Check size={14} className="text-accent" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <button className="w-full md:w-auto bg-accent text-accent-foreground p-5 md:p-6 rounded-xl md:rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group">
                <Search size={24} className="group-hover:rotate-12 transition-transform duration-500" />
              </button>
            </motion.div>

            {/* Quick Booking Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {upcomingTours.map((tour, i) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 * (i + 1), duration: 0.8 }}
                  className="group relative flex flex-col items-start text-left p-6 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-black/40 hover:border-white/20 transition-all duration-300 shadow-2xl overflow-hidden"
                >
                  {/* Card Background Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 blur-[80px] group-hover:bg-accent/20 transition-all duration-700 pointer-events-none" />

                  <div className="flex justify-between items-start w-full mb-6">
                    <span className="bg-white/10 px-3 py-1 rounded-md text-[10px] font-bold text-white/90 uppercase tracking-tighter border border-white/5">
                      {tour.tag}
                    </span>
                    <span className="text-accent font-serif text-xl font-bold">
                      {tour.price}
                    </span>
                  </div>

                  <div className="space-y-1 mb-6">
                    <div className="flex items-center gap-1.5 text-accent/80 text-[10px] uppercase font-bold tracking-widest mb-1">
                      <MapPin size={10} /> {tour.location}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300 leading-tight">
                      {tour.title}
                    </h3>
                  </div>

                  <div className="space-y-4 w-full mb-8">
                    <div className="flex items-center gap-3 text-white/70">
                      <Calendar size={16} className="text-accent/60" />
                      <span className="font-sans text-sm font-medium">{tour.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Users size={16} className="text-accent/60" />
                      <span className="font-sans text-sm font-medium">{tour.duration} • {tour.spots}</span>
                    </div>
                  </div>

                  <Link
                    to={`/tour/${tour.id.split('-')[0]}`}
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-accent hover:text-accent-foreground text-white border border-white/10 font-sans font-bold text-sm py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg"
                  >
                    Quick Check Details
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                to="/book"
                className="inline-flex items-center gap-3 text-white/80 hover:text-accent font-sans font-bold text-sm tracking-wide transition-all duration-300 group"
              >
                <Compass size={18} className="group-hover:rotate-12 transition-transform duration-500" />
                OR DESIGN A CUSTOM EXPERIENCE
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FindSafariModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        onResult={handleQuizResult}
      />
    </>
  );
};

export default HeroSection;
