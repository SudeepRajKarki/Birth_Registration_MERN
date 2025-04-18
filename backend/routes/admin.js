const express = require('express');
const BirthRegistration = require('../models/BirthRegistration');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const router = express.Router();

// Get all registrations (admin only)
router.get('/registrations', auth, adminOnly, async (req, res) => {
    try {
        const registrations = await BirthRegistration.find();
        res.json(registrations);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Approve registration
// Approve registration (admin only)
router.put('/approve/:id', auth, adminOnly, async (req, res) => {
    try {
        const registration = await BirthRegistration.findById(req.params.id);
        if (!registration) return res.status(404).json({ msg: 'Registration not found' });

        registration.status = 'approved'; // Use status field instead of approved
        await registration.save();
        res.json(registration);
    } catch (err) {
        console.error('Error approving registration:', err);
        res.status(500).send('Server error');
    }
});

// Decline registration
router.put('/decline/:id', auth, adminOnly, async (req, res) => {
    try {
        const registration = await BirthRegistration.findById(req.params.id);
        if (!registration) return res.status(404).json({ msg: 'Registration not found' });

        registration.status = 'declined'; // Use status field instead of approved
        await registration.save();
        res.json(registration);
    } catch (err) {
        console.error('Error declining registration:', err);
        res.status(500).send('Server error');
    }
});



module.exports = router;
