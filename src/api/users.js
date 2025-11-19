import express from 'express';
import { updateUsersList } from "../services/users.js";

const usersRouter = express.Router();

const requiredFields = ['name', 'email'];



usersRouter.get('/', (req, res) => {
  let filteredUsers = updateUsersList();
  const { name } = req.query;

  if (name) {
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  const total = filteredUsers.length;

  res.json({ users: filteredUsers, total });
});

usersRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const users = updateUsersList();
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

usersRouter.post('/', (req, res) => {
  if (Object.keys(req?.body ?? {}).length === 0) {
    return res.status(400).json({ message: 'Body is required' });
  }

  const missingFields = requiredFields.filter(field => !Object.keys(req.body).includes(field));

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
  }

  const { name, email } = req.body;

  const newUser = { id: crypto.randomUUID(), name, email };

  updateUsersList([...updateUsersList(), newUser]);

  res.status(201).json(newUser);
});

usersRouter.put('/:id', (req, res) => {
  const id = req.params.id;

  const users = updateUsersList();
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
  }

  const copiedUser = { ...user };

  for (const key in copiedUser) {
    if (req.body[key]) {
      copiedUser[key] = req.body[key];
    }
  }

  updateUsersList(users.map(user => user.id === id ? copiedUser : user));

  res.json(copiedUser);
});

usersRouter.patch('/:id/change-email', (req, res) => {
  const id = req.params.id;
  const { email } = req.body;
  const users = updateUsersList();
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const copiedUser = { ...user };

  copiedUser.email = email;

  updateUsersList(users.map(user => user.id === id ? copiedUser : user));

  res.json(copiedUser);
});

usersRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  const users = updateUsersList();

  updateUsersList(users.filter(user => user.id !== id));

  res.json({ message: 'User deleted' });
});

export default usersRouter;