import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chatbot.routes.js'
import cors from 'cors';
import  submitDocument  from './routes/form.routes.js';
import bodyParser from 'body-parser';
import errorMiddleware from './middlewares/error.middleware.js';
dotenv.config();

const app = express();

const allowedOrigins = ['https://lex-port.vercel.app', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(bodyParser.json()); // Parses JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Started Lex-port server");
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/chat",chatRoutes);
app.use("/api/v1/user",submitDocument);

app.use(errorMiddleware);
export { app };