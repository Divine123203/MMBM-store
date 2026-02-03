import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000, // Wait 15s instead of 10s
            bufferCommands: false, // Disable buffering so we see real errors instantly
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB Connection Error Details:');
        console.error(`Name: ${error.name}`);
        console.error(`Message: ${error.message}`);
        if (error.stack) console.error(`Stack: ${error.stack}`);
        // In serverless, we shouldn't necessarily exit the process
        throw error;
    }
};

export default connectDB;
