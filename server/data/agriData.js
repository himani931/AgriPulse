module.exports = {
  mspRates: [
    { commodity: "Wheat", msp: 2585, season: "Rabi 2025-26", unit: "per quintal" },
    { commodity: "Paddy (Common)", msp: 2300, season: "Kharif 2025-26", unit: "per quintal" },
    { commodity: "Paddy (Grade A)", msp: 2320, season: "Kharif 2025-26", unit: "per quintal" },
    { commodity: "Mustard", msp: 5950, season: "Rabi 2025-26", unit: "per quintal" },
    { commodity: "Gram (Chana)", msp: 5650, season: "Rabi 2025-26", unit: "per quintal" },
    { commodity: "Barley", msp: 1980, season: "Rabi 2025-26", unit: "per quintal" }
  ],
  governmentSchemes: [
    {
      name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      benefit: "₹6,000 per year in 3 equal installments of ₹2,000 directly to bank accounts via DBT.",
      eligibility: "All landholding farmer families with cultivable land, subject to exclusion criteria.",
      portal: "pmkisan.gov.in"
    },
    {
      name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
      benefit: "Comprehensive crop insurance against non-preventable natural risks from pre-sowing to post-harvest.",
      premium: "1.5% for Rabi crops, 2.0% for Kharif crops, 5.0% for commercial/horticultural crops.",
      portal: "pmfby.gov.in"
    },
    {
      name: "Kisan Credit Card (KCC)",
      benefit: "Concessional institutional credit up to ₹3 Lakh at an effective interest rate of 4% (with prompt repayment incentive).",
      eligibility: "All farmers, tenant farmers, sharecroppers, and SHGs.",
      portal: "myscheme.gov.in"
    },
    {
      name: "e-NAM (National Agriculture Market)",
      benefit: "Pan-India electronic trading portal connecting existing APMC mandis to create a unified national market.",
      portal: "enam.gov.in"
    },
    {
      name: "PM-KUSUM",
      benefit: "Subsidies up to 60% for installing solar irrigation pumps and solarizing grid-connected agricultural pumps.",
      portal: "pmkusum.mnre.gov.in"
    }
  ]
};