import React from 'react'
import PageLeftSide from './PageLeftSide'
import PageRightSide from './PageRightSide'

const Home = () => {
  return (
    <>
      
      <div className="flex m-5 p-5">
        <PageLeftSide/>
        <PageRightSide/>
      </div>
      
    </>
  )
}

export default Home