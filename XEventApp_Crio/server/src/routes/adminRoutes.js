import express from 'express';
import {
  getOrganizerRequests,
  approveOrganizerRequest,
  rejectOrganizerRequest,
  getEventRegistrations,
  approveUserAsOrganizer,
} from '../controllers/adminController.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/roleAuth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Admin-only routes
router.get('/organizer-requests', authorize('Admin'), getOrganizerRequests);
router.put(
  '/organizer-requests/:id/approve',
  authorize('Admin'),
  approveOrganizerRequest
);
router.put(
  '/organizer-requests/:id/reject',
  authorize('Admin'),
  rejectOrganizerRequest
);

// Approve user as organizer directly by user ID
router.put(
  '/users/:userId/approve-organizer',
  authorize('Admin'),
  approveUserAsOrganizer
);

// Event registrations (Admin and Organizer can access)
router.get(
  '/events/:eventId/registrations',
  authorize('Admin', 'Organizer'),
  getEventRegistrations
);

export default router;
