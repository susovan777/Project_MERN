import OrganizerRequest from '../models/OrganizerRequest.js';
import User from '../models/User.js';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Approve user as organizer directly (by user ID)
// @route   PUT /api/admin/users/:userId/approve-organizer
// @access  Private (Admin only)
export const approveUserAsOrganizer = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if user is already organizer or admin
    if (user.role === 'Organizer' || user.role === 'Admin') {
      return res.status(400).json({
        success: false,
        message: `User already has ${user.role} role`,
      });
    }

    // Update user role
    user.role = 'Organizer';
    await user.save();

    // Update any pending organizer request
    await OrganizerRequest.updateMany(
      { user: userId, status: 'Pending' },
      {
        status: 'Approved',
        reviewedBy: req.user._id,
        reviewedAt: Date.now(),
      }
    );

    res.status(200).json({
      success: true,
      message: 'User approved as Organizer',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Approve User As Organizer Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving user as organizer',
    });
  }
};

// @desc    Get all organizer requests
// @route   GET /api/admin/organizer-requests
// @access  Private (Admin only)
export const getOrganizerRequests = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status && ['Pending', 'Approved', 'Rejected'].includes(status)) {
      filter.status = status;
    }

    const requests = await OrganizerRequest.find(filter)
      .populate('user', 'name email avatar')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });

    // Return array directly to match test expectations
    res.status(200).json(requests);
  } catch (error) {
    console.error('Get Organizer Requests Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching organizer requests',
    });
  }
};

// @desc    Approve organizer request
// @route   PUT /api/admin/organizer-requests/:id/approve
// @access  Private (Admin only)
export const approveOrganizerRequest = async (req, res) => {
  try {
    const { adminComments } = req.body;

    const request = await OrganizerRequest.findById(req.params.id).populate(
      'user'
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Organizer request not found',
      });
    }

    if (request.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: `Request already ${request.status.toLowerCase()}`,
      });
    }

    // Update request
    request.status = 'Approved';
    request.reviewedBy = req.user._id;
    request.reviewedAt = Date.now();
    if (adminComments) {
      request.adminComments = adminComments;
    }
    await request.save();

    // Update user role
    const user = await User.findById(request.user._id);
    user.role = 'Organizer';
    await user.save();

    // Send email notification
    try {
      await sendEmail({
        email: user.email,
        subject: 'Organizer Request Approved - XEvents',
        message: `Hello ${
          user.name
        },\n\nCongratulations! Your request to become an organizer has been approved.\n\nYou can now create and manage events on XEvents.\n\n${
          adminComments ? `Admin Comments: ${adminComments}\n\n` : ''
        }Best regards,\nXEvents Team`,
      });
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // Continue even if email fails
    }

    res.status(200).json({
      success: true,
      message: 'Organizer request approved successfully',
      request,
    });
  } catch (error) {
    console.error('Approve Organizer Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving organizer request',
    });
  }
};

// @desc    Reject organizer request
// @route   PUT /api/admin/organizer-requests/:id/reject
// @access  Private (Admin only)
export const rejectOrganizerRequest = async (req, res) => {
  try {
    const { adminComments } = req.body;

    const request = await OrganizerRequest.findById(req.params.id).populate(
      'user'
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Organizer request not found',
      });
    }

    if (request.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: `Request already ${request.status.toLowerCase()}`,
      });
    }

    // Update request
    request.status = 'Rejected';
    request.reviewedBy = req.user._id;
    request.reviewedAt = Date.now();
    if (adminComments) {
      request.adminComments = adminComments;
    }
    await request.save();

    // Send email notification
    try {
      await sendEmail({
        email: request.user.email,
        subject: 'Organizer Request Update - XEvents',
        message: `Hello ${
          request.user.name
        },\n\nWe have reviewed your request to become an organizer.\n\nUnfortunately, your request has been declined at this time.\n\n${
          adminComments ? `Admin Comments: ${adminComments}\n\n` : ''
        }You can submit a new request after addressing the concerns.\n\nBest regards,\nXEvents Team`,
      });
    } catch (emailError) {
      console.error('Email notification error:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Organizer request rejected',
      request,
    });
  } catch (error) {
    console.error('Reject Organizer Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting organizer request',
    });
  }
};

// @desc    Get event registrations (Admin/Organizer)
// @route   GET /api/admin/events/:eventId/registrations
// @access  Private (Admin/Organizer)
export const getEventRegistrations = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check authorization - Admin or event organizer
    if (
      req.user.role !== 'Admin' &&
      event.organizer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view registrations for this event',
      });
    }

    const registrations = await Registration.find({ event: req.params.eventId })
      .populate('user', 'name email avatar')
      .sort({ registrationDate: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error('Get Event Registrations Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event registrations',
    });
  }
};
