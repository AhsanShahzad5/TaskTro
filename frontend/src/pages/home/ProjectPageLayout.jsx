import React from 'react'
import ProjectsCreation from './ProjectsCreation'
import PageLeftSide from './PageLeftSide'
import PageRightSide from './PageRightSide'
import { getAuthToken } from '../../utility/JWTtokenExport'
import Login from '../Login'
import { useNavigate } from 'react-router-dom'


const ProjectPageLayout = () => {
const token = getAuthToken()
const navigate = useNavigate()

  if (!token) {
    return (<>
     {navigate('/login')}
      <Login />
    </>

    )
  }
  return (
    <>
        <div className="flex m-5 p-5">
        <PageLeftSide link= "/home" page = "Tasks" />
        <ProjectsCreation/>
      </div>
    </>
  )
}

export default ProjectPageLayout