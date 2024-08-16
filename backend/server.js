import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());

const port = 5000;

connectDB();

app.use("/api/products/", productRoutes);

app.use(errorHandler);
app.use(notFound);

app.listen(port , () => console.log(`Server Is Running On Port:${port}`))