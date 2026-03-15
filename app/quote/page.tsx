'use client';

import React, { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Droplets, ShieldCheck, Car, Loader2, Phone, Home as HomeIcon, CheckCircle2, Map as MapIcon, Calculator, Info } from 'lucide-react';

const PropertyMap = lazy(() => import('@/components/PropertyMap'));

type ServiceType = 'windows' | 'gutters' | 'car';

const PROPERTY_TYPES = [
  { label: 'Terraced House', value: 'terraced', bedrooms: '2-3' },
  { label: 'Semi-Detached', value: 'semi', bedrooms: '3' },
  { label: 'Detached House', value: 'detached', bedrooms: '3-4' },
  { label: 'Large Detached', value: 'large', bedrooms: '4-5' },
  { label: 'Bungalow', value: 'bungalow', bedrooms: '2-3' },
];

const QuotePage = () => {
  const [jetArea, setJetArea] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceType>('windows');
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'map' | 'quote'>('map');
  const [mapMeasuredArea, setMapMeasuredArea] = useState<number>(0);

  const mapPrice = mapMeasuredArea > 0 ? (mapMeasuredArea * 3.5).toFixed(2) : '0.00';
  const jetPrice = jetArea ? (parseFloat(jetArea) * 3.5).toFixed(2) : '0.00';

  const serviceOptions = [
    { key: 'windows' as ServiceType, label: 'Windows', icon: Sparkles, desc: 'From £12' },
    { key: 'gutters' as ServiceType, label: 'Gutters', icon: ShieldCheck, desc: 'From £50' },
    { key: 'car' as ServiceType, label: 'Car Clean', icon: Car, desc: 'From £8' },
  ];

  const getWindowPrice = (): string => {
    const prices: Record<string, string> = {
      terraced: '£12 – £16', semi: '£16 – £20', detached: '£20 – £25',
      large: '£25 – £30', bungalow: '£12 – £16'
    };
    return prices[selectedProperty] || '';
  };

  const getGutterPrice = (): string => {
    const prices: Record<string, string> = {
      terraced: '£60 – £100', semi: '£70 – £120', detached: '£90 – £150',
      large: '£120 – £150', bungalow: '£50 – £80'
    };
    return prices[selectedProperty] || '';
  };

  return (
    <div className="pb-20 min-h-screen bg-slate-50">
      <section className="bg-slate-900 pt-32 pb-20 px-4 md:px-8 text-white text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get a Quote</h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Measure your property from satellite view or enter the area size for an instant jet washing price.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full shadow-lg border border-slate-100 p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'map' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon size={16} />
              Satellite Measure
            </button>
            <button
              onClick={() => setActiveTab('quote')}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'quote' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator size={16} />
              Quick Quote
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ============ MAP TAB ============ */}
          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-6 md:p-10 space-y-6">
                  <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Measure Your Property</h2>
                    <p className="text-slate-500 text-sm">
                      Find your home on satellite view, draw around the area you want cleaned, and get an instant price.
                    </p>
                  </div>

                  <Suspense fallback={
                    <div className="flex items-center justify-center h-[450px] bg-slate-100 rounded-2xl">
                      <Loader2 className="animate-spin text-blue-600" size={32} />
                    </div>
                  }>
                    <PropertyMap
                      onAreaCalculated={(a: number) => {
                        setMapMeasuredArea(a);
                      }}
                      onAddressResolved={(addr: string) => {
                        setAddress(addr);
                      }}
                    />
                  </Suspense>

                  {/* Quote Actions */}
                  {mapMeasuredArea > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-50 border border-blue-100 rounded-2xl p-6"
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="text-sm text-slate-500 font-bold">Your Measured Area</div>
                          <div className="text-3xl font-bold text-slate-900">{mapMeasuredArea.toFixed(1)} m&sup2;</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-blue-600 font-bold">Jet Washing Price</div>
                          <div className="text-3xl font-bold text-blue-600">&pound;{mapPrice}</div>
                          <div className="text-xs text-slate-400">at &pound;3.50/m&sup2;</div>
                        </div>
                      </div>
                      <Link
                        href="tel:07570810766"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
                      >
                        <Phone size={18} />
                        Call to Book — 07570 810766
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ============ QUICK QUOTE TAB ============ */}
          {activeTab === 'quote' && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Jet Washing Calculator */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-600 text-white p-2.5 rounded-xl">
                      <Droplets size={22} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Jet Washing Calculator</h2>
                      <p className="text-slate-500 text-sm">Enter the size of the area in m² for an instant price</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Area Size (m&sup2;)</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={jetArea}
                            onChange={(e) => setJetArea(e.target.value)}
                            placeholder="e.g. 70"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">m&sup2;</span>
                        </div>
                        <p className="text-slate-500 text-xs flex items-center gap-1">
                          <Info size={14} />
                          Typical driveway: 50–80m&sup2; · Patio: 20–40m&sup2;
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-8 text-white text-center space-y-3 shadow-xl">
                      <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Your Price</span>
                      <div className="text-5xl font-bold">
                        &pound;{jetPrice}
                      </div>
                      <p className="text-slate-400 text-sm">at &pound;3.50 per m&sup2;</p>
                      {parseFloat(jetArea) > 0 && (
                        <p className="text-slate-500 text-xs">{jetArea}m&sup2; &times; &pound;3.50 = &pound;{jetPrice}</p>
                      )}
                      <Link
                        href="tel:07570810766"
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4"
                      >
                        <Phone size={18} />
                        Call to Book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Services */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12 space-y-8">
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Other Services</h2>
                    <p className="text-slate-500 text-sm">Select a service to see pricing</p>
                  </div>

                  {/* Service Selector */}
                  <div className="grid grid-cols-3 gap-3">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setSelectedService(opt.key)}
                        className={`p-4 rounded-2xl border-2 text-center transition-all ${
                          selectedService === opt.key
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                        }`}
                      >
                        <opt.icon size={24} className="mx-auto mb-2" />
                        <div className="text-sm font-bold">{opt.label}</div>
                        <div className="text-xs opacity-60 mt-1">{opt.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Windows */}
                  {selectedService === 'windows' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Property Type</label>
                        <div className="relative">
                          <HomeIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <select
                            value={selectedProperty}
                            onChange={(e) => setSelectedProperty(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                          >
                            <option value="">Select property type...</option>
                            {PROPERTY_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label} ({type.bedrooms} bed)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {selectedProperty && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                          <div className="text-sm text-slate-500 font-bold mb-1">Window Cleaning Price</div>
                          <div className="text-3xl font-bold text-blue-600 mb-4">{getWindowPrice()}</div>
                          <Link href="tel:07570810766" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                            <Phone size={18} /> Call to Book
                          </Link>
                        </motion.div>
                      )}
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                        <h5 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Full Price Guide</h5>
                        {[
                          { label: '2 Bed House', price: '£12 – £16' },
                          { label: '3 Bed House', price: '£16 – £20' },
                          { label: '4 Bed House', price: '£20 – £25' },
                          { label: '5 Bed House', price: '£25 – £30' },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-200 last:border-0">
                            <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                            <span className="text-sm font-bold text-blue-600">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Gutters */}
                  {selectedService === 'gutters' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Property Type</label>
                        <div className="relative">
                          <HomeIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <select
                            value={selectedProperty}
                            onChange={(e) => setSelectedProperty(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                          >
                            <option value="">Select property type...</option>
                            {PROPERTY_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label} ({type.bedrooms} bed)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {selectedProperty && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                          <div className="text-sm text-slate-500 font-bold mb-1">Gutter Cleaning Price</div>
                          <div className="text-3xl font-bold text-blue-600 mb-4">{getGutterPrice()}</div>
                          <Link href="tel:07570810766" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                            <Phone size={18} /> Call to Book
                          </Link>
                        </motion.div>
                      )}
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                        <h5 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Full Price Guide</h5>
                        {[
                          { label: 'Bungalow', price: '£50 – £80' },
                          { label: 'Terrace House', price: '£60 – £100' },
                          { label: '3-Bed Semi', price: '£70 – £120' },
                          { label: '4-Bed Detached', price: '£90 – £150' },
                          { label: 'Large House', price: '£120 – £150' },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-200 last:border-0">
                            <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                            <span className="text-sm font-bold text-blue-600">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Car */}
                  {selectedService === 'car' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                        {[
                          { label: 'Exterior Wash', price: '£8 – £15' },
                          { label: 'Exterior Wash & Dry', price: '£10 – £18' },
                          { label: 'Interior Vacuum', price: '£8 – £15' },
                          { label: 'Inside & Outside Clean', price: '£15 – £20' },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0">
                            <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                            <span className="text-sm font-bold text-blue-600">{item.price}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="tel:07570810766"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                      >
                        <Phone size={18} />
                        Call to Book — 07570 810766
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-6">
            * All prices are estimates. Final quotes are provided after on-site measurement.
          </p>
          <Link
            href="tel:07570810766"
            className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-all"
          >
            <Phone size={18} />
            Call for a custom quote: 07570 810766
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
