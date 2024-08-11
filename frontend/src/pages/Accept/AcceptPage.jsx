// src/pages/AcceptPage/AcceptPage.js
import { useState } from 'react';
import { IoMdCall } from 'react-icons/io';
import { ImVideoCamera } from 'react-icons/im';

import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './AcceptPage.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';

const AcceptPage = () => {
  const users = [
    { id: 1, name: 'Align', age: '27yrs', location: 'Kochi', avatar: 'assets/Images/propic1.jpg' },
    { id: 2, name: 'Jhon Abraham', age: '27yrs', location: 'Kochi', avatar: 'assets/Images/propic1.jpg' },
    { id: 3, name: 'Brandon', age: '27yrs', location: 'Kochi', avatar: 'assets/Images/propic1.jpg' },
    { id: 4, name: 'Amina Mina', age: '27yrs', location: 'Kochi', avatar: 'assets/Images/propic1.jpg' },
    { id: 5, name: 'Raymond Hall', age: '27yrs', location: 'Kochi', avatar: 'assets/Images/propic1.jpg' },
    // Add more users as needed
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  // Sort users alphabetically and group by the first letter
  const groupedUsers = users.reduce((acc, user) => {
    const firstLetter = user.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  return (
    <div className="activitycontainer">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
        <div className="activity-header">
          <Header 
            title="Accept" 
            profilePic="assets/Images/propic1.jpg" 
            onProfilePicClick={toggleProfileOptions} 
          />
        </div>
        <div className="user-list">
          {Object.keys(groupedUsers).sort().map(letter => (
            <div key={letter}>
              <h2 className="letter-heading">{letter}</h2>
              {groupedUsers[letter].map(user => (
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
          ))}
        </div>
      </div>

      {showProfileOptions && (
        <div className="profileOptionsContainer">
          <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} />
        </div>
      )}
    </div>
  );
};

export default AcceptPage;
