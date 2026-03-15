'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { CheckCircle2, Droplets, Sparkles, ShieldCheck, Home as HomeIcon, Building2, ArrowRight, Car } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      title: 'Jet Washing',
      icon: Droplets,
      image: '/wall-after.jpeg',
      text: 'Professional pressure washing for driveways, patios, and roofs. We restore your surfaces to their original glory.',
      price: '£3.50 per m²',
      features: ['Driveway Restoration', 'Patio Deep Clean', 'Roof Moss Removal', 'Block Paving Re-sanding'],
      pricingTable: [
        { label: 'Example: 50m² driveway', price: '£175' },
        { label: 'Example: 70m² driveway', price: '£245' },
        { label: 'Example: 100m² driveway', price: '£350' },
      ]
    },
    {
      title: 'Window Cleaning',
      icon: Sparkles,
      image: '/driveway-before.jpeg',
      text: 'Crystal clear windows for your entire home. We use professional techniques for a streak-free finish.',
      price: 'From £12',
      features: ['Full House Cleaning', 'Frames & Sills Included', 'Regular or One-off', 'Reliable Schedule'],
      pricingTable: [
        { label: '2 Bed House', price: '£12 – £16' },
        { label: '3 Bed House', price: '£16 – £20' },
        { label: '4 Bed House', price: '£20 – £25' },
        { label: '5 Bed House', price: '£25 – £30' },
      ]
    },
    {
      title: 'Gutter Cleaning',
      icon: ShieldCheck,
      image: '/patio-after.jpeg',
      text: 'Protect your property from water damage. We clear all debris and ensure your gutters are flowing freely.',
      price: 'From £50',
      features: ['Full Debris Removal', 'Downpipe Flushing', 'Minor Repairs', 'Before & After Photos'],
      pricingTable: [
        { label: 'Bungalow', price: '£50 – £80' },
        { label: 'Terrace House', price: '£60 – £100' },
        { label: '3-Bed Semi', price: '£70 – £120' },
        { label: '4-Bed Detached', price: '£90 – £150' },
        { label: 'Large House', price: '£120 – £150' },
      ]
    },
    {
      title: 'Car Cleaning',
      icon: Car,
      image: '/wall-before.jpeg',
      text: 'Professional valeting services at your doorstep. From a quick exterior wash to a full interior deep clean.',
      price: 'From £8',
      features: ['Exterior Hand Wash', 'Interior Vacuum', 'Wheel Cleaning', 'Full Valeting Options'],
      pricingTable: [
        { label: 'Exterior Wash', price: '£8 – £15' },
        { label: 'Exterior Wash & Dry', price: '£10 – £18' },
        { label: 'Interior Vacuum', price: '£8 – £15' },
        { label: 'Inside & Outside Clean', price: '£15 – £20' },
      ]
    },
    {
      title: 'Commercial Cleaning',
      icon: Building2,
      image: '/surface-before.jpeg',
      text: 'Maintain a professional image for your business. We clean forecourts, walkways, and shop fronts.',
      price: 'Custom Quote',
      features: ['Business Forecourts', 'Retail Walkways', 'Out-of-hours Service', 'Fully Insured'],
      pricingTable: []
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-20 px-4 md:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
            Professional exterior cleaning solutions tailored to your property&apos;s needs.
          </p>
        </div>
      </section>

      {/* Service List */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 relative aspect-video lg:aspect-square w-full rounded-[2rem] overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-600 px-4 py-2 rounded-xl">
                  <service.icon size={24} />
                  <span className="font-bold uppercase tracking-wider text-sm">Service</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900">{service.title}</h2>
                {service.price && (
                  <p className="text-2xl font-bold text-blue-600">{service.price}</p>
                )}
                <p className="text-slate-600 text-lg leading-relaxed">{service.text}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 size={20} className="text-blue-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.pricingTable.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3">
                    <h5 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Price Guide</h5>
                    {service.pricingTable.map((row, rIdx) => (
                      <div key={rIdx} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                        <span className="text-sm text-slate-700 font-medium">{row.label}</span>
                        <span className="text-sm font-bold text-blue-600">{row.price}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="pt-4">
                  <Link
                    href="tel:07570810766"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                  >
                    Call for a Quote <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Not sure what you need?</h2>
          <p className="text-slate-600 text-lg mb-12">
            We offer free site visits and consultations to assess your property and provide an accurate, no-obligation quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:07570810766"
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 transition-all shadow-xl"
            >
              Call 07570 810766
            </Link>
            <Link
              href="/quote"
              className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-all"
            >
              Get a Quote Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
