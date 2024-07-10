const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  serviceType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  phone: { type: String, required: true },
  contactMethod: { type: String, required: true },
  status: { type: String, enum: ['pending', 'under review', 'approved'], default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Query', querySchema);
