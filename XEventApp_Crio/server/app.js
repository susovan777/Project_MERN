import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './src/config/env.js';

const app = express();

app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan(config.NODE_ENV === 'production' ? 'compbined' : 'dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('👋 Hello from server');
});

// Not found
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
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
