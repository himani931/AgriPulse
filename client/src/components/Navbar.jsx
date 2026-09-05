import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sprout, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-emerald-900 text-white px-6 py-3.5 flex justify-between items-center shadow-md">
      {/* Clicking logo redirects to dashboard if logged in, otherwise Home */}
      <Link
        to={
          user
            ? user.role === "farmer"
              ? "/farmer/dashboard"
              : "/mandi/dashboard"
            : "/"
        }
        className="flex items-center gap-2 font-bold text-lg tracking-wide"
      >
        <Sprout className="w-6 h-6 text-emerald-400" />
        <span>AgriPulse</span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        {/* Render Home link ONLY when NOT logged in */}
        {!user && (
          <Link to="/" className="hover:text-emerald-300 transition">
            Home
          </Link>
        )}

        {/* Farmer Links (ONLY when logged in as Farmer) */}
        {user?.role === "farmer" && (
          <>
            <Link
              to="/farmer/dashboard"
              className="hover:text-emerald-300 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/farmer/find-mandi"
              className="hover:text-emerald-300 transition"
            >
              Find Mandi
            </Link>
          </>
        )}

        {/* Procurement Links (ONLY when logged in as Procurement Officer) */}
        {user?.role === "procurement" && (
          <>
            <Link
              to="/mandi/dashboard"
              className="hover:text-emerald-300 transition"
            >
              Procurement Portal
            </Link>
            <Link
              to="/farmer/ledger"
              className="hover:text-emerald-300 transition"
            >
              Audit Ledger
            </Link>
          </>
        )}

        <Link to="/ai-assistant" className="hover:text-emerald-300 transition">
          KisanSaathi AI
        </Link>

        {/* User Auth Button */}
        {user ? (
          <div className="flex items-center gap-3 bg-emerald-800/80 px-3.5 py-1.5 rounded-xl border border-emerald-700">
            <span className="text-xs text-emerald-200 capitalize flex items-center gap-1 font-semibold">
              <User className="w-3.5 h-3.5" /> {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="text-xs bg-red-600/80 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg transition flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 text-xs font-bold px-4 py-2 rounded-xl transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
