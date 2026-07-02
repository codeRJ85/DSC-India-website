import { useState } from 'react';
import { Tag, HelpCircle, Check, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Product } from '../types';
import { products, comparisonFeatures } from '../data';

interface PricingViewProps {
  setActiveTab: (tab: string) => void;
  setQuickBuyId: (id: string) => void;
}

export default function PricingView({ setActiveTab, setQuickBuyId }: PricingViewProps) {
  // We can show the prices of Class 3 Individual, Combo, Org and DGFT in a clean grid
  const pricingProducts = products.filter(p => p.id !== 'epass2003-token' && p.id !== 'digital-signature-renewal');

  const handleBuyRedirect = (prodId: string) => {
    setQuickBuyId(prodId);
    setActiveTab('buy-dsc');
  };

  return (
    <div id="pricing-view-container" className="max-w-7xl mx-auto px-4 py-8 space-y-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-widest">
          Transparent Cost Structure
        </span>
        <h1 className="font-display font-extrabold text-3.5xl text-blue-950">
          Digital Signature Certificate Pricing in India
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          No hidden fees or processing charges. Dynamic, volume-friendly pricing on all security certificates with full accounting tax invoice.
        </p>
      </div>

      {/* Pricing Matrix Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingProducts.map((p) => {
          // calculate prices for different years
          const price1Yr = Math.round(p.price * 0.7);
          const price2Yr = p.price;
          const price3Yr = Math.round(p.price * 1.35);

          return (
            <div 
              key={p.id} 
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden"
            >
              {p.isBestSeller && (
                <span className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ★ Popular
                </span>
              )}

              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.category} DSC</span>
                  <h3 className="font-display font-bold text-md text-slate-900 mt-1 leading-snug h-11 line-clamp-2 select-none">{p.title}</h3>
                </div>

                {/* Contact for Pricing Info */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Available Terms</span>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100">1 Year</span>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">2 Years</span>
                    <span className="bg-purple-50 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-100">3 Years</span>
                  </div>
                  <div className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Please contact us directly for the best rates. Special discounts available for volume and channel partners.
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-medium">
                  <p>* FIPS secure USB hardware token is available.</p>
                  <p className="mt-0.5">* Paperless Aadhaar eKYC setup assistance included.</p>
                </div>
              </div>

              <button
                onClick={() => handleBuyRedirect(p.id)}
                className="w-full mt-6 bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
              >
                <span>Select & Configure</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Features Comparison Checklist Matrix */}
      <div className="bg-white border border-slate-250 rounded-3xl overflow-hidden shadow-xs space-y-6 p-6 sm:p-8">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-display font-extrabold text-lg text-blue-950">Certificate Access Rights Comparison</h3>
          <p className="text-xs text-slate-500 mt-1">Crosscheck what government portals and filings are permitted under each specific digital signature class.</p>
        </div>

        <div className="overflow-x-auto select-none">
          <table className="w-full text-xs text-left text-slate-600 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Portal Filings / Rights</th>
                <th className="py-3 px-4 text-center">Class 3 Signing</th>
                <th className="py-3 px-4 text-center">Class 3 Combo</th>
                <th className="py-3 px-4 text-center">Organization Combo</th>
                <th className="py-3 px-4 text-center">DGFT Signing</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feat, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <th className="py-3.5 px-4 font-semibold text-slate-700 max-w-sm">{feat.name}</th>
                  <td className="py-3.5 px-4 text-center">
                    {feat.individualSigning ? (
                      <Check className="w-4.5 h-4.5 text-emerald-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300 font-bold">−</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {feat.individualCombo ? (
                      <Check className="w-4.5 h-4.5 text-emerald-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300 font-bold">−</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {feat.organizationCombo ? (
                      <Check className="w-4.5 h-4.5 text-emerald-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300 font-bold">−</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {feat.dgftSigning ? (
                      <Check className="w-4.5 h-4.5 text-emerald-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300 font-bold">−</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
