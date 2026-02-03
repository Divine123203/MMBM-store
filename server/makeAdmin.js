import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure env is loaded from the correct directory
dotenv.config({ path: path.join(__dirname, '.env') });

const makeAdmin = async (email) => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('❌ Error: MONGO_URI is not defined in your server/.env file.');
            process.exit(1);
        }

        console.log('⏳ Attempting to connect to MongoDB...');

        // Use connection options similar to your main app
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000,
        });

        console.log('✅ Connected successfully!');

        const user = await User.findOne({ email });

        if (user) {
            user.isAdmin = true;
            await user.save();
            console.log(`\n🎉 SUCCESS!`);
            console.log(`-----------------------------------`);
            console.log(`User: ${user.name}`);
            console.log(`Email: ${email}`);
            console.log(`Status: PROMOTE TO ADMIN COMPLETE`);
            console.log(`-----------------------------------`);
            console.log(`\nYou can now log in and access the Admin Dashboard! ✨`);
        } else {
            console.log(`\n❌ User not found: ${email}`);
            console.log(`Make sure you have registered this account on the site first.`);
        }

        await mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error('\n❌ Connection Error:');
        console.error(error.message);
        console.log('\nTip: This error (EAI_AGAIN) is usually a temporary network hiccup.');
        console.log('Please check your internet connection and try running the command again.');
        process.exit(1);
    }
};

const emailToPromote = process.argv[2];
if (!emailToPromote) {
    console.log('Usage: node server/makeAdmin.js your@email.com');
    process.exit();
}

makeAdmin(emailToPromote);
