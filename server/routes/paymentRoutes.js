import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Payment Intent
// @route   POST /api/payment/create-payment-intent
// @access  Public
router.post('/create-payment-intent', async (req, res) => {
    const { items, currency = 'usd' } = req.body;

    // Calculate total amount from items (to secure price from backend)
    // For now, we'll trust the frontend total or recalculate it.
    // Ideally, fetch prices from database.

    // Simplification: Accepting total amount from frontend for this demo step.
    // In production, ALWAYS recalculate on backend.
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects cents
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
