import express from "express";
import Users from "../models/user.model.js";
import { authenicateDev, authenicateLogin } from "../middlewares/authenticate.js"

const router = express.Router();

router.get("", async (req, res) => {
    if (!req.session.isAuth) {
        return res.redirect("/error")
    }
    const users = await Users.find().lean().exec();
    return res.status(200).send({ data: users })
})

// TODO: Authentication for post request
router.post("", authenicateDev, async (req, res) => {
    try {
        const user = await Users.create(req.body);
        req.body.admin ? req.session.isAuth = true : null;
        return res.status(200).json({ message: "User is posted" })
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }

})

export default router;