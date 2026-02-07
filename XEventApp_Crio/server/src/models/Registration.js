import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Registered', 'Cancelled', 'Attended'],
      default: 'Registered',
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
    cancellationReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user can only register once for an event
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

// Index for querying user's registrations
registrationSchema.index({ user: 1, status: 1 });

// Index for querying event's registrations
registrationSchema.index({ event: 1, status: 1 });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
