import todoService from './todo.service.js';

class TodoController {
  constructor(service) {
    this.service = service;
  }

  getTodos = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { status, search } = req.query;
      
      const todos = await this.service.getTodos(userId, { status, search });
      const total = todos.length;

      res.json({ todos, total });
    } catch (error) {
      next(error);
    }
  };

  getTodoById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const todo = await this.service.getTodoById(id, userId);

      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  createTodo = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { title, description, status } = req.body;
      
      const todo = await this.service.createTodo(userId, { 
        title, 
        description, 
        status 
      });

      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  };

  updateTodo = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { title, description, status } = req.body;
      
      const todo = await this.service.updateTodo(id, userId, { 
        title, 
        description, 
        status 
      });

      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  patchTodo = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { title, description, status } = req.body;
      
      const todoFields = Object.fromEntries(
        Object.entries({ title, description, status }).filter(([_, value]) => value !== undefined)
      );

      const todo = await this.service.patchTodo(id, userId, todoFields);

      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  toggleStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const todo = await this.service.toggleTodoStatus(id, userId);

      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  deleteTodo = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const result = await this.service.deleteTodo(id, userId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default new TodoController(todoService);

