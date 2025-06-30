import { Router } from "express";
import { User } from "../models/user.model.js";
import authenticateUser from "../middleware/verifyToken.js";
import bcrypt from 'bcrypt';
const router = Router();
import jwt from "jsonwebtoken";
//Create a New User
router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password, avatar } = req.body;

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "already have an account"
            });
        }
        // hashed password
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            name,
            email,
            avatar,
            password: hashedPassword,
        })
        await newUser.save();
        res.status(200).json({ success: true, message: 'register successfully please login' });
    } catch (error) {
        res.status(500).json({ message: `failed to signup: ${error}` });
    }
})
router.get('/', async (req, res) => {
    const result = await User.find();
    res.send(result)
})
// login for verifier
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Find user by email or phone_number
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (user?.status === 'Blocked') {
            return res.status(403).json({ message: 'Your account is Blocked. Please contact support.' });
        }
        // Compare password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // generate token
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );
        res.json({ success: true, token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

// get user data after login
router.get('/user-data', authenticateUser, async (req, res) => {

    try {
        // Find the user by email (from the decoded JWT)
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Remove password from the user object
        const { password, ...userWithoutPass } = user.toObject();
        console.log(userWithoutPass)
        res.status(200).json({ user: userWithoutPass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user data" });
    }
});
export default router;