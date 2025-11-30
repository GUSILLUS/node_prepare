import express from 'express';
import userController from './controller.js';
import { 
  createUserSchema, 
  deleteUserSchema, 
  getUserSchema, 
  getUsersSchema, 
  patchUserSchema, 
  putUserSchema 
} from './schema.js';
import { validate } from './middleware.js';

const usersRouter = express.Router();

usersRouter.get('/', validate(getUsersSchema), userController.getUsers);

usersRouter.post('/', validate(createUserSchema), userController.createUser);

usersRouter.get('/:id', validate(getUserSchema), userController.getUserById);

usersRouter.put('/:id', validate(putUserSchema), userController.updateUser);

usersRouter.patch('/:id', validate(patchUserSchema), userController.patchUser);

usersRouter.delete('/:id', validate(deleteUserSchema), userController.deleteUser);

export default usersRouter;

