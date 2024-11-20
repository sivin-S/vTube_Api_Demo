import jwt from "jsonwebtoken";
import {asyncHandler} from "../utils/asyncHandler.mjs";
import {ApiError} from "../utils/ApiError.mjs";
import {User} from "../models/user.models.mjs";



// why we use " _ " in params we can prevent error for not using "res"
export const verifyJWT = asyncHandler(async (req, _,next) => {
  // ### Note ##
  // first we want to grab a  " Header => Authorization : Bearer uiu9393dkdmdmdm " from the header we take token - Bearer token is jwt token
   const token = req.cookies.accessToken || req.body.accessToken || req.header("Authorization")?.replace("Bearer ","")

   if(!token){
    throw new ApiError(401,"Access token is missing")
   }

  try {
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)
    .select("-password -refreshToken") // ## NOTE #### -  select() is used for  projection (exclude & include) fields
                 // "-password" means exclude password field from the response & "password" means include password field in the response
      if(!user){
            throw new ApiError(401,"Unauthorized")
      } 

      req.user = user // we creating new parameter to req object called user.
  
      next()

  } catch (error) {
     throw new ApiError(401,error?.message||"Invalid access token")
  }
})




