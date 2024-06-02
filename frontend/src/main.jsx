import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Signup from './pages/signup/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/home/Home.jsx'
import NotesState from './context/notes/NotesState.jsx'
import { ProjectsProvider } from './context/ProjectState.jsx';
import Pricing from './components/Pricing.jsx'
import Integrations from './components/Integrations.jsx'
import ProjectsCreation from './pages/home/ProjectsCreation.jsx'
import ProjectPageLayout from './pages/home/ProjectPageLayout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  } ,
  {
    path : "/pricing" ,
    element : <Pricing/>
  } ,
  {

    path : '/integrations' ,
    element : <Integrations/>
  } , 
  {
    path : '/projects' ,
    element : <ProjectPageLayout/>
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectsProvider>

      <NotesState>
        <RouterProvider router={router} />
      </NotesState>
    </ProjectsProvider>
  </React.StrictMode>,
)
