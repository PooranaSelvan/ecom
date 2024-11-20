import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useGetCartQuery, useRemoveFromCartMutation } from "../slices/cartSlice";
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useUpdateCartMutation } from '../slices/cartSlice';
import Loader from "../components/Loader";

const CartScreen = () => {

  // getting cart data from redux store
  const { data: cart, isLoading, error } = useGetCartQuery();

  // mutation for remove & update
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  // func for qty change & update cart 
  const handleQtyChange = async (id, value) => {
    try {
      setQuantities((prevState) => ({
        ...prevState,
        [id]: value,
      }));
      
      await updateCart({ productId: id, qty: value }).unwrap();
      toast.success("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart. Please try again.");
    }
  };

  // func for remove cart
  const removeFromCartHandler = async (productId) => {
    try {
      await removeFromCart({ productId }).unwrap();
      toast.success('Product removed from cart');
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
    }
  };

  const checkOutHandler = () => {
    // navigate("/login?redirect=/shipping");
    alert("Still Under Development..");
  };

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600 dark:text-red-400">
        Error: {error?.data?.message || "Failed to load cart"}
      </p>
    );
  }

  const cartItems = cart?.cartItems || [];

  return (
    <div className="dark:bg-gray-900 px-4 h-screen pt-20 flex flex-col">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-indigo-600 dark:text-indigo-400">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4 text-center">
          <p className="text-lg font-semibold">Your cart is empty. Start adding items!</p>
          <button className="inline-flex items-center px-3 py-2 mt-4 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Link to="/">Shop Now</Link>
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-10 flex-grow overflow-hidden">
          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto pr-4 shadow-lg md:w-[80%]" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {cartItems.map((item) => (
              <div className="flex flex-col md:flex-row gap-5 items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-5" key={item._id}>
                {/* Product Image */}
                <div className="w-full md:w-1/4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-md shadow-lg object-cover w-full h-48 md:h-full"
                  />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-3/4 space-y-3">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{item.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Price: <span className="font-semibold">${item.price}</span>
                  </p>

                  <div className="flex flex-wrap items-center w-full gap-6">
                    {item.countInStock > 0 && (
                      <div className="flex flex-wrap flex-col items-center gap-4 mt-4 w-full">
                        <div className="flex flex-wrap flex-col w-full">
                          <label className="block text-sm font-medium text-gray-300 mb-1">Quantity:</label>
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-black bg-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
                            value={quantities[item._id] || item.qty}
                            onChange={(e) => handleQtyChange(item._id, Number(e.target.value))}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={() => removeFromCartHandler(item._id)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out">
                    <Trash2 size={16} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:w-1/3 flex flex-wrap flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Order Summary</h2>

            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Subtotal:{" "}
              <span className="font-bold">
                {cartItems.reduce((acc, item) => acc + (quantities[item._id] || item.qty), 0)} items
              </span>
            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-5">
              Total Price:{" "}
              <span className="font-bold text-lg">
                ${cartItems.reduce((acc, item) => acc + (quantities[item._id] || item.qty) * item.price, 0).toFixed(2)}
              </span>
            </p>

            <button className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300" onClick={checkOutHandler}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;