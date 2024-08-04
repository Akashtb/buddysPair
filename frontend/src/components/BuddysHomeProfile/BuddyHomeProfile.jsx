import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon
import './BuddyHomeProfile.css';
import profilepic from '../../assets/buddysHome/propic1.jpg';

const BuddyHomeProfile = ({ toggleProfileOptions }) => {
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
        <button>My Profile</button>
        <button>Sent Request</button>
        <button>Viewed My Profile</button>
        <button>Accept Request</button>
        <button>Reject</button>
        <button>Revived</button>
        <button>Shortlisted By</button>
        <button>Shortlisted</button>
        <button>Contacted</button>
        <button>Message</button>
        <button>Settings</button>
        <button className="logoutButton">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default BuddyHomeProfile;
