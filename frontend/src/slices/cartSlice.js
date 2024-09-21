import { createSlice } from "@reduxjs/toolkit";



const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItem:[] } ;

const cartSlice = createSlice({

    name: "cart",
    initialState,
    reducers: {
        addCart(state, action) {
          const product = action.payload;
          // console.log(product)
          const existItem = state.cartItem.find((a) => a._id === product._id);
  
          if (existItem) {
          
            state.cartItem = state.cartItem.map((a) =>
              a._id === existItem._id ? product : a
            );
          
          } else {
            state.cartItem = [...state.cartItem, product];
          }
        
          // Calculate items price
          state.itemPrice = state.cartItem.reduce(
            (acc, product) => acc + product.price * product.qty,
            0
          ).toFixed(0);       
        
          // Shipping price (if 100 rs free)
          state.shippingPrice = state.itemPrice > 2000 ? 0 : 20;
        
          // GST Price
          state.taxPrice = Number(0.18 * state.itemPrice);
        
          // Total Price
          state.totalPrice =
            Number(state.itemPrice) +
            Number(state.shippingPrice) +
            Number(state.taxPrice);
        
          localStorage.setItem("cart", JSON.stringify(state));
        },
        // Remove From Cart
        removeFromCart(state, action){
          state.cartItem = state.cartItem.filter((x) => x._id !== action.payload);

          // Calculate items price
          state.itemPrice = state.cartItem.reduce(
            (acc, product) => acc + product.price * product.qty,
            0
          ).toFixed(0);       
        
          // Shipping price (if 100 rs free)
          state.shippingPrice = state.itemPrice > 2000 ? 0 : 20;
        
          // GST Price
          state.taxPrice = Number(0.18 * state.itemPrice);
        
          // Total Price
          state.totalPrice =
            Number(state.itemPrice) +
            Number(state.shippingPrice) +
            Number(state.taxPrice);
        
          localStorage.setItem("cart", JSON.stringify(state));
        }
    }
});

export const { addCart,removeFromCart } = cartSlice.actions;
export default cartSlice;