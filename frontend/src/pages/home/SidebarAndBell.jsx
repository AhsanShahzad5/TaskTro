import React from 'react'
import bellicon from '../../assets/images/notificationBell.png'

import sideBar from '../../assets/images/sideBar.png'

const SidebarAndBell = ({style}) => {
  return (
    <>
    <div className = {`flex justify-center ${style}`} >

        <span> 
        <img src={bellicon} alt="bell" className='h-7 w-7  ml-1 mr-1 cursor-pointer' />
        </span>

        <span> 
        <img src={sideBar} alt="bell"  className='h-7 w-7 ml-1 mr-1 cursor-pointer'/>
        </span>

    </div>
    </>
  )
}

export default SidebarAndBell