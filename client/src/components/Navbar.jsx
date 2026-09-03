import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Bot, MapPin, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-emerald-800 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold tracking-wide"
      >
        <Sprout className="w-6 h-6 text-emerald-300" />
        <span>
          Agri<span className="text-emerald-300">Pulse</span>
        </span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link
          to="/farmer/find-mandi"
          className="flex items-center gap-1 hover:text-emerald-200"
        >
          <MapPin className="w-4 h-4" /> Find Mandi
        </Link>
        <Link
          to="/farmer/dashboard"
          className="flex items-center gap-1 hover:text-emerald-200"
        >
          <LayoutDashboard className="w-4 h-4" /> Farmer Portal
        </Link>
        <Link
          to="/mandi/dashboard"
          className="flex items-center gap-1 hover:text-emerald-200"
        >
          <LayoutDashboard className="w-4 h-4" /> Mandi Portal
        </Link>
        <Link
          to="/ai-assistant"
          className="flex items-center gap-1 bg-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition"
        >
          <Bot className="w-4 h-4 text-emerald-300" /> AgriPulse Saathi
        </Link>
      </div>
    </nav>
  );
}
