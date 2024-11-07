import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
      default: "kenya",
    },
    city: {
      type: String,
      required: true,
    },
    estate: {
      type: String,
      default: "all",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "uncategorized",
      required: true,
    },
    area: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      default: "all",
      required: true,
    },
    status: {
      type: String,
      default: "all",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
