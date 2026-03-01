import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Expeditions", href: "#expeditions" },
  { label: "About", href: "#why-us" },
  { label: "Stories", href: "#stories" },
  { label: "Testimonials", href: "#testimonials" },
];

interface NavbarProps {
  forceScrolled?: boolean;
}

const Navbar = ({ forceScrolled = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isScrolled = forceScrolled || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-safari py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="safari-container flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight">
          <span className={isScrolled ? "text-primary" : "text-primary-foreground"}>
            Joining Safaris
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-sans text-sm font-medium tracking-wide transition-colors duration-200 hover:opacity-70 ${
                isScrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/book"
            className={`font-sans text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 ${
              isScrolled
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/25"
            }`}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border"
          >
            <div className="safari-container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-base font-medium text-foreground py-2"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/book"
                onClick={() => setMobileOpen(false)}
                className="btn-hero-primary text-center mt-2"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
