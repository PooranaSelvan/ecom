import express from "express";
import { getProducts, getProductsById } from "../controllers/productController.js";

// Routes Must need to send to create seperate api.

const router = express.Router();

// /api/products/ - ithula ithu / base endpoint inga thaa namma ela products uhm display panrom
router.route("/").get(getProducts);


// api/products/:id - ithu la namma id pass panni seperate product aa display panna try panrom 
router.route("/:id").get(getProductsById);

export default router;