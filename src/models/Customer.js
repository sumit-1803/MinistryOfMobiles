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
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

// Force recompilation of the model to pick up schema changes during development
if (mongoose.models.Customer) {
  delete mongoose.models.Customer;
}

export default mongoose.model('Customer', CustomerSchema);
