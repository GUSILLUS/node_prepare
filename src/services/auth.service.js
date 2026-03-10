import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../users/repository.js';
import { SECRET_KEY } from '../middleware/auth.middleware.js';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '1d';

class AuthService {
  /**
   * Login: find user by email, verify password, return tokens and user
   */
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { id: user.id, type: 'refresh' },
      SECRET_KEY,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { token, refreshToken, user: userWithoutPassword };
  }

  /**
   * Register: hash password, create user via repository, then return tokens and user.
   */
  async register(userData) {
    const existing = await userRepository.findByEmail(userData.email);
    if (existing) {
      const error = new Error('User with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await userRepository.create({
      ...userData,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { id: user.id, type: 'refresh' },
      SECRET_KEY,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    const { password: __, ...userWithoutPassword } = user;
    return { token, refreshToken, user: userWithoutPassword };
  }

  /**
   * Refresh: verify refresh token and issue new access token.
   */
  async refreshAccessToken(refreshToken) {
    let payload;
    try {
      payload = jwt.verify(refreshToken, SECRET_KEY);
    } catch {
      const error = new Error('Invalid or expired refresh token');
      error.statusCode = 401;
      throw error;
    }

    if (payload.type !== 'refresh') {
      const error = new Error('Invalid refresh token');
      error.statusCode = 401;
      throw error;
    }

    const user = await userRepository.findById(payload.id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    const newRefreshToken = jwt.sign(
      { id: user.id, type: 'refresh' },
      SECRET_KEY,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    const { password: __, ...userWithoutPassword } = user;
    return { token, refreshToken: newRefreshToken, user: userWithoutPassword };
  }
}

export default new AuthService();
