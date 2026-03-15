'use client';

import { Phone, FileText } from 'lucide-react';
import Link from 'next/link';

const StickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex border-t border-slate-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <Link
        href="tel:07570810766"
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-bold active:bg-blue-700 transition-colors"
      >
        <Phone size={18} />
        Call Now
      </Link>
      <Link
        href="/contact"
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-blue-600 font-bold active:bg-slate-50 transition-colors"
      >
        <FileText size={18} />
        Free Quote
      </Link>
    </div>
  );
};

export default StickyCTA;
