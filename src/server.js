import express from 'express';
import usersRouter from './users/routes.js';
import todosRouter from './todo/routes.js';
import { errorHandler } from './middleware/error-handler.middleware.js';
import { authenticateToken } from './middleware/auth.middleware.js';


export const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API' });
});

app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter);

app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}! You are logged in.` });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 