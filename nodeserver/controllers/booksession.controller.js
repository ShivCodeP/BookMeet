import express from "express";
const router = express.Router();
import Users from "../models/user.model.js"
import googleCalendar from "../middlewares/googleCalendar.js";
import {authenicateLogin} from "../middlewares/authenticate.js"

router.get('',authenicateLogin,async (req,res) => {
    try {
        console.log(req.session.username)
        const user = await Users.findOne({username:req.session.username}).populate("sessions").lean().exec();
        // console.log(user)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({message: error})
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