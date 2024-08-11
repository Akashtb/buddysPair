import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon
import { useNavigate } from 'react-router-dom';
import './BuddyHomeProfile.css';
import profilepic from '../../assets/buddysHome/propic1.jpg';

const BuddyHomeProfile = ({ toggleProfileOptions }) => {
  const navigate = useNavigate();

  return (
    <div className="buddyHomeProfile">
      <div className="buddyHomeProfileHeader">
        <div className='HeadingprofilePicContainer'>
          <img src={profilepic} alt="Profile" className="HeadingProfilePic" />
          <span className='onlineDot'></span>
        </div>
        <div className="buddyHomeProfileInfo">
          <h2>Stone Stellar</h2>
          <span>Prime Member</span>
          <span className="onlineStatus">Online</span>
        </div>
        <div className="closeButton" onClick={toggleProfileOptions}>
          &times;
        </div>
      </div>
      <div className="buddyHomeProfileOptions">
        <button >My Profile</button>
        <button onClick={() => navigate('/sent')}>Sent Request</button>
        <button onClick={() => navigate('/viewed')}>Viewed My Profile</button>
        <button onClick={() => navigate('/accept')}>Accept Request</button>
        <button onClick={() => navigate('/reject')}>Reject</button>
        <button onClick={() => navigate('/received')}>Received</button>
        <button onClick={() => navigate('/shortlistedby')}>Shortlisted By</button>
        <button onClick={() => navigate('/shortlist')}>Shortlist</button>
        <button onClick={() => navigate('/contacted')}>Contacted</button>
        <button onClick={() => navigate('/message')}>Message</button>
        <button >Settings</button>
        <button className="logoutButton">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default BuddyHomeProfile;
