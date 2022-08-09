import express from "express";
const router = express.Router();
import Users from "../models/user.model.js"
import googleCalendar from "../middlewares/googleCalendar.js"

router.get('',async (req,res) => {
    try {
        const user = await Users.findOne({username:req.session.username}).populate({path:"session",populate: ["session"]}).lean().exec();
        return res.send(user)
    } catch (error) {
        return res.status(500).send({message: "Internal server error"})
    }
})

router.post("/calendar",googleCalendar,(req,res) => {
    try {
        return res.send(`<h1>Your Calendar is blocked, Join on time</h1>
        <p>Zoom Link:- ${req.event.link}</p>
        `)
    } catch (error) {
        return res.send({message:"Internal server error"})        
    }    
})

export {router}