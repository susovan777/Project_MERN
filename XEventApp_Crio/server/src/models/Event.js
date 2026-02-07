import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide an event description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date'],
    },
    startTime: {
      type: String,
      required: [true, 'Please provide a start time'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    endTime: {
      type: String,
      required: [true, 'Please provide an end time'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
      trim: true,
    },
    eventType: {
      type: String,
      enum: ['Online', 'Offline'],
      required: [true, 'Please specify event type'],
    },
    image: {
      type: String,
      default: 'https://picsum.photos/800/400',
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed'],
      default: 'Upcoming',
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Conference',
        'Workshop',
        'Webinar',
        'Meetup',
        'Seminar',
        'Training',
        'Hackathon',
        'Festival',
        'Other',
        'Test',
      ],
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    maxParticipants: {
      type: Number,
      default: null, // null means unlimited
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
eventSchema.index({ title: 'text', description: 'text', location: 'text' });

// Index for filtering
eventSchema.index({ category: 1, status: 1, eventType: 1 });
eventSchema.index({ startDate: 1 });
eventSchema.index({ organizer: 1 });

// Virtual for checking if event is full
eventSchema.virtual('isFull').get(function () {
  if (!this.maxParticipants) return false;
  return this.participants.length >= this.maxParticipants;
});

// Method to update event status based on dates
eventSchema.methods.updateStatus = function () {
  const now = new Date();
  const startDateTime = new Date(this.startDate);
  const endDateTime = new Date(this.endDate);

  if (now < startDateTime) {
    this.status = 'Upcoming';
  } else if (now >= startDateTime && now <= endDateTime) {
    this.status = 'Ongoing';
  } else {
    this.status = 'Completed';
  }

  return this.status;
};

const Event = mongoose.model('Event', eventSchema);

export default Event;
