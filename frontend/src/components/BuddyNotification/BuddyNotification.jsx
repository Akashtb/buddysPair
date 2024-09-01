import React from 'react';
import './BuddyNotification.css';
import BuddyNotifications from '../BuddyNotifications/BuddyNotifications';

const BuddyNotification = ({socket}) => {
    return (
        <div className='notification-container'>
            <div className="notification-subcontainer">
                <BuddyNotifications socket={socket}/>
            </div>
        </div>
    );
};

export default BuddyNotification;
