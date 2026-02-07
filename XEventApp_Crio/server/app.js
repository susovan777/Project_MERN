import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './src/config/env.js';

const app = express();

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

export default app;
