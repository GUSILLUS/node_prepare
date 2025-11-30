import { NotFoundError } from 'http-error-classes';
import userRepository from './repository.js';

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async getUsers({ name } = {}) {
    const users = await this.repository.findAll();

    if (name) {
      return users.filter(user => 
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return users;
  }

  async getUserById(id) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async createUser(userData) {
    return await this.repository.create(userData);
  }

  async updateUser(id, userData) {
    await this.getUserById(id);

    return await this.repository.update(id, userData);
  }

  async patchUser(id, userData) {
    const existingUser = await this.getUserById(id);
    const updatedData = { ...existingUser, ...userData };

    const { id: _, ...dataWithoutId } = updatedData;

    return await this.repository.update(id, dataWithoutId);
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    
    await this.repository.delete(id);

    return { message: 'User deleted successfully', user };
  }
}

export default new UserService(userRepository);

