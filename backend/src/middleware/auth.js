import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { db } from '../config/db.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication token required'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = db.findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired user session'
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      fullName: user.full_name
    };
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token',
      details: err.message
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Administrator privileges required.'
    });
  }
  next();
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = db.findUserById(decoded.id);
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          fullName: user.full_name
        };
      }
    } catch {
      // Ignore token verification error for optional auth
    }
  }
  next();
};
