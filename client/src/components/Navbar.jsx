import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Globe, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout, lang, toggleLanguage } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLabels = {
    en: {
      overview: "Overview",
      farmerDashboard: "Dashboard",
      findMandi: "Find Mandi",
      mandiControl: "Mandi Control",
      auditTrail: "Audit Trail",
      aiBot: "KisanSaathi AI",
      signIn: "Sign In",
    },
    hi: {
      overview: "अवलोकन",
      farmerDashboard: "डैशबोर्ड",
      findMandi: "मंडी खोजें",
      mandiControl: "मंडी नियंत्रण",
      auditTrail: "ऑडिट लेजर",
      aiBot: "किसानसाथी AI",
      signIn: "लॉगिन",
    },
  };

  const t = navLabels[lang] || navLabels.en;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 px-6 py-2.5 flex justify-between items-center shadow-sm">
      {/* Brand Logo & Name - Clean Stacked Layout */}
      <Link
        to={
          user
            ? user.role === "farmer"
              ? "/farmer/dashboard"
              : "/mandi/dashboard"
            : "/"
        }
        className="flex items-center gap-3 group"
      >
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1.5 shadow-xs group-hover:border-emerald-400 transition">
          <img
            src={logo}
            alt="Krishiparakh Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-base tracking-tight text-emerald-950 leading-tight">
            Krishiparakh
          </span>
          <span className="text-[10px] font-medium text-emerald-700 tracking-wider uppercase">
            {lang === "hi" ? "एकीकृत कृषि मंच" : "Agri Intelligence Platform"}
          </span>
        </div>
      </Link>

      <nav className="flex items-center gap-4 text-xs font-semibold">
        {!user && (
          <Link
            to="/"
            className="hover:text-emerald-700 text-slate-600 transition"
          >
            {t.overview}
          </Link>
        )}

        {user?.role === "farmer" && (
          <>
            <Link
              to="/farmer/dashboard"
              className="hover:text-emerald-700 text-slate-600 transition"
            >
              {t.farmerDashboard}
            </Link>
            <Link
              to="/farmer/find-mandi"
              className="hover:text-emerald-700 text-slate-600 transition"
            >
              {t.findMandi}
            </Link>
          </>
        )}

        {user?.role === "procurement" && (
          <>
            <Link
              to="/mandi/dashboard"
              className="hover:text-emerald-700 text-slate-600 transition"
            >
              {t.mandiControl}
            </Link>
            <Link
              to="/farmer/ledger"
              className="hover:text-emerald-700 text-slate-600 transition"
            >
              {t.auditTrail}
            </Link>
          </>
        )}

        <Link
          to="/ai-assistant"
          className="hover:text-emerald-700 transition flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t.aiBot}</span>
        </Link>

        {/* Global Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 transition shadow-2xs cursor-pointer"
          title="Switch Language"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === "en" ? "हिन्दी" : "English"}</span>
        </button>

        {/* Auth Action */}
        {user ? (
          <div className="flex items-center gap-2.5 bg-slate-100 pl-3 pr-1.5 py-1 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-700 font-medium capitalize flex items-center gap-1">
              <User className="w-3 h-3 text-emerald-600" /> {user.name} (
              {user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-lg transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-1.5 rounded-xl transition shadow-sm"
          >
            {t.signIn}
          </Link>
        )}
      </nav>
    </header>
  );
}
