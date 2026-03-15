'use client';

import React, { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, MapPin, Sparkles, Droplets, ShieldCheck, Car, Info, Loader2, Phone, Home as HomeIcon, Zap, CheckCircle2, Map as MapIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const PropertyMap = lazy(() => import('@/components/PropertyMap'));

type ServiceType = 'jet' | 'windows' | 'gutters' | 'car' | 'all';

const PROPERTY_TYPES = [
  { label: 'Terraced House', value: 'terraced', bedrooms: '2-3', avgDriveway: '30-50' },
  { label: 'Semi-Detached', value: 'semi', bedrooms: '3', avgDriveway: '40-60' },
  { label: 'Detached House', value: 'detached', bedrooms: '3-4', avgDriveway: '50-80' },
  { label: 'Large Detached', value: 'large', bedrooms: '4-5', avgDriveway: '70-120' },
  { label: 'Bungalow', value: 'bungalow', bedrooms: '2-3', avgDriveway: '40-60' },
];

const QuotePage = () => {
  const [area, setArea] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceType>('all');
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [cleanArea, setCleanArea] = useState<'front' | 'back' | 'both'>('front');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'ai' | 'manual'>('map');
  const [mapMeasuredArea, setMapMeasuredArea] = useState<number>(0);
  const [mapAddress, setMapAddress] = useState<string>('');

  // Jet Washing Calculation
  const jetPrice = area ? (parseFloat(area) * 3.5).toFixed(2) : '0.00';
  const mapPrice = mapMeasuredArea > 0 ? (mapMeasuredArea * 3.5).toFixed(2) : '0.00';

  const serviceOptions = [
    { key: 'all' as ServiceType, label: 'Full Quote', icon: Zap, desc: 'All services' },
    { key: 'jet' as ServiceType, label: 'Jet Washing', icon: Droplets, desc: '£3.50/m²' },
    { key: 'windows' as ServiceType, label: 'Windows', icon: Sparkles, desc: 'From £12' },
    { key: 'gutters' as ServiceType, label: 'Gutters', icon: ShieldCheck, desc: 'From £50' },
    { key: 'car' as ServiceType, label: 'Car Clean', icon: Car, desc: 'From £8' },
  ];

  const pricingData = {
    windows: [
      { label: '2 Bed House', price: '£12 – £16' },
      { label: '3 Bed House', price: '£16 – £20' },
      { label: '4 Bed House', price: '£20 – £25' },
      { label: '5 Bed House', price: '£25 – £30' },
    ],
    gutters: [
      { label: 'Bungalow', price: '£50 – £80' },
      { label: 'Terrace', price: '£60 – £100' },
      { label: '3-Bed Semi', price: '£70 – £120' },
      { label: '4-Bed Detached', price: '£90 – £150' },
      { label: 'Large House', price: '£120 – £150' },
    ],
    car: [
      { label: 'Exterior Wash', price: '£8 – £15' },
      { label: 'Exterior Wash & Dry', price: '£10 – £18' },
      { label: 'Interior Vacuum', price: '£8 – £15' },
      { label: 'Inside & Outside Clean', price: '£15 – £20' },
    ],
  };

  const generateLocalEstimate = (
    service: ServiceType,
    property: typeof PROPERTY_TYPES[0] | null | undefined,
    areaType: 'front' | 'back' | 'both'
  ): string => {
    const avgArea = property
      ? parseInt(property.avgDriveway.split('-')[1])
      : 60;
    const areaMultiplier = areaType === 'both' ? 1.8 : 1;
    const estimatedArea = Math.round(avgArea * areaMultiplier);
    const price = (estimatedArea * 3.5).toFixed(0);

    const bedrooms = property ? property.bedrooms.split('-')[0] : '3';
    const bedroomNum = parseInt(bedrooms);

    let result = `Estimate for your property\n\n`;

    if (service === 'jet' || service === 'all') {
      result += `Jet Washing (${areaType === 'both' ? 'front & back' : areaType})\n`;
      result += `Estimated area: ~${estimatedArea}m²\n`;
      result += `Price: ~£${price} (at £3.50/m²)\n\n`;
    }

    if (service === 'windows' || service === 'all') {
      const windowPrices: Record<number, string> = { 2: '£12 – £16', 3: '£16 – £20', 4: '£20 – £25', 5: '£25 – £30' };
      result += `Window Cleaning\n`;
      result += `${bedroomNum}-bed house: ${windowPrices[bedroomNum] || '£16 – £20'}\n\n`;
    }

    if (service === 'gutters' || service === 'all') {
      const gutterPrices: Record<string, string> = {
        terraced: '£60 – £100', semi: '£70 – £120', detached: '£90 – £150',
        large: '£120 – £150', bungalow: '£50 – £80'
      };
      result += `Gutter Cleaning\n`;
      result += `${property?.label || 'Standard property'}: ${gutterPrices[property?.value || 'semi'] || '£70 – £120'}\n\n`;
    }

    if (service === 'car') {
      result += `Car Cleaning\n`;
      result += `Exterior wash: £8 – £15\n`;
      result += `Full inside & outside clean: £15 – £20\n\n`;
    }

    result += `These are estimates based on typical property sizes.\nFinal price confirmed after on-site measurement.\n\n`;
    result += `For an exact quote, call us on 07570 810766 or book a free on-site visit.`;

    return result;
  };

  const handleAiQuote = async () => {
    if (!address) return;
    setIsAiLoading(true);
    setAiResult(null);

    const propertyInfo = selectedProperty
      ? PROPERTY_TYPES.find(p => p.value === selectedProperty)
      : null;

    const serviceLabel = serviceOptions.find(s => s.key === selectedService)?.label || 'all services';

    const pricingContext = `
PRICING RULES (use these EXACT prices):
- Jet Washing: £3.50 per m² (area x 3.50)
- Window Cleaning: 2-bed £12-£16, 3-bed £16-£20, 4-bed £20-£25, 5-bed £25-£30
- Gutter Cleaning: Bungalow £50-£80, Terrace £60-£100, 3-bed semi £70-£120, 4-bed detached £90-£150, Large £120-£150
- Car Cleaning: Exterior wash £8-£15, Wash & dry £10-£18, Interior vacuum £8-£15, Full clean £15-£20
    `;

    const prompt = `You are a friendly, professional quoting assistant for Power Pulse Solutions, a jet washing and exterior cleaning company based in Sutton Coldfield, Birmingham, UK.

${pricingContext}

The customer wants a quote for: ${selectedService === 'all' ? 'ALL services (jet washing, windows, gutters)' : serviceLabel}
Address: ${address}
${propertyInfo ? `Property type: ${propertyInfo.label} (typically ${propertyInfo.bedrooms} bedrooms, driveway area usually ${propertyInfo.avgDriveway}m²)` : 'Property type: Not specified - make a reasonable guess based on the address area.'}
${selectedService === 'jet' || selectedService === 'all' ? `Area to clean: ${cleanArea === 'front' ? 'Front driveway/path only' : cleanArea === 'back' ? 'Back patio/garden area only' : 'Both front and back'}` : ''}

INSTRUCTIONS:
1. Greet the customer and acknowledge their address.
2. Based on the property type and address area, estimate the likely property size.
3. For jet washing: Estimate the m² area for the requested clean area and calculate price at £3.50/m². Show the calculation.
4. For other services: Give the appropriate price range based on the property size.
5. If "all services" selected, give a breakdown of each service and a TOTAL estimated range.
6. Be concise - no more than 200 words.
7. End with: "For an exact quote, call us on 07570 810766 or book a free on-site visit."
8. Use line breaks for readability.`;

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        const estimate = generateLocalEstimate(selectedService, propertyInfo, cleanArea);
        setAiResult(estimate);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      setAiResult(response.text || "Sorry, we couldn't generate an estimate. Please try the manual calculator below.");
    } catch (error) {
      console.error("AI Quote Error:", error);
      const estimate = generateLocalEstimate(selectedService, propertyInfo, cleanArea);
      setAiResult(estimate);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-20 px-4 md:px-8 text-white text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Instant Quote Tool</h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Measure your property from satellite view, get an AI estimate, or use our manual calculator.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full shadow-lg border border-slate-100 p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-5 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'map' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon size={16} />
              Satellite Measure
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-5 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'ai' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap size={16} />
              AI Quote
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-5 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'manual' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator size={16} />
              Manual
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
                        setArea(a > 0 ? a.toFixed(1) : '');
                      }}
                      onAddressResolved={(addr: string) => {
                        setMapAddress(addr);
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
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href="tel:07570810766"
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
                        >
                          <Phone size={18} />
                          Call to Book
                        </Link>
                        <Link
                          href="/contact"
                          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
                        >
                          Request Full Quote
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ============ AI TAB ============ */}
          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12 space-y-10">
                  {/* Step 1: Choose Service */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">1. What do you need?</h3>
                    <p className="text-slate-500 text-sm mb-4">Select a service or get a full property quote</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
                  </div>

                  {/* Step 2: Property Details - conditional based on service */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      2. {selectedService === 'car' ? 'Your Vehicle' : 'Your Property'}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4">
                      {selectedService === 'car' ? 'Tell us about your car clean' : 'Help us estimate more accurately'}
                    </p>

                    {selectedService === 'car' ? (
                      /* Car cleaning - no property type needed */
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Your Location</label>
                          <div className="relative">
                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Enter your address or postcode..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                          <h5 className="text-sm font-bold text-slate-700 mb-3">Car Cleaning Prices</h5>
                          <div className="space-y-2">
                            {[
                              { label: 'Exterior Wash', price: '£8 – £15' },
                              { label: 'Exterior Wash & Dry', price: '£10 – £18' },
                              { label: 'Interior Vacuum', price: '£8 – £15' },
                              { label: 'Inside & Outside Clean', price: '£15 – £20' },
                            ].map((item, i) => (
                              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                                <span className="text-sm text-slate-700">{item.label}</span>
                                <span className="text-sm font-bold text-blue-600">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Property-based services */
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Address</label>
                            <div className="relative">
                              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your full address..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                              />
                            </div>
                          </div>
                          {selectedService !== 'windows' && (
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
                          )}
                          {selectedService === 'windows' && (
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-slate-700">Number of Bedrooms</label>
                              <div className="relative">
                                <HomeIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                  value={selectedProperty}
                                  onChange={(e) => setSelectedProperty(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                                >
                                  <option value="">Select bedrooms...</option>
                                  <option value="terraced">2 Bedrooms</option>
                                  <option value="semi">3 Bedrooms</option>
                                  <option value="detached">4 Bedrooms</option>
                                  <option value="large">5+ Bedrooms</option>
                                </select>
                              </div>
                            </div>
                          )}
                        </div>

                        {(selectedService === 'jet' || selectedService === 'all') && (
                          <div className="mt-6 space-y-2">
                            <label className="text-sm font-bold text-slate-700">Area to Clean</label>
                            <div className="flex gap-3">
                              {[
                                { key: 'front' as const, label: 'Front Only', desc: 'Driveway / path' },
                                { key: 'back' as const, label: 'Back Only', desc: 'Patio / garden' },
                                { key: 'both' as const, label: 'Front & Back', desc: 'Full property' },
                              ].map((opt) => (
                                <button
                                  key={opt.key}
                                  onClick={() => setCleanArea(opt.key)}
                                  className={`flex-1 p-3 rounded-xl border-2 text-center transition-all ${
                                    cleanArea === opt.key
                                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                                  }`}
                                >
                                  <div className="text-sm font-bold">{opt.label}</div>
                                  <div className="text-xs opacity-60">{opt.desc}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Step 3: Get Quote */}
                  <div>
                    <button
                      onClick={handleAiQuote}
                      disabled={isAiLoading || !address}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20"
                    >
                      {isAiLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />
                          Generating Your Quote...
                        </>
                      ) : (
                        <>
                          <Zap size={24} />
                          Get Instant Quote
                        </>
                      )}
                    </button>
                  </div>

                  {/* AI Result */}
                  <AnimatePresence>
                    {aiResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-blue-600 p-2 rounded-lg">
                            <CheckCircle2 size={20} />
                          </div>
                          <h3 className="text-xl font-bold">Your Estimate</h3>
                        </div>
                        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap mb-8">
                          {aiResult}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link
                            href="tel:07570810766"
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
                          >
                            <Phone size={18} />
                            Call to Book
                          </Link>
                          <Link
                            href="/contact"
                            className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                          >
                            Request Exact Quote
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============ MANUAL TAB ============ */}
          {activeTab === 'manual' && (
            <motion.div
              key="manual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12 space-y-10">
                  {/* Manual Jet Wash Calculator */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-blue-600 text-white p-2 rounded-lg">
                        <Droplets size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Jet Washing Calculator</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Estimated Area (m&sup2;)</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={area}
                              onChange={(e) => setArea(e.target.value)}
                              placeholder="e.g. 70"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">m&sup2;</span>
                          </div>
                          <p className="text-slate-500 text-xs flex items-center gap-1">
                            <Info size={14} />
                            Typical driveway is around 50-80m&sup2;
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-900 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl">
                        <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Estimated Price</span>
                        <div className="text-5xl font-bold">&pound;{jetPrice}</div>
                        <p className="text-slate-400 text-sm">Based on &pound;3.50 per m&sup2;</p>
                        <Link
                          href="/contact"
                          className="block w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4"
                        >
                          Book This Clean
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 font-bold text-sm uppercase tracking-widest">Other Services</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  {/* Pricing Tables */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { name: 'Windows', icon: Sparkles, data: pricingData.windows },
                      { name: 'Gutters', icon: ShieldCheck, data: pricingData.gutters },
                      { name: 'Car Clean', icon: Car, data: pricingData.car },
                    ].map((service, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-600 text-white p-2 rounded-lg">
                            <service.icon size={20} />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                        </div>
                        <div className="space-y-3">
                          {service.data.map((opt, oIdx) => (
                            <div key={oIdx} className="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all">
                              <span className="text-sm font-medium text-slate-700">{opt.label}</span>
                              <span className="text-sm font-bold text-blue-600">{opt.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-6">
            * All prices are estimates. Final quotes are provided after on-site measurement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="tel:07570810766"
              className="flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-all"
            >
              <Phone size={18} />
              Call for a custom quote: 07570 810766
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
