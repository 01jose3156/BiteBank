const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: err.errors.map(e => ({
          field: e.path,
          message: e.message,
        })),
      });
    }
  
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        error: 'Resource already exists',
        details: err.errors.map(e => ({
          field: e.path,
          message: e.message,
        })),
      });
    }
  
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }
  
    res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Internal Server Error',
    });
  };
  
  export default errorHandler;