'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2, MapPin } from 'lucide-react';
import Link from 'next/link';

const ReviewsPage = () => {
  const reviews = [
    { name: 'Sarah Jenkins', location: 'Sutton Coldfield', text: 'Power Pulse did an amazing job on our driveway. It was covered in moss and oil stains, and now it looks brand new. Very professional and tidy.', rating: 5, date: '2 weeks ago' },
    { name: 'Mark Thompson', location: 'Little Aston', text: 'Highly recommend! They cleaned our patio and the results are incredible. They arrived on time and were very polite throughout.', rating: 5, date: '1 month ago' },
    { name: 'David Wilson', location: 'Walmley', text: 'Used them for our commercial forecourt. Fast, efficient, and a great price. Will definitely be using them again for regular maintenance.', rating: 5, date: '3 weeks ago' },
    { name: 'Emma Louise', location: 'Four Oaks', text: 'Fantastic service from start to finish. The roof cleaning has made such a difference to the look of our house. 5 stars!', rating: 5, date: '2 months ago' },
    { name: 'James Barker', location: 'Streetly', text: 'Great local business. Honest pricing and top-quality work. My patio looks like it was just laid.', rating: 5, date: '1 month ago' },
    { name: 'Linda M.', location: 'Wylde Green', text: 'Very impressed with the wall cleaning. Removed all the red algae and grime. Looks fresh and clean now.', rating: 5, date: '2 weeks ago' },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-24 px-4 md:px-8 text-white text-center">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Star size={16} fill="currentColor" />
            <span>Rated 5.0 on Google</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6">Customer Reviews</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Don&apos;t just take our word for it. See what our local customers in Sutton Coldfield have to say.
          </p>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12 bg-white border-b border-slate-100 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8">
            <div className="text-5xl font-bold text-slate-900 mb-2">5.0</div>
            <div className="flex justify-center gap-1 text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
            </div>
            <div className="text-slate-500 font-medium uppercase tracking-widest text-xs">Average Rating</div>
          </div>
          <div className="p-8 border-y md:border-y-0 md:border-x border-slate-100">
            <div className="text-5xl font-bold text-slate-900 mb-2">10+</div>
            <div className="text-slate-500 font-medium uppercase tracking-widest text-xs mb-4">Google Reviews</div>
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm">
              <CheckCircle2 size={16} />
              100% Verified
            </div>
          </div>
          <div className="p-8">
            <div className="text-5xl font-bold text-slate-900 mb-2">100%</div>
            <div className="text-slate-500 font-medium uppercase tracking-widest text-xs mb-4">Recommendation Rate</div>
            <div className="inline-flex items-center gap-2 text-green-600 font-bold text-sm">
              <Star size={16} fill="currentColor" />
              Top Rated Local
            </div>
          </div>
        </div>
      </section>

      {/* Review Grid */}
      <section className="py-24 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative group hover:shadow-xl transition-all"
              >
                <Quote className="absolute top-8 right-8 text-slate-100 group-hover:text-blue-50 transition-colors" size={64} />
                <div className="relative z-10">
                  <div className="flex gap-1 text-yellow-400 mb-6">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed italic mb-8">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl">
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{review.name}</div>
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                          <MapPin size={12} />
                          {review.location}
                        </div>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs font-medium">{review.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Experience our 5-star service for yourself</h2>
          <p className="text-slate-600 text-lg mb-12">
            Join our growing list of satisfied customers in Sutton Coldfield. Get a free, no-obligation quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:07570810766"
              className="bg-blue-600 text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20"
            >
              Call 07570 810766
            </Link>
            <Link
              href="/quote"
              className="bg-white text-blue-600 border-2 border-blue-600 px-12 py-6 rounded-2xl text-2xl font-bold hover:bg-blue-50 transition-all"
            >
              Get a Quote Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;
