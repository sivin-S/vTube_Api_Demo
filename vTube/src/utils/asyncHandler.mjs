const asyncHandler = (responseHandler)=>{
  return (req,res,next)=>{
    Promise.resolve(responseHandler(req,res,next)).catch((err)=>next(err))
    // const err = new Error('some err message')
    // next(err)
  }
}

export {asyncHandler}