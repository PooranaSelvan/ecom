import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import  cookieParser from "cookie-parser"

// Declaring Express
const app = express();

// Cors to access the api from any endpoints
app.use(cors());

// Itha use panna thaa api [link] muliyama varra data varum ilana undefined thaa varum
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Need to set the port that api will run
const port = 5000;

// Calling The Db
connectDB();

// /api/products/ ithu tha endopints domain ku apro podura endpoint athuku ulla namma productRoutes aa call panrom
// anga namma Express-Router use panni divide panrom means / apro vantha oonu varanum ithuve id vantha inunu varanum 
// antha mathri divide panrom 
app.use("/api/products/", productRoutes);

// ithu user routes ithu default aa endpoint ithula namma neraya use panikalam..
app.use("/api/users/", userRoutes);

// Calling ErrorHandler & Not Found Errors..
app.use(errorHandler);
app.use(notFound);

// listen to run a api 
app.listen(port , () => console.log(`Server Is Running On Port:${port}`))