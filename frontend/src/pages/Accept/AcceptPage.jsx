import React, { useState } from 'react';
import { IoMdCall } from 'react-icons/io';
import { ImVideoCamera } from 'react-icons/im';
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter';
import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import RightSideBar from '../../components/Rightsidebar/Rightsidebar';
import './AcceptPage.css';

const AcceptPage = () => {
  const users = [
    { id: 1, name: 'Team Align', age: '27yrs', location: 'Kochi', avatar: 'assets/Images/propic1.jpg' },
    { id: 2, name: 'Jhon Abraham', age: '27yrs', location: 'Kochi', avatar: 'assets/Images/propic1.jpg' },
    // Add more users as needed
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <div className="sidebar-toggle-button" onClick={toggleSidebar}>
        ☰
      </div>
      <div className="leftsidebar"><BuddyHomeFooter /></div>
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
        <Header title="Accept" />
        <div className="user-list">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              actions={[
                { className: 'call-icon', icon: <IoMdCall /> },
                { className: 'video-icon', icon: <ImVideoCamera /> },
              ]}
            />
          ))}
        </div>
      </div>
      <div className={`right-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <RightSideBar />
      </div>
    </div>
  );
};

export default AcceptPage;
