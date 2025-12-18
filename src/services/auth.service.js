import authService from '../services/auth.service.js';

class AuthController {
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      // Store refresh token in HttpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,       // Can't be accessed by JavaScript (XSS protection)
        secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
        sameSite: 'strict',   // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
      });
      
      // Only return access token and user in body
      res.json({
        message: 'Login successful ✅',
        token: result.token,
        user: result.user
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const result = await authService.register(req.body);
      
      // No refresh token on registration (optional - you decide)
      res.status(201).json({
        message: 'Registration successful ✅',
        token: result.token,
        user: result.user
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      // Get refresh token from cookie instead of body
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not found' });
      }
      
      const result = await authService.refreshAccessToken(refreshToken);
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      // Clear the refresh token cookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      res.json({ message: 'Logout successful ✅' });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();