class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = 'Internal Server Error',  
    error = [],
    stack = ''  
  ){
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.stack = stack || new Error().stack; // Capture the stack trace if not provided


    if(stack){
        this.stack = stack;
    }
    else{
        Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;