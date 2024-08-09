import React from 'react';
import './Rightsidebar.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { PiSignOutBold } from 'react-icons/pi';

const RightSideBar = () => {
  return (
    <div className="right-sidebar-content">
      <div className="profile-header">
        <img className="profile-picture" src="assets/Images/propic1.jpg" alt="Profile" />
        <div className="profile-info">
          <h6>Stone Stellar</h6>
          <p>Prime Member</p>
          <p>Online</p>
        </div>
      </div>
      <ul className="menu">
        <li>My Profile</li>
        <li>Sent Request</li>
        <li>Viewed My Profile</li>
        <li>Accept Request</li>
        <li>Reject</li>
        <li>Recieved</li>
        <li>Shortlisted By</li>
        <li>Shortlisted</li>
        <li>Contacted</li>
        <li>Message</li>
        <li>Settings</li>
      </ul>
      <div className="logout">
        <button>
        <PiSignOutBold  className="logouticon" />Logout</button>
      </div>
    </div>
  );
};

export default RightSideBar;
