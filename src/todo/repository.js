import fs from 'fs/promises';

class TodoRepository {
  constructor(storagePath = 'src/storage/todos.json') {
    this.storagePath = storagePath;
  }

  async findAll() {
    const todosFromDb = await fs.readFile(this.storagePath, 'utf8');
    return JSON.parse(todosFromDb).todos;
  }

  async findById(id) {
    const todos = await this.findAll();
    return todos.find(todo => todo.id === id);
  }

  async findByUserId(userId) {
    const todos = await this.findAll();
    return todos.filter(todo => todo.userId === userId);
  }

  async create(todo) {
    const todos = await this.findAll();
    const newTodo = { 
      id: crypto.randomUUID(), 
      ...todo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await fs.writeFile(
      this.storagePath,
      JSON.stringify({ todos: [...todos, newTodo] }, null, 2)
    );

    return newTodo;
  }

  async update(id, todoData) {
    const todos = await this.findAll();
    const updatedTodo = { 
      id, 
      ...todoData,
      updatedAt: new Date().toISOString()
    };
    const updatedTodos = todos.map(todo => 
      todo.id === id ? updatedTodo : todo
    );

    await fs.writeFile(
      this.storagePath,
      JSON.stringify({ todos: updatedTodos }, null, 2)
    );

    return updatedTodo;
  }

  async delete(id) {
    const todos = await this.findAll();
    const updatedTodos = todos.filter(todo => todo.id !== id);

    await fs.writeFile(
      this.storagePath,
      JSON.stringify({ todos: updatedTodos }, null, 2)
    );

    return true;
  }
}

export default new TodoRepository();

