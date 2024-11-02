import User from '../models/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 
import nodemailer from 'nodemailer'; 

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber, 
            role
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch roles
const fetchRoles = (req, res) => {
    try {
        const roles = User.schema.path('role').enumValues; // Get unique roles from schema's enum values
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ message: "Error fetching roles", error: error.message });
    }
};

// Get a single admin user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
const updateUserById = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role } = req.body;

        // Initialize the data to update
        let updateData = { name, email, phoneNumber, role }; // Add role to the update

        // Hash the password if it is provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        // Find and update the user by ID
        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,
            name: user.name,
            email: user.email,
            phone: user.phoneNumber,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Forgot password 
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 3600000; // 1 hour expiration
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS,  // Your email password or app password
            },
        });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`; // Use environment variable for frontend URL

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                   <a href="${resetUrl}">${resetUrl}</a>`,
        });

        res.status(200).json({ message: "Reset link sent to your email." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Reset Password 
const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        const user = await User.findOne({ resetToken, resetTokenExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined; 
        user.resetTokenExpires = undefined; 
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { createUser, getAllUsers, fetchRoles, getUserById, updateUserById, deleteUserById, loginUser, forgotPassword, resetPassword };