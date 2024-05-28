import React, { useState } from 'react';

import { CiInboxIn } from "react-icons/ci";
import { CgCalendarToday } from "react-icons/cg"
import { FaCalendarAlt } from "react-icons/fa";
import { TbFilterSearch } from "react-icons/tb";
const AccountSidebar = ({className}) => {
  const [selected, setSelected] = useState('');

  const menuItems = [
    { name: 'Inbox', count: 1, icon: InboxIcon },
    { name: 'Today', count: 0, icon: TodayIcon },
    { name: 'Upcoming', count: 0, icon: UpcomingIcon },
    { name: 'Filters & Labels', count: 0, icon: FiltersLabelsIcon },
  ];

  return (
    <div className={`w-64 h-screen p-4  ${className}`}>
      
      <div className="space-y-2">
        {menuItems.map(item => (
          <div
            key={item.name}
            className={`flex justify-between items-center p-2 hover:bg-red-100 rounded-md cursor-pointer ${selected === item.name ? 'bg-red-100 text-red-500' : 'text-gray-600'}`}
            onClick={() => setSelected(item.name)}
          >
            <span className="flex items-center">
              <item.icon className={`w-6 h-6 mr-2 ${selected === item.name ? 'text-red-500' : 'text-gray-600'}`} />
              {item.name}
            </span>
            {item.count > 0 && (
              <span className={`text-sm ${selected === item.name ? 'text-red-500' : 'text-gray-600'}`}>
                {item.count}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <span className="text-gray-500">My Projects</span>
      </div>
    </div>
  );
};

const InboxIcon = ({ className }) => (
  <div className="mr-2">
    <CiInboxIn />
  </div>
);

const TodayIcon = ({ className }) => (
  <div className="mr-2">
    <CgCalendarToday/>
  </div>
);

const UpcomingIcon = ({ className }) => (
  <div className="mr-2">
    <FaCalendarAlt/>
  </div>
);

const FiltersLabelsIcon = () => (
  <div className="mr-2">
    
  <TbFilterSearch />
  </div>

);

    
export default AccountSidebar;
