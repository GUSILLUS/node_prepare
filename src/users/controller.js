import userService from './user.service.js';

class UserController {
  constructor(service) {
    this.service = service;
  }

  getUsers = async (req, res, next) => {
    try {
      const { name } = req.query;
      const users = await this.service.getUsers({ name });
      const total = users.length;

      res.json({ users, total });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.service.getUserById(id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const { name, email } = req.body;
      const user = await this.service.createUser({ name, email });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const user = await this.service.updateUser(id, { name, email });

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  patchUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      
      const userFields = Object.fromEntries(
        Object.entries({ name, email }).filter(([_, value]) => value !== undefined)
      );

      const user = await this.service.patchUser(id, userFields);

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.service.deleteUser(id);

      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController(userService);

