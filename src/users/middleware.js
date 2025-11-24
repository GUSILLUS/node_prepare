import { ZodError } from 'zod';

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Validate request data against schema
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Simple, clean errors
        const errors = {};

        error.issues.forEach(err => {
          const field = err.path.join('.');
          errors[field] = err.message;
        });

        console.log('Validation errors:', errors);

        return res.status(400).json({
          message: 'Validation failed',
          errors
        });
      }

      next(error);
    }
  };
};