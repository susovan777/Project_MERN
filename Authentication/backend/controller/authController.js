import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import config from '../config/config.js';
import Session from '../model/Session.js';

/**
 * @desc   Register a new user
 * @route  POST /api/auth/register
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

  // Create a refresh token using jwt.sign(payload, secret, expiration_time)
  const refreshToken = jwt.sign({ id: user._id }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRES_IN,
  });

  // Create a new session on register
  const session = await Session.create({
    userId: user._id,
    refreshToken,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  });

  // Create a access token
  const accessToken = jwt.sign(
    { id: user._id, sessionId: session._id },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIREIN,
    }
  );

  // Assigning refresh token in http-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    success: true,
    message: 'User is registered successfully',
    user,
    token: accessToken,
  });
};

/**
 * @desc   Login user
 * @route  POST /api/auth/login
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

  const refreshToken = jwt.sign({ id: user._id }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRES_IN,
  });

  // Create a new session on login
  const session = await Session.create({
    userId: user._id,
    refreshToken,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  });

  // Create token
  const accessToken = jwt.sign(
    { id: user._id, sessionId: session._id },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIREIN,
    }
  );

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

/**
 * @desc   Generate Refresh Token
 * @route  POST api/auth/refresh-token
 */
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

  // Assigning new refresh token in http-only cookie
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: 'Access token refreshed successfully',
    accessToken,
  });
};

/**
 * @desc   Logout User
 * @route  GET api/auth/logout
 */
export const logout = async (req, res) => {
  // Get the refresh token from cookie
  const getRefreshToken = req.cookies.refreshToken;

  // Decode the refresh token to get Id
  const decoded = jwt.verify(getRefreshToken, config.JWT_REFRESH_SECRET);

  // Find session with the same hashed refresh token
  const sessions = await Session.find({
    userId: decoded.id,
    revoked: false,
  });

  // Find the current session
  let currentSession;
  for (let session of sessions) {
    const isMatch = await bcrypt.compare(getRefreshToken, session.refreshToken);
    if (isMatch) {
      currentSession = session;
      break;
    }
  }

  // Change revoked to true and save
  currentSession.revoked = true;
  await currentSession.save();

  // Clear exisiting cookie
  res.clearCookie('refreshToken');

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
