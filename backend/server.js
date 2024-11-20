import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import  cookieParser from "cookie-parser";
import cartRoutes from "./routes/cartRoutes.js";
import dotenv from 'dotenv';


// Declaring Express
const app = express();

// .env
dotenv.config();


// Cors to access the api from any endpoints
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));


// Itha use panna thaa api [link] muliyama varra data varum ilana undefined thaa varum
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Need to set the port that api will run
const port = process.env.PORT || 5000;

// Calling The Db
connectDB();

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/cart", cartRoutes);

// Calling ErrorHandler & Not Found Errors..
app.use(notFound);
app.use(errorHandler);


// listen to run a api 
app.listen(port , () => console.log(`Server Is Running On Port:${port}`))