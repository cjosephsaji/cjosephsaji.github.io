import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Map, Compass, Camera, Sparkles, Shield, Star, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UsersIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const HeartIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const navLinks = [
  {
    label: "Destinations",
    href: "#expeditions",
    dropdown: [
      { label: "Serengeti, Tanzania", desc: "Witness the Great Migration", icon: Map, href: "/tour/serengeti" },
      { label: "Masai Mara, Kenya", desc: "Home of the Big Five", icon: Compass, href: "/tour/masai-mara" },
      { label: "Okavango Delta, Botswana", desc: "Pristine water wilderness", icon: Map, href: "/tour/okavango" },
      { label: "Kruger National Park", desc: "South Africa's premier reserve", icon: Compass, href: "/tour/kruger" },
      { label: "Etosha, Namibia", desc: "Stark salt pans & wildlife", icon: Map, href: "/tour/etosha" },
    ]
  },
  {
    label: "Experiences",
    href: "#stories",
    dropdown: [
      { label: "Photography Safaris", desc: "Capture the perfect shot", icon: Camera },
      { label: "Luxury Lodges", desc: "Safari in absolute style", icon: Sparkles },
      { label: "Family Journeys", desc: "Memories for all ages", icon: UsersIcon },
      { label: "Walking Safaris", desc: "Intimate bush encounters", icon: Compass },
      { label: "Honeymoon Specials", desc: "Romance in the wild", icon: HeartIcon },
    ]
  },
  {
    label: "Planning",
    href: "#why-us",
    dropdown: [
      { label: "When to Go", desc: "Best times for every region", icon: Info },
      { label: "Our Guides", desc: "Meet the storytelling experts", icon: Star },
      { label: "Travel Insurance", desc: "Safe & worry-free travel", icon: Shield },
      { label: "FAQs", desc: "Everything you need to know", icon: Info },
    ]
  },
  { label: "About", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
];

interface NavbarProps {
  forceScrolled?: boolean;
}

const Navbar = ({ forceScrolled = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isScrolled = forceScrolled || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-safari py-5"
        : "bg-transparent py-8"
        }`}
    >
      <div className="safari-container flex items-center justify-between">
        <Link to="/" className="font-serif text-3xl font-bold tracking-tight overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
            }}
            className={`flex ${isScrolled ? "text-primary transition-colors duration-500" : "text-primary-foreground transition-colors duration-500"}`}
          >
            {"Joining Safaris".split("").map((char, i) => (char === " " ? (
              <span key={i} className="inline-block">&nbsp;</span>
            ) : (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-block"
              >
                {char}
              </motion.span>
            )))}
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className={`flex items-center gap-1 font-sans text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-70 ${isScrolled ? "text-foreground" : "text-primary-foreground"
                  }`}
              >
                {link.label}
                {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
              </a>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.dropdown && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-popover border border-border/80 rounded-2xl shadow-safari-lg overflow-hidden z-50 p-2"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href || link.href}
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                            <item.icon size={18} />
                          </div>
                          <div>
                            <p className="font-serif text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</p>
                            <p className="font-sans text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="bg-muted/30 p-3 mt-1 rounded-b-xl border-t border-border/50">
                      <p className="font-sans text-[10px] text-center text-muted-foreground font-semibold uppercase tracking-widest">
                        Browse all {link.label.toLowerCase()} content
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link
            to="/book"
            className={`font-sans text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isScrolled
              ? "bg-primary text-primary-foreground shadow-safari-accent"
              : "bg-white/10 text-primary-foreground border-2 border-primary-foreground/20 backdrop-blur-md hover:bg-white/20"
              }`}
          >
            Plan My Trip
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 ${isScrolled ? "text-foreground" : "text-primary-foreground"} transition-colors`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 lg:hidden bg-background overflow-y-auto"
          >
            <div className="p-6 flex items-center justify-between border-b border-border">
              <span className="font-serif text-2xl font-bold text-primary">Joining Safaris</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-foreground">
                <X size={28} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-8">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <p className="font-serif text-lg font-bold text-foreground mb-4">{link.label}</p>
                  {link.dropdown ? (
                    <div className="grid grid-cols-1 gap-4 pl-4 border-l border-primary/20">
                      {link.dropdown.map(item => (
                        <div key={item.label}>
                          <p className="font-serif text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="font-sans text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <a href={link.href} onClick={() => setMobileOpen(false)} className="font-sans text-sm font-medium text-muted-foreground uppercase tracking-widest">
                      Visit Section
                    </a>
                  )}
                </div>
              ))}

              <Link
                to="/book"
                onClick={() => setMobileOpen(false)}
                className="bg-primary text-primary-foreground py-6 rounded-2xl text-center font-serif text-xl font-bold shadow-safari-lg"
              >
                Start My Adventure
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
