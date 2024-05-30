import React from 'react';

const ProjectList = ({ projects }) => {
  return (
    <div className="mt-4">
      {projects.length === 0 ? (
        <p>No projects available</p>
      ) : (
        projects.map((project) => (
          <div key={project._id} className="p-4 border mb-4 rounded">
            <h3 className="text-xl font-bold">{project.name}</h3>
            <p>{project.description}</p>
            <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
            <div>
              <h4>Members:</h4>
              <ul>
                {project.members.map((member) => (
                  <li key={`${member.user._id}-${member.role}`}>{member.user.name} ({member.role})</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Tasks:</h4>
              <ul>
                {project.tasks.map((task) => (
                  <li key={task._id}>{task.title}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
