import express from 'express';
import todoController from './controller.js';
import { 
  createTodoSchema, 
  deleteTodoSchema, 
  getTodoSchema, 
  getTodosSchema, 
  patchTodoSchema, 
  updateTodoSchema 
} from './schema.js';
import { validate } from '../middleware/validation.middleware.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const todosRouter = express.Router();

todosRouter.use(authenticateToken);

todosRouter.get('/', validate(getTodosSchema), todoController.getTodos);

todosRouter.get('/:id', validate(getTodoSchema), todoController.getTodoById);

todosRouter.post('/', validate(createTodoSchema), todoController.createTodo);

todosRouter.put('/:id', validate(updateTodoSchema), todoController.updateTodo);

todosRouter.patch('/:id', validate(patchTodoSchema), todoController.patchTodo);

todosRouter.patch('/:id/toggle', validate(getTodoSchema), todoController.toggleStatus);

todosRouter.delete('/:id', validate(deleteTodoSchema), todoController.deleteTodo);

export default todosRouter;

