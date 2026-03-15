'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(5, 'Address or area is required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please provide a bit more detail about the job'),
});

type FormData = z.infer<typeof formSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-slate-900 py-24 px-4 md:px-8 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">Contact & Quote</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Ready to refresh your property? Get in touch for a free, no-obligation quote.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          {/* Contact Details */}
          <div className="flex-1 space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Whether you have a question or you&apos;re ready to book, we&apos;re here to help. We aim to respond to all quote requests within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Phone, title: 'Call Us', value: '07570 810766', href: 'tel:07570810766' },
                { icon: Mail, title: 'Email Us', value: 'info@powerpulsesolutions.co.uk', href: 'mailto:info@powerpulsesolutions.co.uk' },
                { icon: MapPin, title: 'Service Area', value: 'Sutton Coldfield & Nearby', href: '#' },
                { icon: Clock, title: 'Hours', value: 'Open 24 Hours', href: '#' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    {item.href !== '#' ? (
                      <a href={item.href} className="text-slate-600 hover:text-blue-600 transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-slate-600">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-100 rounded-[2rem] p-8 aspect-video flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200">
              <MapPin size={48} className="text-slate-300 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">Areas Served</h4>
              <p className="text-slate-500 text-sm">Sutton Coldfield, Little Aston, Four Oaks, Wylde Green, and surrounding areas.</p>
            </div>
          </div>

          {/* Quote Form */}
          <div className="flex-1">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Request a Free Quote</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Full Name</label>
                          <input
                            {...register('fullName')}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="John Doe"
                          />
                          {errors.fullName && <p className="text-red-500 text-xs font-medium">{errors.fullName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Phone Number</label>
                          <input
                            {...register('phone')}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="07xxx xxxxxx"
                          />
                          {errors.phone && <p className="text-red-500 text-xs font-medium">{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <input
                          {...register('email')}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Address / Area</label>
                        <input
                          {...register('address')}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="e.g. Four Oaks, Sutton Coldfield"
                        />
                        {errors.address && <p className="text-red-500 text-xs font-medium">{errors.address.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Service Needed</label>
                        <select
                          {...register('service')}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                        >
                          <option value="">Select a service...</option>
                          <option value="driveway">Driveway Jet Washing</option>
                          <option value="patio">Patio Jet Washing</option>
                          <option value="roof">Roof Cleaning</option>
                          <option value="wall">Wall / Exterior Cleaning</option>
                          <option value="windows">Window Cleaning</option>
                          <option value="gutters">Gutter Cleaning</option>
                          <option value="car">Car Cleaning</option>
                          <option value="commercial">Commercial Cleaning</option>
                          <option value="other">Other / Multiple</option>
                        </select>
                        {errors.service && <p className="text-red-500 text-xs font-medium">{errors.service.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Message / Details</label>
                        <textarea
                          {...register('message')}
                          rows={4}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                          placeholder="Tell us a bit about the job (e.g. size of driveway, level of dirt...)"
                        />
                        {errors.message && <p className="text-red-500 text-xs font-medium">{errors.message.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-blue-600/20"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            Send Quote Request
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Sent!</h3>
                    <p className="text-slate-600 mb-8">
                      Thank you for contacting Power Pulse Solutions. We&apos;ve received your request and will get back to you with a quote within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Send another request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
