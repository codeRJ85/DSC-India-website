import { useState } from 'react';
import { Star, CheckCircle, Tag, Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';

interface ProductsViewProps {
  onAddToCart: (product: Product, years: 1 | 2 | 3, includeToken: boolean) => void;
  setActiveTab: (tab: string) => void;
  setQuickBuyId: (id: string) => void;
}

export default function ProductsView({ onAddToCart, setActiveTab, setQuickBuyId }: ProductsViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'class3' | 'dgft' | 'foreign' | 'token'>('all');

  const filteredProducts = selectedFilter === 'all'
    ? products
    : products.filter(p => p.category === selectedFilter);

  const filterTabs = [
    { id: 'all', label: 'All DSC Products' },
    { id: 'class3', label: 'Class 3 Certificates' },
    { id: 'dgft', label: 'DGFT (Exporters)' },
    { id: 'foreign', label: 'NRI & Foreign' },
    { id: 'token', label: 'Crypto USB Tokens' }
  ];

  const handleConfigureBuy = (product: Product) => {
    if (product.id === 'epass2003-token') {
      onAddToCart(product, 1, true); // hardware tokens don't need configuration, directly add
    } else {
      setQuickBuyId(product.id);
      setActiveTab('buy-dsc'); // redirect to configurator with prefilled ID
    }
  };

  return (
    <div id="products-view-container" className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-widest">
          DSC Store Catalogue
        </span>
        <h1 className="font-display font-extrabold text-3.5xl text-blue-950">
          Our Full Range of Digital Security Solutions
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Secure, CCA-compliant, FIPS-tested cryptographic certificates tailored for business filings, corporate tenders, and international trade.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-150 pb-4 select-none">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id as any)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              selectedFilter === tab.id
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products list layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {filteredProducts.map((p) => {
          const hasSale = p.onSale;
          return (
            <div 
              key={p.id} 
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-6 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
            >
              {p.isBestSeller && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1 rotate-45 translate-x-4 translate-y-2 select-none">
                  Best Seller
                </span>
              )}

              {/* Left Column product details */}
              <div className="flex-1 space-y-4">
                <div className="space-y-1.5">
                  <span className="bg-sky-50 text-sky-800 text-[9px] font-bold px-2 py-0.5 rounded border border-sky-100 uppercase tracking-wider">
                    {p.category === 'token' ? 'Cryptographic Hardware' : `${p.category} DSC`}
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.shortDescription}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Technical Features</h4>
                  <ul className="text-xs text-slate-600 space-y-2 pl-0.5">
                    {p.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column pricing & buy */}
              <div className="sm:w-48 shrink-0 sm:border-l sm:border-slate-150 sm:pl-6 flex flex-col justify-between sm:text-right">
                
                <div className="space-y-3.5">
                  {/* Stars review */}
                  <div className="flex sm:justify-end items-center space-x-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold font-mono">({p.reviewsCount})</span>
                  </div>

                  {/* Prices block */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Affordable Pricing</span>
                    <div className="flex sm:justify-end items-baseline space-x-1">
                      <span className="text-xs sm:text-sm font-extrabold text-blue-900">Pricing on Request</span>
                    </div>
                    <span className="text-[9px] text-emerald-600 font-semibold block">Best Rates Guaranteed</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-left text-[10px] text-slate-500 space-y-1">
                    <p className="font-bold text-blue-900 uppercase tracking-wide flex items-center gap-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-700" /> Paperless Issuance
                    </p>
                    <p>No paper documents. Verify identity with Aadhaar OTP or PAN details.</p>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  id={`buy-catalog-btn-${p.id}`}
                  onClick={() => handleConfigureBuy(p)}
                  className="w-full mt-6 sm:mt-0 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1 shadow-xs cursor-pointer hover:shadow-sm"
                >
                  <span>{p.category === 'token' ? 'Buy Token' : 'Configure & Inquire'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
