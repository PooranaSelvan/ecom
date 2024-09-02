import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Declaring Express
const app = express();

// Cors to access the api from any endpoints
app.use(cors());

// Need to set the port that api will run
const port = 5000;

// Calling The Db
connectDB();

// Ithu Enanu Paakanum
app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);

// Calling ErrorHandler & Not Found Errors..
app.use(errorHandler);
app.use(notFound);

// listen to run a api 
app.listen(port , () => console.log(`Server Is Running On Port:${port}`))