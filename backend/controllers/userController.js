import asyncHandler from "../middleware/asyncHandler.js";
import userModel from "../model/userModel.js";

// authUser
// @Access Public
// /api/users/login

const authUser = asyncHandler(async (req, res) => {
    res.send("User Logged") // Got Logged On [Post]
});

// @Access Public
// /api/users/
const registerUser = asyncHandler(async (req, res) => {
    res.send("User Register"); // Got Users On [Post]
});

// @Access Private
// /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
    res.send("User Logout"); // Got Logout On [Post]
});

// @Access Public
// /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    res.send("Users GetProfile"); // Got Profile On [Get]
});

// @Access Private
// /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("Users UpdateProfile"); // Got UpdateProfile On [Put]
});

// @Access Public
// /api/users
const getUsers = asyncHandler(async (req, res) => {
    res.send("Users GetUsers"); // Got Users On [Get]
});

// @Access Public
// /api/users/:id
const getUserByID = asyncHandler(async (req, res) => {
    res.send("Users GetUserByID")  // Got UserID On [Get]
});

// @Access Private
// /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
    res.send("Users DeleteUser") // Got DeleteUser On [Delete]
});

// @Access Private
// /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
    res.send("Users UpdateUser") // Got UpdateUser On [Put]
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
}