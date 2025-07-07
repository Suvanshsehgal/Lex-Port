import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "User not found");
    }
    console.log(" Incoming Headers:", req.headers);
    req.user = user; 
    next();
   
  } catch (error) {
    throw new ApiError(401, "Token is invalid or expired");
  }


});

export default protect;
