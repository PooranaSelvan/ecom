import User from "../model/userModel.js"
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

// Protect 
// check if logged in or not
const protect = asyncHandler(async (req, res, next) => {

    const token = req.cookies.jwt;
    console.log(token);

    if(!token){
        res.status(401);
        throw new Error("You are not logged in!");
    }

    try{
        const decoded = jwt.verify(token, "secret");
        req.user = await User.findById(decoded.UserId);
        next();
    } catch(err){
        res.status(401);
        throw new Error("You are not logged in!");
    }
    
});
// Admin
// check if admin or not

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error("You are not authorized as an admin");
    }

};

export {protect, admin};