import React from 'react'
import AccountDropdown from './AccountDropdown'
import SidebarAndBell from './SidebarAndBell'
import AccountSidebar from './AccountSidebar'
const PageLeftSide = () => {
    return (
        <>
            <div id="mainContainer bg-white shadow-md">

                <div className="flex gap-2" id='upperDiv'>
                    <div id="upperDivLeftSide" className='relative'>
                        <AccountDropdown className='fixed z-10' />
                        <AccountSidebar className='' />
                    </div>
                    <SidebarAndBell style={"mb-5 mt-2.5"} />
                </div>
            </div>
        </>
    )
}

export default PageLeftSide
