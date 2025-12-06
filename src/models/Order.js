import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  customerName: {
    type: String,
    required: [true, 'Please provide customer name.'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number.'],
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'closed'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
