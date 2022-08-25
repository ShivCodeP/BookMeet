import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// TODO: Verify the client whether he is admin/developer or user

router.get("",(req,res) => {
   return res.send(`<h1>Home Page</h1>`)
})


export {router};