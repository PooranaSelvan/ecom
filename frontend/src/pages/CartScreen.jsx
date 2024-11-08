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
    // return dispatch panrom because namma cart la vachu qty update panna update aagum so that
    dispatch(addCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id) => {
    // now dispatching to removeCart to remove a item from cart - passing id to remove
    dispatch(removeFromCart(id));
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-4">
      <div className="h-[calc(100vh-2rem)] overflow-hidden">
        {cartItem.length === 0 ? (
          <div className="hero min-h-screen bg-base-200" data-aos="fade-up">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="mb-5">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn btn-primary">Start Shopping</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 h-full">
            <div className="lg:col-span-2 overflow-y-auto pr-4 scrollbar-thin">
              <h2 className="text-3xl font-bold mb-6" data-aos="fade-right">Your Cart</h2>
              {cartItem.map((item) => (
                <div className="card lg:card-side bg-base-100 shadow-xl mb-6" key={item._id}>
                  <figure className="lg:w-1/3">
                    <Link to={`/product/${item._id}`}>
                      <img
                        className="h-64 w-full object-cover"
                        src={`${item.image}`}
                        alt={item.name}
                      />
                    </Link>
                  </figure>
                  <div className="card-body lg:w-2/3">
                    <h2 className="card-title text-2xl">{item.name}</h2>
                    <p className="text-xl font-semibold">Price: ${item.price.toFixed(2)}</p>
                    {item.countInStock > 0 && (
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="form-control w-full max-w-xs">
                          <label className="label">
                            <span className="label-text">Quantity</span>
                          </label>
                          <select
                            className="select select-bordered w-full max-w-xs"
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
                        <button className="btn btn-error btn-outline" onClick={() => removeFromCartHandler(item._id)}>
                          <MdDelete size="20px" /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1 overflow-y-auto">
              <div className="card bg-base-100 shadow-xl sticky top-4" data-aos="fade-left">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Order Summary</h2>
                  <div className="stats stats-vertical shadow w-full">
                    <div className="stat">
                      <div className="stat-title">Total Items</div>
                      <div className="stat-value">
                        {cartItem.reduce((acc, item) => acc + item.qty, 0)}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Total Price</div>
                      <div className="stat-value text-primary">
                        ${cartItem
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-6">
                    <button className="btn btn-primary btn-block">
                      <MdShoppingCart className="mr-2" size="20px" />
                      Proceed to Checkout
                    </button>
                  </div>
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