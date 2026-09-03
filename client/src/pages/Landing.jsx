import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto mt-20 text-center px-4">
        <h1 className="text-4xl font-extrabold text-slate-800">
          Smart Procurement. Transparent MSP. Empowered Farmers.
        </h1>
        <p className="mt-4 text-slate-600">
          Book slots, track live mandi queues, and verify MSP payouts seamlessly
          with AgriPulse.
        </p>
      </main>
    </div>
  );
}
