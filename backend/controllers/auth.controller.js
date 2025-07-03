import asyncHandler from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


const registeruser = asyncHandler(async (req, res) => {
    const { Username, email, password } = req.body;
       console.log('User registration details:', { Username, email, password });
    if (!Username || !email || !password) {
        throw new ApiError(400, "Please provide all required fields");
    }
const existingUser = await User.findOne({
    $or: [{ email }, { Username }]
  });

    const user = await User.create({ Username, email, password });

    const createdUser = await User.findById(user._id).select("-password -referenceToken");

    if(!createdUser){
      throw new ApiError(500, "User creation failed");
   }
   return res.status(201).json(
    new ApiResponse(201, "User registered successfully", createdUser)
   );
})

export default registeruser;