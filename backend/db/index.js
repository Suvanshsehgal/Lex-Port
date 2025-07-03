import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME ;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected successfully: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
export default connectDB;
