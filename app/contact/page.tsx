'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, CheckCircle2, ArrowRight, Droplets, Sparkles, ShieldCheck, Car } from 'lucide-react';
import { motion } from 'motion/react';

const ContactPage = () => {
  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-24 px-4 md:px-8 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">Get in Touch</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Ready to refresh your property? Give us a call for a free, no-obligation quote.
          </p>
        </div>
      </section>

      {/* Main Phone CTA */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
            <div className="relative z-10">
              <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Phone size={36} />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Call Us Now</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-lg mx-auto">
                Speak directly to our team for a free quote, to book a job, or to ask any questions.
              </p>
              <Link
                href="tel:07570810766"
                className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl text-2xl md:text-3xl font-bold hover:bg-slate-50 transition-all shadow-xl active:scale-95"
              >
                <Phone size={28} />
                07570 810766
              </Link>
              <p className="text-blue-200 text-sm mt-6 font-medium">Available 24 hours, 7 days a week</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center"
            >
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Phone size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Phone</h3>
              <Link href="tel:07570810766" className="text-blue-600 font-bold text-lg hover:underline">07570 810766</Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center"
            >
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <MapPin size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Service Area</h3>
              <p className="text-slate-600">Sutton Coldfield &amp; surrounding areas within 15 miles</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center"
            >
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Clock size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Hours</h3>
              <p className="text-slate-600">Open 24 hours, 7 days a week</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Pricing Overview */}
      <section className="pb-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Quick Price Guide</h2>
            <p className="text-slate-500 text-lg">Call for an exact quote tailored to your property</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Droplets, title: 'Jet Washing', price: '£3.50/m\u00B2', desc: 'Driveways, patios, roofs' },
              { icon: Sparkles, title: 'Windows', price: 'From £12', desc: '2-5 bed houses' },
              { icon: ShieldCheck, title: 'Gutters', price: 'From £50', desc: 'All property types' },
              { icon: Car, title: 'Car Clean', price: 'From £8', desc: 'Exterior & interior' },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                <div className="text-blue-600 font-bold text-lg mb-1">{item.price}</div>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="pb-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Areas We Serve</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Sutton Coldfield', 'Little Aston', 'Four Oaks', 'Wylde Green', 'Walmley', 'Mere Green', 'Streetly', 'Erdington', 'Tamworth', 'Lichfield'].map((area, idx) => (
              <span key={idx} className="bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-xl text-slate-700 font-medium text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Online Quote CTA */}
      <section className="px-4 md:px-8 pb-12">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white">
          <h3 className="text-2xl md:text-4xl font-bold mb-4">Prefer to get a quote online?</h3>
          <p className="text-slate-400 text-lg mb-8">
            Use our satellite measurement tool to measure your property and get an instant price estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Get a Quote Online <ArrowRight size={20} />
            </Link>
            <Link
              href="tel:07570810766"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              <Phone size={18} />
              Call Instead
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="px-4 md:px-8 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            {['Fully Insured', 'Free Quotes', 'No Obligation', '2+ Years Experience', '5.0 Google Rating'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
