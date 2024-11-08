import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     // creating a new method and stores in initialState
     userInfo:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
}

// creating a new slice
const authSlice = createSlice({
     name:'auth', // giving a name auth
     initialState, // calling initialState declared above
     reducers:{
          // setCredentials is a reducer
          setCredentials:(state, action) => {
               // intha func call panum pothu athula dispatch panrathu thaa action.payload
               // atha state.UserInfo la update panrom
               state.userInfo = action.payload;
               // localStorage la antha action.payload aa store panrom
               localStorage.setItem("userInfo", JSON.stringify(action.payload));
          },
          logout:(state, action) => {
               // logout fun call aagum pothu state aa null panrom & localStorage la irunthu remove panrom
               state.userInfo = null;
               localStorage.removeItem("userInfo");
          }
     }
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice;