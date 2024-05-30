// controllers/projectController.js
const Project = require('../models/Project');
const User = require('../models/User');
const Note = require('../models/Note');

// Get all projects for a user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ 'members.user': req.user.id })
      .populate('members.user', 'name')
      .populate('tasks');
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Create a new project
const createProject = async (req, res) => {
  const { name, description, deadline, members } = req.body;
  try {
    const newProject = new Project({
      name,
      description,
      deadline,
      members,
    });

    const project = await newProject.save();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Add a member to a project
const addMember = async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;
  try {
    const project = await Project.findById(projectId);
    const user = await User.findById(userId);

    if (!project || !user) {
      return res.status(404).json({ msg: 'Project or User not found' });
    }

    project.members.push({ user: userId, role });
    await project.save();

    user.projects.push(projectId);
    await user.save();

    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Assign a task to a project
const assignTask = async (req, res) => {
  const { projectId } = req.params;
  const { taskId } = req.body;
  try {
    const project = await Project.findById(projectId);
    const task = await Note.findById(taskId);

    if (!project || !task) {
      return res.status(404).json({ msg: 'Project or Task not found' });
    }

    project.tasks.push(taskId);
    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getProjects,
  createProject,
  addMember,
  assignTask,
};
