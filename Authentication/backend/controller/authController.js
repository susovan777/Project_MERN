import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import config from '../config/config.js';

/**
 * @desc  Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req, res) => {
  // Get data from request body
  const { username, email, password } = req.body;

  // Check if user already exists
  const isRegistered = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isRegistered) {
    res.status(409).json({
      success: true,
      message: 'Username is already registered',
    });
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
  });

  // Create a JWT using jwt.sign(payload, secret, expiration_time)
  const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIREIN,
  });

  res.status(201).json({
    success: true,
    message: 'User is registered successfully',
    user,
    accessToken,
  });
};

/**
 * @desc  Login user
 * @route POST /api/auth/login
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists (include password for comparison)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Create token
  const generateToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIREIN,
  });

  res.status(200).json({
    success: true,
    message: 'Logged in succesfully',
    user,
    generateToken,
  });
};
