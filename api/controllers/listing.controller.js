import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a listing"));
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.country ||
    !req.body.city ||
    !req.body.estate ||
    !req.body.image ||
    !req.body.category ||
    !req.body.status ||
    !req.body.price ||
    !req.body.type
  ) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newListing = new Listing({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    next(error);
  }
};

export const getlistings = async (req, res, next) => {
  try {
    // Only fetch the single listing based on the slug
    if (req.query.slug) {
      const listing = await Listing.findOne({ slug: req.query.slug });

      if (!listing) {
        return next(errorHandler(404, "Listing not found"));
      }

      return res.status(200).json({ listings: [listing] });
    }

    // Set up pagination and sorting options
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortField = req.query.sortField || "updatedAt";
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Build the query object based on filters
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.listingId && { _id: req.query.listingId }),
      ...(req.query.type && { type: req.query.type }),
      ...(req.query.status && { status: req.query.status }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    // Fetch listings based on the query, sorted by the selected field
    const listings = await Listing.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalListings = await Listing.countDocuments(query);

    res.status(200).json({
      listings,
      totalListings,
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    next(error);
  }
};

export const deletelisting = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this listing")
    );
  }
  try {
    await Listing.findByIdAndDelete(req.params.listingId);
    res.status(200).json("The listing has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatelisting = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to update this listing")
    );
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.listingId,
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          image: req.body.image,
          country: req.body.country,
          city: req.body.city,
          estate: req.body.estate,
          status: req.body.status,
          price: req.body.price,
          area: req.body.area,
          type: req.body.type,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
