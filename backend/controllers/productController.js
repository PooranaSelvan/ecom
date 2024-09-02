import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productModel.js";

// Seperating Controllers For Products,Users,Orders..

// Product Controller
const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({}); // 'Product' is a db model used to get datas from db
    res.json(products);
    
});

const getProductsById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id); // 'FindById' we need to pass a parameter to get an id that we chose

    if (product) {
        res.json(product);
    } else {
        res.status(404);
    }
    
});

export { getProducts, getProductsById };