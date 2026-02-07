import app from './app.js';
import { config } from './src/config/env.js';
import { connectDB } from './src/config/db.js';

const port = config.PORT; // <--- 🚩 Semicolon must here

// Immediately Invoked Function Expression (IIFE)
(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log('🚀 Server started at port:', port);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
})();
