import React from 'react'
import PageLeftSide from './PageLeftSide'
import PageRightSide from './PageRightSide'
import { getAuthToken } from '../../utility/JWTtokenExport'
import { useNavigate } from 'react-router-dom'
import Login from '../Login'
const Home = () => {
  const navigate = useNavigate()
  const authtoken = getAuthToken()
  if (!authtoken) {
    return (<>
      
      <Login />
    </>

    )
  }
  return (
    <>

      <div className="flex m-5 p-5">
        <PageLeftSide />
        <PageRightSide />
      </div>

    </>
  )
}

export default Home