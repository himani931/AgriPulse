import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, LogOut, User, Globe, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, logout, lang, toggleLanguage } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLabels = {
    en: {
      overview: 'Overview',
      farmerDashboard: 'Dashboard',
      findMandi: 'Find Mandi',
      mandiControl: 'Mandi Control',
      auditTrail: 'Audit Trail',
      aiBot: 'KisanSaathi AI',
      signIn: 'Sign In',
      portalBadge: 'PORTAL'
    },
    hi: {
      overview: 'अवलोकन',
      farmerDashboard: 'डैशबोर्ड',
      findMandi: 'मंडी खोजें',
      mandiControl: 'मंडी नियंत्रण',
      auditTrail: 'ऑडिट लेजर',
      aiBot: 'किसानसाथी AI',
      signIn: 'लॉगिन',
      portalBadge: 'पोर्टल'
    }
  };

  const t = navLabels[lang] || navLabels.en;

  return (
    <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/60 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      <Link 
        to={user ? (user.role === 'farmer' ? '/farmer/dashboard' : '/mandi/dashboard') : '/'} 
        className="flex items-center gap-2.5 font-black text-lg tracking-tight"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
          <Sprout className="w-5 h-5 text-emerald-400" />
        </div>
        <span>AgriPulse <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-800/80 text-emerald-300 ml-1 border border-emerald-700">{t.portalBadge}</span></span>
      </Link>

      <nav className="flex items-center gap-5 text-xs font-semibold">
        {!user && (
          <Link to="/" className="hover:text-emerald-300 transition">
            {t.overview}
          </Link>
        )}

        {user?.role === 'farmer' && (
          <>
            <Link to="/farmer/dashboard" className="hover:text-emerald-300 transition">
              {t.farmerDashboard}
            </Link>
            <Link to="/farmer/find-mandi" className="hover:text-emerald-300 transition">
              {t.findMandi}
            </Link>
          </>
        )}

        {user?.role === 'procurement' && (
          <>
            <Link to="/mandi/dashboard" className="hover:text-emerald-300 transition">
              {t.mandiControl}
            </Link>
            <Link to="/farmer/ledger" className="hover:text-emerald-300 transition">
              {t.auditTrail}
            </Link>
          </>
        )}

        <Link to="/ai-assistant" className="hover:text-emerald-300 transition flex items-center gap-1.5 text-emerald-300 bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-700/50">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.aiBot}</span>
        </Link>

        {/* Global Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white px-2.5 py-1 rounded-xl border border-emerald-700/60 transition shadow-xs cursor-pointer"
          title="Switch Language"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
        </button>

        {/* Auth Action */}
        {user ? (
          <div className="flex items-center gap-2.5 bg-emerald-900/80 pl-3 pr-1.5 py-1 rounded-xl border border-emerald-700">
            <span className="text-[11px] text-emerald-200 capitalize flex items-center gap-1">
              <User className="w-3 h-3 text-emerald-400" /> {user.name} ({user.role})
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-600/80 hover:bg-red-600 text-white p-1 rounded-lg transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-3.5 py-1.5 rounded-xl transition"
          >
            {t.signIn}
          </Link>
        )}
      </nav>
    </header>
  );
}