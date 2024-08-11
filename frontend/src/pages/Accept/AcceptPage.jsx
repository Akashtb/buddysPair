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
    { id: 1, name: 'Team Align', age: '27yrs', location: 'Kochi', avatar: 'assets/Images/propic1.jpg' },
    { id: 2, name: 'Jhon Abraham', age: '27yrs', location: 'Kochi', avatar: 'assets/Images/propic1.jpg' },
    // Add more users as needed
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  return (
    <div className="container">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
        <div className="activity-header">
          <Header title="Accept" />
          <div className="profilePicContainer" onClick={toggleProfileOptions}>
            <img src="assets/Images/propic1.jpg" alt="" className='profilePic' />
          </div>
        </div>
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

      {showProfileOptions && (
        <div className="profileOptionsContainer">
          <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} />
        </div>
      )}
    </div>
  );
};

export default AcceptPage;
