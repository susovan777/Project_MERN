import express from 'express';
import {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  isRegistered,
} from '../controllers/registrationController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Registration routes
router.post('/:eventId', registerForEvent);
router.delete('/:eventId', cancelRegistration);
router.get('/my-registrations', getMyRegistrations);
router.get('/is-registered/:eventId', isRegistered);

export default router;
