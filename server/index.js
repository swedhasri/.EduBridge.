const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB(); // Safe: db.js logs errors and does not exit on failure

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});
app.use(cors());
app.use(express.json());

// Serve static assets (MOVED UP)
const staticPath = path.resolve(__dirname, '../client/dist');
console.log('Serving static files from:', staticPath);
app.use(express.static(staticPath));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Serve static assets
// app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all for SPA
app.use((req, res) => {
  console.log('Catch-all hit for:', req.url);
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Keep process alive
setInterval(() => { }, 1000);
