import express from "express";
const app = express();

app.get("/",(req,res) => {
    res.end("<h1>hello bookMeet</h1>");
})

export default app;