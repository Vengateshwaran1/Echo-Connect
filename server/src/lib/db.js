import mongoose from "mongoose"

import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async() =>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected to ${conn.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MONGODB",error);
        process.exit(1);
    }
};


