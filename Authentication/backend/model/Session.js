import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'User is required'],
    },
    refreshToken: {
      type: String,
      required: [true, 'Refresh token is required'],
    },
    ip: {
      type: String,
      required: [true, 'ID address is required'],
    },
    userAgent: {
      type: String,
      required: [true, 'User agent is required'],
    },
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

// Hash refresh token before saving
sessionSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.refreshToken = await bcrypt.hash(this.refreshToken, salt);
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
