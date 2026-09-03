import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthSelect from "./pages/AuthSelect";
import FarmerDashboard from "./pages/FarmerDashboard";
import FindMandi from "./pages/FindMandi";
import MandiDashboard from "./pages/MandiDashboard";
import KisanSaathi from "./pages/KisanSaathi";
import QRToken from "./pages/QRToken";
import TrackProcurement from "./pages/TrackProcurement";
import PaymentReceipt from "./pages/PaymentReceipt";
import TransactionLedger from "./pages/TransactionLedger";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/select-role" element={<AuthSelect />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/find-mandi" element={<FindMandi />} />
        <Route path="/mandi/dashboard" element={<MandiDashboard />} />
        <Route path="/ai-assistant" element={<KisanSaathi />} />
        <Route path="/farmer/token/:id" element={<QRToken />} />
        <Route path="/farmer/track/:id" element={<TrackProcurement />} />
        <Route path="/farmer/receipt/:id" element={<PaymentReceipt />} />
        <Route path="/farmer/ledger" element={<TransactionLedger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
