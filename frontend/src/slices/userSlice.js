import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
     endpoints:(builder) => ({
          // mutation means updating something - it was named login
          login:builder.mutation({
               // query taken an argument - data which was passed from frontend
               // antha data va intha url la send panrom "POST" method la - check userController.js with this url.
               query:(data) => ({
                    url:`${USERS_URL}/login`, // http://localhost:5000/api/users/login
                    method:"POST",
                    body:data // here we updating data got from frontend
               })
          }),
          logout:builder.mutation({
               query:() => ({
                    //  check userController.js with this url.
                    url: `${USERS_URL}/logout`, // http://localhost:5000/api/users/logout
                    method: "POST",
               })
          }),
          getUserProfile: builder.query({
               query: () => ({
                   url: `${USERS_URL}/profile`,
                   method: "GET",
               })
          }),
     })
})

export const { useLoginMutation, useLogoutMutation, useGetUserProfileQuery } = userApiSlice;