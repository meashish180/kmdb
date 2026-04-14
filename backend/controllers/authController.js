import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user (password gets hashed via pre-save hook in model)
        const user = await User.create({
            name,
            email,
            password,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check user exists AND password matches
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─────────────────────────────────────────
// @desc    Get logged in user profile
// @route   GET /api/auth/profile
// @access  Private
// ─────────────────────────────────────────
const getUserProfile = async (req, res) => {
    try {
        // req.user comes from auth middleware (next step)
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { registerUser, loginUser, getUserProfile };