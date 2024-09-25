import React, { useContext, useEffect, useState } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import './titleandNotification.css';
import BuddyNotification from '../BuddyNotification/BuddyNotification';
import { FaBars } from "react-icons/fa6";
import BuddyHomeProfile from '../BuddysHomeProfile/BuddyHomeProfile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IdContext from '../../context/IdContext';
import { SocketMessageContext } from '../../context/SocketMessageContext';

const BuddyTitleAndNotificationBar = ({ showNotifications, toggleNotifications, showProfileOptions, toggleProfileOptions, showMenu, toggleMenu }) => {

    const navigate = useNavigate();
    const [profileDetails, setProfileDetails] = useState({});
    const { matrimonyProfileId } = useContext(IdContext);
    const { socketMessage, receivedRequest, acceptedRequest, rejectRequest } = useContext(SocketMessageContext)


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

    const showDot = socketMessage.length > 0 || receivedRequest.length > 0 || acceptedRequest.length > 0 || rejectRequest.length > 0;

    return (
        <div className='BuddyPairHomeHeaderTitleAndNotificationContainer'>
            <div className="BuddyPairHomeHeaderTitleAndNotification">
                <div className="headingAndBar">
                    <div className={`bar ${showNotifications || showProfileOptions || showMenu ? 'blur-background' : ''}`} onClick={toggleMenu}>
                        <FaBars />
                    </div>
                    <h1 className={`BuddyPairHomeHeaderTitle ${showNotifications || showProfileOptions || showMenu ? 'blur-background' : ''}`} onClick={RedirectedHomePage}>Buddy Pair</h1>
                </div>
                <div className={`profileAndNotification ${showProfileOptions || showMenu ? 'blur-background' : ''}`}>
                    <div className="BuddyPairHomeHeaderNotificationIcon" onClick={toggleNotifications}>
                        <IoIosNotificationsOutline />
                        {showDot && <span className='BuddyPairHomeHeaderNotificationIconDot'></span>}
                    </div>
                    <div className={`HeadingprofilePicContainer ${showNotifications || showMenu ? 'blur-background' : ''}`} onClick={toggleProfileOptions}>
                        <img src={profileDetails?.profilePic} alt="" className='HeadingProfilePic' />
                    </div>
                </div>
            </div>
            {showNotifications && <BuddyNotification />} {/* Render the notification component */}
            {showProfileOptions && <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} />}
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
