import { getDB } from '../db/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

let listings;

const initListings = async () => {
    const db = await getDB();
    listings = db.collection('listings');
};

export const viewmarket = asyncHandler(async (req, res, next) => {
    await initListings();

    const data = await listings.find({status:"false"}).toArray();
    if (data.length === 0) {
        res.status(204).json({ message: "No listings found" });
    } else {
        res.status(200).json(data);
    }
});

// export const viewmarket = asyncHandler(async (req, res, next) => {
//     await initListings();

//     const { croptype, district, state } = req.body;

//     const query = {};
//     if (croptype) query.croptype = croptype;
//     if (district) query.fcity = district;
//     if (state) query.fstate = state;

//     const data = await listings.find(query).toArray();

//     if (data.length === 0) {
//         res.status(204).json({ message: "No listings found" });
//     } else {
//         res.status(200).json(data);
//     }
// });