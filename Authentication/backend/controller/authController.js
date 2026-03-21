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
    token: accessToken,
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
  const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIREIN,
  });

  const refreshToken = jwt.sign({ id: user._id }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRES_IN,
  });

  // Assigning refresh token in http-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: 'Logged in succesfully',
    user,
    accessToken,
  });
};

export const refreshToken = (req, res) => {
  // Get refresh token from cookie
  const getRefreshToken = req.cookies.refreshToken;

  // Decode the refresh token to get Id
  const decoded = jwt.verify(getRefreshToken, config.JWT_REFRESH_SECRET);

  // Create a new access token
  const accessToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIREIN,
  });

  // Create a new refresh token
  const newRefreshToken = jwt.sign(
    { id: decoded._id },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    }
  );

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 1000, // 7 days
  });

  console.log(decoded);

  res.status(200).json({
    success: true,
    message: 'Access token refreshed successfully',
    accessToken,
  });
};
