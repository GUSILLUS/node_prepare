import { NotFoundError, ForbiddenError } from 'http-error-classes';
import todoRepository from './repository.js';

class TodoService {
  constructor(repository) {
    this.repository = repository;
  }

  async getTodos(userId, { status, search } = {}) {
    let todos = await this.repository.findByUserId(userId);

    // Filter by status if provided
    if (status) {
      todos = todos.filter(todo => todo.status === status);
    }

    // Search in title or description
    if (search) {
      const searchLower = search.toLowerCase();
      todos = todos.filter(todo => 
        todo.title.toLowerCase().includes(searchLower) ||
        (todo.description && todo.description.toLowerCase().includes(searchLower))
      );
    }

    return todos;
  }

  async getTodoById(id, userId) {
    const todo = await this.repository.findById(id);

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    // Check if todo belongs to the user
    if (todo.userId !== userId) {
      throw new ForbiddenError('You do not have permission to access this todo');
    }

    return todo;
  }

  async createTodo(userId, todoData) {
    const newTodo = {
      ...todoData,
      userId,
      status: todoData.status || 'pending'
    };

    return await this.repository.create(newTodo);
  }

  async updateTodo(id, userId, todoData) {
    const existingTodo = await this.getTodoById(id, userId);

    const updatedData = {
      ...existingTodo,
      ...todoData,
      userId: existingTodo.userId, // Ensure userId doesn't change
      createdAt: existingTodo.createdAt // Preserve creation date
    };

    const { id: _, ...dataWithoutId } = updatedData;

    return await this.repository.update(id, dataWithoutId);
  }

  async patchTodo(id, userId, todoData) {
    const existingTodo = await this.getTodoById(id, userId);

    const updatedData = {
      ...existingTodo,
      ...todoData,
      userId: existingTodo.userId,
      createdAt: existingTodo.createdAt
    };

    const { id: _, ...dataWithoutId } = updatedData;

    return await this.repository.update(id, dataWithoutId);
  }

  async deleteTodo(id, userId) {
    const todo = await this.getTodoById(id, userId);
    
    await this.repository.delete(id);

    return { message: 'Todo deleted successfully', todo };
  }

  async toggleTodoStatus(id, userId) {
    const todo = await this.getTodoById(id, userId);
    
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    
    return await this.patchTodo(id, userId, { status: newStatus });
  }
}

export default new TodoService(todoRepository);

