import React, { useState } from 'react';

const ProjectList = ({ projects, onEdit, onDelete }) => {
    const [expandedProjectId, setExpandedProjectId] = useState(null);

    const toggleExpand = (projectId) => {
        if (expandedProjectId === projectId) {
            setExpandedProjectId(null);
        } else {
            setExpandedProjectId(projectId);
        }
    };

    return (
        <div className="mt-4">
            {projects.length === 0 ? (
                <p>No projects available</p>
            ) : (
                projects.map((project) => (
                    <div key={project._id} className="p-4 border mb-4 rounded">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold cursor-pointer" onClick={() => toggleExpand(project._id)}>{project.name}</h3>
                            <div className="flex space-x-2">
                                <button onClick={() => onEdit(project)} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
                                <button onClick={() => onDelete(project._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                            </div>
                        </div>
                        {expandedProjectId === project._id && (
                            <div>
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
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ProjectList;
