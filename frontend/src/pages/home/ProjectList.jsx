import React, { useState, useEffect } from 'react';

const ProjectList = ({ projects, onEdit, onDelete }) => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const toggleExpand = (projectId) => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(projectId);
    }
  };

  useEffect(() => {
    console.log('Projects:', projects);
  }, [projects]);

  return (
    <div className="mt-4">
      {(!projects || projects.length === 0) ? (
        <p>No projects available</p>
      ) : (
        projects.map((project) => (
          <div key={project._id} className="p-4 border mb-4 rounded">
            <div className="flex justify-between items-center">
              <h3
                className="text-xl font-bold cursor-pointer"
                onClick={() => toggleExpand(project._id)}
              >
                {project.name || 'Unnamed Project'}
              </h3>
              <div className="flex space-x-2">
                <button onClick={() => onEdit(project)} className="bg-yellow-500 text-white p-1 rounded">
                  Edit
                </button>
                <button onClick={() => onDelete(project._id)} className="bg-red-500 text-white p-1 rounded">
                  Delete
                </button>
              </div>
            </div>
            {expandedProjectId === project._id && (
              <div>
                <p>{project.description || 'No description available'}</p>
                <p>Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline'}</p>
                <div>
                  <h4>Members:</h4>
                  <ul>
                    {project.members && project.members.length > 0 ? (
                      project.members.map((member, index) => (
                        <li key={`${member.user?._id}-${index}`}>
                          {console.log('Member:', member)} 
                          {member?.email || 'Unknown User'} ({member.role || 'No role specified'})
                        </li>
                      ))
                    ) : (
                      <li>No members</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h4>Tasks:</h4>
                  <ul>
                    {project.tasks && project.tasks.length > 0 ? (
                      project.tasks.map((task, index) => (
                        <li key={`${task._id}-${index}`}>{task.title || 'Untitled Task'}</li>
                      ))
                    ) : (
                      <li>No tasks</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
