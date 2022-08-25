import express from "express";
import Users from "../models/user.model.js";
import { authenticateDev, authenticateLogin } from "../middlewares/authenticate.js"

const router = express.Router();

router.get("", async (req, res) => {
    if (!req.session.isAuth) {
        return res.redirect("/login")
    }
    console.log(req.session.isAdmin )
    if(req.query.data =="true" && req.session.isAdmin) {
        const users = await Users.find().lean().exec();
        return res.status(200).json(users)
    }
    // TODO : IF user is not admin she/he will see all the session opened by him.

    return res.status(200).send(`<form action="" method="post">
     <input type="text" name="username" />
     <input type="text" name="token" placeholder="signature" />
     <input type="submit" />
    </form>`)
})

// TODO: Authentication for post request ::done :: testing not done
router.post("",authenticateDev, async (req, res) => {
    try {
        // console.log(req.body);
        let {username,admin} = req.body;
        req.session.Dev?admin=true:admin=false;
        // console.log(admin);
        const user = await Users.create({
            username,
            available: [],
            booked: [],
            admin: admin
        });
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }

})

export default router;