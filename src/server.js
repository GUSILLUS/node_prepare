import express from 'express';
import usersRouter from './api/users.js';

export const app = express();
const PORT = 3000;


// Middleware - think of this as "interceptors"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API' });
});

app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 