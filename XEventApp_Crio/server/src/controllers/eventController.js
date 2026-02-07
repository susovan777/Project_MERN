import Event from '../models/Event.js';
import User from '../models/User.js';
import Registration from '../models/Registration.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Organizer/Admin)
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      eventType,
      category,
      maxParticipants,
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime ||
      !location ||
      !eventType ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date',
      });
    }

    if (start < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Event start date cannot be in the past',
      });
    }

    // Handle image upload
    let imageUrl = 'https://picsum.photos/800/400';
    if (req.file) {
      try {
        const result = await uploadToCloudinary(
          req.file.buffer,
          'xevents/events'
        );
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading event image',
        });
      }
    }

    // Create event
    const event = await Event.create({
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      eventType,
      category,
      image: imageUrl,
      organizer: req.user._id,
      maxParticipants: maxParticipants || null,
    });

    // Populate organizer details
    await event.populate('organizer', 'name email avatar');

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    console.error('Create Event Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating event',
      error: error.message,
    });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Organizer/Admin - own events only for organizers)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check authorization
    if (
      req.user.role !== 'Admin' &&
      event.organizer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event',
      });
    }

    const {
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      eventType,
      category,
      status,
      maxParticipants,
    } = req.body;

    // Validate dates if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start >= end) {
        return res.status(400).json({
          success: false,
          message: 'End date must be after start date',
        });
      }
    }

    // Update fields
    if (title) event.title = title;
    if (description) event.description = description;
    if (startDate) event.startDate = startDate;
    if (startTime) event.startTime = startTime;
    if (endDate) event.endDate = endDate;
    if (endTime) event.endTime = endTime;
    if (location) event.location = location;
    if (eventType) event.eventType = eventType;
    if (category) event.category = category;
    if (status) event.status = status;
    if (maxParticipants !== undefined) event.maxParticipants = maxParticipants;

    // Handle image upload
    if (req.file) {
      try {
        const result = await uploadToCloudinary(
          req.file.buffer,
          'xevents/events'
        );
        event.image = result.secure_url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading event image',
        });
      }
    }

    await event.save();
    await event.populate('organizer', 'name email avatar');

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event,
    });
  } catch (error) {
    console.error('Update Event Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating event',
      error: error.message,
    });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Organizer/Admin - own events only for organizers)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check authorization
    if (
      req.user.role !== 'Admin' &&
      event.organizer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event',
      });
    }

    // Delete all registrations for this event
    await Registration.deleteMany({ event: req.params.id });

    // Remove event from users' registeredEvents
    await User.updateMany(
      { registeredEvents: req.params.id },
      { $pull: { registeredEvents: req.params.id } }
    );

    // Delete the event
    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Delete Event Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting event',
      error: error.message,
    });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email avatar')
      .populate('participants', 'name email avatar');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Update status based on current date
    event.updateStatus();
    await event.save();

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error('Get Event Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: error.message,
    });
  }
};

// @desc    Get all events with pagination, search, and filters
// @route   GET /api/events
// @access  Public
export const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Search by title, description, or location
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { location: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by event type
    if (req.query.eventType) {
      query.eventType = req.query.eventType;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by location
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }

    // Filter by date range
    if (req.query.startDate) {
      query.startDate = { $gte: new Date(req.query.startDate) };
    }

    if (req.query.endDate) {
      query.endDate = { $lte: new Date(req.query.endDate) };
    }

    // Sorting
    let sortOptions = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      sortOptions[sortField] = sortOrder;
    } else {
      sortOptions = { startDate: 1 }; // Default: sort by start date ascending
    }

    // Execute query with pagination
    const events = await Event.find(query)
      .populate('organizer', 'name email avatar')
      .sort(sortOptions)
      .limit(limit)
      .skip(skip);

    // Get total count for pagination
    const totalEvents = await Event.countDocuments(query);
    const totalPages = Math.ceil(totalEvents / limit);

    res.status(200).json({
      success: true,
      events,
      page,
      totalPages,
      totalEvents,
      limit,
    });
  } catch (error) {
    console.error('Get All Events Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: error.message,
    });
  }
};

// @desc    Get all events by organizer (current user)
// @route   GET /api/events/organizer/get
// @access  Private (Organizer/Admin)
export const getOrganizerEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { organizer: req.user._id };

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Sorting
    let sortOptions = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      sortOptions[sortField] = sortOrder;
    } else {
      sortOptions = { createdAt: -1 }; // Default: sort by creation date descending
    }

    // Execute query
    const events = await Event.find(query)
      .populate('organizer', 'name email avatar')
      .sort(sortOptions)
      .limit(limit)
      .skip(skip);

    // Get total count
    const totalEvents = await Event.countDocuments(query);
    const totalPages = Math.ceil(totalEvents / limit);

    res.status(200).json({
      success: true,
      events,
      page,
      totalPages,
      totalEvents,
      limit,
    });
  } catch (error) {
    console.error('Get Organizer Events Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching organizer events',
      error: error.message,
    });
  }
};
