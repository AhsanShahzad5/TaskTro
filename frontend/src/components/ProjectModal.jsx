import React, { useState, useEffect, useContext } from 'react';
import noteContext from '../context/notes/NotesContext';
import { getAuthToken } from "../utility/JWTtokenExport"; // 

const ProjectModal = ({ isOpen, onClose, onSave }) => {
  const context = useContext(noteContext);
  const { getUsers } = context;
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    deadline: '',
    members: [],
  });
  const token = getAuthToken();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [role, setRole] = useState('Team Member');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(token)
        const response = await fetch('http://localhost:5000/api/auth/getAllUsers', {
          method : 'GET' ,
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  const onChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const onAddMember = () => {
    const member = { user: selectedUser, role };
    setProjectData({ ...projectData, members: [...projectData.members, member] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      const data = await response.json();
      onSave(data);
      onClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-red-500">Create New Project</h2>
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
            <label className="block text-red-500">Add Member</label>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full p-2 border border-red-500 rounded">
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border border-red-500 rounded mt-2">
              <option value="Project Manager">Project Manager</option>
              <option value="Team Member">Team Member</option>
            </select>
            <button type="button" onClick={onAddMember} className="mt-2 bg-red-500 text-white p-2 rounded">Add Member</button>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black p-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-red-500 text-white p-2 rounded">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
