import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registeruser = asyncHandler(async (req, res) => {
  const { Username, email, password } = req.body;
  console.log("User registration details:", { Username, email, password });

  if (!Username || !email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { Username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists",[] , "" ,"USER_EXISTS");
  }

  const user = await User.create({ Username, email, password });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "User creation failed" ,[], "" , USER_CREATION_FAILED) ;
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password" , [], "", "MISSING_FIELDS");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found",[], "", "EMAIL_NOT_FOUND");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password", [], "", "INVALID_PASSWORD");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET, 
    { expiresIn: "1h" }
  );

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      token,
      user: {
        id: user._id,
        Username: user.Username,
        email: user.email,
      }
    })
  );
});

export { registeruser, loginUser };
