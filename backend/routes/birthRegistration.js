const express = require('express');
const BirthRegistration = require('../models/BirthRegistration');
const auth = require('../middleware/auth');
const router = express.Router();

// Get registrations for the logged-in user
router.get('/my-registrations', auth, async (req, res) => {
    try {
        const registrations = await BirthRegistration.find({ user: req.user });
        res.json(registrations);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// Register Birth
router.post('/', auth, async (req, res) => {
    const { childName, dateOfBirth, placeOfBirth, fatherName, motherName } = req.body;
  
    try {
      const registration = new BirthRegistration({
        user: req.user.id,
        childName,
        dateOfBirth,
        placeOfBirth,
        fatherName,
        motherName,
      });
  
      await registration.save();
      res.json(registration);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  // In your birth-registration routes (e.g., routes/birth-registration.js)

router.delete('/:id', auth, async (req, res) => {
  try {
    const registration = await BirthRegistration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).json({ msg: 'Registration not found' });
    }
    res.json({ msg: 'Registration deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

  

module.exports = router;