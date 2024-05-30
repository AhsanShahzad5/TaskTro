// routes/projects.js
const express = require('express');
const router = express.Router();
const { getProjects, createProject, addMember, assignTask } = require('../controllers/projectController');
const fetchuser = require('../middleware/fetchuser');

// Route to get all projects
router.get('/', fetchuser, getProjects);

// Route to create a new project
router.post('/', fetchuser, createProject);

// Route to add a member to a project
router.post('/:projectId/add-member', fetchuser, addMember);

// Route to assign a task to a project
router.post('/:projectId/assign-task', fetchuser, assignTask);

module.exports = router;
