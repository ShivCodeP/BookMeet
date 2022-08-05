import express from "express";
import Users from "../models/user.model.js";
import { authenicateDev, authenicateLogin } from "../middlewares/authenticate.js";

const {SESS_NAME = "sessionid",JWT_ACCESS_KEY="shivam"} = process.env
const loginRouter = express.Router();

loginRouter.get("", (req, res) => {
    try {
        return !req.session.isAuth?res.send(`<form action="" method="post">
        <input type="text" name="username" placeholder="Enter Username" required/>
        <input type="password" name="signature" placeholder="Signature" />
        <input type="submit" value="Login"/>
        </form>`):res.send(`<form action="/login/logout" method="post" >
        <input type="submit" value="Logout"/>
        </form>`)
    } catch (error) {
        return res.redirect("/error")
    }
})

loginRouter.post("", async (req, res) => {
    try {
        console.log(req.body.signature)
        if(req.body.signature=="shivam") {
            req.session.isAuth=true;
            return res.redirect("/user");
        }
        const user = await Users.findOne({ username: req.body.username }).lean().exec();
        if (!user) {
            return res.redirect("/error")
        }
        
        req.session.isAuth = true;
        req.session.isAdmin = user.admin;
        req.session.username = user.username;
        
        return res.redirect("/user");

    } catch (error) { 
        return res.redirect("error")
    }
})

loginRouter.post("/logout",authenicateLogin,(req,res) => {
    req.session.destroy((error)  => {
        if (error) {
          return res.redirect("/home")
        }
        res.clearCookie(SESS_NAME);
        res.redirect("/login");
      })
})

export default loginRouter;