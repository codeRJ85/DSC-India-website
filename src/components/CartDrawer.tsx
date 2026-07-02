import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, ShieldCheck, Truck, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem, Order } from '../types';
import { indianStates } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  // Checkout flow state: 'cart' | 'billing' | 'shipping' | 'success'
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'billing' | 'shipping' | 'success'>('cart');
  
  // Checkout form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstIn, setGstIn] = useState('');
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = 0;
  const tax = 0;
  const total = 0;

  const handleNextStep = () => {
    if (checkoutStep === 'cart') setCheckoutStep('billing');
    else if (checkoutStep === 'billing') setCheckoutStep('shipping');
  };

  const handlePrevStep = () => {
    if (checkoutStep === 'billing') setCheckoutStep('cart');
    else if (checkoutStep === 'shipping') setCheckoutStep('billing');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const itemSummary = cartItems.map(it => `- ${it.product.title} (x${it.quantity}), Term: ${it.selectedYears} Year(s), Token: ${it.includeToken ? 'Yes' : 'No'}`).join('\n');

    const waMsg = `Hi DSC India, I would like to request a quote for the following Digital Signature Certificates:
${itemSummary}

Applicant Details:
Name: ${name}
Phone: ${phone}
Email: ${email}
PAN: ${pan || 'N/A'}
Aadhaar: ${aadhaar || 'N/A'}
${companyName ? `Company: ${companyName}\nGSTIN: ${gstIn || 'N/A'}\n` : ''}
Shipping Address:
${address}, ${city}, ${state} - ${pincode}`;

    window.open(`https://wa.me/918287572721?text=${encodeURIComponent(waMsg)}`, '_blank');

    setTimeout(() => {
      const order: Order = {
        id: `DSC-IND-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: name,
        email,
        phone,
        pan: pan || undefined,
        aadhaar: aadhaar || undefined,
        companyName: companyName || undefined,
        gstIn: gstIn || undefined,
        address,
        city,
        state,
        pincode,
        items: [...cartItems],
        subtotal,
        tax,
        total,
        status: 'Pending Verification',
        createdAt: new Date().toISOString()
      };
      
      setRecentOrder(order);
      setLoading(false);
      setCheckoutStep('success');
      onClearCart();
    }, 1200);
  };

  const hasOrgCertificate = cartItems.some(item => 
    item.product.type === 'organization' || item.product.type === 'combo' && item.product.id.includes('org')
  );

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      {/* Background click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div id="cart-drawer" className="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-blue-900 text-white">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-sky-400" />
            <h3 className="font-display font-bold text-lg">Your DSC Inquiry List</h3>
          </div>
          <button 
            id="close-cart-btn"
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Step Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 && checkoutStep !== 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 border border-slate-150 rounded-full flex items-center justify-center text-slate-300">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-slate-700">Your Inquiry List is Empty</h4>
                <p className="text-sm text-slate-500 max-w-xs mt-1">Select a digital signature certificate configuration and add it to your inquiry list to begin.</p>
              </div>
              <button
                onClick={onClose}
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-xl transition-colors cursor-pointer text-sm"
              >
                Browse DSC Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              {checkoutStep !== 'success' && (
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-4 mb-4 select-none">
                  <span className={`${checkoutStep === 'cart' ? 'text-blue-700 font-bold' : ''}`}>1. Summary</span>
                  <span className="text-slate-350">/</span>
                  <span className={`${checkoutStep === 'billing' ? 'text-blue-700 font-bold' : ''}`}>2. Customer Info</span>
                  <span className="text-slate-350">/</span>
                  <span className={`${checkoutStep === 'shipping' ? 'text-blue-700 font-bold' : ''}`}>3. Delivery</span>
                </div>
              )}

              {checkoutStep === 'cart' && (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 flex gap-4 relative">
                       <div className="flex-1">
                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded border border-sky-100">{item.product.category}</span>
                        <h4 className="font-display font-bold text-slate-800 text-sm mt-1.5">{item.product.title}</h4>
                        <div className="flex flex-wrap gap-x-3 text-xs text-slate-500 mt-1">
                          <span>Validity: <strong className="text-slate-700 font-medium">{item.selectedYears} Year{item.selectedYears > 1 ? 's' : ''}</strong></span>
                          <span>•</span>
                          <span>USB Token: <strong className="text-slate-700 font-medium">{item.includeToken ? 'Included' : 'None (Renewal)'}</strong></span>
                        </div>
                        <div className="text-sm font-bold text-blue-900 mt-2">
                          Pricing on Request
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col justify-between items-end">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:bg-slate-50 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:bg-slate-50 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {checkoutStep === 'billing' && (
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>Enter correct Aadhaar and PAN details as they will be verified instantly during paperless eKYC setup.</p>
                  </div>

                  <form className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Applicant Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="As written on PAN / Aadhaar card"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          placeholder="Linked with Aadhaar"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="Your business email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">PAN Card Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="10-digit PAN (e.g. ABCDE1234F)"
                          maxLength={10}
                          value={pan}
                          onChange={(e) => setPan(e.target.value.toUpperCase())}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-mono uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Aadhaar Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="12-digit Aadhaar Number"
                          maxLength={12}
                          value={aadhaar}
                          onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-mono"
                        />
                      </div>
                    </div>

                    {/* Company fields shown dynamically if they have organization certificates */}
                    {hasOrgCertificate && (
                      <div className="border-t border-slate-100 pt-3 mt-3 space-y-3.5">
                        <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">Organization Verification Details</h4>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Registered Company Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Full company or business entity name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Company GSTIN Number (Optional)</label>
                          <input
                            type="text"
                            placeholder="15-digit GSTIN (e.g. 07AAAAA1111A1Z1)"
                            maxLength={15}
                            value={gstIn}
                            onChange={(e) => setGstIn(e.target.value.toUpperCase())}
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-mono uppercase"
                          />
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {checkoutStep === 'shipping' && (
                <div className="space-y-4">
                  <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-xs text-sky-800 flex items-start gap-2">
                    <Truck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <p>If you have ordered physical USB tokens, they will be dispatched within 24 hours to this shipping address. Delivery typically takes 2-4 business days.</p>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Delivery / Corporate Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="House / Office No, Building Name, Street"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm mb-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">City *</label>
                        <input
                          type="text"
                          required
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">State *</label>
                        <select
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
                        >
                          <option value="">-- State --</option>
                          {indianStates.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Pincode *</label>
                        <input
                          type="text"
                          required
                          pattern="[0-9]{6}"
                          maxLength={6}
                          placeholder="6-digit ZIP"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-mono"
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-6">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Payment Method:</span>
                          <span className="font-semibold text-slate-800">Secure Direct Bank/UPI/Credit Card</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Transaction Security:</span>
                          <span className="font-semibold text-emerald-600 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> FIPS Standard AES-256
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {checkoutStep === 'success' && recentOrder && (
                <div className="text-center py-6 space-y-5">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 border border-emerald-100">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div>
                    <h4 className="font-display font-extrabold text-2xl text-slate-900">Inquiry Submitted!</h4>
                    <p className="text-sm text-emerald-600 font-semibold mt-1">Inquiry Ref: {recentOrder.id}</p>
                    <p className="text-xs text-slate-500 mt-1">Our executive has received your inquiry and is preparing your custom quote.</p>
                  </div>

                  {/* Summary receipt card */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-150 p-4 text-left text-xs space-y-3.5 max-w-md mx-auto">
                    <div className="border-b border-slate-200 pb-2 flex justify-between items-center text-slate-500 font-semibold uppercase tracking-wider">
                      <span>Inquiry Details</span>
                      <span className="text-slate-800 font-mono text-[10px]">{new Date(recentOrder.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="space-y-2">
                      {recentOrder.items.map((it) => (
                        <div key={it.id} className="flex justify-between">
                          <span className="font-semibold text-slate-800">{it.product.title} (x{it.quantity})</span>
                          <span className="font-mono text-slate-600">{it.selectedYears} Yr Term</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-200 pt-2 space-y-1.5 font-medium">
                      <div className="text-xs text-slate-500 text-center py-2 bg-blue-50/50 rounded border border-blue-100/50">
                        <span className="font-bold text-blue-900">Pricing: Quote on Request</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-2 text-[10px] text-slate-500 leading-relaxed space-y-1">
                      <p><strong>Applicant:</strong> {recentOrder.customerName} (Mob: +91 {recentOrder.phone})</p>
                      <p><strong>Shipping:</strong> {recentOrder.address}, {recentOrder.city}, {recentOrder.state} - {recentOrder.pincode}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-left max-w-md mx-auto space-y-2">
                    <h5 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-blue-700" /> What's Next for Instant Issuance?
                    </h5>
                    <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed pl-1">
                      <li>You will receive a WhatsApp message containing your <strong>eKYC Verification Link</strong>.</li>
                      <li>Prepare your Aadhaar and PAN cards.</li>
                      <li>Perform a quick 1-minute <strong>video verification</strong> using our self-guided web portal.</li>
                      <li>Once approved, your physical FIPS secure USB token will ship, or you can download directly to your existing token.</li>
                    </ol>
                  </div>

                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => {
                        setCheckoutStep('cart');
                        onClose();
                      }}
                      className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer shadow-sm"
                    >
                      Done, Back to Catalog
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions inside drawer */}
        {cartItems.length > 0 && checkoutStep !== 'success' && (
          <div className="p-5 border-t border-slate-100 bg-slate-50">
            {/* Price breakdown summary replaced with quote alert */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-4 text-left text-xs text-blue-900 font-medium">
              <p><strong>★ Quote request on WhatsApp is free:</strong> Our customer agents provide quotes instantly. Submit contact info to send inquiry.</p>
            </div>

            {/* Step navigation buttons */}
            <div className="flex space-x-3">
              {checkoutStep !== 'cart' && (
                <button
                  onClick={handlePrevStep}
                  className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              {checkoutStep !== 'shipping' ? (
                <button
                  onClick={handleNextStep}
                  disabled={(checkoutStep === 'billing' && (!name || !email || !phone || !pan || !aadhaar || (hasOrgCertificate && !companyName)))}
                  className="flex-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !address || !city || !state || !pincode}
                  className="flex-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Submit Inquiry on WhatsApp</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
