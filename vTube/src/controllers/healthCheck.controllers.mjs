import { ApiResponse } from "../utils/ApiResponse.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs"; 

const healthCheck = asyncHandler(async(req,res)=>{
  return res.status(200).json(new ApiResponse(200,"ok" ,"Health check success"))
})

export {healthCheck}