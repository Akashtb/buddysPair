import React, { useState } from 'react'
import BuddyTitleAndNotificationBar from '../../components/BuddyTitleBar/BuddyTitleAndNotificationBar'
import BuddysStory from '../../components/BuddysStory/BuddysStory'
import BuddysNavbar from '../../components/BuddysNavbar/BuddysNavbar'
import { profiles } from '../../components/data'
import ProfileCard from '../../components/SortedProfileCard/SortedProfileCard'
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter'

const QualificationSorting = () => {
  const [navPage,setNavPage] = useState('Qualification')
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
    <div className={`BuddyPairHomeContainer`}>
      <div className='BuddyPairHomeHeader'>
        <BuddyTitleAndNotificationBar
          showNotifications={showNotifications}
          toggleNotifications={toggleNotifications}
          showProfileOptions={showProfileOptions}
          toggleProfileOptions={toggleProfileOptions}
          showMenu={showMenu}
          toggleMenu={toggleMenu}
        />
        {/* <BuddysStory showNotifications={showNotifications}  showProfileOptions={showProfileOptions}/> */}
        <BuddysNavbar navPage={navPage} setNavPage={setNavPage} showNotifications={showNotifications}  showProfileOptions={showProfileOptions}/>
        <div className={`profileCardContainer2 ${showNotifications || showProfileOptions ||showMenu ? 'blur-background' : ''}`}>
          {profiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>
      </div>
      <div className={`BuddyHomeFooter ${showNotifications || showProfileOptions ||showMenu? 'blur-background' : ''}`}>
        <BuddyHomeFooter showProfileOptions={showProfileOptions}/>
      </div>
    </div>
  );
}

export default QualificationSorting