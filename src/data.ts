import { Product, DriverDownload } from './types';

export const products: Product[] = [
  {
    id: 'class3-individual-signing',
    title: 'Class 3 Individual Signing DSC',
    shortDescription: 'Ideal for GST, Income Tax filing, EPFO, MCA/ROC, and director KYC.',
    category: 'class3',
    price: 849,
    originalPrice: 1748,
    features: [
      'Aadhaar eKYC enabled (Paperless)',
      'Issued in 10-30 Minutes',
      'Free Video Verification assistance',
      'Valid for 1, 2, or 3 Years options',
      'SHA-2 2048-bit encryption standard',
      'Licensed by Controller of Certifying Authorities (CCA)'
    ],
    rating: 4.9,
    reviewsCount: 84,
    isBestSeller: true,
    onSale: true,
    type: 'individual'
  },
  {
    id: 'class3-individual-combo',
    title: 'Class 3 Individual Combo DSC (Signing + Encryption)',
    shortDescription: 'Required for E-Tendering, E-Procurement, IceGate, and high-value transactions.',
    category: 'class3',
    price: 1499,
    originalPrice: 2999,
    features: [
      'Signing + Encryption dual certificates',
      'Mandatory for all Indian E-Tendering portals',
      'Supported on GeM, CPP, and railway portals',
      'Paperless eKYC setup within minutes',
      'Pan India expert verification support',
      '100% Secure FIPS compliant'
    ],
    rating: 4.8,
    reviewsCount: 112,
    isBestSeller: false,
    onSale: true,
    type: 'combo'
  },
  {
    id: 'dgft-organization-signing',
    title: 'DGFT Digital Signature (Organization Signing)',
    shortDescription: 'Exclusively for Importers/Exporters to communicate with Director General of Foreign Trade.',
    category: 'dgft',
    price: 1699,
    originalPrice: 2811,
    features: [
      'Specifically configured for Import-Export (IEC) code',
      'Enables digital submission of DGFT forms',
      'Required for MEIS, SEIS schemes and duty credits',
      'Paperless setup for Indian registered entities',
      'Includes organizational verification support',
      'Valid on dgft.gov.in and allied custom portals'
    ],
    rating: 4.8,
    reviewsCount: 6,
    isBestSeller: true,
    onSale: true,
    type: 'organization'
  },
  {
    id: 'foreign-national-class3',
    title: 'Foreign National & NRI Class 3 Digital Signature',
    shortDescription: 'For NRIs, expatriates, and foreign directors seeking digital signature in India.',
    category: 'foreign',
    price: 3186,
    originalPrice: 4857,
    features: [
      'Specially designed for non-Indian passport holders',
      'Documents verified in local country or online via video',
      'Required for setting up subsidiary in India',
      'Essential for filing Indian income tax as non-resident',
      'Compliant with CCA Indian guidelines for foreign nationals',
      'Dedicated global support manager'
    ],
    rating: 5.0,
    reviewsCount: 3,
    isBestSeller: false,
    onSale: true,
    type: 'individual'
  },
  {
    id: 'class3-organization-combo',
    title: 'Class 3 Organization Combo DSC',
    shortDescription: 'Dual certificate (Signing + Encryption) issued under organization name.',
    category: 'class3',
    price: 2499,
    originalPrice: 4499,
    features: [
      'Includes organization name in certificate',
      'Signing and Encryption certificates bundled',
      'Required for corporate e-tendering and tenders',
      'Approved for GST, MCA, and legal filings',
      'Requires company registration documents & authorization',
      'Highest level of cryptographic assurance'
    ],
    rating: 4.9,
    reviewsCount: 43,
    isBestSeller: false,
    onSale: true,
    type: 'combo'
  },
  {
    id: 'digital-signature-renewal',
    title: 'Digital Signature Renewal (Class 3)',
    shortDescription: 'Renew your expiring Class 3 DSC in 3 steps on your existing USB Token.',
    category: 'renewal',
    price: 849,
    originalPrice: 1748,
    features: [
      'Reuse your existing FIPS USB Token (Saves cost!)',
      'Instant renewal validation in 15 minutes',
      'Supports ePass2003, mToken, Watchdata, etc.',
      'Simple online verification without physical courier',
      'Affordable renewal rates with full validity',
      'Seamless overlap with your expiring certificate'
    ],
    rating: 5.0,
    reviewsCount: 3,
    isBestSeller: false,
    onSale: true,
    type: 'individual'
  },
  {
    id: 'epass2003-token',
    title: 'ePass2003 FIPS USB Token',
    shortDescription: 'Industry standard cryptographic USB hardware token. Certified FIPS 140-2 Level 3.',
    category: 'token',
    price: 399,
    originalPrice: 800,
    features: [
      'FIPS 140-2 Level 3 certified secure chip',
      'Stores up to 10 digital certificates safely',
      'Auto-run driver installation on insertion',
      'Protects your DSC from copying or unauthorized export',
      'Extremely durable casing with protective cap',
      'Universally compatible with all Certifying Authorities'
    ],
    rating: 4.9,
    reviewsCount: 228,
    isBestSeller: true,
    onSale: true,
    type: 'token'
  }
];

