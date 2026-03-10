import authService from '../services/auth.service.js';

class AuthController {
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      res.json({
        message: 'Login successful ✅',
        ...result
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const result = await authService.register(req.body);
      
      res.status(201).json({
        message: 'Registration successful ✅',
        ...result
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const { token: refreshToken } = req.body;
      const result = await authService.refreshAccessToken(refreshToken);
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();