import { ApiError } from "../utils/ApiError.mjs";
import mongoose from "mongoose";

const errorHandler = (err,req,res,next)=>{
  // console.log(err.stack)
  let error = err
  if(!(error instanceof ApiError)){
    const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500

    const message = error.message || "Something went wrong"
    error = new ApiError(statusCode, message, error?.errors||[], error.stack)
  }
  
  const response ={
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV==="development"?{stack: error.stack}:{})
  }

  return res.status(error.statusCode).json(response)

}

export {errorHandler}