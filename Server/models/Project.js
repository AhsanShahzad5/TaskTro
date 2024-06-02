const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  members: [
    {
      email: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: 'Team Member',
      },
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'notes',
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
