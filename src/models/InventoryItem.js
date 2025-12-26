import mongoose from 'mongoose';

const InventoryItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  // Derived/Snapshot fields for easier querying
  productName: { type: String },
  brand: { type: String },
  category: { type: String },

  status: {
    type: String,
    enum: ['Available', 'Sold'],
    default: 'Available',
  },

  // Identification
  imei1: { type: String, unique: true, sparse: true }, // sparse allows null/undefined to not conflict
  imei2: { type: String },
  serialNumber: { type: String },

  // Specifications
  storage: { type: String },
  ram: { type: String },
  color: { type: String },
  batteryHealth: { type: Number },
  accessoriesIncluded: { type: Boolean, default: false },

  // Condition & Warranty
  condition: {
    type: String,
    enum: ['Like New', 'Excellent', 'Good', 'Fair'],
    required: true,
  },
  physicalDamage: { type: String },
  warrantyType: {
    type: String,
    enum: ['No Warranty', 'Shop Warranty', 'Brand Warranty'],
    default: 'No Warranty',
  },
  warrantyValidTill: { type: Date },

  // Financial
  purchasePrice: { type: Number, required: true },
  expectedSellingPrice: { type: Number },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Force re-compilation if product is required (development fix)
if (mongoose.models.InventoryItem) {
  const isProductRequired = mongoose.models.InventoryItem.schema.path('product').isRequired;
  if (isProductRequired) {
    delete mongoose.models.InventoryItem;
  }
}

export default mongoose.models.InventoryItem || mongoose.model('InventoryItem', InventoryItemSchema);
