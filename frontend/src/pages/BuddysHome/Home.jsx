import React, { useState } from 'react';
import { IoIosNotificationsOutline, IoIosAdd } from "react-icons/io";
import propic from '../../assets/buddysHome/propic1.jpg';
import './home.css';
import BuddysNavbar from '../../components/BuddysNavbar/BuddysNavbar';
import BuddyTitleAndNotificationBar from '../../components/BuddyTitleBar/BuddyTitleAndNotificationBar';
import BuddysStory from '../../components/BuddysStory/BuddysStory';
import ProfileCard from '../../components/SortedProfileCard/SortedProfileCard';
import { profiles } from '../../components/data.js'; // Adjust the import path as needed
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter.jsx';
import BuddyHomeSideBar from '../../components/BuddyHomeSideBar/BuddyHomeSideBar.jsx';

const Home = () => {
  const [navPage, setNavPage] = useState('Near by');
  const [showNotifications, setShowNotifications] = useState(false);

  const [showProfileOptions, setShowProfileOPtions] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleProfileOptions = () => {
    setShowProfileOPtions(!showProfileOptions);
  };

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
      setShowMenu(!showMenu);
  };

  return (
    <div className='DummyPageContainer'>
        <div className="titleAndNotificationBar">
            <BuddyTitleAndNotificationBar
                showNotifications={showNotifications}
                toggleNotifications={toggleNotifications}
                showProfileOptions={showProfileOptions}
                toggleProfileOptions={toggleProfileOptions}
                showMenu={showMenu}
                toggleMenu={toggleMenu} />
        </div>

        <div className='DesktopViewContainer'>
            <div className='sideBarContainer'>
                <BuddyHomeSideBar />
            </div>
            <div className="buddyHomecontent">
                <div className='HomeNavbarContainer'>
                <BuddysNavbar navPage={navPage} setNavPage={setNavPage} showNotifications={showNotifications}  showProfileOptions={showProfileOptions}/>
                </div>
                <div className={`profileCardContainer2 ${showNotifications || showProfileOptions || showMenu ? 'blur-background' : ''}`}>
                    {profiles.map((profile, index) => (
                        <ProfileCard key={index} profile={profile} />
                    ))}
                </div>
            </div>

        </div>
        <div className='DummyPageContainerFooter'>
            <BuddyHomeFooter showProfileOptions={showProfileOptions} />
        </div>
    </div>
)
};

export default Home;