export const comparisonFeatures = [
  {
    name: 'GST, Income Tax, EPF, Trademark Registration',
    individualSigning: true,
    individualCombo: true,
    organizationCombo: true,
    dgftSigning: true
  },
  {
    name: 'MCA21, ROC, Director KYC, Invoice Signing',
    individualSigning: true,
    individualCombo: true,
    organizationCombo: true,
    dgftSigning: true
  },
  {
    name: 'IEC Code Registration, IRCTC, Traces',
    individualSigning: true,
    individualCombo: true,
    organizationCombo: true,
    dgftSigning: false
  },
  {
    name: 'IceGate, MEIS, SEIS Website, CERSAI',
    individualSigning: false,
    individualCombo: true,
    organizationCombo: true, // Limited Use / Yes
    dgftSigning: false
  },
  {
    name: 'DGFT - Foreign Trade Country of Origin-Code',
    individualSigning: false,
    individualCombo: false,
    organizationCombo: false,
    dgftSigning: true
  },
  {
    name: 'AICTE, CBSE Institutes',
    individualSigning: false,
    individualCombo: true,
    organizationCombo: true,
    dgftSigning: false
  },
  {
    name: 'Gram Panchayat & Local Government Portals',
    individualSigning: true, // Limited
    individualCombo: true, // Limited
    organizationCombo: true, // All Gram
    dgftSigning: false
  }
];

export const driverDownloads: DriverDownload[] = [
  {
    id: 'epass2003-win',
    name: 'ePass2003 Auto USB Token Driver (Windows)',
    os: 'Windows',
    version: 'v2.0 (New-2026)',
    size: '18.4 MB',
    downloadUrl: '#epass-win',
    category: 'USB Token Driver'
  },
  {
    id: 'epass2003-mac',
    name: 'ePass2003 Token Driver (Mac OS)',
    os: 'Mac',
    version: 'v1.4.1',
    size: '12.1 MB',
    downloadUrl: '#epass-mac',
    category: 'USB Token Driver'
  },
  {
    id: 'mtoken-win',
    name: 'mToken CryptoID USB Driver (Windows)',
    os: 'Windows',
    version: 'v3.2',
    size: '14.2 MB',
    downloadUrl: '#mtoken-win',
    category: 'USB Token Driver'
  },
  {
    id: 'proxkey-win',
    name: 'ProxKey / WD Pro USB Token Driver (Windows)',
    os: 'Windows',
    version: 'v1.8',
    size: '16.5 MB',
    downloadUrl: '#proxkey-win',
    category: 'USB Token Driver'
  },
  {
    id: 'emsigner-win',
    name: 'emSigner GST / MCA Signing Utility (Windows)',
    os: 'Windows',
    version: 'v2.8',
    size: '22.0 MB',
    downloadUrl: '#emsigner-win',
    category: 'Signer Software'
  },
  {
    id: 'java-runtime',
    name: 'Java Runtime Environment (JRE) for DSC (Windows x64)',
    os: 'Windows',
    version: '8u381',
    size: '82.4 MB',
    downloadUrl: '#java-jre',
    category: 'Utility'
  }
];

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 
  'Lakshadweep', 'Puducherry'
];

export const faqs = [
  {
    question: 'What is a Digital Signature Certificate (DSC)?',
    answer: 'A Digital Signature Certificate is a secure digital key issued by certifying authorities (CAs) to validate and certify the identity of the person holding this certificate. It uses public-key cryptography to sign electronic documents, verify GST filings, file MCA returns, and apply for government e-tenders securely online.'
  },
  {
    question: 'How do I buy a Digital Signature Certificate online?',
    answer: 'Buying a DSC online with DSC India is completely paperless and simple: 1) Select your required DSC class (such as Class 3 or DGFT), 2) Provide your Aadhaar/PAN details for paperless eKYC, 3) Complete a 1-minute video verification on your mobile or laptop, and 4) Download the certificate into your secure USB token. The process takes less than 30 minutes.'
  },
  {
    question: 'Is a physical USB token mandatory for storing DSC?',
    answer: 'Yes, as per CCA (Controller of Certifying Authorities) guidelines in India, a digital signature certificate must be securely stored in a FIPS 140-2 Level 3 certified cryptographic hardware USB token (such as ePass2003 or mToken). If you already have a token, you can purchase a "Renewal" and download the new certificate to your existing token to save token costs.'
  },
  {
    question: 'What is the difference between Class 3 and DGFT DSC?',
    answer: 'Class 3 DSC is a high-assurance certificate used for general purposes like GST, Income Tax filing, EPFO, MCA filing, and general e-tendering. DGFT (Directorate General of Foreign Trade) DSC is specifically designed for Importers and Exporters who require a signature mapped to their Import Export Code (IEC) to file documents on the official DGFT website.'
  },
  {
    question: 'Can I renew my expired digital signature on my old token?',
    answer: 'Absolutely. If you have a functional, valid FIPS-compliant USB token, you can buy a "Renewal Only" package. This is highly cost-effective as we assist you in downloading the newly issued certificate directly into your existing USB token via secure web utilities.'
  },
  {
    question: 'How long does video verification take?',
    answer: 'Video verification takes less than 1 minute. You will receive a direct link on your registered mobile number or email. All you need to do is show your original documents (Aadhaar and PAN) to the camera and read out a 3-digit numeric code shown on the screen. Once recorded, our team approves it instantly.'
  }
];
