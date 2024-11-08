import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     userInfo:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
}

// creating a new slice
const authSlice = createSlice({
     name:'auth', // giving a name auth
     initialState, // calling initialState declared above
     reducers:{
          setCredentials:(state, action) => {
               state.userInfo = action.payload;
               localStorage.setItem("userInfo", JSON.stringify(action.payload));
          },
          logout:(state, action) => {
               state.userInfo = null;
               localStorage.removeItem("userInfo");
          }
     }
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice;