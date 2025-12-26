import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this product.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please specify the category.'],
    enum: ['phone', 'ipad', 'macbook', 'tablet', 'accessories', 'watch', 'audio'],
  },
  brand: {
    type: String,
    required: [true, 'Please specify the brand.'],
  },
  model: {
    type: String,
    required: [true, 'Please specify the model.'],
  },
  price: {
    type: Number,
    required: [true, 'Please specify the price.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  images: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Force re-compilation if enum is outdated (development fix)
if (mongoose.models.Product) {
  const currentEnum = mongoose.models.Product.schema.path('category').enumValues;
  if (!currentEnum.includes('watch') || !mongoose.models.Product.schema.path('description')) {
    delete mongoose.models.Product;
  }
}

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
