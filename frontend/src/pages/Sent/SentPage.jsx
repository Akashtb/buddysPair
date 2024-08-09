import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter';
import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import RightSideBar from '../../components/Rightsidebar/Rightsidebar';
import './SentPage.css';

const SentPage = () => {
  const users = [
    { id: 1, name: 'Afrin Sabila', age: '27yrs', location: 'Kochi', time: 'Today 5:30pm', avatar: 'assets/Images/propic1.jpg' },
    { id: 2, name: 'Adil Adnan', age: '27yrs', location: 'Kochi', time: 'Today 5:30pm', avatar: 'assets/Images/propic1.jpg' },
    { id: 3, name: 'Bristy Haque', age: '27yrs', location: 'Kochi', time: 'Today 5:30pm', avatar: 'assets/Images/propic1.jpg' },
    { id: 4, name: 'John Borino', age: '27yrs', location: 'Kochi', time: 'Today 5:30pm', avatar: 'assets/Images/propic1.jpg' },
    { id: 5, name: 'Borsha Akther', age: '27yrs', location: 'Kochi', time: 'Today 5:30pm', avatar: 'assets/Images/propic1.jpg' },
    { id: 6, name: 'Sheik Sadi', age: '27yrs', location: 'Kochi', time: 'Today 5:30pm', avatar: 'assets/Images/propic1.jpg' },
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
        <Header title="Sent" />
        <div className="user-list">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              actions={[
                { className: 'remove-icon', icon: <ImCross /> },
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

export default SentPage;
