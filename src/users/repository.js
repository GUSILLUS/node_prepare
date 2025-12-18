import fs from 'fs/promises';

class UserRepository {
  constructor(storagePath = 'src/storage/users.json') {
    this.storagePath = storagePath;
  }

  async findAll() {
    const usersFromDb = await fs.readFile(this.storagePath, 'utf8');
    return JSON.parse(usersFromDb).users;
  }

  async findById(id) {
    const users = await this.findAll();
    return users.find(user => user.id === id);
  }

  async findByEmail(email) {
    const users = await this.findAll();
    return users.find(user => user.email === email);
  }

  async create(user) {
    const users = await this.findAll();
    const newUser = { id: crypto.randomUUID(), ...user };

    await fs.writeFile(
      this.storagePath,
      JSON.stringify({ users: [...users, newUser] }, null, 2)
    );

    return newUser;
  }

  async update(id, userData) {
    const users = await this.findAll();
    const updatedUser = { id, ...userData };
    const updatedUsers = users.map(user => 
      user.id === id ? updatedUser : user
    );

    await fs.writeFile(
      this.storagePath,
      JSON.stringify({ users: updatedUsers }, null, 2)
    );

    return updatedUser;
  }

  async delete(id) {
    const users = await this.findAll();
    const updatedUsers = users.filter(user => user.id !== id);

    await fs.writeFile(
      this.storagePath,
      JSON.stringify({ users: updatedUsers }, null, 2)
    );

    return true;
  }
}

export default new UserRepository();

