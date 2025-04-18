const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your React app
    credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const birthRegistrationRoutes = require('./routes/birthRegistration');
const adminRoutes = require('./routes/admin');

// Route mounting
app.use('/api/auth', authRoutes); // includes register, login, forgot-password, reset-password
app.use('/api/user', userRoutes);
app.use('/api/birth-registration', birthRegistrationRoutes);
app.use('/api/admin', adminRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Birth Registration App');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
