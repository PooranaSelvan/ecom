import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js"; 

// Controller to add a product to the cart
const addToCart = asyncHandler(async (req, res) => {

  const { productId, qty } = req.body; // Destructure productId and quantity from the request body.
  const userId = req.user._id; // Get the logged-in user's ID from the request object.
  
  const product = await Product.findById(productId); // Find the product in the database by ID.
  
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: userId }); // Find the user's cart in the database.

  if (cart) {

    // If a cart exists for the user:
    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId.toString() // Check if the product is already in the cart.
    );

    if (existingItemIndex !== -1) {
      // If the product exists in the cart, update its quantity.
      cart.cartItems[existingItemIndex].qty = qty;
    } else {
      // If the product doesn't exist in the cart, add it as a new item.
      cart.cartItems.push({
        name: product.name,
        qty,
        price: product.price,
        totalPrice: product.totalPrice,
        image: product.image,
        product: productId,
        countInStock: product.countInStock,
      });
    }


  } else {


    // If no cart exists for the user, create a new cart.
    cart = new Cart({
      user: userId, // Associate the cart with the user (help of id).
      cartItems: [
        {
          name: product.name,
          qty,
          price: product.price,
          totalPrice: product.totalPrice,
          image: product.image,
          product: productId,
          countInStock: product.countInStock,
        },
      ],
    });
  }

  // Calculate item prices.
  cart.itemPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, // Accumulate total item price
    0 // Initial accumulator value
  );

  // Calculate shipping price (free if item price > 100, else 20).
  cart.shippingPrice = cart.itemPrice > 100 ? 0 : 20;

  // Calculate tax price (18% of item price, rounded to 2 decimal places).
  cart.taxPrice = +(0.18 * cart.itemPrice).toFixed(2);

  // Calculate the total price (item price + shipping + tax).
  cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;

  await cart.save(); // Save the cart to the database.
  res.status(201).json(cart); // Respond with the updated cart as a success message.
});


// Controller to update product quantity in the cart
const updateCart = asyncHandler(async (req, res) => {

  const { productId, qty } = req.body; // Destructure productId and quantity from the request body.
  const userId = req.user._id; // Get the logged-in user's ID from the request object.

  // Find the user's cart in the database.
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Find the index of the product in the cart to update its quantity.
  const itemIndex = cart.cartItems.findIndex((item) => {
    return item._id.toString() === productId.toString(); // Compare product IDs to find the correct item.
  });

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  // Update the quantity of the product in the cart.
  cart.cartItems[itemIndex].qty = qty;

  // Recalculate prices after updating the quantity.
  cart.itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  cart.shippingPrice = cart.itemPrice > 100 ? 0 : 20;
  cart.taxPrice = +(0.18 * cart.itemPrice).toFixed(2);
  cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;

  await cart.save(); // Save the updated cart to the database.
  res.status(200).json(cart);
});


// Controller to get the user's cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the logged-in user's ID from the request object.

  // Find the user's cart in the database.
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(200).json({ cartItems: [] });
  }

  res.status(200).json(cart);
});


// Controller to remove a product from the cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body; // Destructure the product ID from the request body.
  const userId = req.user._id; // Get the logged-in user's ID from the request object.

  let cart = await Cart.findOne({ user: userId }); // Find the user's cart in the database.

  if (!cart) {
    // If no cart exists, return a 404 response.
    return res.status(404).json({ message: "Cart not found" });
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === productId.toString() // Find the product in the cart.
  );

  if (itemIndex === -1) {
    // If the product is not in the cart, return a 404 response.
    return res.status(404).json({ message: "Item not found in cart" });
  }

  cart.cartItems.splice(itemIndex, 1); // Remove the product from the cart.

  // Recalculate item prices after removal.
  cart.itemPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  // Recalculate shipping price.
  cart.shippingPrice = cart.itemPrice > 100 ? 0 : 20;
  // Recalculate tax price.
  cart.taxPrice = +(0.18 * cart.itemPrice).toFixed(2);
  // Recalculate total price.
  cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;

  await cart.save(); // Save the updated cart to the database.
  res.status(200).json(cart); // Respond with the updated cart.
});

// Export the controllers for use in routes.
export { addToCart, getCart, removeFromCart, updateCart };
