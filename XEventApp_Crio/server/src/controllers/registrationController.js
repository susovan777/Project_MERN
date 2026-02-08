import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Register for an event
// @route   POST /api/registration/:eventId
// @access  Private
export const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    // Check if event exists
    const event = await Event.findById(eventId).populate(
      'organizer',
      'name email'
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if event has reached max participants
    if (
      event.maxParticipants &&
      event.participants.length >= event.maxParticipants
    ) {
      return res.status(400).json({
        success: false,
        message: 'Event has reached maximum capacity',
      });
    }

    // Check if user is the organizer
    if (event.organizer._id.toString() === userId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Organizers cannot register for their own events',
      });
    }

    // Check if user already registered
    const existingRegistration = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (existingRegistration) {
      if (existingRegistration.status === 'Registered') {
        return res.status(400).json({
          success: false,
          message: 'You are already registered for this event',
        });
      } else if (existingRegistration.status === 'Cancelled') {
        // Re-register if previously cancelled
        existingRegistration.status = 'Registered';
        existingRegistration.registrationDate = Date.now();
        existingRegistration.cancelledAt = null;
        // existingRegistration.cancellationReason = null;
        await existingRegistration.save();

        // Add user back to event participants
        if (!event.participants.includes(userId)) {
          event.participants.push(userId);
          await event.save();
        }

        // Add event back to user's registered events
        const user = await User.findById(userId);
        if (!user.registeredEvents.includes(eventId)) {
          user.registeredEvents.push(eventId);
          await user.save();
        }

        return res.status(200).json({
          success: true,
          message: 'Registered successfully',
          registration: existingRegistration,
        });
      }
    }

    // Create new registration
    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });

    // Add user to event participants
    event.participants.push(userId);
    await event.save();

    // Add event to user's registered events
    const user = await User.findById(userId);
    user.registeredEvents.push(eventId);
    await user.save();

    // Send confirmation email
    try {
      await sendEmail({
        email: req.user.email,
        subject: `Registration Confirmed - ${event.title}`,
        message: `Hello ${
          req.user.name
        },\n\nYou have successfully registered for "${
          event.title
        }".\n\nEvent Details:\n- Date: ${new Date(
          event.startDate
        ).toLocaleDateString()}\n- Time: ${event.startTime}\n- Location: ${
          event.location
        }\n- Type: ${
          event.eventType
        }\n\nWe look forward to seeing you!\n\nBest regards,\nXEvents Team`,
      });
    } catch (emailError) {
      console.error('Registration email error:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Registered successfully',
      registration,
    });
  } catch (error) {
    console.error('Register Event Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering for event',
      error: error.message,
    });
  }
};

// @desc    Cancel event registration
// @route   DELETE /api/registration/:eventId
// @access  Private
export const cancelRegistration = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;
    // const { reason } = req.body;

    // Find registration
    const registration = await Registration.findOne({
      user: userId,
      event: eventId,
      status: 'Registered',
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found or already cancelled',
      });
    }

    // Get event details
    const event = await Event.findById(eventId).populate(
      'organizer',
      'name email'
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Update registration status
    registration.status = 'Cancelled';
    registration.cancelledAt = Date.now();
    // registration.cancellationReason = reason || 'No reason provided';
    await registration.save();

    // Remove user from event participants
    event.participants = event.participants.filter(
      (participantId) => participantId.toString() !== userId.toString()
    );
    await event.save();

    // Remove event from user's registered events
    const user = await User.findById(userId);
    user.registeredEvents = user.registeredEvents.filter(
      (eventId) => eventId.toString() !== event._id.toString()
    );
    await user.save();

    // Send cancellation email
    try {
      await sendEmail({
        email: req.user.email,
        subject: `Registration Cancelled - ${event.title}`,
        message: `Hello ${req.user.name},\n\nYour registration for "${event.title}" has been cancelled.\n\nIf this was a mistake, you can register again.\n\nBest regards,\nXEvents Team`,
      });

      // Notify organizer
      await sendEmail({
        email: event.organizer.email,
        subject: `Participant Cancelled - ${event.title}`,
        message: `Hello ${event.organizer.name},\n\n${req.user.name} has cancelled their registration for your event "${event.title}".\n\nBest regards,\nXEvents Team`,
      });
    } catch (emailError) {
      console.error('Cancellation email error:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Registration cancelled',
    });
  } catch (error) {
    console.error('Cancel Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling registration',
      error: error.message,
    });
  }
};

// @desc    Get user's registrations
// @route   GET /api/registration/my-registrations
// @access  Private
export const getMyRegistrations = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = { user: req.user._id };

    // Filter by status if provided
    if (status && ['Registered', 'Cancelled', 'Attended'].includes(status)) {
      filter.status = status;
    }

    const registrations = await Registration.find(filter)
      .populate({
        path: 'event',
        populate: {
          path: 'organizer',
          select: 'name email avatar',
        },
      })
      .sort({ registrationDate: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error('Get My Registrations Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message,
    });
  }
};

// @desc    Check if user is registered for an event
// @route   GET /api/registration/is-registered/:eventId
// @access  Private
export const isRegistered = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    const registration = await Registration.findOne({
      user: userId,
      event: eventId,
      status: 'Registered',
    });

    res.status(200).json({
      success: true,
      isRegistered: !!registration,
      registration: registration || null,
    });
  } catch (error) {
    console.error('Is Registered Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking registration status',
      error: error.message,
    });
  }
};
