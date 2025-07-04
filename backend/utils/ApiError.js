class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = 'Internal Server Error',
    error = [],
    stack = '',
    code = 'INTERNAL_SERVER_ERROR' // ✅ Added: error code
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.stack = stack || new Error().stack;
    this.code = code;

    // Optional: use V8 stack trace capture if available
    if (!stack && Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
