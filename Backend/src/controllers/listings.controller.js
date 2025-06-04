import { getDB } from '../db/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ObjectId } from 'mongodb';

let listings;
let coll;

const initC = async () => {
    const db = await getDB();
    coll = db.collection('user');
};

const initListings = async () => {
  const db = await getDB();
  listings = db.collection('listings');
};


export const addNewListing = asyncHandler(async (req, res, next) => {

    await initListings();
    await initC();

    const { croptype, quantity, croppingtime, harvestingtime, endDate, price, fcity, fpincode, fstate, email } = req.body;

    if (!croptype || !quantity || !croppingtime || !harvestingtime || !endDate || !price || !fcity || !fpincode || !fstate || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await coll.findOne({ email: email }, { projection: { password: 0 } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const listing = {
        croptype,
        quantity,
        croppingtime,
        harvestingtime,
        endDate,
        price: parseInt(price),
        fname: user.fullName,
        fcity,
        fpincode,
        fstate,
        email,
        status: "false",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const crop = await listings.insertOne(listing);
    res.status(201).json({ message: "Listing added successfully", data: crop });
});

export const viewListings = asyncHandler(async (req, res, next) => {
    await initListings();
    const { email } = req.body;

    const data = await listings.find({ email: email, status:"false" }).toArray();

    if (data.length === 0) {
        res.status(204).json({ message: "No listing found for the user" });
    } else {
        res.status(200).json(data);
    }
});

export const deleteListing = asyncHandler(async (req, res, next) => {
    
    await initListings();

    const { email, listingId } = req.body;

    if (!email || !listingId) {
        return res.status(400).json({ error: 'Both email and listing ID are required.' });
    }

    const result = await listings.deleteOne({ email, _id: new ObjectId(listingId) });

    if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'No listing found with the provided email.' });
    }

    res.status(200).json({message: 'Listing deleted successfully.'});
});

// export const viewListingbyId = asyncHandler(async (req, res, next) => {
//     await initListings();
//     const { listingId } = req.body;

//     const data = await listings.find({ _id: new ObjectId(listingId), status:"false" }).toArray();

//     if (data.length === 0) {
//         res.status(204).json({ message: "Listing not found." });
//     } else {
//         res.status(200).json(data);
//     }
// });

export const viewListingsByIds = asyncHandler(async (req, res, next) => {
    await initListings();
    const { listingIds } = req.body;

    if (!Array.isArray(listingIds) || listingIds.length === 0) {
        return res.status(400).json({ message: "listingIds must be a non-empty array." });
    }

    const objectIds = listingIds.map(id => {
        try {
            return new ObjectId(id);
        } catch (err) {
            return null;
        }
    }).filter(Boolean);

    if (objectIds.length === 0) {
        return res.status(400).json({ message: "No valid listingIds provided." });
    }

    const data = await listings.find({ _id: { $in: objectIds } }).toArray();

    if (data.length === 0) {
        res.status(204).json({ message: "No listings found." });
    } else {
        res.status(200).json(data);
    }
});