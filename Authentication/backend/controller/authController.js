import jwt from 'jsonwebtoken';
import userModel from '../model/User.js';
import config from '../config/config.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isRegistered) {
    res.status(409).json({
      message: 'Username is already registered',
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  // jwt.sign(payload, secret, expiration_time)
  const generateToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIREIN,
  });

  res.status(201).json({
    message: 'User is registered successfully',
    user,
    generateToken,
  });
};
