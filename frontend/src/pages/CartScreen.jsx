import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdShoppingCart } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

import { addCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const addToCartHandler = (item, qty) => {
    dispatch(addCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="h-[calc(100vh-2rem)] overflow-hidden">
        {cartItem.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-900" data-aos="fade-up">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="mb-5">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 h-full">
            <div className="lg:col-span-2 overflow-y-auto pr-4 scrollbar-thin">
              <h2 className="text-3xl font-bold mb-6" data-aos="fade-right">Your Cart</h2>
              {cartItem.map((item) => (
                <div className="bg-gray-800 shadow-xl rounded-lg mb-6 overflow-hidden" key={item._id}>
                  <div className="lg:flex">
                    <div className="lg:w-1/3">
                      <Link to={`/product/${item._id}`}>
                        <img
                          className="h-64 w-full object-cover"
                          src={`${item.image}`}
                          alt={item.name}
                        />
                      </Link>
                    </div>
                    <div className="p-6 lg:w-2/3">
                      <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                      <p className="text-xl font-semibold mb-4">Price: ${item.price.toFixed(2)}</p>
                      {item.countInStock > 0 && (
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                          <div className="w-full max-w-xs">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Quantity
                            </label>
                            <select
                              className="mt-1 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                              value={item.qty}
                              onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button 
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <MdDelete size="20px" className="mr-2" /> Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1 overflow-y-auto">
              <div className="bg-gray-800 shadow-xl rounded-lg sticky top-4" data-aos="fade-left">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Items</span>
                      <span className="font-bold">
                        {cartItem.reduce((acc, item) => acc + item.qty, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total Price</span>
                      <span className="font-bold text-blue-400">
                        ${cartItem
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
                    <MdShoppingCart className="mr-2" size="20px" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;