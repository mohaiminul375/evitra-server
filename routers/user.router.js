import { Router } from "express";
import { User } from "../models/user.model.js";
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
export default router;