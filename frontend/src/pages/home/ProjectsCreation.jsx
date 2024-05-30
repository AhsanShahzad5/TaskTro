import React, { useContext } from 'react';
import ProjectModal from '../../components/ProjectModal';
import ProjectList from '../../pages/home/ProjectList';
import { MdArrowDropDown } from "react-icons/md";
import { ProjectsContext } from '../../context/ProjectState';

const ProjectsCreation = () => {
  const {
    projects,
    isModalOpen,
    selectedProject,
    toggleModal,
    setSelectedProject,
    addProject,
    updateProject,
    deleteProject
  } = useContext(ProjectsContext);

  const openModal = (project = null) => {
    setSelectedProject(project);
    toggleModal();
  };

  const closeModal = () => {
    setSelectedProject(null);
    toggleModal();
  };

  const saveProject = (savedProject) => {
    if (selectedProject) {
      updateProject(savedProject);
    } else {
      addProject(savedProject);
    }
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
        <button onClick={() => openModal()} className="cursor-pointer mt-5 bg-red-500 text-white p-2 rounded">Create New Project</button>
        <ProjectModal isOpen={isModalOpen} onClose={closeModal} onSave={saveProject} project={selectedProject} />
        <ProjectList projects={projects} onEdit={openModal} onDelete={deleteProject} />
      </div>
    </>
  );
};

export default ProjectsCreation;
