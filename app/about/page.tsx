'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Users, Award, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="bg-slate-900 py-24 px-4 md:px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/surface-before.jpeg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-8">About Power Pulse Solutions</h1>
          <p className="text-slate-400 text-xl md:text-2xl max-w-3xl leading-relaxed">
            Restoring the beauty and safety of properties across Sutton Coldfield with professional pressure washing expertise.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">Our Story</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900">Professional Service, Local Roots</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Power Pulse Solutions was founded with a simple goal: to provide reliable, high-quality jet washing services for residential and commercial properties in our local community.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              We understand that your property is your biggest investment. Built-up dirt, moss, and algae don&apos;t just look bad—they can cause long-term damage and create slippery, unsafe surfaces. We help restore outdoor spaces to a cleaner, safer, and better-maintained condition with professional service and meticulous attention to detail.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">5.0</div>
                <div className="text-slate-500 font-medium">Google Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">2+</div>
                <div className="text-slate-500 font-medium">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wall-after.jpeg"
                alt="Our Professional Service"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Our Core Values</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              The principles that guide every job we do, from small residential paths to large commercial forecourts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Reliable Service', icon: Users, text: 'We turn up on time, every time. Clear communication is at the heart of what we do.' },
              { title: 'High-Quality Results', icon: Award, text: 'We don\'t cut corners. We use the best equipment to ensure a deep, lasting clean.' },
              { title: 'Professional Equipment', icon: ShieldCheck, text: 'Industrial-grade pressure washers and specialized treatments for every surface.' },
              { title: 'Customer-First', icon: Star, text: 'Your satisfaction is our priority. We treat every property as if it were our own.' },
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-12 text-white">
          <div className="flex-1">
            <h3 className="text-3xl md:text-5xl font-bold mb-6">Trusted by Homeowners &amp; Businesses</h3>
            <p className="text-slate-400 text-lg mb-8">
              We are fully insured and committed to safety. Whether it&apos;s a small driveway or a large retail park, we deliver the same level of professional care.
            </p>
            <ul className="space-y-4">
              {['Public Liability Insurance', 'Professional Grade Equipment', 'Eco-Friendly Treatments', 'Satisfaction Guaranteed'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-blue-500" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
