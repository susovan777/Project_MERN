import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/user.routes.js';

const app = express();

// ___MIDDLEWARES___
app.use(express.json());
app.use(morgan('dev'));

// ___ROUTES___
app.get('/', (req, res) => {
  const welcome = '<h1>🙏 Welcome to Authentication Learning</h1>';
  res.send(welcome);
});

app.use('/api/auth', authRouter);

export default app;
