const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Auth routes connect
const authRoutes = require('../server/routes/auth');
app.use('/api/auth', authRoutes);

// Trainers routes connect kar rahe hain
const trainersRoutes = require('../server/routes/trainers');
app.use('/api/trainers', trainersRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running! Welcome to FitTrack Pro API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

