import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Send, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { indianStates } from '../data';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('New Class 3 DSC Purchase');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const waMsg = `Hi DSC India, I want to send a direct support request:
Name: ${name}
Phone: ${phone}
Email: ${email}
Subject: ${subject}
Message: ${message}`;

    window.open(`https://wa.me/918287572721?text=${encodeURIComponent(waMsg)}`, '_blank');

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div id="contact-view-container" className="max-w-7xl mx-auto px-4 py-8 space-y-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-widest">
          Get in Touch
        </span>
        <h1 className="font-display font-extrabold text-3.5xl text-blue-950">
          Contact DSC India Support & Headquarters
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Need help with video verification or corporate documentation? Reach our seasoned support managers for instant resolution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column Contacts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs select-none">
            <h3 className="font-display font-bold text-lg text-blue-950 border-b border-slate-100 pb-3">Corporate Offices</h3>
            
            <ul className="space-y-5 text-xs text-slate-600">
              <li className="flex items-start space-x-3.5">
                <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-100 shrink-0">
                  <MapPin className="w-4 h-4 text-blue-950" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">Headquarters Location</h4>
                  <p className="mt-1 leading-relaxed">
                    DSC India Security Center, 207, 1st Floor, Vikas Complex, 37, V.S. Block, Shakarpur, New Delhi, Delhi 110092
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-100 shrink-0">
                  <Phone className="w-4 h-4 text-blue-950" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">Phone Hotlines</h4>
                  <p className="mt-1 font-bold text-blue-900 text-sm font-sans">+91 8287572721</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Corporate landline: 011-43082971</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-100 shrink-0">
                  <Mail className="w-4 h-4 text-blue-950" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">Support Emails</h4>
                  <p className="mt-1 font-semibold text-slate-850">sales@dscindia.net</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Corporate channel: sales@dscindia.net</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <div className="bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-100 shrink-0">
                  <Clock className="w-4 h-4 text-blue-950" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">Business Hours</h4>
                  <p className="mt-1">Monday to Saturday: 10:00 AM - 7:00 PM</p>
                  <p className="text-[10px] text-slate-450 mt-0.5">Closed on National Gazetted Holidays</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-blue-950 text-white p-6 rounded-3xl border border-blue-900 shadow-lg space-y-4">
            <h4 className="font-display font-bold text-sm flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-sky-400" /> Secure Encryption Support
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our hardware and software servers are audited under security compliance codes of the Indian IT Act. Every identity file or video verification feed remains safe, encrypted, and isolated from open networks.
            </p>
          </div>
        </div>

        {/* Right Column Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-150 pb-3">
            <h3 className="font-display font-bold text-base text-slate-900">Send Direct Support Message</h3>
            <p className="text-xs text-slate-500 mt-0.5">Need immediate help with corporate tenders or invoice GSTIN setup?</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Rajesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Contact Mobile *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. rajesh@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Message Subject *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="New Class 3 DSC Purchase">New Class 3 DSC Purchase</option>
                    <option value="DGFT DSC Configuration">DGFT DSC Configuration</option>
                    <option value="Renewal of Expired Signature">Renewal of Expired Signature</option>
                    <option value="USB Token Delivery Status">USB Token Delivery Status</option>
                    <option value="Franchise & Slab margins">Franchise & Slab margins</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Detailed Support Request *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter details about your video verification issue, portal errors, or billing enquiries..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Support Message</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 border border-emerald-100">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-slate-900 font-display">Support Ticket Created!</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto font-sans">
                  Thank you, <strong>{name}</strong>. Your ticket regarding <strong className="text-blue-900">{subject}</strong> has been created. A support executive will email you or call your registered phone <strong className="text-blue-900">+91 {phone}</strong> within 30 minutes.
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-5 rounded-lg transition-colors cursor-pointer"
              >
                Create another ticket
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
