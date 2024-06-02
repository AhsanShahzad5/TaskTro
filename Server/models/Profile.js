// Profile.js (in models)
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  intro: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
