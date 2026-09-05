const mongoose = require('mongoose');

const ledgerEventSchema = new mongoose.Schema({
  tokenRef: { type: String, required: true },
  action: { type: String, required: true },
  actor: { type: String, required: true },
  status: { type: String, required: true },
  details: { type: String, default: '' },
  hash: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LedgerEvent', ledgerEventSchema);