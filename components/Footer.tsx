import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo.png" alt="Power Pulse Solutions" className="h-12 w-auto" />
          </Link>
          <p className="text-sm leading-relaxed">
            Professional jet washing and pressure washing services for residential and commercial properties in Sutton Coldfield and surrounding areas.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-blue-400 transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/reviews" className="hover:text-white transition-colors">Customer Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Quote</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Our Services</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/services" className="hover:text-white transition-colors">Driveway Cleaning</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Patio Cleaning</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Roof Cleaning</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Wall Cleaning</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Commercial Washing</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
          <div className="flex items-start gap-3 text-sm">
            <Phone size={18} className="text-blue-500 shrink-0" />
            <Link href="tel:07570810766" className="hover:text-white">07570 810766</Link>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Mail size={18} className="text-blue-500 shrink-0" />
            <Link href="mailto:info@powerpulsesolutions.co.uk" className="hover:text-white">info@powerpulsesolutions.co.uk</Link>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MapPin size={18} className="text-blue-500 shrink-0" />
            <span>Sutton Coldfield & Nearby Areas</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Clock size={18} className="text-blue-500 shrink-0" />
            <span>Open 24 Hours</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {currentYear} Power Pulse Solutions. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-slate-300">Privacy Policy</Link>
          <Link href="#" className="hover:text-slate-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
