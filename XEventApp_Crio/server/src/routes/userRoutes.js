import express from 'express';
import {
  requestOrganizerRole,
  updateProfile,
  getProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/roleAuth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', upload.single('avatar'), updateProfile);

// Organizer request (Participants only)
router.post(
  '/request-organizer',
  authorize('Participant'),
  requestOrganizerRole
);

export default router;
