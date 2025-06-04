import { getDB } from '../db/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ObjectId, Timestamp } from 'mongodb';

let listings;
let bids;
let negs;
let contracts;
let coll;

const initC = async () => {
    const db = await getDB();
    coll = db.collection('user');
};

const initListings = async () => {
  const db = await getDB();
  listings = db.collection('listings');
};

const initBids = async () => {
    const db = await getDB();
    bids = db.collection('bid');
};

const initNegs = async () => {
    const db = await getDB();
    negs = db.collection('negotiation');
};

const initContracts = async () => {
    const db = await getDB();
    contracts = db.collection('contract');
};

export const raisebid = asyncHandler(async (req, res, next) => {
    await initBids();
    await initC();

    const { listingId, femail, price, bemail, fname } = req.body;

    if(!listingId || !femail || !price || !bemail || !fname){
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await coll.findOne({ email: bemail }, { projection: { password: 0 } });

    const bid = {
        cropId: new ObjectId(listingId),
        femail,
        fname,
        price: parseInt(price),
        bemail,
        bname: user.fullName,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const crop = await bids.insertOne(bid);

    res.status(201).json({ message: "Bid raised successfully", data: crop });
});

export const BviewBids = asyncHandler(async (req, res, next) => {
    await initBids();
    const { email } = req.body;

    const data = await bids.find({ bemail: email }).toArray();
    if (data.length === 0) {
        res.status(204).json({ message: "No bid found for the user" });
    } else {
        res.status(200).json(data);
    }
});

export const FviewBids = asyncHandler(async (req, res, next) => {
    await initBids();
    const { email, listingId } = req.body;
    
    const query = {};
    if(email) query.femail = email;
    if(listingId) query.cropId = new ObjectId(listingId);
    query.status = "pending";

    const data = await bids.find(query).toArray();

    if (data.length === 0) {
        res.status(204).json({ message: "No bids raised yet" });
    } else {
        res.status(200).json(data);
    }
});

export const rejectBid = asyncHandler(async (req, res, next) => {
    await initBids();

    const { bidId } = req.body;

    if(!bidId){
        return res.status(400).json({ error: 'Bid ID is required.' });
    }

    const data = await bids.findOneAndUpdate({ _id: new ObjectId(bidId) }, { $set: { status: 'rejected' } });

    if(data.value === null){
        res.status(404).json({ message: "Bid not found" });
    } else {
        res.status(200).json({ message: "Bid rejected successfully" });
    }

});

export const negotiateBid = asyncHandler(async (req, res, next) => {
    await initBids();
    await initNegs();
    await initListings();

    const { bidId, price } = req.body;

    if(!bidId || !price){
        return res.status(400).json({ error: 'All fields are required' });
    }

    const dt = await bids.findOneAndUpdate({ _id: new ObjectId(bidId) }, { $set: { status: 'negotiating' } });

    const data = await bids.findOne({ _id: new ObjectId(bidId) });

    if(data.value === null){
        res.status(404).json({ message: "Bid not found" });
    }

    const crop = await listings.findOne({ _id: new ObjectId(data.cropId) });

    const chat = {
        bidId: new ObjectId(bidId),
        femail: data.femail,
        fname: crop.fname,
        bemail: data.bemail,
        bname: data.bname,
        cropId: new ObjectId(data.cropId),
        crop: crop.croptype,
        quantity: crop.quantity,
        price: crop.price,
        messages: [
            {
                sender: "buyer",
                message: data.price,
                timestamp: new Date()
            },
            {
                sender: "farmer",
                message: price,
                timestamp: new Date()
            }
        ],
        fagree: true,
        bagree: false,
        status: "negotiating",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const neg = await negs.insertOne(chat);

    res.status(201).json({ message: "Negotiation started", data: neg });

});

export const agreeBid = asyncHandler(async (req, res, next) => {
    await initBids();
    await initContracts();
    await initListings();

    const { bidId } = req.body;

    if(!bidId){
        return res.status(400).json({ error: 'Bid ID is required.' });
    }

    const data = await bids.findOne({ _id: new ObjectId(bidId) });

    if(data === null){
        res.status(404).json({ message: "Bid not found" });
    }

    const crop = await listings.findOne({ _id: new ObjectId(data.cropId) });

    const contract = {
        cropId: new ObjectId(data.cropId),
        crop: crop.croptype,
        quantity: crop.quantity,
        femail: data.femail,
        fname: data.fname,
        bemail: data.bemail,
        bname: data.bname,
        price: data.price,
        status: 'Ongoing',
        startDate: new Date(),
        endDate: crop.endDate,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const con = await contracts.insertOne(contract);

    crop = await listings.findOneAndUpdate({ _id: new ObjectId(data.cropId) }, { $set: { status: 'true' } });
    const dt = await bids.updateMany({cropId: new ObjectId(data.cropId)},{ $set: { status: 'conrejected' }});
    dt = await bids.findOneAndUpdate({ _id: new ObjectId(bidId) }, { $set: { status: 'accepted' } });

    res.status(201).json({ message: "Contract created successfully", data: con });
});