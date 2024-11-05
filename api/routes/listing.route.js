import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createListing, deleteListing, getListings, updateListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.get('/getlistings', getListings);
router.delete('/deletelisting/:listingId/:userId', verifyToken, deleteListing);
router.put('/updatelisting/:listingId/:userId', verifyToken, updateListing);

export default router;
