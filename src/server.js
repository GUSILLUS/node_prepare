import express from 'express';
import usersRouter from './users/api.js';

export const app = express();
const PORT = 3000;


// Middleware - think of this as "interceptors"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API' });
});

app.use('/api/users', usersRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 