import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  
  // Payment Details
  paymentMode: {
    type: String,
    enum: ['Cash', 'UPI', 'Card', 'Bank Transfer'],
    required: true,
  },
  paymentId: {
    type: String,
    // Required if not Cash
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  notes: { type: String },

  // Party Details
  customerName: { type: String }, // For SELL
  customerPhone: { type: String }, // For SELL
  customerAddress: { type: String }, // For SELL
  gstNumber: { type: String }, // For SELL

  sellerName: { type: String }, // For BUY
  sellerPhone: { type: String }, // For BUY
  sellerAddress: { type: String }, // For BUY
  idProofType: { type: String }, // Adhaar, PAN, etc.
  idProofNumber: { type: String },

  // Items included in this invoice
  items: [{
    inventoryItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InventoryItem',
    },
    // Snapshot of item details at time of invoice
    productName: String,
    imei: String,
    amount: Number, 
  }],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
