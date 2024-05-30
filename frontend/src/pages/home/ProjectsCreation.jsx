import React, { useState, useEffect } from 'react';
import ProjectModal from '../../components/ProjectModal';
import ProjectList from '../../pages/home/ProjectList';
import { MdArrowDropDown } from "react-icons/md";
import { getAuthToken } from "../../utility/JWTtokenExport"; // Import the utility function

const ProjectsCreation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const token = getAuthToken();

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/projects', {
              headers: {
                'Content-Type': 'application/json',
                'auth-token': token
              }
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProjects(data);
          } catch (error) {
            console.error('Failed to fetch projects:', error);
          }
        };
        fetchProjects();
      }, []);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveProject = (newProject) => {
        setProjects([...projects, newProject]);
    };
    return (
        <>
            <div className="mt-6 flex">
                <p className="text-red-500 font-bold cursor-pointer flex-grow">My Projects</p>
                <div className='cursor-pointer flex-shrink mt-1'>
                    <MdArrowDropDown />
                </div>
            </div>
            <div>
                <button onClick={openModal} className="cursor-pointer mt-5 bg-red-500 text-white p-2 rounded">Create New Project</button>
                <ProjectModal isOpen={isModalOpen} onClose={closeModal} onSave={saveProject} />
                <ProjectList projects={projects} />
            </div>
        </>
    )
}

export default ProjectsCreation