import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI);
        console.log(`MongoDB Connection: ${conn.connection.host}`);
        
    } catch (error) {
        console.error("Database Connection error: ", error.message);
        process.exit(1);
    }
}

export default connectDB; 