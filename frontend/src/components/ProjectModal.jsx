import React, { useState, useEffect, useContext } from 'react';
import { ProjectsContext } from '../context/ProjectState';
import { getAuthToken } from '../utility/JWTtokenExport';
import { useNavigate } from 'react-router-dom';

const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const { users } = useContext(ProjectsContext);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    deadline: '',
    members: [],
  });
  const [selectedUser, setSelectedUser] = useState('');
  const [role, setRole] = useState('Team Member');
  const token = getAuthToken();
  const navigate = useNavigate()
  useEffect(() => {
    if (project) {
      setProjectData(project);
    }
  }, [project]);

  const onChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const onAddMember = () => {
    const member = { user: selectedUser, role };
    setProjectData({ ...projectData, members: [...projectData.members, member] });
    setSelectedUser('');
    setRole('Team Member');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = project ? 'PUT' : 'POST';
      const url = project ? `http://localhost:5000/api/projects/${project._id}` : 'http://localhost:5000/api/projects';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
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

const renderHome = ()=>{
    navigate('/home')
}

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-red-500">{project ? 'Edit Project' : 'Create New Project'}</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-red-500">Project Name</label>
            <input type="text" name="name" value={projectData.name} onChange={onChange} className="w-full p-2 border border-red-500 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-red-500">Description</label>
            <input type="text" name="description" value={projectData.description} onChange={onChange} className="w-full p-2 border border-red-500 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-red-500">Deadline</label>
            <input type="date" name="deadline" value={projectData.deadline} onChange={onChange} className="w-full p-2 border border-red-500 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-red-500">Add Members</label>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full p-2 border border-red-500 rounded">
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.email}</option>
              ))}
            </select>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border border-red-500 rounded mt-2">
              <option value="Team Member">Team Member</option>
              <option value="Project Manager">Project Manager</option>
            </select>
            <button type="button" onClick={onAddMember} className="mt-2 bg-red-500 text-white p-2 rounded">Add Member</button>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black p-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-red-500 text-white p-2 rounded " onClick={renderHome}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
