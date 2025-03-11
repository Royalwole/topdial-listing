import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, 'Name must be at least 10 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [20, 'Description must be at least 20 characters']
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    regularPrice: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    discountPrice: {
      type: Number,
      required: true,
      min: [0, 'Discount price cannot be negative'],
      validate: {
        validator: function(v) {
          return v <= this.regularPrice;
        },
        message: 'Discount price must be less than or equal to regular price'
      }
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add indexes for better query performance
listingSchema.index({ name: 'text', description: 'text' });
listingSchema.index({ userRef: 1, createdAt: -1 });
listingSchema.index({ type: 1, offer: 1 });

const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);
export default Listing;