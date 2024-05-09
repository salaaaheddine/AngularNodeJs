const handleError = (err, req, res, next) => {
    console.error(err.stack)
  
    let statusCode = 500
  
    if (err.name === 'ValidationError') {
      statusCode = 400
      const errors = Object.values(err.errors).map(error => error.message)
      res.json({ message: 'Validation failed', errors })
    } else if (err.name === 'CastError') {
      statusCode = 400
      res.json({ message: 'Invalid request data' })
    } else if (err.name === 'UnauthorizedError') {
      statusCode = 401
      res.json({ message: 'Unauthorized' })
    } else if (err.name === 'NotFoundError') {
      statusCode = 404
      res.json({ message: 'Resource not found' })
  
    res.status(statusCode).json({ message: 'Internal Server Error' })
  }
  
}
  
  module.exports = handleError