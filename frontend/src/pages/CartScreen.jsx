import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

import { addCart,removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const { cartItem } = useSelector((state) => state.cart);
  // console.log(cartItem);

  const dispatch = useDispatch();
  const addToCartHandler = (item, qty) => {
    dispatch(addCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id) => {
    // console.log(id);
    dispatch(removeFromCart(id));
  };

  return (
    <div className="text-[#DBD8E3]">
      {cartItem.length === 0 ? (
        <div className="empty-cart">
          <h2>Cart is empty</h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-10 mt-10 mx-6">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItem.map((item) => (
              <div className="grid grid-cols-2 gap-10" key={item._id}>
                <div className="col-span-1 gap-10">
                  <Link to={`/product/${item._id}`}>
                    <img
                      width="100%"
                      className="h-[200px] object-cover"
                      src={`${item.image}`}
                      alt={item.name}
                    />
                  </Link>
                </div>
                <div className="col-span-1">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title mb-2">{item.name}</h2>
                      <p className="mb-3">Price : {item.price}</p>
                      {item.countInStock > 0 && (
                        <div className="flex gap-5 items-center">
                          <h4>Qty</h4>
                          <form>
                            <select name="select"
                              className="select select-bordered w-full max-w-xs"
                              value={item.qty}
                              onChange={(e) => {
                                addToCartHandler(item, Number(e.target.value));
                              }}
                            >
                              {[...Array(item.countInStock).keys()].map(
                                (item) => (
                                  <option key={item + 1} value={item + 1}>
                                    {item + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </form>
                          <button
                            className="btn btn-error"
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <MdDelete color="white" size="20px" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-3">
                  Total Items: ({cartItem.reduce((acc, item) => acc + item.qty, 0)}
                  )
                </h2>
                <h2 className="card-title mb-3">
                  Total Price:   (
                  {cartItem
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed()}
                  ) rs
                </h2>

                <button className="btn btn-success">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
