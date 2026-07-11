import React, { useState } from 'react';
import { Search, Phone, ShoppingCart, User, CheckCircle, HelpCircle } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenEnquiry: () => void;
  onSearch: (query: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenEnquiry,
  onSearch
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'buy-dsc', label: 'Buy DSC Online' },
    { id: 'tokens', label: 'Buy DSC Tokens' },
    { id: 'products', label: 'All Products' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      {/* Top Banner (Optional subtle notice or SEO keyword booster) */}
      <div className="bg-blue-950 text-white py-1 px-4 text-center text-xs font-semibold tracking-wider flex justify-center items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
        <span>Aadhaar Paperless eKYC Instant Issuance within 30 Minutes. Licensed by CCA.</span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
        >
          <div className="relative">
            <Logo className="h-11 w-11 filter drop-shadow-sm group-hover:scale-105 transition-transform duration-200" />
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display font-black text-2xl tracking-tight text-blue-900 group-hover:text-blue-800 transition-colors">DSC</span>
              <span className="font-display font-bold text-2xl tracking-tight text-sky-500">India</span>
            </div>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest -mt-1">Digital Signature Authority</p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md flex">
          <input
            type="text"
            placeholder="Search classes, tokens or downloads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-2 border-2 border-slate-200 rounded-l-xl focus:outline-none focus:border-blue-700 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 rounded-r-xl border-y-2 border-r-2 border-blue-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Right Section Actions */}
        <div className="flex items-center space-x-5 flex-wrap justify-center">
          {/* Quick Enquiry button styled as shown in screenshot */}
          <button
            id="header-enquiry-banner"
            onClick={onOpenEnquiry}
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-blue-950 font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm hover:shadow-md hover:from-amber-500 hover:to-orange-600 transition-all flex items-center space-x-1.5 cursor-pointer border border-amber-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-900 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-900"></span>
            </span>
            <span>Enquiry</span>
          </button>

          {/* Phone/WhatsApp Hotline */}
          <a
            href="https://wa.me/918287572721"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-slate-700 hover:text-green-600 transition-colors"
          >
            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-full border border-emerald-100 flex items-center justify-center">
              {/* WhatsApp Icon placeholder */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.99 11.45.989c-5.438 0-9.863 4.374-9.868 9.803-.002 1.73.463 3.42 1.345 4.927l-.997 3.641 3.727-.966zm11.573-6.92c-.326-.162-1.926-.94-2.22-1.046-.297-.11-.513-.162-.73.162-.216.324-.838 1.046-1.027 1.262-.19.216-.379.243-.705.082-.326-.162-1.375-.502-2.62-1.605-.968-.853-1.62-1.908-1.81-2.23-.19-.324-.02-.5-.183-.661-.147-.146-.327-.379-.49-.569-.163-.189-.218-.324-.327-.54-.109-.217-.055-.407-.027-.57.028-.162.217-.514.326-.704.11-.189.163-.324.245-.54.081-.217.04-.407-.014-.57-.027-.162-.216-.867-.311-1.046-.109-.218-.218-.18-.311-.18-.082-.001-.19-.001-.298-.001-.11 0-.298.04-.462.216-.163.176-.624.602-.624 1.468 0 .866.638 1.705.726 1.823.09.117 1.226 1.904 3.03 2.661.425.18.756.287 1.016.37.432.135.824.115 1.134.07.347-.05 1.045-.421 1.193-.827.148-.406.148-.755.104-.827-.04-.072-.162-.11-.489-.272z"/>
              </svg>
            </div>
            <div className="hidden lg:block text-left select-none">
              <span className="text-[10px] font-semibold text-slate-400 block -mb-1">Call Support (24/7)</span>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-blue-900 tracking-tight text-xs">+91 8287572721</span>
                <span className="font-display font-extrabold text-blue-900 tracking-tight text-xs">+91 8588072606</span>
              </div>
            </div>
          </a>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative bg-slate-50 hover:bg-slate-100 border border-slate-200 text-blue-900 p-2.5 rounded-xl transition-colors cursor-pointer"
            title="Open Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-700 text-white font-bold text-[10px] w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile placeholder (Non interactive visual cue) */}
          <div className="bg-slate-50 text-slate-500 p-2.5 rounded-xl border border-slate-200 hidden sm:flex items-center justify-center">
            <User className="w-5 h-5 text-blue-900" />
          </div>
        </div>
      </div>

      {/* Navigation Links Row */}
      <div className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
