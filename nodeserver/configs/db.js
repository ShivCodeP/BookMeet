import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_DB_URL;
console.log(url)

export default async () => {
    return await mongoose.connect(url);
}