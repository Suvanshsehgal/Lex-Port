import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import  submitDocument  from './routes/form.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Started Lex-port server");
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user",submitDocument);
export { app };