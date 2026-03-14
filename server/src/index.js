import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.routes.js';
import { app, server } from "./lib/socket.js";
import authRoutes from './routes/auth.routes.js';
import {connectDB} from './lib/db.js';
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
     origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoute);


const port = process.env.PORT||500

server.listen(port,()=>{
  console.log(`server is running on the ${port}`)
connectDB();
})


