import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';

const auth = asyncHandler((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

export default auth;

