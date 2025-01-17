module.exports = {
  successResponse: (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  errorResponse: (res, message, error = {}, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  },
};
