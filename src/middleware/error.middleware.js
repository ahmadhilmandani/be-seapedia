exports.errorMiddleware = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
      success: false,
      msg: err.message,
      stack: err.stack
    })
}