import express from "express";
import { getProducts, getProductsById } from "../controllers/productController.js";

// Routes Must need to send to create seperate api.

const router = express.Router();

router.route("/").get(getProducts); // Getting a Base End Point..

router.route("/:id").get(getProductsById); // Getting products screen with id.

export default router;