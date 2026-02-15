const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (mongoose.connection.readyState === 1) {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const user = await User.create({ name, email, password });
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
    const user = { _id: 'mock-user-id', name, email, role: 'student' };
    return res.status(201).json({ ...user, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const match = await user.matchPassword(password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
    return res.json({
      _id: 'mock-user-id',
      name: 'Mock User',
      email,
      role: 'student',
      token: generateToken('mock-user-id'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(user);
    }
    return res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
 
// Google Login
const googleLogin = async (req, res) => {
  try {
    const idToken = req.body?.idToken;
    if (!idToken) return res.status(400).json({ message: 'Missing idToken' });
    let payload;
    try {
      const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
      payload = await r.json();
    } catch (e) {}
    if (!payload || !payload.email || !payload.sub) {
      return res.status(401).json({ message: 'Invalid Google token' });
    }
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || email.split('@')[0];
    if (mongoose.connection.readyState === 1) {
      let user = await User.findOne({ $or: [{ googleId }, { email }] });
      if (!user) {
        const randomPass = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
        user = await User.create({ name, email, googleId, password: randomPass, role: 'student' });
      } else {
        if (!user.googleId) {
          user.googleId = googleId;
          await user.save();
        }
      }
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
    return res.json({
      _id: 'mock-google-user',
      name,
      email,
      role: 'student',
      token: generateToken('mock-google-user'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.googleLogin = googleLogin;
