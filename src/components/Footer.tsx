import { ShieldCheck, Mail, MapPin, Phone, HelpCircle } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenEnquiry: () => void;
}

export default function Footer({ setActiveTab, onOpenEnquiry }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-blue-900 select-none">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Logo className="h-9 w-9 filter drop-shadow-md" />
            <div>
              <span className="font-display font-black text-xl tracking-tight text-white">DSC </span>
              <span className="font-display font-bold text-xl tracking-tight text-sky-400">India</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            DSC India is a premier, paperless Digital Signature Certificate provider. We offer instant Class 3, DGFT, and Foreign/NRI Digital Signature Certificates under CA guidelines licensed by CCA.
          </p>
          <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Authorized Certifying Partner</span>
          </div>
        </div>

        {/* Quick Sitemap Links */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase">Our Products</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button 
                onClick={() => setActiveTab('buy-dsc')} 
                className="hover:text-sky-400 transition-colors text-left"
              >
                Class 3 Individual DSC
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('buy-dsc')} 
                className="hover:text-sky-400 transition-colors text-left"
              >
                Class 3 Organization DSC
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('buy-dsc')} 
                className="hover:text-sky-400 transition-colors text-left"
              >
                DGFT Signature for Exporters
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('buy-dsc')} 
                className="hover:text-sky-400 transition-colors text-left"
              >
                Foreign National & NRI DSC
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('tokens')} 
                className="hover:text-sky-400 transition-colors text-left"
              >
                ePass2003 USB Hardware Tokens
              </button>
            </li>
          </ul>
        </div>

        {/* Resources & Support */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase">Quick Links</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button 
                onClick={() => setActiveTab('downloads')} 
                className="hover:text-sky-400 transition-colors text-left"
              >
                Download USB Token Drivers
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('pricing')} 
                className="hover:text-sky-400 transition-colors text-left"
              >
                Compare DSC Pricing
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenEnquiry} 
                className="hover:text-sky-400 transition-colors text-left"
              >
                Submit Instant Enquiry
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('contact')} 
                className="hover:text-sky-400 transition-colors text-left"
              >
                Help & Contact Support
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase">Contact Details</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                Delhi - 110092
              </span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>+91 8287572721</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>sales@dscindia.net</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <HelpCircle className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Hours: 10:00 AM - 7:00 PM (Mon-Sat)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* SEO rich text keyword cluster footer */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed text-center space-y-4">
        <p>
          Primary Services: <strong>Buy Digital Signature Certificate online</strong>, paperless Class 3 DSC, renewal of digital signature, DGFT digital signature for export-import, Class 3 dual certificate (signing + encryption) with USB FIPS hardware token. Our digital signature processes are built in adherence to the latest guidelines issued by the Controller of Certifying Authorities (CCA) of India. 
        </p>
        <p>
          We support instant eKYC validation using Aadhaar OTP / PAN biometric verification and offer same-day issuance within 30 minutes, backed by professional CA partners including eMudhra, Capricorn, Pantasign, VSign, XtraTrust, and SignX. Secure USB tokens including ePass2003 Auto, mToken, and Proxkey drivers can be configured seamlessly on Windows and macOS.
        </p>
        <p className="text-slate-600 text-[10px] pt-4">
          Disclaimer: DSC India is an independent authorized business partner of licensed Certifying Authorities. All brand names, logos, trademarks, and registered assets of CAs (eMudhra, Capricorn, etc.) used herein are properties of their respective corporate owners and are shown purely for service enablement purposes.
        </p>
        <p className="text-slate-600 text-xs font-semibold pt-2">
          © {currentYear} DSC India. All Rights Reserved. Crafted for Indian E-Governance Enablement.
        </p>
      </div>
    </footer>
  );
}
