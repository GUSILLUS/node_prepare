import express from 'express';
import usersRoutes from './route.js';
import { createUserSchema, deleteUserSchema, getUserSchema, getUsersSchema, patchUserSchema, putUserSchema } from './schema.js';
import { validate } from './middleware.js';

const usersRouter = express.Router();

usersRouter.get('/', validate(getUsersSchema), usersRoutes.getUsers);
usersRouter.post('/', validate(createUserSchema), usersRoutes.createUser);
usersRouter.get('/:id', validate(getUserSchema), usersRoutes.getUserById);
usersRouter.put('/:id', validate(putUserSchema), usersRoutes.updateUser);
usersRouter.patch('/:id', validate(patchUserSchema), usersRoutes.patchUser);
usersRouter.delete('/:id', validate(deleteUserSchema), usersRoutes.deleteUser);

export default usersRouter;