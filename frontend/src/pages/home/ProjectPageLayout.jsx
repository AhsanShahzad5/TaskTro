import React from 'react'
import ProjectsCreation from './ProjectsCreation'
import PageLeftSide from './PageLeftSide'
import PageRightSide from './PageRightSide'


const ProjectPageLayout = () => {
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