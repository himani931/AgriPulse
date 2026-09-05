import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import FindMandi from "./pages/FindMandi";
import MandiDashboard from "./pages/MandiDashboard";
import KisanSaathi from "./pages/KisanSaathi";
import QRToken from "./pages/QRToken";
import TrackProcurement from "./pages/TrackProcurement";
import PaymentReceipt from "./pages/PaymentReceipt";
import TransactionLedger from "./pages/TransactionLedger";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai-assistant" element={<KisanSaathi />} />

        {/* Farmer-Only Routes */}
        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute allowedRole="farmer">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/find-mandi"
          element={
            <ProtectedRoute allowedRole="farmer">
              <FindMandi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/token/:id"
          element={
            <ProtectedRoute allowedRole="farmer">
              <QRToken />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/track/:id"
          element={
            <ProtectedRoute allowedRole="farmer">
              <TrackProcurement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/receipt/:id"
          element={
            <ProtectedRoute allowedRole="farmer">
              <PaymentReceipt />
            </ProtectedRoute>
          }
        />

        {/* Procurement / Mandi Officer-Only Routes */}
        <Route
          path="/mandi/dashboard"
          element={
            <ProtectedRoute allowedRole="procurement">
              <MandiDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/ledger"
          element={
            <ProtectedRoute allowedRole="procurement">
              <TransactionLedger />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
