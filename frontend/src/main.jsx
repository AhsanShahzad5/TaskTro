import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Signup from './pages/signup/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/home/Home.jsx'
import NotesState from './context/notes/NotesState.jsx'

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
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotesState>
      <RouterProvider router={router} />
    </NotesState>
  </React.StrictMode>,
)
