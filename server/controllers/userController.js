import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client('619316628751-hbanlk6mj5448pnub96gvd8234gvue5q.apps.googleusercontent.com');

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

// @desc    Forgot Password (Step 1: Send Reset Code)
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('No account found with this email.');
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordCode = resetCode;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendResetEmail(email, user.name, resetCode);

    res.json({ message: 'Reset code sent to email' });
});

// @desc    Reset Password (Step 2: Verify Code & Set New Password)
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { email, code, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (!user.resetPasswordCode || user.resetPasswordCode !== code) {
        res.status(400);
        throw new Error('Invalid reset code');
    }

    if (Date.now() > user.resetPasswordExpires) {
        res.status(400);
        throw new Error('Reset code has expired');
    }

    // Check if new password is same as old password
    const isSamePassword = await user.matchPassword(password);
    if (isSamePassword) {
        res.status(400);
        throw new Error('New password cannot be the same as your current password. Please choose a different one.');
    }

    user.password = password;
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now log in.' });
});

// @desc    Auth with Google (via Frontend Profile)
// @route   POST /api/users/google-auth
// @access  Public
const authGoogleAuth = asyncHandler(async (req, res) => {
    const { name, email, sub } = req.body;

    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
        isNewUser = true;
        // Create new user if they don't exist
        const randomPassword = Math.random().toString(36).slice(-10);
        user = await User.create({
            name,
            email,
            password: randomPassword,
            isVerified: true, // Google accounts are considered verified
        });
    }

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isNewUser,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid Google account data');
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

// Helper function to send reset email
const sendResetEmail = async (email, name, code) => {
    const message = `Hello ${name},\n\nYour password reset code for MMBM Store is: ${code}\n\nPlease enter this code to reset your password.\n\nThank you!`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="text-align: center; color: #000;">MMBM Store</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>You requested a password reset. Your reset code is:</p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; background: #f4f4f4; padding: 10px 20px; border-radius: 5px;">${code}</span>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
            <p style="font-size: 12px; color: #888; text-align: center;">© 2026 MMBM Store. All rights reserved.</p>
        </div>
    `;

    await sendEmail({
        email,
        subject: 'MMBM Store - Password Reset Request',
        message,
        html,
    });
};

export { authUser, registerUser, verifyEmail, forgotPassword, resetPassword, authGoogleAuth };
