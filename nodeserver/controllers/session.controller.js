import express from "express";
import Sessions from "../models/session.model.js";
import Users from "../models/user.model.js";
import { authenicateDev, authenicateLogin } from "../middlewares/authenticate.js";

const sessionRouter = express.Router();

sessionRouter.get("", authenicateLogin, async (req, res) => {
    try {
        const username = req.session.username;
        // console.log(username)
        if (req.query.data == "true") {
            const session = await Users.findOne({ "username": username }).populate({ path: "sessions", populate: ["session"] }).lean().exec();
            return res.status(200).json(session);
        }
        return res.send(`<form action="" method="post" >
        <input type="text" name="summary" placeholder="Enter the Summary of Session" />
        <input type="text" name="location" placeholder="Enter the location of Session" />
        <textarea  name="description" placeholder="Description" width=300 height=500 >${req.session.sessionDescription?req.session.sessionDescription:""}</textarea>
        <input type="checkbox" name="save"/>
        <input type="number" name="day" placeholder="Start Day" />
        <input type="number" name="sessionStart" placeholder="Start Time" />
        <input type="number" name="slots" placeholder="Number of slots to open" />
        <input type="number" name="duration" placeholder="Duration of each slots" />
        <input type="number" name="colorId" placeholder="Color Code from 1 to 9" />
        <input type="submit" value="Create Session" />
        </form>`)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

sessionRouter.post("", authenicateLogin, async (req, res) => {
    try {
        const {summary,description,location,sessionStart,duration,slots,save} = req.body;
        if(save == "on") {
            req.session.sessionDescription = req.body.description;
        }

        return res.send(`<h1>session created</h1>`)
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})        
    }
})

export default sessionRouter;