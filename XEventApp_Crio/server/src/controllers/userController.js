import User from '../models/User.js';
import OrganizerRequest from '../models/OrganizerRequest.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// @desc    Request for Organizer role
// @route   POST /api/users/request-organizer
// @access  Private (Participant only)
export const requestOrganizerRole = async (req, res) => {
  try {
    const { reason } = req.body;

    // Validation
    if (!reason || reason.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a reason for the organizer request',
      });
    }

    // Check if user is already an organizer or admin
    if (req.user.role === 'Organizer' || req.user.role === 'Admin') {
      return res.status(400).json({
        success: false,
        message: `You already have ${req.user.role} role`,
      });
    }

    // Check if user already has a pending request
    const existingRequest = await OrganizerRequest.findOne({
      user: req.user._id,
      status: 'Pending',
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending organizer request',
      });
    }

    // Create organizer request
    const organizerRequest = await OrganizerRequest.create({
      user: req.user._id,
      reason,
    });

    res.status(201).json({
      success: true,
      message: 'Organizer request submitted successfully',
      request: organizerRequest,
    });
  } catch (error) {
    console.error('Request Organizer Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting organizer request',
      error: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update fields
    if (name) user.name = name;
    if (email && email !== user.email) {
      // Check if email is already taken
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
      user.email = email;
      user.isEmailVerified = false; // Reset verification if email changed
    }

    // Handle avatar upload if file is provided
    if (req.file) {
      try {
        const result = await uploadToCloudinary(
          req.file.buffer,
          'xevents/avatars'
        );
        user.avatar = result.secure_url;
      } catch (uploadError) {
        console.error('Avatar upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading avatar',
        });
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      'registeredEvents',
      'title startDate location status'
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
    });
  }
};
