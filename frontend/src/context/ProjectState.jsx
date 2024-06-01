import React, { createContext, useReducer, useEffect } from 'react';
import { getAuthToken } from '../utility/JWTtokenExport'

// Define initial state
const initialState = {
  projects: [],
  selectedProject: null,
  isModalOpen: false,
  users: []
};

// Create context
const ProjectsContext = createContext(initialState);

// Reducer
const projectsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload
      };
    case 'SET_SELECTED_PROJECT':
      return {
        ...state,
        selectedProject: action.payload
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project._id === action.payload._id ? action.payload : project
        )
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload)
      };
    default:
      return state;
  }
};

// Provider component
const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);
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
        dispatch({ type: 'SET_PROJECTS', payload: data });
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getAllUsers', {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        });
        const data = await response.json();
        dispatch({ type: 'SET_USERS', payload: data });
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchProjects();
    fetchUsers();
  }, [token]);

  const toggleModal = () => {
    dispatch({ type: 'TOGGLE_MODAL' });
  };

  const setSelectedProject = (project) => {
    dispatch({ type: 'SET_SELECTED_PROJECT', payload: project });
  };

  const addProject = (project) => {
    dispatch({ type: 'ADD_PROJECT', payload: project });
  };

  const updateProject = (project) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: project });
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      dispatch({ type: 'DELETE_PROJECT', payload: projectId });
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects: state.projects,
        selectedProject: state.selectedProject,
        isModalOpen: state.isModalOpen,
        users: state.users,
        toggleModal,
        setSelectedProject,
        addProject,
        updateProject,
        deleteProject
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider, ProjectsContext };
