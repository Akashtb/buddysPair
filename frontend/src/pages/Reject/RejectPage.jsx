import  { useState } from 'react';
import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './RejectPage.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';

const RejectPage = () => {
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
        <Header title="Reject" />
        <div className="profilePicContainer" onClick={toggleProfileOptions}>
            <img src="assets/Images/propic1.jpg" alt="" className='profilePic' />
          </div>
        </div>
        <div className="user-list">
          {users.map(user => (
            <UserCard key={user.id} user={user} actions={[]} />
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

export default RejectPage;
