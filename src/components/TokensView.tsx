import React, { useState } from 'react';
import { ShieldCheck, Truck, ArrowRight, Layers, HelpCircle, Tag, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';

interface TokensViewProps {
  onAddToCart: (product: Product, years: 1 | 2 | 3, includeToken: boolean) => void;
}

export default function TokensView({ onAddToCart }: TokensViewProps) {
  const tokenProduct = products.find(p => p.id === 'epass2003-token') || products[products.length - 1];
  const [tokenQty, setTokenQty] = useState<number>(1);
  const [bulkQty, setBulkQty] = useState<string>('50');
  const [bulkName, setBulkName] = useState('');
  const [bulkEmail, setBulkEmail] = useState('');
  const [bulkPhone, setBulkPhone] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');
  const [bulkSubmitted, setBulkSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBuyToken = () => {
    // Treat as adding token product with custom quantity
    for (let i = 0; i < tokenQty; i++) {
      onAddToCart(tokenProduct, 1, true); // years: 1, includeToken: true (token itself doesn't have years but fits the cart structure)
    }
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const waMsg = `Hi DSC India, I want to request a wholesale bulk quote:
Name: ${bulkName}
Phone: ${bulkPhone}
Email: ${bulkEmail}
Quantity: ${bulkQty} Tokens
Message: ${bulkMessage}`;

    window.open(`https://wa.me/918287572721?text=${encodeURIComponent(waMsg)}`, '_blank');

    setTimeout(() => {
      setLoading(false);
      setBulkSubmitted(true);
    }, 800);
  };

  return (
    <div id="tokens-view-container" className="max-w-7xl mx-auto px-4 py-8 space-y-16 animate-in fade-in duration-200">
      
      {/* 1. Header Banner */}
      <div className="text-center space-y-2">
        <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 uppercase tracking-widest">
          Hardware Security Keys
        </span>
        <h1 className="font-display font-extrabold text-3.5xl text-blue-950">
          Buy Secure FIPS 140-2 USB Tokens
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Approved hardware devices for storing and executing digital signatures. Guaranteed compatible with Windows and macOS.
        </p>
      </div>

      {/* 2. Direct Buy Token Card & Bulk inquiry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Token Card */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="bg-gradient-to-tr from-blue-900 to-blue-950 text-white rounded-2xl p-6 relative overflow-hidden shadow-md select-none">
            <span className="bg-sky-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider block self-start w-max">
              FIPS 140-2 LEVEL 3 CERTIFIED
            </span>
            <div className="flex justify-between items-center mt-5">
              <div>
                <h3 className="font-display font-black text-xl">{tokenProduct.title}</h3>
                <p className="text-xs text-sky-200 mt-1">Saves your DSC safely against export/copying</p>
              </div>
              <Layers className="w-12 h-12 text-sky-400 shrink-0" />
            </div>
            <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-end">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">PRICING</span>
                <span className="text-xl font-bold text-white">Pricing on Request</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">★ Best Deal Online</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Features & Specifications</h4>
            <ul className="text-xs text-slate-600 space-y-2.5 pl-1 leading-relaxed">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Compatible with all Certifying Authorities including eMudhra, Capricorn, VSign, XtraTrust.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Auto-run setup wizard inside: installs drivers automatically on insert (Windows).</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>High durability waterproof casing with secure cap and metallic lanyard loop.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                <button
                  onClick={() => setTokenQty(Math.max(1, tokenQty - 1))}
                  className="p-1 text-slate-500 hover:bg-slate-100 rounded text-xs font-bold w-6 h-6 flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-xs font-bold text-slate-800 w-5 text-center">{tokenQty}</span>
                <button
                  onClick={() => setTokenQty(tokenQty + 1)}
                  className="p-1 text-slate-500 hover:bg-slate-100 rounded text-xs font-bold w-6 h-6 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleBuyToken}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Inquiry List</span>
            </button>
          </div>
        </div>

        {/* Wholesale Bulk Quote form */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="inline-flex items-center space-x-1.5 bg-sky-100 text-sky-800 border border-sky-200 px-2.5 py-0.5 rounded text-[10px] font-bold">
              <Tag className="w-3.5 h-3.5 text-sky-700" />
              <span>Volume wholesales available</span>
            </span>
            <h3 className="font-display font-bold text-lg text-blue-950 mt-2.5">Wholesale Bulk Quote Requests</h3>
            <p className="text-xs text-slate-500 mt-1">Get lowest bulk prices on orders of 10 to 1000+ USB tokens for your company, franchise, or client roster.</p>
          </div>

          {!bulkSubmitted ? (
            <form onSubmit={handleBulkSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={bulkName}
                    onChange={(e) => setBulkName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile"
                    value={bulkPhone}
                    onChange={(e) => setBulkPhone(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Wholesale Quantity Required *</label>
                  <select
                    value={bulkQty}
                    onChange={(e) => setBulkQty(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="10-25">10 to 25 Tokens</option>
                    <option value="25-50">25 to 50 Tokens</option>
                    <option value="50">50 to 100 Tokens</option>
                    <option value="100-500">100 to 500 Tokens</option>
                    <option value="500+">More than 500 Tokens</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={bulkEmail}
                    onChange={(e) => setBulkEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Specific token brand or delivery request</label>
                <textarea
                  rows={2}
                  placeholder="Need customized shipping, invoicing with GSTIN, or specific brands (ePass, mToken)?"
                  value={bulkMessage}
                  onChange={(e) => setBulkMessage(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Request Volume Wholesale Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 bg-white rounded-2xl border border-slate-150 p-6 animate-in fade-in duration-200">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-slate-900">Wholesale Request Submitted!</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Thank you, <strong>{bulkName}</strong>. Our corporate account manager will contact you at <strong>{bulkEmail}</strong> or call you shortly with wholesale volume options.
                </p>
              </div>
              <button
                onClick={() => setBulkSubmitted(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
