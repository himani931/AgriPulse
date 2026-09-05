import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  Tractor,
  Building2,
  Lock,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sprout,
} from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("farmer"); // 'farmer' or 'procurement'
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userPayload = {
      name:
        formData.name ||
        (role === "farmer" ? "Ramesh Patel" : "Mandi Inspector Karnal"),
      phone: formData.phone || "9876543210",
      role: role,
    };

    login(userPayload);

    // Role-based redirection
    if (role === "farmer") {
      navigate("/farmer/dashboard");
    } else {
      navigate("/mandi/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-emerald-100 text-emerald-800 rounded-2xl mb-1">
              <Sprout className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              {isLogin ? "Access AgriPulse Portal" : "Create an Account"}
            </h1>
            <p className="text-xs text-slate-500">
              Select your role to log in to your dedicated workspace.
            </p>
          </div>

          {/* Form Mode Tabs (Sign In vs Register) */}
          <div className="flex border-b border-slate-100 justify-center gap-8 pb-2">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`text-sm font-bold pb-1 transition ${isLogin ? "text-emerald-800 border-b-2 border-emerald-700" : "text-slate-400"}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`text-sm font-bold pb-1 transition ${!isLogin ? "text-emerald-800 border-b-2 border-emerald-700" : "text-slate-400"}`}
            >
              Register
            </button>
          </div>

          {/* Role Choice Buttons */}
          <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setRole("farmer")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
                role === "farmer"
                  ? "bg-emerald-800 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Tractor className="w-4 h-4" /> Farmer
            </button>
            <button
              type="button"
              onClick={() => setRole("procurement")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
                role === "procurement"
                  ? "bg-emerald-800 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4" /> Procurement
            </button>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder={
                      role === "farmer"
                        ? "e.g. Ramesh Patel"
                        : "e.g. Officer Sharma"
                    }
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number / Aadhaar ID
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Enter registered mobile number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <span>
                {isLogin
                  ? `Sign In as ${role === "farmer" ? "Farmer" : "Officer"}`
                  : "Register Account"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
