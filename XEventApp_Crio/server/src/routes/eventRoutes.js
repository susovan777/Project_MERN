import express from 'express';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  getOrganizerEvents,
} from '../controllers/eventController.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/roleAuth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes - Organizer/Admin only
router.post(
  '/',
  protect,
  authorize('Organizer', 'Admin'),
  upload.single('image'),
  createEvent
);

router.put(
  '/:id',
  protect,
  authorize('Organizer', 'Admin'),
  upload.single('image'),
  updateEvent
);

router.delete('/:id', protect, authorize('Organizer', 'Admin'), deleteEvent);

// Get organizer's own events
router.get(
  '/organizer/get',
  protect,
  authorize('Organizer', 'Admin'),
  getOrganizerEvents
);

export default router;
