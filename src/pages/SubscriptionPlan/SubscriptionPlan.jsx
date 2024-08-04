import React from 'react';
import './SubscriptionPlan.css';
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SubscriptionPlan = () => {
  return (
    <div className="subscription-page">
      <div className="subscription-plan">
        <header className="subscription-header">
          <h1>Subscription Plan</h1>
        </header>
        <main className="subscription-content">
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
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SubscriptionPlan;
