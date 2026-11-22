import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';
import { config } from '../config/env.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, username, fullName, college, gradYear, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
    }

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'An account with this email already exists' });
    }

    // Role default is 'student', allow 'admin' if explicit or for demo/seed
    const assignedRole = role === 'admin' ? 'admin' : 'student';

    const newUser = await db.createUser({
      email,
      username: username || email.split('@')[0],
      password,
      fullName: fullName || username,
      college,
      gradYear: gradYear ? parseInt(gradYear, 10) : undefined,
      role: assignedRole
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        fullName: newUser.full_name,
        role: newUser.role,
        college: newUser.college,
        gradYear: newUser.grad_year,
        streak: newUser.streak
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        role: user.role,
        college: user.college,
        gradYear: user.grad_year,
        streak: user.streak
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = db.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User profile not found' });
    }

    const progress = db.getUserProgress(user.id);

    return res.json({
      success: true,
      profile: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        role: user.role,
        college: user.college,
        gradYear: user.grad_year,
        streak: user.streak,
        createdAt: user.created_at
      },
      progress
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { fullName, college, gradYear } = req.body;
    const updated = db.updateUserProfile(req.user.id, {
      full_name: fullName,
      college,
      grad_year: gradYear
    });

    return res.json({
      success: true,
      user: {
        id: updated.id,
        email: updated.email,
        username: updated.username,
        fullName: updated.full_name,
        role: updated.role,
        college: updated.college,
        gradYear: updated.grad_year
      }
    });
  } catch (err) {
    next(err);
  }
};
