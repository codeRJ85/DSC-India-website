import React, { useState } from 'react';
import { X, Send, Phone, ShieldCheck } from 'lucide-react';
import { indianStates } from '../data';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledDscClass?: string;
}

export default function EnquiryModal({ isOpen, onClose, prefilledDscClass = '' }: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dscClass, setDscClass] = useState(prefilledDscClass || 'Class 3 (Individual)');
  const [state, setState] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const waMsg = `Hi DSC India, I want to submit a quick enquiry:
Name: ${name}
Phone: ${phone}
Email: ${email}
DSC Type: ${dscClass}
State: ${state}
Message: ${message}`;

    window.open(`https://wa.me/918287572721?text=${encodeURIComponent(waMsg)}`, '_blank');

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDscClass('Class 3 (Individual)');
    setState('');
    setMessage('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div id="enquiry-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div id="enquiry-modal" className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-sky-400" />
            <div>
              <h3 className="font-display font-semibold text-lg">Quick Enquiry Form</h3>
              <p className="text-xs text-blue-200">Get a callback from a DSC expert in 10 minutes</p>
            </div>
          </div>
          <button 
            id="close-enquiry-btn"
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
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
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Required DSC *</label>
                  <select
                    value={dscClass}
                    onChange={(e) => setDscClass(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
                  >
                    <option value="Class 3 (Individual)">Class 3 (Individual)</option>
                    <option value="Class 3 (Organization)">Class 3 (Organization)</option>
                    <option value="DGFT DSC (Import-Export)">DGFT DSC (Import-Export)</option>
                    <option value="Foreign National DSC">Foreign National DSC</option>
                    <option value="Crypto USB Tokens Only">Crypto USB Tokens Only</option>
                    <option value="Renewal of Old DSC">Renewal of Old DSC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Select State *</label>
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
                  >
                    <option value="">-- Choose State --</option>
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Requirements / Message</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your tender or documentation requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                />
              </div>

              <button
                id="submit-enquiry-btn"
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-800 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry Online</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-xl text-slate-900">Thank You, {name}!</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Your inquiry regarding <strong className="text-blue-900 font-medium">{dscClass}</strong> has been received. Our executive will call you on <strong className="text-blue-900 font-medium">+91 {phone}</strong> shortly.
                </p>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 max-w-md mx-auto text-left text-xs space-y-2 text-slate-600">
                <p className="font-semibold text-blue-900 text-center mb-1 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 mr-1" /> Call support directly for instant issuance:
                </p>
                <div className="flex flex-col items-center justify-center space-y-1">
                  <p className="text-center text-sm font-bold text-blue-800">+91 8287572721</p>
                  <p className="text-center text-sm font-bold text-blue-800">+91 8588072606</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-5 rounded-lg transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
