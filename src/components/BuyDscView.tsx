import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Zap, RefreshCw, Star, Info } from 'lucide-react';
import { Product } from '../types';
import { products, indianStates } from '../data';

interface BuyDscViewProps {
  onAddToCart: (product: Product, years: 1 | 2 | 3, includeToken: boolean) => void;
  initialProductId?: string;
}

export default function BuyDscView({ onAddToCart, initialProductId }: BuyDscViewProps) {
  // Configurable products (excluding the raw USB token)
  const dscProducts = products.filter(p => p.id !== 'epass2003-token');
  
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    dscProducts.find(p => p.id === initialProductId) || dscProducts[0]
  );
  
  const [years, setYears] = useState<1 | 2 | 3>(2);
  const [includeToken, setIncludeToken] = useState<boolean>(true);
  
  // Preliminary customer fields for fast configuration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');

  // Handle prop changes for product switching
  useEffect(() => {
    if (initialProductId) {
      const match = dscProducts.find(p => p.id === initialProductId);
      if (match) {
        setSelectedProduct(match);
        if (match.category === 'renewal') {
          setIncludeToken(false);
        } else {
          setIncludeToken(true);
        }
      }
    }
  }, [initialProductId]);

  const handleProductChange = (prodId: string) => {
    const match = dscProducts.find(p => p.id === prodId);
    if (match) {
      setSelectedProduct(match);
      if (match.category === 'renewal') {
        setIncludeToken(false);
      } else {
        setIncludeToken(true);
      }
    }
  };

  const calculateConfiguredPrice = () => {
    let basePrice = selectedProduct.price;
    
    // validity multipliers
    if (years === 1) {
      basePrice = Math.round(basePrice * 0.7);
    } else if (years === 3) {
      basePrice = Math.round(basePrice * 1.35);
    }

    // token hardware costs
    if (includeToken && selectedProduct.category === 'renewal') {
      basePrice += 399; // token hardware add-on
    } else if (!includeToken && selectedProduct.category !== 'renewal') {
      basePrice -= 300; // token hardware deduction (saves cost!)
    }

    return basePrice;
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(selectedProduct, years, includeToken);
  };

  return (
    <div id="buy-dsc-view-container" className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-200">
      
      <div className="text-center space-y-2 mb-10">
        <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-widest">
          Secure Order Portal
        </span>
        <h1 className="font-display font-extrabold text-3.5xl text-blue-950">
          Configure Your Digital Signature Certificate
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Specify your identity requirements, choose validity term, and provide basic details to start paperless enrollment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Configurator Column */}
        <div className="lg:col-span-7 bg-white border border-slate-250 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <form onSubmit={handleAddToCart} className="space-y-6">
            
            {/* 1. Choose DSC Class */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Select Digital Signature Certificate Type *
              </label>
              <div className="space-y-2">
                {dscProducts.map((p) => {
                  const isSelected = selectedProduct.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleProductChange(p.id)}
                      className={`p-4 border rounded-2xl cursor-pointer flex justify-between items-start transition-all select-none ${
                        isSelected
                          ? 'border-blue-700 bg-blue-50/20 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center space-x-2">
                          <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-blue-700 text-blue-700' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="h-2.5 w-2.5 bg-blue-700 rounded-full"></span>}
                          </span>
                          <h3 className="font-display font-bold text-sm text-slate-900">{p.title}</h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 pl-6.5 leading-relaxed">{p.shortDescription}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-sky-600 font-bold block bg-sky-50 px-2 py-0.5 rounded border border-sky-100">Paperless</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Choose Years Term */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Select Validity Term *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((y) => (
                  <div
                    key={y}
                    onClick={() => setYears(y as 1 | 2 | 3)}
                    className={`p-3 border rounded-xl text-center cursor-pointer transition-all select-none ${
                      years === y
                        ? 'border-blue-700 bg-blue-50/20 font-extrabold text-blue-900 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm block">{y} Year{y > 1 ? 's' : ''}</span>
                    <span className="text-[10px] text-slate-400 font-normal">Full Validity Term</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Choose USB Hardware Token Option */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                3. Do you need a physical USB FIPS Hardware Token? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setIncludeToken(true)}
                  className={`p-4 border rounded-2xl cursor-pointer flex gap-3 transition-all select-none ${
                    includeToken
                      ? 'border-blue-700 bg-blue-50/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    includeToken ? 'border-blue-700 text-blue-700' : 'border-slate-300'
                  }`}>
                    {includeToken && <span className="h-2.5 w-2.5 bg-blue-700 rounded-full"></span>}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-900">Include FIPS USB Token</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                      Recommended. Securely stores your digital certificate as mandated by CCA regulations. Shipped to your address.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setIncludeToken(false)}
                  className={`p-4 border rounded-2xl cursor-pointer flex gap-3 transition-all select-none ${
                    !includeToken
                      ? 'border-blue-700 bg-blue-50/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    !includeToken ? 'border-blue-700 text-blue-700' : 'border-slate-300'
                  }`}>
                    {!includeToken && <span className="h-2.5 w-2.5 bg-blue-700 rounded-full"></span>}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-900">Renewal Only (Reuse My Old Token)</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                      Saves token costs. You must already possess a valid, compatible FIPS USB token (ePass2003, mToken).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Quick Applicant Inputs */}
            <div className="space-y-2.5 border-t border-slate-100 pt-5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                4. Applicant Contact Details (For eKYC Activation)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Applicant Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="Aadhaar-Linked Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-slate-600"
                  >
                    <option value="">-- Choose State --</option>
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              id="add-to-cart-buy-page"
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer uppercase tracking-wider"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Add to DSC Inquiry List</span>
            </button>

          </form>
        </div>

        {/* Inquiry Summary column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
            <h3 className="font-display font-bold text-base border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>DSC Inquiry Summary</span>
              <span className="text-[10px] text-sky-400 font-extrabold uppercase tracking-widest">Aadhaar Paperless eKYC</span>
            </h3>

            {/* Selected Breakdown details */}
            <div className="text-xs space-y-3">
              <div className="flex justify-between items-start gap-3">
                <span className="text-slate-400">Selected Product:</span>
                <span className="font-bold text-right text-slate-200">{selectedProduct.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Validity Period:</span>
                <span className="font-bold text-slate-200">{years} Year{years > 1 ? 's' : ''} Term</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cryptographic standard:</span>
                <span className="font-bold text-emerald-400 font-mono">SHA-2 2048-bit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">FIPS USB Hardware Key:</span>
                <span className="font-bold text-slate-200">{includeToken ? 'Included' : 'None (Renewal Only)'}</span>
              </div>
            </div>

            {/* Calculations and totals replaced */}
            <div className="border-t border-slate-800 pt-4 space-y-2.5 text-xs font-semibold text-center">
              <p className="text-sky-400 text-sm font-bold uppercase tracking-wider">Pricing on Request</p>
              <p className="text-slate-400 text-[11px] font-normal leading-relaxed">
                Prices depend on validity terms, token choices, and volume discounts. Submit the configuration on the left to add this to your inquiry list, or contact us directly on WhatsApp for an instant quote.
              </p>
            </div>

            <div className="bg-blue-950/60 p-4 rounded-xl border border-blue-900/80 text-[10px] text-slate-400 leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <p>Your identity documents are safe. Verification uses secure encrypted eKYC portals directly linked with government-approved CA agencies.</p>
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="font-display font-bold text-blue-950 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Info className="w-4 h-4 text-blue-700" /> Key Prerequisites & Rules
            </h4>
            <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed pl-1">
              <li className="flex items-start gap-1.5">
                <span className="text-blue-700 font-extrabold">•</span>
                <span>Applicants must show their original PAN card and Aadhaar during the brief 1-minute video session.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-700 font-extrabold">•</span>
                <span>The applicant's face and original documents must remain perfectly clear and legible inside the camera focus box.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-700 font-extrabold">•</span>
                <span>Organization applications require standard corporate documents (Company PAN, Incorporation, and Authorization Letter) which can be uploaded directly to our portal post-payment.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
