const mongoose = require('mongoose');

const birthRegistrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  childName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
});

module.exports = mongoose.model('BirthRegistration', birthRegistrationSchema);
