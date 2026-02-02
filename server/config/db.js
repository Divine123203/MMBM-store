import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB Connection Error Details:');
        console.error(`Name: ${error.name}`);
        console.error(`Message: ${error.message}`);
        if (error.stack) console.error(`Stack: ${error.stack}`);
        process.exit(1);
    }
};

export default connectDB;
