import { useState } from 'react';
import { Star, Check, X as CloseIcon, ShieldCheck, Zap, Award, BookOpen, Clock, Phone, HelpCircle } from 'lucide-react';
import { Product, CartItem } from '../types';
import { products, comparisonFeatures } from '../data';

interface HomeViewProps {
  onAddToCart: (product: Product, years: 1 | 2 | 3, includeToken: boolean) => void;
  onOpenEnquiry: (prefilledDscClass?: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function HomeView({ onAddToCart, onOpenEnquiry, setActiveTab }: HomeViewProps) {
  // Configurator popup state for quick buy
  const [selectedProductForBuy, setSelectedProductForBuy] = useState<Product | null>(null);
  const [selectedYears, setSelectedYears] = useState<1 | 2 | 3>(2);
  const [includeToken, setIncludeToken] = useState<boolean>(true);

  // Tabs state inside "Why We? / About Us / DSC Uses" section
  const [activeInfoTab, setActiveInfoTab] = useState<'why' | 'about' | 'uses'>('why');

  // Accordion FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const bestSellingProducts = products.filter(p => p.id !== 'epass2003-token');

  const handleOpenQuickBuy = (product: Product) => {
    setSelectedProductForBuy(product);
    // Defaults based on product type
    if (product.category === 'renewal') {
      setIncludeToken(false);
    } else {
      setIncludeToken(true);
    }
    setSelectedYears(2);
  };

  const handleConfirmQuickBuy = () => {
    if (selectedProductForBuy) {
      onAddToCart(selectedProductForBuy, selectedYears, includeToken);
      setSelectedProductForBuy(null);
    }
  };

  const calculateQuickBuyPrice = () => {
    if (!selectedProductForBuy) return 0;
    let basePrice = selectedProductForBuy.price;
    
    // adjust price based on years selected
    if (selectedYears === 1) {
      basePrice = Math.round(basePrice * 0.7);
    } else if (selectedYears === 3) {
      basePrice = Math.round(basePrice * 1.35);
    }

    // adjust token price
    if (includeToken && selectedProductForBuy.category === 'renewal') {
      basePrice += 399; // add token price
    } else if (!includeToken && selectedProductForBuy.category !== 'renewal') {
      basePrice -= 300; // deduct token cost for renewal-style download only
    }

    return basePrice;
  };

  const brandLogos = [
    { name: 'XtraTrust', desc: 'Licensed CA', bg: 'bg-indigo-50', text: 'text-indigo-900' },
    { name: 'eMudhra', desc: 'Trust Delivered', bg: 'bg-amber-50', text: 'text-amber-900' },
    { name: 'Capricorn', desc: 'Identity Services', bg: 'bg-rose-50', text: 'text-rose-900' },
    { name: 'Pantasign', desc: 'Secure DSC', bg: 'bg-teal-50', text: 'text-teal-900' },
    { name: 'VSign', desc: 'Certifying Authority', bg: 'bg-blue-50', text: 'text-blue-900' },
    { name: 'SignX', desc: 'Instant Signing', bg: 'bg-emerald-50', text: 'text-emerald-900' }
  ];

  const badgesWhyWe = [
    { label: 'CA Licensed', color: 'border-emerald-200 text-emerald-800 bg-emerald-50/50', icon: '✓' },
    { label: 'Lowest Price Guaranteed', color: 'border-blue-200 text-blue-800 bg-blue-50/50', icon: '🏷️' },
    { label: '1+ Lakhs DSC Issued', color: 'border-amber-200 text-amber-800 bg-amber-50/50', icon: '🏆' },
    { label: 'Delhi Store (Direct Support)', color: 'border-purple-200 text-purple-800 bg-purple-50/50', icon: '🏢' },
    { label: 'Established in 2026', color: 'border-sky-200 text-sky-800 bg-sky-50/50', icon: '📅' },
    { label: '4.9/5 Google Rated', color: 'border-yellow-200 text-yellow-800 bg-yellow-50/50', icon: '⭐' },
    { label: 'Instant 15-Min DSC', color: 'border-orange-200 text-orange-800 bg-orange-50/50', icon: '⚡' },
    { label: '100% Paperless eKYC', color: 'border-teal-200 text-teal-800 bg-teal-50/50', icon: '🍃' },
    { label: '3500+ Channel Partners', color: 'border-pink-200 text-pink-800 bg-pink-50/50', icon: '👥' }
  ];

  return (
    <div id="home-view-container" className="space-y-16 pb-16 animate-in fade-in duration-200">
      
      {/* 1. Main Hero Block */}
      <section id="hero-section" className="bg-gradient-to-b from-blue-50/40 via-white to-white py-12 px-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              <Zap className="w-3.5 h-3.5 text-blue-700 animate-bounce" />
              <span>India's Most Trusted Digital Signature Provider</span>
            </div>
            
            <h1 className="font-display font-extrabold text-3xl sm:text-4.5xl text-blue-950 leading-tight tracking-tight">
              Buy Digital Signature Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-500">Online</span> with DSC India
            </h1>

            {/* Screenshots bullets style */}
            <ul className="space-y-3.5 text-slate-700 text-sm sm:text-base">
              <li className="flex items-start gap-2.5">
                <span className="text-blue-700 font-bold text-lg mt-0.5">•</span>
                <span>
                  <strong className="text-blue-950 font-bold italic">Best Prices Guaranteed -</strong> Get affordable and instant Digital Signature Certificates. Contact us via WhatsApp or Phone call for custom pricing.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-700 font-bold text-lg mt-0.5">•</span>
                <span>
                  <strong className="text-blue-950 font-bold italic">Aadhaar eKYC -</strong> Instant DSC Issuance within 30 Minutes*.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-700 font-bold text-lg mt-0.5">•</span>
                <span>
                  <strong className="text-blue-950 font-bold italic">PAN India DSC support -</strong> Quick video verification help.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-700 font-bold text-lg mt-0.5">•</span>
                <span>
                  <strong className="text-blue-950 font-bold italic">Same day issuance</strong> Class 3, DGFT.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-700 font-bold text-lg mt-0.5">•</span>
                <span>
                  <strong className="text-blue-950 font-bold italic">New & Renewal of Digital Signature -</strong> within 30 Minutes*.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-700 font-bold text-lg mt-0.5">•</span>
                <span>
                  <strong className="text-blue-950 font-bold italic">Authorised Business partner -</strong> By CAs licensed by CCA.
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveTab('buy-dsc')}
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-7 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm cursor-pointer"
              >
                Buy DSC Certificate
              </button>
              <button
                onClick={() => onOpenEnquiry('Class 3 (Individual)')}
                className="bg-white hover:bg-slate-50 text-blue-900 border-2 border-blue-900 font-bold px-7 py-3 rounded-xl transition-all text-sm cursor-pointer"
              >
                Instant Expert Assistance
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {/* Visual highlight box */}
            <div className="bg-gradient-to-tr from-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-blue-800">
              <div className="absolute top-0 right-0 h-40 w-40 bg-blue-800/25 rounded-full filter blur-3xl"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center border-b border-blue-800 pb-4">
                  <div>
                    <p className="text-[10px] text-sky-400 font-extrabold uppercase tracking-widest">CCA Compliant</p>
                    <h3 className="text-lg font-bold font-display">Instant eKYC Flow</h3>
                  </div>
                  <Award className="w-8 h-8 text-amber-400" />
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/10 rounded-full h-6 w-6 flex items-center justify-center text-sky-300 font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Online Order Form</h4>
                      <p className="text-blue-200 mt-0.5">Select your Class 3 or DGFT configuration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-white/10 rounded-full h-6 w-6 flex items-center justify-center text-sky-300 font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Paperless eKYC Auth</h4>
                      <p className="text-blue-200 mt-0.5">Provide Aadhaar OTP or PAN details instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-white/10 rounded-full h-6 w-6 flex items-center justify-center text-sky-300 font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-white text-sm">1-Min Video Submission</h4>
                      <p className="text-blue-200 mt-0.5">Show documents and read verification PIN</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/50 p-4 rounded-xl border border-blue-800/80 text-center">
                  <p className="text-xs text-blue-200">Need help? Speak with our live support</p>
                  <a href="tel:+918287572721" className="text-lg font-extrabold font-display text-white block mt-0.5">+91 8287572721</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Comprehensive Comparison Matrix */}
      <section id="comparison-section" className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-display font-extrabold text-2.5xl sm:text-3xl text-slate-900">
            Apply DSC Online Today and Get Your Digital Signature Certificate Delivered Fast!
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Choose the specific class of Digital Signature Certificate (DSC) that meets your corporate filing, tender applications, or legal requirements.
          </p>
        </div>

        {/* 4 Cards columns matching screenshot 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          
          {/* Column 1: Class 3 Individual Signing DSC */}
          <div className="border border-slate-200 hover:border-blue-400 bg-white rounded-2xl p-5 shadow-xs transition-all relative flex flex-col justify-between">
            <span className="absolute top-4 right-4 bg-red-100 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
              ⭐ Top Seller
            </span>
            <div>
              <div className="pb-4 border-b border-slate-100">
                <h3 className="font-display font-black text-2xl text-slate-900">Class 3</h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Individual Signing DSC</p>
              </div>
              <ul className="py-5 space-y-3.5 text-xs">
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>GST, Income Tax, EPF, Trademark Registration</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>MCA21, ROC, Director KYC, Invoice Signing</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>IEC Code Registration, IRCTC, Traces</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="line-through">IceGate, MEIS, SEIS Website, CERSAI</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="line-through">DGFT - Foreign Trade Country of Origin</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="line-through">AICTE, CBSE Institutes</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Limited Gram Panchayat websites</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('buy-dsc')}
              className="w-full mt-2 bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Configure & Buy
            </button>
          </div>

