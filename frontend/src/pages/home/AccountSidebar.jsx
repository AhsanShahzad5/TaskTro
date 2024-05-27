import React, { useState } from 'react';

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
      <button className="flex items-center text-red-500 mb-6">
        <span> <AddTaskIcon/> </span>
        <span>Add task</span>
      </button>
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
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V5a2 2 0 00-2-2H6a2 2 0 00-2 2v8M4 13a4 4 0 004 4h8a4 4 0 004-4M4 13h16"></path>
  </svg>
);

const TodayIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M4 11h16M4 19h16a2 2 0 002-2v-5a2 2 0 00-2-2H4a2 2 0 00-2 2v5a2 2 0 002 2z"></path>
  </svg>
);

const UpcomingIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M12 6v6l3 3M5 8h.01M5 12h.01M5 16h.01M12 8h.01M12 12h.01M12 16h.01M19 8h.01M19 12h.01M19 16h.01M6 6H4a2 2 0 00-2 2v8a2 2 0 002 2h2m12-12h2a2 2 0 012 2v8a2 2 0 01-2 2h-2"></path>
  </svg>
);

const FiltersLabelsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 12H6M10 12a2 2 0 11-4 0M10 12a2 2 0 104 0m0 0h4M10 6H6M10 6a2 2 0 11-4 0M10 6a2 2 0 104 0m0 0h4M10 18H6M10 18a2 2 0 11-4 0M10 18a2 2 0 104 0m0 0h4"></path>
  </svg>
);

const AddTaskIcon = ()=>{
    return(

        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        
        )
    }
    
export default AccountSidebar;
