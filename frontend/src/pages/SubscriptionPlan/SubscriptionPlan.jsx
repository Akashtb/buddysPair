import React, { useState } from 'react';
import './SubscriptionPlan.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter';
import Header from '../../components/NotifyHeader/Header';
import RightSideBar from '../../components/Rightsidebar/Rightsidebar';

const SubscriptionPlan = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="subscription-container">
      <div className="sidebar-toggle-button" onClick={toggleSidebar}>
        ☰
      </div>
      <div className="leftsidebar"><BuddyHomeFooter /></div>
      <div className={`subscription-main ${isSidebarOpen ? 'blur' : ''}`}>
        <Header title="Subscription Plan" />
        <div className="subscription-content">
          <div className="plan-card">
            <h2>Prime Member</h2>
            <p className="price">₹49/month</p>
            <div className="limits">
              <h3>
                <FontAwesomeIcon icon={faCheckCircle} className="sub-icon-tick" />
                Daily Limits
              </h3>
              <ul>
                <li>View up to 15 profiles per day</li>
                <li>Send up to 15 requests per day</li>
              </ul>
              <hr />
              <h3>
                <FontAwesomeIcon icon={faCheckCircle} className="sub-icon-tick" />
                Weekly Limits
              </h3>
              <ul>
                <li>View up to 90 profiles per week</li>
                <li>Send up to 90 requests per week</li>
              </ul>
              <hr />
              <h3>
                <FontAwesomeIcon icon={faCheckCircle} className="sub-icon-tick" />
                Monthly Limits
              </h3>
              <ul>
                <li>View up to 300 profiles per month</li>
                <li>Send up to 300 requests per month</li>
              </ul>
            </div>
            <hr />
            <div className="premium-features">
              <h3>
                <FontAwesomeIcon icon={faCheckCircle} className="sub-icon-tick" />
                Premium Features
              </h3>
              <ul>
                <li>Unlock Unlimited Messages</li>
                <li>Unlock Shortlist Page</li>
                <li>View Profiles Who Shortlisted You</li>
                <li>Sort & filter Profiles</li>
              </ul>
            </div>
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>
      </div>
      <div className={`right-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <RightSideBar />
      </div>
    </div>
  );
};

export default SubscriptionPlan;
