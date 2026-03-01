import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 py-16 px-4 md:px-8">
      <div className="safari-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-2xl font-bold text-background">
              Savana<span className="text-accent">·</span>
            </Link>
            <p className="font-sans text-sm mt-4 text-background/50 leading-relaxed">
              Curated African safari experiences that connect you with the wild.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-background uppercase tracking-wider mb-4">
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#expeditions" className="font-sans text-sm text-background/50 hover:text-background transition-colors">Expeditions</a>
              <a href="#why-us" className="font-sans text-sm text-background/50 hover:text-background transition-colors">About Us</a>
              <a href="#stories" className="font-sans text-sm text-background/50 hover:text-background transition-colors">Our Story</a>
              <a href="#testimonials" className="font-sans text-sm text-background/50 hover:text-background transition-colors">Reviews</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-background uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-background/50">
              <div className="flex items-center gap-2"><Mail size={14} /> hello@savana.travel</div>
              <div className="flex items-center gap-2"><Phone size={14} /> +1 (555) 234-5678</div>
              <div className="flex items-center gap-2"><MapPin size={14} /> Nairobi, Kenya</div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-background uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-background/30">
            © 2025 Savana. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-xs text-background/30 hover:text-background/50 transition-colors">Privacy Policy</a>
            <a href="#" className="font-sans text-xs text-background/30 hover:text-background/50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
