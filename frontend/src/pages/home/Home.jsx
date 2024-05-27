import React from 'react'
import PageLeftSide from './PageLeftSide'
import PageRightSide from './PageRightSide'

const Home = () => {
  return (
    <>
      <div>Home</div>
      <div className="flex">
        <PageLeftSide/>
        <PageRightSide/>
      </div>
      <p>bye</p>
    </>
  )
}

export default Home