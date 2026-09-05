import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, ArrowRight, CheckCircle2, Tractor, Building2, 
  Clock, TrendingUp, BarChart3, QrCode, FileText, 
  Sparkles, AlertCircle, ArrowUpRight, Scale, CheckCheck,
  ExternalLink, Calendar, MapPin, Award, Layers, HelpCircle
} from 'lucide-react';

export default function Home() {
  const { lang } = useAuth();

  // Embedded AI Interactive Calculator State
  const [commodity, setCommodity] = useState('Wheat');
  const [quintals, setQuintals] = useState(50);
  const [moisture, setMoisture] = useState(11.5);

  const mspRates = {
    Wheat: 2585,
    Mustard: 5950,
    Gram: 5650,
    Paddy: 2320
  };

  const currentRate = mspRates[commodity];
  const grossValue = quintals * currentRate;
  const isMoistureHigh = moisture > 12.0;
  const moisturePenaltyPct = isMoistureHigh ? Number(((moisture - 12.0) * 0.75).toFixed(2)) : 0;
  const deductionAmount = Math.round((grossValue * moisturePenaltyPct) / 100);
  const estimatedPayout = grossValue - deductionAmount;

  const content = {
    en: {
      badge: "National Agricultural Procurement & Yard Queue Network",
      heroHeadline1: "Empowering Farmers.",
      heroHeadline2: "Guaranteed Fair MSP.",
      heroHeadline3: "Zero Queue Bottlenecks.",
      heroSub: "A modern digital procurement ecosystem connecting local APMC mandis, dynamic gate tokens, automated weighbridges, and instantaneous Direct Benefit Transfer (DBT) settlements.",
      ctaPrimary: "Access Digital Portal",
      ctaSecondary: "Explore Live Mandis",
      stats: [
        { label: "Active APMC Mandis", val: "1,420+", sub: "Digitally synchronized" },
        { label: "Total MSP Disbursed", val: "₹1,418 Cr+", sub: "Directly into farmer A/Cs" },
        { label: "Certified Procurement", val: "5.2M Quintals", sub: "Rabi & Kharif records" },
        { label: "Average Gate Turnaround", val: "42 Mins", sub: "Reduced from 16+ hours" }
      ],
      stepsTitle: "The End-to-End Procurement Journey",
      stepsSub: "From field dispatch to certified bank credit in four streamlined stages",
      mspTableTitle: "Current Season Government MSP Rates",
      mspTableSub: "Official gazette floor prices for direct procurement centers",
      schemesTitle: "Central Government Farmer Welfare Schemes",
      schemesSub: "Explore official portals, eligibility frameworks, and direct application links",
      workspacesTitle: "Role-Based Operational Consoles",
      workspacesSub: "Specialized tools built for agricultural logistics and transparency"
    },
    hi: {
      badge: "राष्ट्रीय कृषि खरीद एवं मंडी कतार प्रबंधन प्रणाली",
      heroHeadline1: "किसानों का सशक्तिकरण।",
      heroHeadline2: "गारंटीड सही एमएसपी।",
      heroHeadline3: "लाइन की समस्या समाप्त।",
      heroSub: "एक आधुनिक डिजिटल कृषि खरीद नेटवर्क जो मंडियों, डिजिटल गेट टोकन, स्वचालित तौल और सीधे बैंक खाते में भुगतान को जोड़ता है।",
      ctaPrimary: "पोर्टल में प्रवेश करें",
      ctaSecondary: "लाइव मंडी देखें",
      stats: [
        { label: "सक्रिय एपीएमसी मंडियां", val: "1,420+", sub: "डिजिटल नेटवर्क से जुड़ी" },
        { label: "कुल एमएसपी भुगतान", val: "₹1,418 करोड़+", sub: "सीधा बैंक खाते में" },
        { label: "प्रमाणित खरीद", val: "52 लाख क्विंटल", sub: "रबी एवं खरीफ सत्र" },
        { label: "औसत इंतजार समय", val: "42 मिनट", sub: "16 घंटे से घटकर" }
      ],
      stepsTitle: "पूर्ण खरीद प्रक्रिया का डिजिटल चक्र",
      stepsSub: "खेत से लेकर बैंक खाते में प्रमाणित भुगतान तक 4 आसान चरण",
      mspTableTitle: "वर्तमान सत्र के आधिकारिक सरकारी एमएसपी भाव",
      mspTableSub: "न्यूनतम समर्थन मूल्य दरें (प्रति क्विंटल)",
      schemesTitle: "प्रमुख सरकारी किसान कल्याण योजनाएं",
      schemesSub: "आधिकारिक पोर्टल्स, पात्रता नियम और सीधे आवेदन के लिंक",
      workspacesTitle: "समर्पित डिजिटल कार्यक्षेत्र",
      workspacesSub: "किसानों और मंडी अधिकारियों के लिए पारदर्शी उपकरण"
    }
  };

  const t = content[lang] || content.en;

  const schemesList = [
    {
      title: "PM-KISAN",
      tag: "Direct Benefit Transfer",
      full: "Pradhan Mantri Kisan Samman Nidhi",
      desc: "Direct financial support of ₹6,000 per annum paid in 3 equal installments into Aadhaar-linked bank accounts.",
      url: "https://pmkisan.gov.in"
    },
    {
      title: "PMFBY",
      tag: "Crop Insurance",
      full: "Pradhan Mantri Fasal Bima Yojana",
      desc: "Low-cost safety net against comprehensive crop failure. Premium capped at 1.5% for Rabi and 2% for Kharif crops.",
      url: "https://pmfby.gov.in"
    },
    {
      title: "Kisan Credit Card",
      tag: "Agricultural Credit",
      full: "Institutional Concessional Credit",
      desc: "Affordable credit up to ₹3 Lakh at an effective interest rate of 4% per year with timely loan repayments.",
      url: "https://myscheme.gov.in"
    },
    {
      title: "e-NAM Portal",
      tag: "National Trading Hub",
      full: "National Agriculture Market",
      desc: "Pan-India digital electronic trading platform integrating thousands of APMC wholesale markets for transparent bidding.",
      url: "https://enam.gov.in"
    },
    {
      title: "PM-KUSUM",
      tag: "Clean Energy Subsidy",
      full: "Pradhan Mantri Kisan Urja Suraksha Utthan",
      desc: "Subsidies up to 60% for installing solar agricultural pumps and solarizing grid-connected irrigation infrastructure.",
      url: "https://pmkusum.mnre.gov.in"
    },
    {
      title: "Soil Health Card",
      tag: "Soil Testing & Yield",
      full: "National Soil Nutrient Assessment",
      desc: "Scientific advisory on 12 vital macro and micro soil nutrients to minimize chemical fertilizer wastage and raise yields.",
      url: "https://soilhealth.dac.gov.in"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      <Navbar />

      {/* Hero Section with Blended Imagery & Gradients */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-16 pb-24 px-6">
        {/* Background Image Blend Layer */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80" 
            alt="Golden wheat fields" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Subtle glowing ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/20 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 backdrop-blur-md shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> {t.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto">
            {t.heroHeadline1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-300">
              {t.heroHeadline2}
            </span> <br />
            <span className="text-slate-200 text-3xl sm:text-4xl md:text-5xl font-extrabold">{t.heroHeadline3}</span>
          </h1>

          <p className="text-sm md:text-base text-emerald-100/80 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.heroSub}
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <Link 
              to="/login" 
              className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black px-8 py-3.5 rounded-2xl transition flex items-center gap-2 shadow-xl shadow-emerald-950/60 text-xs hover:scale-105 transform duration-200"
            >
              {t.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/farmer/find-mandi" 
              className="bg-emerald-900/60 hover:bg-emerald-800/80 text-white font-semibold px-7 py-3.5 rounded-2xl transition border border-emerald-600/40 text-xs flex items-center gap-2 backdrop-blur-md"
            >
              {t.ctaSecondary} <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>

          {/* Real-Time Telemetry Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-12 max-w-5xl mx-auto">
            {t.stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-left shadow-lg">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/80 block">{stat.label}</span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-white mt-1 block">{stat.val}</span>
                <span className="text-[11px] text-emerald-400 font-medium">{stat.sub}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Visual Crop Gallery & Mandi Hub Cards */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white relative">
            <img 
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80" 
              alt="Wheat Procurement" 
              className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">Rabi Season Standard</span>
              <h3 className="font-bold text-slate-900 text-base">Certified Wheat Intake</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Direct grain moisture inspection, weighing, and instant MSP disbursement at ₹2,585 per quintal.</p>
            </div>
          </div>

          <div className="group rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white relative">
            <img 
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80" 
              alt="Mustard and Oilseeds" 
              className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full">Oilseeds Priority</span>
              <h3 className="font-bold text-slate-900 text-base">Mustard & Oilseed Lines</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Fast-track weighbridge entry for high-demand oilseeds with automated density and dockage tests.</p>
            </div>
          </div>

          <div className="group rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white relative">
            <img 
              src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80" 
              alt="Digital Weighbridge" 
              className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">Digitized Yard Scales</span>
              <h3 className="font-bold text-slate-900 text-base">Tamper-Proof Scales</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Integrated scale sensors directly commit gross-tare metrics to the immutable transaction ledger.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Procurement Lifecycle */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Streamlined Logistics</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">{t.stepsTitle}</h2>
          <p className="text-xs text-slate-500">{t.stepsSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              step: "01",
              title: "Discover & Reserve",
              desc: "Farmers inspect yard capacity and book arrival slots before leaving the farm.",
              icon: <MapPin className="w-5 h-5 text-emerald-700" />
            },
            {
              step: "02",
              title: "Scan Dynamic QR",
              desc: "Security officers verify vehicle identity and cargo at the gate via token QR.",
              icon: <QrCode className="w-5 h-5 text-blue-700" />
            },
            {
              step: "03",
              title: "Weighbridge Scale",
              desc: "Automated weighbridge logs certified tonnage, moisture, and grading parameters.",
              icon: <Scale className="w-5 h-5 text-purple-700" />
            },
            {
              step: "04",
              title: "Direct DBT Settlement",
              desc: "Government MSP funds are disbursed directly into the farmer's verified bank account.",
              icon: <CheckCheck className="w-5 h-5 text-emerald-700" />
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3 relative hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-black text-slate-200 font-mono">{item.step}</span>
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">{item.icon}</div>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Official Government Floor MSP Rates Table */}
      <section className="bg-slate-100/60 border-y border-slate-200 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Government Gazette Benchmark</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">{t.mspTableTitle}</h2>
              <p className="text-xs text-slate-500">{t.mspTableSub}</p>
            </div>
            <Link 
              to="/ai-assistant"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 self-start md:self-auto bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Query All Crops with KisanSaathi AI
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Commodity</th>
                    <th className="p-4">Harvest Season</th>
                    <th className="p-4">Prescribed Standard Moisture</th>
                    <th className="p-4">Official MSP (₹ / Quintal)</th>
                    <th className="p-4 text-right">Payment Gateway</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Wheat (गेहूं)
                    </td>
                    <td className="p-4 text-slate-500">Rabi 2025–26</td>
                    <td className="p-4 text-slate-700">12.0% Maximum</td>
                    <td className="p-4 font-mono font-black text-slate-900 text-sm">₹2,585</td>
                    <td className="p-4 text-right"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px]">Direct DBT</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span> Mustard / Rapeseed (सरसों)
                    </td>
                    <td className="p-4 text-slate-500">Rabi 2025–26</td>
                    <td className="p-4 text-slate-700">8.0% Maximum</td>
                    <td className="p-4 font-mono font-black text-slate-900 text-sm">₹5,950</td>
                    <td className="p-4 text-right"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px]">Direct DBT</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Gram / Chana (चना)
                    </td>
                    <td className="p-4 text-slate-500">Rabi 2025–26</td>
                    <td className="p-4 text-slate-700">10.0% Maximum</td>
                    <td className="p-4 font-mono font-black text-slate-900 text-sm">₹5,650</td>
                    <td className="p-4 text-right"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px]">Direct DBT</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Paddy Common (धान)
                    </td>
                    <td className="p-4 text-slate-500">Kharif 2025–26</td>
                    <td className="p-4 text-slate-700">17.0% Maximum</td>
                    <td className="p-4 font-mono font-black text-slate-900 text-sm">₹2,320</td>
                    <td className="p-4 text-right"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px]">Direct DBT</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Live AI MSP Settlement Calculator */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 border border-emerald-800/50 text-white shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 border-b border-emerald-800/60 pb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Interactive AI Simulator
              </div>
              <h2 className="text-2xl font-black text-white">AI Net MSP Settlement Estimator</h2>
              <p className="text-xs text-emerald-200/70">Simulate fair-price calculations with moisture-based deduction logic</p>
            </div>
            <Link 
              to="/ai-assistant"
              className="text-xs font-bold bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-4 py-2.5 rounded-xl border border-emerald-600/60 transition flex items-center gap-1.5 w-fit"
            >
              Open Full KisanSaathi AI <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Inputs */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-emerald-200/80 mb-1 font-semibold">Commodity</label>
                <select
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  className="w-full bg-slate-800/90 border border-emerald-700/60 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Wheat">Wheat (गेहूं) - ₹2,585</option>
                  <option value="Mustard">Mustard (सरसों) - ₹5,950</option>
                  <option value="Gram">Gram (चना) - ₹5,650</option>
                  <option value="Paddy">Paddy (धान) - ₹2,320</option>
                </select>
              </div>

              <div>
                <label className="block text-emerald-200/80 mb-1 font-semibold">Quantity (Quintals)</label>
                <input
                  type="number"
                  value={quintals}
                  onChange={(e) => setQuintals(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-800/90 border border-emerald-700/60 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-emerald-200/80 mb-1 font-semibold">Moisture Level (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full bg-slate-800/90 border border-emerald-700/60 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-3 text-[11px] text-emerald-300/80 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Standard moisture ceiling is <strong>12.0%</strong>. Readings above threshold trigger standard dockage deduction formulas.</span>
              </div>
            </div>

            {/* Calculations Card */}
            <div className="lg:col-span-5 bg-emerald-900/40 p-5 rounded-3xl border border-emerald-700/60 space-y-3 text-xs backdrop-blur-md">
              <div className="flex justify-between items-center">
                <span className="text-emerald-300 font-semibold">Base MSP Gross:</span>
                <span className="font-mono font-bold text-white">₹{grossValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-300 font-semibold">Moisture Adjustment:</span>
                <span className="font-mono font-bold text-amber-300">
                  {deductionAmount > 0 ? `- ₹${deductionAmount.toLocaleString()} (${moisturePenaltyPct}%)` : '₹0 (Grade A Optimal)'}
                </span>
              </div>
              <div className="pt-3 border-t border-emerald-700/80 flex justify-between items-baseline">
                <span className="font-bold text-white text-sm">Estimated Net DBT:</span>
                <span className="text-2xl font-black font-mono text-emerald-400">
                  ₹{estimatedPayout.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Central Government Schemes Hub with Official Links */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Public Portals & Initiatives</span>
          <h2 className="text-3xl font-black text-slate-900">{t.schemesTitle}</h2>
          <p className="text-xs text-slate-500">{t.schemesSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemesList.map((scheme, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-400 hover:shadow-md transition">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    {scheme.tag}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{scheme.title}</h3>
                <p className="text-[11px] font-semibold text-emerald-700">{scheme.full}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{scheme.desc}</p>
              </div>
              <a
                href={scheme.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center justify-between pt-3 border-t border-slate-100 group transition"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Workspace Selector */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl font-black text-slate-900">{t.workspacesTitle}</h2>
          <p className="text-xs text-slate-500">{t.workspacesSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="p-3.5 w-fit bg-emerald-100 text-emerald-800 rounded-2xl">
                <Tractor className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Farmer Workspace</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Check regional mandi traffic on an interactive map, reserve arrival windows, generate printable QR gate passes, and download digital payment receipts.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Interactive Mandi Congestion & Distance Map</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dynamic Gate Entry Pass with encrypted Token</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant PDF MSP Settlement Invoicing</li>
              </ul>
            </div>
            <Link
              to="/login"
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-xs transition block shadow-sm"
            >
              Sign In as Farmer
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="p-3.5 w-fit bg-slate-100 text-slate-800 rounded-2xl">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Procurement Officer Console</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Streamline daily yard intake, verify incoming vehicle tokens, record certified gross scale weights and crop quality metrics, and log audit entries.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700" /> Instant QR Token Gate Scanner</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700" /> Weighbridge Scale & Grading Console</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700" /> Cryptographic Dispute Audit Trail</li>
              </ul>
            </div>
            <Link
              to="/login"
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-center text-xs transition block shadow-sm"
            >
              Sign In as Procurement Officer
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-14 px-6 border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-2">
            <span className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span> AgriPulse (किसानसेतु)
            </span>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              National Agricultural Procurement & Automated Yard Scheduling Infrastructure. Enhancing price discovery and DBT disbursals across APMC mandi yards.
            </p>
            <p className="text-[11px] text-emerald-400 font-semibold pt-2">
              Toll-Free Kisan Call Center: 1800-180-1551
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-slate-200 text-xs uppercase tracking-wider">Core Navigation</p>
            <ul className="space-y-2">
              <li><Link to="/farmer/find-mandi" className="hover:text-emerald-400 transition">Find Mandis Map</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition">Farmer / Officer Login</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-emerald-400 transition">KisanSaathi AI Bot</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-slate-200 text-xs uppercase tracking-wider">Official Portals</p>
            <ul className="space-y-2">
              <li><a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1">PM-KISAN Portal <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://pmfby.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1">PMFBY Portal <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://enam.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1">e-NAM Mandi Hub <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://myscheme.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1">myScheme Government Portal <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-800/80 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] gap-2">
          <span>AgriPulse National Procurement Architecture</span>
          <span>© 2026 AgriPulse. Dedicated to Indian Farmers & Transparent Mandi Yard Systems.</span>
        </div>
      </footer>

    </div>
  );
}