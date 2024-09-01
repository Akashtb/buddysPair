import React, { useContext, useEffect, useState } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import './titleandNotification.css';
import BuddyNotification from '../BuddyNotification/BuddyNotification';
import { FaBars } from "react-icons/fa6";
import BuddyHomeProfile from '../BuddysHomeProfile/BuddyHomeProfile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IdContext from '../../context/IdContext';

const BuddyTitleAndNotificationBar = ({ showNotifications, toggleNotifications, showProfileOptions, toggleProfileOptions, showMenu, toggleMenu, socket }) => {
    console.log("socket in BuddyTitleAndNotificationBar", socket);


    const navigate = useNavigate();
    const [profileDetails, setProfileDetails] = useState({});
    const { matrimonyProfileId } = useContext(IdContext);

    const RedirectedHomePage = () => {
        navigate('/buddysHomePage');
    };

    useEffect(() => {
        const fetchProfileDetails = async () => {
            const response = await axios.get(`http://localhost:8003/api/matrimony/profile/getProfile/${matrimonyProfileId}`);
            setProfileDetails(response.data);
        };
        fetchProfileDetails();
    }, [matrimonyProfileId]);

    return (
        <div className='BuddyPairHomeHeaderTitleAndNotificationContainer'>
            <div className="BuddyPairHomeHeaderTitleAndNotification">
                <div className="headingAndBar">
                    <div className={`bar ${showNotifications || showProfileOptions || showMenu ? 'blur-background' : ''}`} onClick={toggleMenu}>
                        <FaBars />
                    </div>
                    <h1 className={`BuddyPairHomeHeaderTitle ${showNotifications || showProfileOptions || showMenu ? 'blur-background' : ''}`} onClick={RedirectedHomePage}>Buddy Pair</h1>
                </div>
                <div className={`profileAndNotification ${showNotifications || showProfileOptions || showMenu ? 'blur-background' : ''}`}>
                    <div className="BuddyPairHomeHeaderNotificationIcon" onClick={toggleNotifications}>
                        <IoIosNotificationsOutline />
                        <span className='BuddyPairHomeHeaderNotificationIconDot'></span>
                    </div>
                    <div className="HeadingprofilePicContainer" onClick={toggleProfileOptions}>
                        <img src={profileDetails?.profilePic} alt="" className='HeadingProfilePic' />
                    </div>
                </div>
            </div>
            {showNotifications && <BuddyNotification socket={socket} />} {/* Render the notification component */}
            {showProfileOptions && <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} socket={socket} />}
            {showMenu && (
                <div className="menuOverlay">
                    <ul className="menuList">
                        <button className="closeMenu" onClick={toggleMenu}>&times;</button>
                        <li>Dating</li>
                        <li className="selected">Matrimony</li>
                        <li>E-commerce</li>
                        <li>Study Abroad</li>
                        <li>Job Portal</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BuddyTitleAndNotificationBar;
