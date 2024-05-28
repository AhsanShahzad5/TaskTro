import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddTask from '../../components/AddTask';
import Tasks from './Tasks';

const PageRightSide = () => {
  const navigate = useNavigate();


  const CreateTaskButton = () => {
    return (
      <>
        <div className="text-red-500 inline-flex ml-10 mt-3 h-fit cursor-pointer ">
          <div className="text-red-500 flex flex-col w-fit">
            <Tasks />
          </div>

        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex">

        <CreateTaskButton />
        {/* <Tasks/> */}
      </div>
    </>
  )
}

export default PageRightSide




