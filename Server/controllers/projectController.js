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

    // Add project to each member's profile
    const memberPromises = project.members.map(async (member) => {
      await User.findByIdAndUpdate(member.user, { $addToSet: { projects: project._id } });
    });
    await Promise.all(memberPromises);

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

    await User.findByIdAndUpdate(userId, { $addToSet: { projects: projectId } });

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

    // Update the project fields
    const updatedProject = {
      name: name || project.name,
      description: description || project.description,
      deadline: deadline || project.deadline,
      members: members || project.members,
    };

    // Update the project in the database
    project = await Project.findByIdAndUpdate(req.params.id, { $set: updatedProject }, { new: true });

    
    // Log the updated project
    console.log('Project after update:', project);

    // Update members' profiles
    const oldMembers = project.members.map(member => member.user.toString());
    const newMembers = (members || project.members).map(member => member.user.toString());

    // Remove project from old members who are no longer part of the project
    const membersToRemove = oldMembers.filter(member => !newMembers.includes(member));
    const removePromises = membersToRemove.map(async (memberId) => {
      console.log('Removing project from member:', memberId);
      await User.findByIdAndUpdate(memberId, { $pull: { projects: project._id } });
    });

    // Add project to new members
    const membersToAdd = newMembers.filter(member => !oldMembers.includes(member));
    const addPromises = membersToAdd.map(async (memberId) => {
      console.log('Adding project to member:', memberId);
      await User.findByIdAndUpdate(memberId, { $addToSet: { projects: project._id } });
    });

    await Promise.all([...removePromises, ...addPromises]);

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

    // Remove project from all members' profiles
    const memberPromises = project.members.map(async (member) => {
      await User.findByIdAndUpdate(member.user, { $pull: { projects: project._id } });
    });
    await Promise.all(memberPromises);

    await Project.findByIdAndDelete(req.params.id);

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
