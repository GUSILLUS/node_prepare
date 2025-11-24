
import userRepository from './user.repository.js';

const usersRoutes = {
  getUsers: async (req, res, next) => {
    try {
      const { name } = req.query;
      const users = await userRepository.getUsers({ name });

      const total = users.length;

      res.json({ users, total });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userRepository.findUserById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { name, email } = req.body;

      const user = await userRepository.createUser({ name, email });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await userRepository.updateUser(id, { name, email });

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  patchUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name = undefined, email = undefined } = req.body;

      const userFields = Object.fromEntries(Object.entries({ name, email }).filter(([_, value]) => value !== undefined));

      const user = await userRepository.patchUser(id, userFields);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await userRepository.deleteUser(id);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

export default usersRoutes;