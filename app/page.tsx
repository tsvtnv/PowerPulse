'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Phone, ArrowRight, Star, ShieldCheck, Clock, CheckCircle2, Droplets, Sparkles, MapPin, Building2, Home as HomeIcon } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] md:min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/driveway-after.jpeg"
            alt="Professional Pressure Washing Service"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              <Star size={16} fill="currentColor" />
              <span>Rated 5.0 on Google</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Bring Your Outdoor <span className="text-blue-500">Surfaces</span> Back to Life
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
            >
              Professional jet washing for driveways, patios, roofs, walls, and more in Sutton Coldfield and surrounding areas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="tel:07570810766"
                className="flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                <Phone size={20} />
                Call 07570 810766
              </Link>
              <Link
                href="/quote"
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/20 transition-all active:scale-95"
              >
                Get a Free Quote
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {[
                { icon: Clock, text: 'Open 24 Hours' },
                { icon: CheckCircle2, text: 'Residential & Commercial' },
                { icon: MapPin, text: 'Local Service' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <item.icon size={18} className="text-blue-500" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">What We Clean</h3>
            <p className="text-slate-600 text-lg">
              We use professional-grade equipment to restore a wide variety of surfaces to their original glory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Jet Washing', icon: Droplets, desc: 'Professional cleaning for driveways, patios, and roofs at just £3.50 per m².' },
              { title: 'Window Cleaning', icon: Sparkles, desc: 'Crystal clear windows for your home, starting from just £12.' },
              { title: 'Gutter Cleaning', icon: ShieldCheck, desc: 'Keep your property safe from water damage with our thorough gutter clearing.' },
              { title: 'Car Cleaning', icon: CheckCircle2, desc: 'Professional valeting services to keep your vehicle looking brand new.' },
              { title: 'Walls & Exteriors', icon: HomeIcon, desc: 'Refresh brickwork, render, and cladding for instant curb appeal.' },
              { title: 'Commercial', icon: Building2, desc: 'Reliable pressure washing for business forecourts and walkways.' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all">
              View All Services <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Before & After Showcase */}
      <section className="py-24 bg-slate-900 text-white px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4">Transformations</h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-6">See the Difference</h3>
              <p className="text-slate-400 text-lg">
                High-impact results that speak for themselves. We don&apos;t just wash; we restore.
              </p>
            </div>
            <Link href="/quote" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Get Your Transformation
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { label: 'Driveway Restoration', before: '/wall-before.jpeg', after: '/wall-after.jpeg' },
              { label: 'Patio Deep Clean', before: '/driveway-after.jpeg', after: '/patio-before.jpeg' },
              { label: 'Front Path Clean', before: '/patio-after.jpeg', after: '/driveway-before.jpeg' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 flex">
                    <div className="relative flex-1 border-r-2 border-white/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Before</div>
                    </div>
                    <div className="relative flex-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">After</div>
                    </div>
                  </div>
                </div>
                <p className="text-center font-bold text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/driveway-before.jpeg"
                alt="Professional Cleaning Results"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <div className="text-4xl font-bold mb-1">5.0</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <div className="text-sm font-medium opacity-80">Google Rating</div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Why Us</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Why Choose Power Pulse Solutions</h3>
            
            <div className="space-y-8">
              {[
                { title: 'Professional Results', text: 'We use proper jet washing equipment to remove built-up dirt, moss, algae, and grime.' },
                { title: 'Reliable Service', text: 'We focus on quality work, clear communication, and turning up when we say we will.' },
                { title: 'Safer Surfaces', text: 'Cleaning slippery outdoor areas helps improve safety as well as appearance.' },
                { title: 'Local & Trusted', text: 'Serving Sutton Coldfield and surrounding areas with a 5.0 rating.' },
              ].map((point, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{point.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-slate-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Testimonials</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">What Customers Say</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah J.', text: '&ldquo;Absolutely brilliant service. My driveway looks brand new again. Highly recommend Power Pulse!&rdquo;', rating: 5 },
              { name: 'Mark T.', text: '&ldquo;Professional, punctual, and did a fantastic job on our patio. The difference is night and day.&rdquo;', rating: 5 },
              { name: 'David W.', text: '&ldquo;Great local business. They cleaned our commercial entrance and it looks professional again.&rdquo;', rating: 5 },
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 italic mb-6" dangerouslySetInnerHTML={{ __html: review.text }} />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                    {review.name[0]}
                  </div>
                  <span className="font-bold text-slate-900">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24 bg-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-slate-600 text-sm font-bold mb-6">
            <MapPin size={16} />
            <span>Based in Sutton Coldfield</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Areas We Serve</h3>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-12">
            We proudly serve The Royal Town of Sutton Coldfield and all surrounding areas within a 15-mile radius.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Sutton Coldfield', 'Little Aston', 'Four Oaks', 'Wylde Green', 'Walmley', 'Mere Green', 'Streetly', 'Erdington', 'Tamworth', 'Lichfield'].map((area, idx) => (
              <span key={idx} className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl text-slate-700 font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold mb-6">Ready to Refresh Your Property?</h3>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Call now or request a free quote today. We are open 24 hours for your convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:07570810766"
                className="bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-slate-50 transition-all shadow-xl active:scale-95"
              >
                Call 07570 810766
              </Link>
              <Link
                href="/quote"
                className="bg-blue-700 text-white border border-blue-500 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-800 transition-all active:scale-95"
              >
                Get a Quote Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