          {/* Column 2: Class 3 Individual Combo DSC */}
          <div className="border border-slate-200 hover:border-blue-400 bg-white rounded-2xl p-5 shadow-xs transition-all relative flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-slate-100">
                <h3 className="font-display font-black text-2xl text-slate-900">Class 3</h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Individual Combo DSC</p>
              </div>
              <ul className="py-5 space-y-3.5 text-xs">
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>GST, Income Tax, EPF, Trademark Registration</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>MCA21, ROC, Director KYC, Invoice Signing</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>IEC Code Registration, IRCTC, Traces</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>IceGate, MEIS, SEIS Website, CERSAI</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="line-through">DGFT - Foreign Trade Country of Origin</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>AICTE, CBSE Institutes</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Limited Gram Panchayat websites</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('buy-dsc')}
              className="w-full mt-2 bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Configure & Buy
            </button>
          </div>

          {/* Column 3: Class 3 Organization Combo DSC */}
          <div className="border-2 border-sky-400 bg-sky-50/20 rounded-2xl p-5 shadow-sm relative flex flex-col justify-between">
            <span className="absolute top-4 right-4 bg-sky-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
              ⭐ Recommended
            </span>
            <div>
              <div className="pb-4 border-b border-slate-200">
                <h3 className="font-display font-black text-2xl text-blue-950">Class 3</h3>
                <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mt-0.5">Organization Combo DSC</p>
              </div>
              <ul className="py-5 space-y-3.5 text-xs">
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>GST, Income Tax, EPF, Trademark Registration</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>MCA21, ROC, Director KYC, Invoice Signing</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>IEC Code Registration, IRCTC, Traces</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>IceGate, MEIS, SEIS CERSAI (Limited Use)</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="line-through">DGFT - Foreign Trade Country of Origin</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>AICTE, CBSE Institutes</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>All Gram Panchayat portals</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('buy-dsc')}
              className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
            >
              Configure & Buy
            </button>
          </div>

          {/* Column 4: DGFT Organization Signing DSC */}
          <div className="border border-slate-200 hover:border-blue-400 bg-white rounded-2xl p-5 shadow-xs transition-all relative flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-slate-100">
                <h3 className="font-display font-black text-2xl text-slate-900">DGFT</h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Organization Signing DSC</p>
              </div>
              <ul className="py-5 space-y-3.5 text-xs">
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>GST, Income Tax, EPF, Trademark Registration</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>MCA21, ROC, Director KYC, Invoice Signing</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="line-through">IEC Code Registration, IRCTC, Traces</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="line-through">IceGate, MEIS, SEIS Website, CERSAI</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>DGFT - Foreign Trade Country of Origin-Code</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="line-through">AICTE, CBSE Institutes</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <CloseIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="line-through">Limited Gram Panchayat websites</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('buy-dsc')}
              className="w-full mt-2 bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Configure & Buy
            </button>
          </div>

        </div>
      </section>

      {/* 3. Best Selling DSC Products Row */}
      <section id="best-sellers-section" className="bg-slate-50 border-y border-slate-100 py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                Best Selling DSC Products
              </h2>
              <p className="text-sm text-slate-500 mt-1">Get immediate discounts on multiple years validity digital signatures.</p>
            </div>
            <button
              onClick={() => setActiveTab('products')}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              Explore All Products
            </button>
          </div>

          {/* 4 Items Grid matching screenshot 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellingProducts.map((p) => (
              <div 
                key={p.id} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden p-5 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all"
              >
                <div>
                  {/* Image/Visual Mock (similar to purple/blue product cards in screenshot) */}
                  <div className="bg-gradient-to-tr from-indigo-900 to-sky-950 h-44 rounded-xl relative p-4 flex flex-col justify-between text-white overflow-hidden select-none mb-4 shadow-inner">
                    <div className="absolute top-0 right-0 h-28 w-28 bg-white/5 rounded-full filter blur-xl"></div>
                    
                    <span className="self-start bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      FIPS Secure
                    </span>

                    <div className="text-center py-2 relative z-10 flex flex-col items-center">
                      {/* Abstract hardware token SVG drawing */}
                      <svg className="w-10 h-10 text-sky-400 mb-1 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-mono text-[9px] text-sky-300 font-bold block select-none">HYP2003 CRYPTO HARDWARE</span>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/15 pt-2 text-[10px]">
                      <span className="font-extrabold uppercase text-[9px] tracking-widest">{p.category} dsc</span>
                      <span className="text-sky-300 font-bold">Paperless KYC</span>
                    </div>
                  </div>

                  {/* Badges and meta */}
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-50 text-blue-800 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                      On Sale
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">Sales Tax Included</span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-display font-bold text-slate-900 text-sm tracking-tight mt-3 line-clamp-2 h-10 select-none">
                    {p.title}
                  </h4>

                  {/* Price */}
                  <div className="mt-2 flex flex-col space-y-1">
                    <span className="text-xs text-blue-700 font-extrabold uppercase tracking-wide">Contact for Best Price</span>
                    <span className="text-[10px] text-slate-500 leading-none">Quotes provided instantly on WhatsApp & Call</span>
                  </div>

                  {/* Reviews Star */}
                  <div className="flex items-center space-x-1 mt-2.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-semibold font-mono">
                      {p.rating} ({p.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => handleOpenQuickBuy(p)}
                  className="w-full mt-5 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Configure & Inquire DSC</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Steps to Order DSC Online */}
      <section id="steps-section" className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-display font-extrabold text-2.5xl sm:text-3xl text-slate-900">
            Steps to Order DSC Online
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">Complete your digital signature certificate verification in under 30 minutes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/4 left-1/8 right-1/8 h-0.5 bg-dashed border-b border-slate-200 -z-10"></div>

          {/* Step 1 */}
          <div className="text-center space-y-3.5 group relative">
            <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block">Step 01</span>
              <h4 className="font-display font-bold text-slate-900 text-base mt-1">Configure Order</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Select Class 3/DGFT, choose validity period (1-3 years), and state whether you need a USB token.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-3.5 group relative">
            <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11a13.916 13.916 0 00-1.687-7.042l-.054-.09M12 11c.18 0 .35-.015.517-.044M12 11c-.053.176-.08.363-.08.558v.53M12 11V3c0-1.1.9-2 2-2h4a2 2 0 012 2v3h1a2 2 0 012 2v3m-3.072 4H14m0 0v5a2 2 0 01-2 2h-1M14 17h1" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block">Step 02</span>
              <h4 className="font-display font-bold text-slate-900 text-base mt-1">Submit eKYC</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Input your PAN card and Aadhaar details in our secure checkout. Aadhaar OTP links your profile instantly.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-3.5 group relative">
            <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block">Step 03</span>
              <h4 className="font-display font-bold text-slate-900 text-base mt-1">Video Verification</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Record a quick 1-minute selfie video showing your documents to the camera via our secure link.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="text-center space-y-3.5 group relative">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Step 04</span>
              <h4 className="font-display font-bold text-slate-900 text-base mt-1">Dispatched / Downloaded</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Get approved instantly! Physical USB token dispatched, or certificate downloaded immediately for renewal.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Why We? / About us / DSC Uses Tabbed Container (Screenshot 3) */}
      <section id="why-we-container" className="max-w-7xl mx-auto px-4 select-none">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
          
          {/* Header tabs (similar to Screenshot 3 layout) */}
          <div className="lg:col-span-12 bg-slate-55 border-b border-slate-150 grid grid-cols-3 text-center text-xs sm:text-sm font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveInfoTab('why')}
              className={`py-4 transition-colors cursor-pointer ${activeInfoTab === 'why' ? 'bg-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Why We ?
            </button>
            <button
              onClick={() => setActiveInfoTab('about')}
              className={`py-4 transition-colors cursor-pointer ${activeInfoTab === 'about' ? 'bg-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              About us
            </button>
            <button
              onClick={() => setActiveInfoTab('uses')}
              className={`py-4 transition-colors cursor-pointer ${activeInfoTab === 'uses' ? 'bg-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              DSC Uses
            </button>
          </div>

          {/* Dynamic Column Layout based on active tab */}
          <div className="lg:col-span-12 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {activeInfoTab === 'why' && (
              <>
                {/* Left badges column */}
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-xl font-bold font-display text-blue-950 mb-3 border-b border-slate-100 pb-2">Our Key Highlights</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {badgesWhyWe.map((b, i) => (
                      <span 
                        key={i} 
                        className={`border text-xs font-semibold py-1.5 px-3 rounded-full flex items-center space-x-1.5 select-none hover:scale-[1.02] transition-transform ${b.color}`}
                      >
                        <span className="text-[10px]">{b.icon}</span>
                        <span>{b.label}</span>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveInfoTab('about')}
                    className="mt-4 inline-flex items-center space-x-1 text-xs font-extrabold text-blue-700 uppercase tracking-widest hover:text-blue-900"
                  >
                    <span>Read More About Us</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Right text Column */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-150 px-2.5 py-0.5 rounded text-[11px] font-bold">
                    <span>Over 1 Million DSC Sold!</span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    DSC India is a newly established company in 2026 that provides online, paperless DSCs in the shortest possible time; it also offers assistance related to DSCs.
                  </p>
                  
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We provide same-day issuance in Delhi NCR and assist you throughout video verification on your mobile or laptop. Contact us for any digital signature assistance.
                  </p>
                </div>
              </>
            )}

            {activeInfoTab === 'about' && (
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-blue-950 text-base">Our Legacy</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Established in 2026, DSC India provides online, paperless DSCs in the shortest possible time. We offer full assistance related to digital signatures, serving corporate clients, individuals, chartered accountants, and government entities nationwide.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-blue-950 text-base">Our Affiliation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    As registered channel partners with leading Certifying Authorities (CAs) licensed directly by the Controller of Certifying Authorities (CCA), Ministry of IT, Government of India, we issue fully valid Class 3, DGFT, and Foreign cryptographic digital keys.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-blue-950 text-base">Secure Cryptography</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every digital signature certificate issued by us is compiled using SHA-2 2048-bit modern encryption standards and loaded into FIPS 140-2 Level 3 compliant cryptographic hardware USB keys, protecting your identity against copy, leakage or modifications.
                  </p>
                </div>
              </div>
            )}

            {activeInfoTab === 'uses' && (
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-2">
                  <span className="text-base font-bold">📂 GST & Tax Filings</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Mandatory for filing GST returns, Income Tax ITR submissions, TDS filings, and EPFO registrations securely.</p>
                </div>
                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-2">
                  <span className="text-base font-bold">🏛️ MCA & ROC Portals</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Used by corporate directors and company secretaries for registering company formations, submitting Director KYC, and filing MCA21.</p>
                </div>
                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-2">
                  <span className="text-base font-bold">🛒 E-Tendering & GeM</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Required for submitting high-value bids on the Government e-Marketplace (GeM), Central Public Procurement Portals (CPPP), and railways.</p>
                </div>
                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-2">
                  <span className="text-base font-bold">🚢 Import & Export</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Essential for importers and exporters to communicate with the Director General of Foreign Trade (DGFT) and icegate customs portals.</p>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 6. Licensed CA & Brands Scroller */}
      <section id="brands-section" className="max-w-7xl mx-auto px-4 space-y-8 select-none">
        <div className="text-center space-y-1">
          <h3 className="font-display font-extrabold text-lg text-slate-400 uppercase tracking-widest">Licensed CA & Brands</h3>
          <p className="text-xs text-slate-500">We issue certificates supported by all CCA registered Certifying Authorities in India.</p>
        </div>

        {/* Horizontal rolling row */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {brandLogos.map((logo, index) => (
            <div 
              key={index} 
              className={`p-4 border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center w-36 h-20 shadow-xs hover:shadow-md transition-all ${logo.bg}`}
            >
              <span className={`font-display font-extrabold text-sm ${logo.text}`}>{logo.name}</span>
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{logo.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SEO Content Blocks */}
      <section id="seo-content" className="max-w-4xl mx-auto px-4 border-t border-slate-100 pt-16 space-y-8">
        <article className="prose prose-slate max-w-none text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4">
          <h2 className="font-display font-black text-blue-950 text-xl sm:text-2xl tracking-tight text-center">
            How to Buy Digital Signature Certificate Online in India?
          </h2>
          <p>
            A Digital Signature Certificate (DSC) is a cryptographic key issued by licensed Certifying Authorities (CAs) under the guidance of the Controller of Certifying Authorities (CCA). It provides legal sanctity to your electronic signatures on digital files and filings. Under the Indian IT Act, a digital signature holds equivalent legal stature to a physical handwritten signature.
          </p>
          <p>
            With DSC India, the complete application process to <strong>Buy Digital Signature Certificate online</strong> has been converted into a completely digital and paperless eKYC flow. You can use your Aadhaar number linked with your active mobile phone to verify your identity. This completely eliminates the need to courier physical documents or attest photocopies.
          </p>
          <p>
            Additionally, the Controller of Certifying Authorities requires a brief <strong>Video Verification</strong> of the applicant. To complete this, we send a secure video recording link to your email and mobile phone. You simply need to state your name and read out the unique authorization code shown on your screen while keeping your physical Aadhaar and PAN cards visible in the camera frame.
          </p>
          
          <h3 className="font-display font-bold text-blue-950 text-base pt-2">What Documents are Required for DSC?</h3>
          <p>
            For individual applicants, the requirements are extremely simple:
          </p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>PAN Card number for Income tax database crosscheck</li>
            <li>Aadhaar number linked with mobile (for OTP verification)</li>
            <li>An active email address and mobile number</li>
            <li>A laptop or mobile phone equipped with a working front camera for the 1-minute video selfie recording</li>
          </ul>
          <p className="pt-2">
            For organizational DSC applications (such as Class 3 Organization Combo or DGFT), you will require corporate incorporation certificates, partnership deeds, or board resolution letters signed by authorized bank signatories or company directors. Our dedicated corporate manager assists company secretaries throughout this document verification process.
          </p>
        </article>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq-section" className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <HelpCircle className="w-8 h-8 text-blue-800 mx-auto" />
          <h2 className="font-display font-extrabold text-2.5xl text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">Find fast answers to common questions about buying DSC online.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'What is a Digital Signature Certificate (DSC)?',
              a: 'A Digital Signature Certificate is a secure digital key issued by certifying authorities (CAs) to validate and certify the identity of the person holding this certificate. It uses public-key cryptography to sign electronic documents, verify GST filings, file MCA returns, and apply for government e-tenders securely online.'
            },
            {
              q: 'How do I buy a Digital Signature Certificate online?',
              a: 'Buying a DSC online with DSC India is completely paperless and simple: 1) Select your required DSC class (such as Class 3 or DGFT), 2) Provide your Aadhaar/PAN details for paperless eKYC, 3) Complete a 1-minute video verification on your mobile or laptop, and 4) Download the certificate into your secure USB token. The process takes less than 30 minutes.'
            },
            {
              q: 'Is a physical USB token mandatory for storing DSC?',
              a: 'Yes, as per CCA (Controller of Certifying Authorities) guidelines in India, a digital signature certificate must be securely stored in a FIPS 140-2 Level 3 certified cryptographic hardware USB token (such as ePass2003 or mToken). If you already have a token, you can purchase a "Renewal" and download the new certificate to your existing token to save token costs.'
            },
            {
              q: 'What is the difference between Class 3 and DGFT DSC?',
              a: 'Class 3 DSC is a high-assurance certificate used for general purposes like GST, Income Tax filing, EPFO, MCA filing, and general e-tendering. DGFT (Directorate General of Foreign Trade) DSC is specifically designed for Importers and Exporters who require a signature mapped to their Import Export Code (IEC) to file documents on the official DGFT website.'
            }
          ].map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-slate-50/50 cursor-pointer"
                >
                  <span className="font-display font-bold text-sm text-slate-800">{faq.q}</span>
                  <span className="text-blue-700 font-extrabold text-base ml-4 shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Quick Configuration Modal popup for Quick Buy */}
      {selectedProductForBuy && (
        <div id="quick-buy-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div id="quick-buy-modal" className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-blue-900 text-white px-5 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-display font-bold text-base">Configure Your Certificate</h4>
                <p className="text-[10px] text-blue-200">Configure parameters before adding to cart</p>
              </div>
              <button 
                onClick={() => setSelectedProductForBuy(null)}
                className="text-white/80 hover:text-white bg-white/10 p-1 rounded-full"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 uppercase tracking-wide">{selectedProductForBuy.category}</span>
                <h3 className="font-display font-extrabold text-slate-900 text-md mt-1.5">{selectedProductForBuy.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{selectedProductForBuy.shortDescription}</p>
              </div>

              {/* Years Validity Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Select Validity Period *</label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((y) => (
                    <button
                      key={y}
                      onClick={() => setSelectedYears(y as 1 | 2 | 3)}
                      className={`py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedYears === y
                          ? 'bg-blue-700 border-blue-700 text-white shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {y} Year{y > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* USB Token Hardware Toggle */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">FIPS Crypto USB Token *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIncludeToken(true)}
                    className={`py-2.5 px-3 border rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                      includeToken
                        ? 'bg-blue-700 border-blue-700 text-white shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Include Token</span>
                    <span className={`text-[9px] font-medium mt-0.5 ${includeToken ? 'text-blue-100' : 'text-slate-450'}`}>New Token Included</span>
                  </button>
                  <button
                    onClick={() => setIncludeToken(false)}
                    className={`py-2.5 px-3 border rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                      !includeToken
                        ? 'bg-blue-700 border-blue-700 text-white shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Renewal Only</span>
                    <span className={`text-[9px] font-medium mt-0.5 ${!includeToken ? 'text-blue-100' : 'text-slate-450'}`}>Reuse Expired Token</span>
                  </button>
                </div>
              </div>

              {/* Live calculated price replaced with contact CTA */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 flex flex-col gap-1 text-left">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Pricing Inquiry</span>
                <p className="text-xs text-slate-700 font-semibold">Get the best price quote instantly for:</p>
                <div className="text-[11px] text-blue-900 bg-blue-50/50 px-2.5 py-1.5 rounded border border-blue-100 font-mono mt-1">
                  {selectedProductForBuy.title} ({selectedYears} Year{selectedYears > 1 ? 's' : ''}, {includeToken ? 'with USB Token' : 'Renewal'})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`https://wa.me/918287572721?text=${encodeURIComponent(
                    `Hi DSC India, I am interested in purchasing "${selectedProductForBuy.title}" for ${selectedYears} Year(s) (${includeToken ? 'with USB Token' : 'Renewal'}). Please let me know the current pricing details.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>WhatsApp Quote</span>
                </a>
                <a
                  href="tel:+918287572721"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Call Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
