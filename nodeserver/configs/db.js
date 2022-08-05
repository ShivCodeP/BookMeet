import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_DB_URL ||`mongodb+srv://naukri:naukri@cluster0.u9tan.mongodb.net/bookmeet?retryWrites=true&w=majority`;
// console.log(url)

const connect = async () => {
    return await mongoose.connect(url);
}
export default connect;