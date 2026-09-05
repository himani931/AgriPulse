# AgriPulse

> **Smart Procurement. Transparent MSP. Empowered Farmers.**

AgriPulse is a digital agricultural procurement and yard-management platform built for the Smart India Hackathon (SIH). It eliminates long mandi queues, automates slot scheduling, provides live gate-to-scale tracking, guarantees transparent MSP price calculations, and maintains an immutable audit ledger for dispute-free settlements.

---

## Key Features

* **Interactive Mandi Discovery**: Real-time Leaflet map integration displaying nearby procurement yards, live capacity levels (Available, Limited, Congested), and wait times.
* **Smart Slot Allocation & Dynamic QR Tokens**: Pre-allocated arrival windows paired with unique QR gate passes to replace unorganized physical queues.
* **Live Procurement Lifecycle Tracking**: Step-by-step progress tracking vehicle arrival, gate scan, weighbridge scale entry, and settlement confirmation.
* **Mandi Operator Portal**: Dedicated interface for yard officials to scan arrivals, record certified scale weights, and log moisture and quality grades.
* **Instant MSP Settlements & PDF Invoices**: Automatic price calculations based on official government MSP standards with browser-level print and PDF receipt generation.
* **AgriPulse Saathi (AI Assistant)**: Bilingual (Hindi/English) voice and text-enabled assistant answering questions about MSP rates, documentation, and queue status.
* **Tamper-Evident Audit Ledger**: Searchable, append-only event log capturing every lifecycle transition with proof hashes for dispute resolution.

---

## Tech Stack

### Frontend
* **Core**: React 18+ (Vite)
* **Styling**: Tailwind CSS v4
* **Routing**: React Router DOM (v6+)
* **Interactive Maps**: Leaflet & React-Leaflet
* **Icons**: Lucide React
* **QR Codes**: qrcode.react
* **HTTP Client**: Axios

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB Atlas (Mongoose ODM)
* **Configuration**: Dotenv & CORS

---

## Directory Structure

```text
AgriPulse/
├── client/                     # Frontend React Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── MandiMap.jsx    # Leaflet map container
│   │   │   └── Navbar.jsx      # Global navigation header
│   │   ├── pages/
│   │   │   ├── AuthSelect.jsx        # Role selection screen
│   │   │   ├── FarmerDashboard.jsx   # Farmer active booking hub
│   │   │   ├── FindMandi.jsx         # Map discovery & slot booking form
│   │   │   ├── KisanSaathi.jsx       # Voice & text AI assistant
│   │   │   ├── Landing.jsx           # Platform landing page
│   │   │   ├── MandiDashboard.jsx    # Operator live queue & weighment modal
│   │   │   ├── PaymentReceipt.jsx    # Digital DBT receipt with PDF print
│   │   │   ├── QRToken.jsx           # Dynamic gate entry QR pass
│   │   │   ├── TrackProcurement.jsx  # Real-time queue tracker
│   │   │   └── TransactionLedger.jsx # Searchable immutable audit trail
│   │   ├── App.jsx             # React Router setup
│   │   ├── index.css           # Tailwind v4 directives & Leaflet styles
│   │   └── main.jsx            # React root mount
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend Express Application
│   ├── models/
│   │   ├── Mandi.js            # Mandi center capacity & coordinates schema
│   │   ├── SlotRequest.js      # Booking, weighment & payout schema
│   │   └── LedgerEvent.js      # Audit log schema
│   ├── routes/
│   │   ├── aiRoutes.js         # Conversational AI assistant endpoints
│   │   └── mandiRoutes.js      # Mandis, slot bookings & weighment endpoints
│   ├── index.js                # Server entry point & MongoDB Atlas connection
│   ├── seed.js                 # Sample database seeder
│   └── package.json
│
└── README.md