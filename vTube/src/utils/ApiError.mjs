class ApiError extends Error{
  constructor(
    statusCode,
    message="something went wrong",
    errors= [],
    stack= ""
  ){
    super(message);
    this.statusCode = statusCode;
    this.data = null
    this.message = message
    this.success =  false
    this.errors = errors
    if(stack){
      this.stack=stack
    }else{
      Error.captureStackTrace(this,this.constructor)
      // Error.captureStackTrace(this,this.constructor) ---
      //  Important => " Error.captureStackTrace(this,this.constructor) " capture the error passes to " ApiError class " 
    }
  }
}

export {ApiError}