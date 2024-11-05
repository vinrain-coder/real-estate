import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String], 
      default: [
        'https://example.com/default-property-image.jpg',
      ],
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: false,
      },
      coordinates: {
        latitude: {
          type: Number,
          required: false, 
        },
        longitude: {
          type: Number,
          required: false,
        },
      },
    },
    price: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ['House', 'Apartment', 'Condo', 'Land', 'Commercial', 'Other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['For Sale', 'For Rent', 'Sold', 'Rented'],
      required: true,
    },
    bedrooms: {
      type: Number,
      required: false,
    },
    bathrooms: {
      type: Number,
      required: false,
    },
    squareFeet: {
      type: Number,
      required: false,
    },
    lotSize: {
      type: Number, 
      required: false,
    },
    yearBuilt: {
      type: Number,
      required: false,
    },
    amenities: {
      type: [String], 
      required: false,
    },
    features: {
      type: [String], 
      required: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      default: 'Residential',
    },
    listedDate: {
      type: Date,
      default: Date.now,
    },
    contactInfo: {
      phone: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
    },
    views: {
      type: Number,
      default: 0,
    },
    googleMapsUrl: {
      type: String,
      required: false, 
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
