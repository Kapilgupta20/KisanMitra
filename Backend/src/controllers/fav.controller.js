import { getDB } from '../db/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ObjectId } from 'mongodb';

let favs;

const initfv = async () => {
    const db = await getDB();
    favs = db.collection('fav');
};

export const addfav = asyncHandler( async(req, res, next) => {
    await initfv();

    const { bemail, listingId } = req.body;

    if(!listingId || !bemail){
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const exist = await favs.findOne({ bemail, listingId: new ObjectId(listingId) });
    if(exist){
        return res.status(400).json({ error: 'Already added to favourites.' });
    }

    const fv = {
        bemail,
        listingId: new ObjectId(listingId),
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const fav = await favs.insertOne(fv);

    if(fav){
        return res.status(201).json({ message: 'Added to favourites.' });
    }
});

export const viewuserfav = asyncHandler (async( req, res, next) => {
    await initfv();

    const { bemail } = req.body;

    if(!bemail){
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const items = await favs.find({bemail}).toArray();

    res.json(items);
});

export const deleteafav = asyncHandler( async(req, res, next) => {
    await initfv();

    const { bemail, listingId } = req.body;

    if(!listingId || !bemail){
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const exist = await favs.findOne({ bemail, listingId: new ObjectId(listingId) });
    if(!exist){
        return res.status(400).json({ error: 'Item do not exist' });
    }

    const item = await favs.deleteOne({ bemail, listingId: new ObjectId(listingId)});

    return res.status(200).json({message: 'Successfully deleted.'});
});