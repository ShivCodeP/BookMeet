import express from "express";
const router = express.Router();
import Users from "../models/user.model.js"
import googleCalendar from "../middlewares/googleCalendar.js";
import {authenticateLogin,authenticateDev} from "../middlewares/authenticate.js"
import Sessions from "../models/session.model.js";

router.get('/:id',authenticateLogin,authenticateDev,async (req,res) => {
    try {
        console.log(req.session.username)
        const user = await Users.findOne({_id: req.params.id}).populate("available").lean().exec();
        // console.log(user)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({message: error})
    }
})

router.get("/:id/calendar",async(req,res) => {
    try {
        const user = await Users.findById({_id:req.params.id}).populate("available").lean().exec();
        const availabe_session = user.available;

        return res.send(availabe_session);
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error"})
    }
})

router.post("/:id/calendar",googleCalendar,async (req,res) => {
    try {
        const {session_id} = req.body;
        const user_id = req.params.id;
        const session = await Sessions.findByIdAndUpdate(session_id,{status:true}).lean().exec();
        const user = await Users.findByIdAndUpdate(user_id,{availabe:availabe.filter(e => e._id !== session_id),booked:[...booked,session_id]}).lean().exec();
        
        return res.send(`<h1>Your Calendar is blocked for given time slot, Join on time</h1>
        <p>Zoom Link:- ${session.location}</p>
        `)
    } catch (error) {
        return res.send({message:"Internal server error"})        
    }    
})

export {router}