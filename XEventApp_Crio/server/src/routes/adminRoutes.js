import express from 'express';
import {
  getOrganizerRequests,
  approveOrganizerRequest,
  rejectOrganizerRequest,
  getEventRegistrations,
} from '../controllers/adminController.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/roleAuth.js';

const router = express.Router();

// All admin routes require authentication and Admin role
router.use(protect);
router.use(authorize('Admin'));

// Organizer request management
router.get('/organizer-requests', getOrganizerRequests);
router.put('/organizer-requests/:id/approve', approveOrganizerRequest);
router.put('/organizer-requests/:id/reject', rejectOrganizerRequest);

// Event registrations (also accessible by organizer for their events)
router.get('/events/:eventId/registrations', getEventRegistrations);

export default router;
