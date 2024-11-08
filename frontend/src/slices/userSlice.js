import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
     endpoints:(builder) => ({
          // mutation means updating something 
          login:builder.mutation({
               query:(data) => ({
                    url:`${USERS_URL}/login`, // http://localhost:5000/api/users/login
                    method:"POST",
                    body:data // here we updating data got from frontend
               })
          }),
          logout:builder.mutation({
               query:() => ({
                    url: `${USERS_URL}/logout`, // http://localhost:5000/api/users/logout
                    method: "POST",
               })
          })
     })
})

export const { useLoginMutation, useLogoutMutation } = userApiSlice;