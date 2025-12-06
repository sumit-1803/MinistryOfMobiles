import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
