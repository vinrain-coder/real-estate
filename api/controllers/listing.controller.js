import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new listing
export const createListing = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a listing'));
  }
  if (!req.body.title || !req.body.description || !req.body.price || !req.body.location || !req.body.propertyType || !req.body.status) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

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

// Get all listings with filtering and pagination
export const getListings = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const listings = await Listing.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.propertyType && { propertyType: req.query.propertyType }),
      ...(req.query.status && { status: req.query.status }),
      ...(req.query.city && { "location.city": req.query.city }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.listingId && { _id: req.query.listingId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { description: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalListings = await Listing.countDocuments();
    
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthListings = await Listing.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      listings,
      totalListings,
      lastMonthListings,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a listing
export const deleteListing = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this listing'));
  }
  try {
    await Listing.findByIdAndDelete(req.params.listingId);
    res.status(200).json('The listing has been deleted');
  } catch (error) {
    next(error);
  }
};

// Update a listing
export const updateListing = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this listing'));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.listingId,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          location: req.body.location,
          propertyType: req.body.propertyType,
          status: req.body.status,
          bedrooms: req.body.bedrooms,
          bathrooms: req.body.bathrooms,
          squareFeet: req.body.squareFeet,
          lotSize: req.body.lotSize,
          yearBuilt: req.body.yearBuilt,
          amenities: req.body.amenities,
          features: req.body.features,
          images: req.body.images,
          category: req.body.category,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
