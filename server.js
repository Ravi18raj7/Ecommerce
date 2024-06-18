import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';
//configuration env
dotenv.config();
//configuration database
connectDB();
//res object
const app=express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/api/v1/auth",authRoutes);
//rest API
app.get("/",(req,res)=>{
    res.send("<h1>hello baccho</h1>");
})
const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`.rainbow);
})