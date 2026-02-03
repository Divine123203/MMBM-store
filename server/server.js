import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import products from './data/products.js';

import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

// Ensure DB is connected for every request (Serverless optimization)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed' });
    }
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('MMBM Store API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
