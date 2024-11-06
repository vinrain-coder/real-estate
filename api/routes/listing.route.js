import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletelisting, getlistings, updatelisting } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getlistings', getlistings)
router.delete('/deletelisting/:listingId/:userId', verifyToken, deletelisting)
router.put('/updatelisting/:listingId/:userId', verifyToken, updatelisting)


export default router;