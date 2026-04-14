import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log("⏳ 1. Attempting to connect to MongoDB...");
        
        const safeUrl = process.env.MONGO_URL ? process.env.MONGO_URL.replace(/:(.*?)@/, ':****@') : 'UNDEFINED';
        console.log(`🔍 2. Using URL: ${safeUrl}`);

        mongoose.connection.on('connected', () => console.log('🟢 Mongoose connected to DB'));
        mongoose.connection.on('error', (err) => console.error('🔴 Mongoose connection error:', err.message));
        mongoose.connection.on('disconnected', () => console.log('🟡 Mongoose disconnected'));

        const conn = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000, 
        });

        console.log(`✅ 3. MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ 4. MongoDB Connection Failed: ${error.message}`);
    }
};

export default connectDB;