import app from "./index.js";
import connect from "./configs/db.js"
import {config} from "dotenv";
config();
const port = process.env.PORT||4000;

app.listen(port,async () => {
    await connect();
    console.log("Server is listening on",port);
})