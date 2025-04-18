const express = require('express');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported
const router = express.Router();
const auth = require('../middleware/auth');  // Import the authentication middleware
const User = require('../models/User'); // Assuming you have a User model


const jwt = require('jsonwebtoken');  // Add this for token handling

// Delete account route
router.delete('/delete-account', auth, async (req, res) => {
  try {
    // Find the user by ID (stored in req.user after successful authentication)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(req.user.id);

    res.json({ msg: 'Account deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate a new JWT token after successful authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email'); // Change username to name
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json({ name: user.name, email: user.email }); // Return 'name' instead of 'username'
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
