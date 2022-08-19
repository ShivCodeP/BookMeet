import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import router from "./controllers/user.controller.js"
import loginRouter from "./controllers/login.controller.js";
import sessionRouter from "./controllers/session.controller.js";
import {router as BooksessionController} from "./controllers/booksession.controller.js";
import {router as homeController} from "./controllers/home.controller.js";

const MongoDBStore = connectMongo(session)
let store = new MongoDBStore({
  uri: `mongodb+srv://naukri:naukri@cluster0.u9tan.mongodb.net`,
  collection: 'mySessions'
}, (err) => {
  console.log(err)
});

store.on('connected', () => {
  store.client; // The underlying MongoClient object from the MongoDB driver
});

// Catch errors
store.on('error', function(err) {
  console.log(err);
});


const app = express();

const TWO_HOURS = 1000*60*60*2;

const {
    SESS_LIFETIME = TWO_HOURS,
    NODE_ENV = "development",
    SESS_NAME = "sid",
    SESS_SECRET = "shivam!aditya!pandey"
} = process.env;

const IN_PROD = NODE_ENV === 'production';

app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({

    name: SESS_NAME,
    resave: true,
    store,
    saveUninitialized:true,
    secret:SESS_SECRET,
    cookie: {
      sameSite: true ,
      secure: IN_PROD,
      // maxAge: SESS_LIFETIME,
    }
}))
app.use("/",homeController)
app.use("/user",router)
app.use("/login",loginRouter);
app.use("/session",sessionRouter);
app.use("/booksession",BooksessionController)

export default app;