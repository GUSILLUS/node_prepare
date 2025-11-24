import { createUser, deleteUser, getUserById, getUsersList, patchUser, updateUser } from "./service.js";

class UserRepository {
  async getUsers(params = {}) {
    return getUsersList(params);
  }

  async createUser(user) {
    return createUser(user);
  }

  async updateUser(id, user) {
    return updateUser(id, user);
  }

  async patchUser(id, user) {
    return patchUser(id, user);
  }

  async deleteUser(id) {
    return deleteUser(id);
  }

  async findUserById(id) {
    return getUserById(id);
  }
}

export default new UserRepository();