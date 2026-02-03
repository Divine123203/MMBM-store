import mongoose from 'mongoose';

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined in environment variables!');
        throw new Error('Database configuration missing');
    }

    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {
        console.log('Connecting to MongoDB...');
        // Obfuscate URI for logging
        const maskedUri = process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@');
        console.log(`Using URI: ${maskedUri}`);

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000,
            bufferCommands: false, // This tells mongoose not to buffer if connection is down
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB Connection Error Details:');
        console.error(`Name: ${error.name}`);
        console.error(`Message: ${error.message}`);
        throw error;
    }
};

export default connectDB;
