import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('No account found with this email. Please register first.');
    }

    if (!user.isVerified) {
        res.status(401);
        throw new Error('Account not verified. Please verify your email.');
    }

    if (await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid password');
    }
});

// @desc    Register a new user (Step 1: Send Code)
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        if (userExists.isVerified) {
            res.status(400);
            throw new Error('User already exists');
        } else {
            // If exists but not verified, we can resend code or update
            userExists.name = name;
            userExists.password = password;
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            userExists.verificationCode = verificationCode;
            await userExists.save();

            await sendVerificationEmail(email, name, verificationCode);
            res.status(200).json({ message: 'Verification code resent to email' });
            return;
        }
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
        name,
        email,
        password,
        verificationCode,
    });

    if (user) {
        await sendVerificationEmail(email, name, verificationCode);
        res.status(201).json({
            message: 'Verification code sent to email',
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Verify Email
// @route   POST /api/users/verify
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.verificationCode === code) {
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid verification code');
    }
});

// Helper function to send email
const sendVerificationEmail = async (email, name, code) => {
    const message = `Hello ${name},\n\nYour verification code for MMBM Store is: ${code}\n\nPlease enter this code to verify your account.\n\nThank you!`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="text-align: center; color: #000;">MMBM Store</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Your verification code for creating an account is:</p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; background: #f4f4f4; padding: 10px 20px; border-radius: 5px;">${code}</span>
            </div>
            <p>Please enter this code in the registration form to finalize your account.</p>
            <p>If you did not request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
            <p style="font-size: 12px; color: #888; text-align: center;">© 2026 MMBM Store. All rights reserved.</p>
        </div>
    `;

    await sendEmail({
        email,
        subject: 'MMBM Store - Verify Your Account',
        message,
        html,
    });
};

export { authUser, registerUser, verifyEmail };
