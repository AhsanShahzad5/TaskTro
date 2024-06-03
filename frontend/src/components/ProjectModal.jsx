import React, { useState, useEffect } from 'react';
import { getAuthToken } from '../utility/JWTtokenExport';
import { useNavigate } from 'react-router-dom';
import ProjectTaskForm from './ProjectTaskForm';

const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    deadline: '',
    members: [],
    tasks: [],
    createdBy: '',
  });
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Team Member');
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const token = getAuthToken();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (project) {
      setProjectData(project);
      console.log('Project loaded:', project);
    } else {
      setProjectData((prevData) => ({
        ...prevData,
        createdBy: userId,
      }));
    }
  }, [project, userId]);

  const onChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const onAddMember = () => {
    const member = { email, role };
    setProjectData((prevData) => ({
      ...prevData,
      members: [...prevData.members, member],
    }));
    setEmail('');
    setRole('Team Member');
  };

  const onTaskSave = async (task) => {
    try {
      if (!projectData._id) {
        throw new Error('Project ID is undefined');
      }

      const method = task._id ? 'PUT' : 'POST';
      const url = task._id
        ? `http://localhost:5000/api/projects/${projectData._id}/tasks/${task._id}`
        : `http://localhost:5000/api/projects/${projectData._id}/tasks`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to save task');
      }

      const updatedProject = await response.json();
      // console.log('Updated Project:', updatedProject);

      setProjectData((prevData) => ({
        ...prevData,
        tasks: updatedProject.tasks,
      }));

      setTaskModalOpen(false);
      setSelectedTask(null); // Clear selectedTask after saving
     
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const onTaskDelete = async (taskId) => {
    try {
      if (!projectData._id) {
        throw new Error('Project ID is undefined');
      }

      const response = await fetch(
        `http://localhost:5000/api/projects/${projectData._id}/tasks/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      const updatedProject = await response.json();
      console.log('Updated Project after task deletion:', updatedProject);

      setProjectData((prevData) => ({
        ...prevData,
        tasks: updatedProject.tasks,
      }));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = project ? 'PUT' : 'POST';
      const url = project
        ? `http://localhost:5000/api/projects/${project._id}`
        : 'http://localhost:5000/api/projects';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      const data = await response.json();
      onSave(data);
      onClose();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="overflow-y-auto fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-red-500">{project ? 'Edit Project' : 'Create New Project'}</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-red-500">Project Name</label>
            <input
              type="text"
              name="name"
              value={projectData.name}
              onChange={onChange}
              className="w-full p-2 border border-red-500 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-500">Description</label>
            <input
              type="text"
              name="description"
              value={projectData.description}
              onChange={onChange}
              className="w-full p-2 border border-red-500 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-500">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={projectData.deadline}
              onChange={onChange}
              className="w-full p-2 border border-red-500 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-500">Add Members</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email"
              className="w-full p-2 border border-red-500 rounded mb-2"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-red-500 rounded"
            >
              <option value="Team Member">Team Member</option>
              <option value="Project Manager">Project Manager</option>
            </select>
            <button type="button" onClick={onAddMember} className="mt-2 bg-red-500 text-white p-2 rounded">Add Member</button>
          </div>
          <div>
            <h4 className="text-red-500">Tasks:</h4>
            {projectData.tasks.map((task, index) => (
              <div key={task._id || index} className="mb-2">
                <div className="flex justify-between items-center">
                  <div>{task.title}</div>
                  <div>
                    <button onClick={() => { setSelectedTask(task); setTaskModalOpen(true); }} className="bg-red-500 text-white p-1 rounded mr-2">Edit</button>
                    <button onClick={() => onTaskDelete(task._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => { setSelectedTask(null); setTaskModalOpen(true); }}
              className="mt-2 bg-red-500 text-white p-2 rounded"
              disabled={!projectData._id}
            >
              Add Task
            </button>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black p-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-red-500 text-white p-2 rounded">Save</button>
          </div>
        </form>
      </div>
      {taskModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <ProjectTaskForm
              task={selectedTask}
              onSave={onTaskSave}
              onDelete={() => onTaskDelete(selectedTask._id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal;
