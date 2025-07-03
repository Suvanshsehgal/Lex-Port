import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Started Lex-port server");
});

export { app };