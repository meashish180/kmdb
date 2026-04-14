import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req, res, next) => {
    let token;

    // Check for token in headers
    // Format: Authorization: Bearer <token>
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token from "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET not defined');
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request (excluding password)
            req.user = await User.findById(decoded.id).select('-password');

            return next(); // move to next middleware/route
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export { protect };
export default { protect };