import app from './app.js';
import config from './config/config.js';
import connectDB from './config/db.js';

const port = config.PORT;

connectDB();

app.listen(port, () => {
  console.log('🚀 Server is running on port:', port);
});
