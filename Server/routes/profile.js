// profile.js (in routes/api)
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Profile = require('../models/Profile');

// Route to create or update profile
router.post('/', fetchuser, [
  body('intro', 'Introduction is required').not().isEmpty(),
  body('job', 'Current job is required').not().isEmpty(),
  body('designation', 'Designation is required').not().isEmpty(),
  body('company', 'Company is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { intro, job, designation, company } = req.body;
  const userId = req.user.id;

  try {
    let profile = await Profile.findOne({ user: userId });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: userId },
        { $set: { intro, job, designation, company } },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile({ user: userId, intro, job, designation, company });
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Route to get profile
router.get('/', fetchuser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.put('/', fetchuser, [
    body('intro', 'Introduction is required').not().isEmpty(),
    body('job', 'Job is required').not().isEmpty(),
    body('designation', 'Designation is required').not().isEmpty(),
    body('company', 'Company is required').not().isEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { intro, job, designation, company } = req.body;
    const userId = req.user.id;
  
    try {
      let profile = await Profile.findOne({ user: userId });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: userId },
          { $set: { intro, job, designation, company } },
          { new: true }
        );
        return res.json(profile);
      }
  
      profile = new Profile({ user: userId, intro, job, designation, company });
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
