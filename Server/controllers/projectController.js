const Project = require('../models/Project');
const User = require('../models/User');
const Note = require('../models/Note');
// const { get } = require('../routes/project');

// Helper function to validate email format
const validateEmail = (email) => {
  // Allow empty or placeholder emails to pass
  if (!email || email === 'placeholder@') return true;
  
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};


// Get all projects for a user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ 'createdBy': req.user.id })
      .populate('members.email', 'name') // Assuming email is used as the identifier for members
      .populate('tasks'); // Assuming 'Note' is the correct model for tasks
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
    const formattedMembers = Array.isArray(members) ? members : [{ email: members, role: 'Team Member' }];

    const validatedMembers = formattedMembers.map((member) => {
      if (!validateEmail(member.email)) {
        throw new Error(`Invalid email format: ${member.email}`);
      }
      return { email: member.email, role: member.role };
    });

    const newProject = new Project({
      name,
      description,
      deadline,
      members: validatedMembers,
      createdBy: req.user.id, // Ensure createdBy is set to the current user ID
    });

    const project = await newProject.save();

    const user = await User.findById(req.user.id);
    user.projects.push(project._id);
    await user.save();

    res.json(project);
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
};

// Add a member to a project
const addMember = async (req, res) => {
  const { projectId } = req.params;
  const { email, role } = req.body;
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }

    project.members.push({ email, role });
    await project.save();

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

// Update an existing project
const updateExistingProject = async (req, res) => {
  const { name, description, deadline, members } = req.body;
  try {
    let project = await Project.findById(req.params.id);
    console.log('Project before update:', project); // Logging the project before update

    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // Validate email format for each member
    const updatedMembers = members.map((member) => {
      if (!validateEmail(member.email)) {
        throw new Error(`Invalid email format: ${member.email}`);
      }
      return { email: member.email, role: member.role };
    });

    // Update the project fields
    const updatedProject = {
      name: name || project.name,
      description: description || project.description,
      deadline: deadline || project.deadline,
      members: updatedMembers || project.members,
    };

    // Update the project in the database
    project = await Project.findByIdAndUpdate(req.params.id, { $set: updatedProject }, { new: true });

    // Log the updated project
    console.log('Project after update:', project);

    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: 'Project not found' });

    await Project.findByIdAndDelete(req.params.id);

    // Remove the project from the user's projects array
    const user = await User.findById(project.createdBy);
    user.projects = user.projects.filter(projectId => projectId.toString() !== req.params.id);
    await user.save();

    res.json({ msg: 'Project removed' });
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
  updateExistingProject,
  deleteProject,
};
