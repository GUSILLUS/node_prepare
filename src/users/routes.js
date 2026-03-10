import express from 'express';
import userController from './controller.js';
import authController from './auth.controller.js';
import { 
  createUserSchema, 
  deleteUserSchema, 
  getUserSchema, 
  getUsersSchema, 
  patchUserSchema, 
  putUserSchema,
  loginSchema,
  refreshTokenSchema
} from './schema.js';
import { validate } from '../middleware/validation.middleware.js';

const usersRouter = express.Router();

usersRouter.post('/login', validate(loginSchema), authController.login);

usersRouter.post('/register', validate(createUserSchema), authController.register);

usersRouter.post('/refresh', validate(refreshTokenSchema), authController.refreshToken);

usersRouter.get('/', validate(getUsersSchema), userController.getUsers);

usersRouter.get('/:id', validate(getUserSchema), userController.getUserById);

usersRouter.put('/:id', validate(putUserSchema), userController.updateUser);

usersRouter.patch('/:id', validate(patchUserSchema), userController.patchUser);

usersRouter.delete('/:id', validate(deleteUserSchema), userController.deleteUser);

export default usersRouter;

