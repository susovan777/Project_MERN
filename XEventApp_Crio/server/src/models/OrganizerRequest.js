import mongoose from 'mongoose';

const organizerRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // A user can only have one pending request at a time
    },
    reason: {
      type: String,
      required: [true, 'Please provide a reason for the organizer request'],
      maxlength: [500, 'Reason cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    adminComments: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for filtering requests by status
organizerRequestSchema.index({ status: 1 });
organizerRequestSchema.index({ user: 1 });

const OrganizerRequest = mongoose.model(
  'OrganizerRequest',
  organizerRequestSchema
);

export default OrganizerRequest;
