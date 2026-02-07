import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './src/config/env.js';
import errorHandler from './src/middlewares/errorHandler.js';
import startEventStatusCron from './src/utils/eventStatusCron.js';

// Route imports
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import registrationRoutes from './src/routes/registrationRoutes.js';

const app = express();

// Start cron jobs
startEventStatusCron();

// Middlewares
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan(config.NODE_ENV === 'production' ? 'compbined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registration', registrationRoutes);

// Health check route
app.get('/health', (req, res) => {
  // res.status(200).send('👋 Hello from server');
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Not found
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Server error',
    ...(config.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

app.use(errorHandler);

export default app;
