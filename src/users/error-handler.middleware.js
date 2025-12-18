import { ZodError } from 'zod';
import { HttpError } from 'http-error-classes';

export const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      statusCode: err.statusCode
    });
  }

  if (err instanceof ZodError) {
    const errors = {};
    err.issues.forEach(issue => {
      const field = issue.path.join('.');
      errors[field] = issue.message;
    });

    return res.status(400).json({
      error: 'ValidationError',
      message: 'Validation failed',
      errors,
      statusCode: 400
    });
  }

  return res.status(500).json({
    error: 'InternalServerError',
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    statusCode: 500
  });
};

