import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { getDB } from '../db/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

let coll;

const initC = async () => {
    const db = await getDB();
    coll = db.collection('user');
};

export const register = asyncHandler(async (req, res, next) => {
    //console.log("register");
    await initC();

    const { name, email, password, phone, aadhar, role, city, state, pincode } = req.body;

    if (!name || !email || !password || !phone || !aadhar || !role || !city || !state || !pincode) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await coll.findOne({ email: email });

    if (user) {
        return res.status(400).json({ error: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        fullName: name,
        email,
        password: hashedPassword,
        phone,
        aadhar,
        role,
        city,
        state,
        pincode,
        createdAt: new Date()
    };

    const result = await coll.insertOne(newUser);

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(201).json({ message: "User registered successfully", data: result, token: token });
});


export const login = asyncHandler(async (req, res, next) => {
    
    await initC();

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await coll.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(200).json({ message: "User logged in successfully", token: token, role: user.role, city: user.city });
});

export const iddetails = asyncHandler(async (req, res, next) => {
    
    await initC();
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const user = await coll.findOne({ email: email }, { projection: { password: 0 } });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});

export const logout = asyncHandler(async (req, res, next) => {
    res.clearCookie('authToken', { httpOnly: true, secure: true });
    
    res.status(200).json({ message: "User logged out successfully" });
});