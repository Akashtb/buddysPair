import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import BuddysNavbar from '../../components/BuddysNavbar/BuddysNavbar';
import BuddyTitleAndNotificationBar from '../../components/BuddyTitleBar/BuddyTitleAndNotificationBar';
import ProfileCard from '../../components/SortedProfileCard/SortedProfileCard';
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter.jsx';
import BuddyHomeSideBar from '../../components/BuddyHomeSideBar/BuddyHomeSideBar.jsx';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate.jsx';
import IdContext from '../../context/IdContext.jsx';

const Home = ({ socket }) => {
  const [navPage, setNavPage] = useState('Near by');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileOptions, setShowProfileOPtions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [nearByProfileList, setNearByProfileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noProfilesMessage, setNoProfilesMessage] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { setMatrimonyProfileId, setUserId } = useContext(IdContext);

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const response = await axiosPrivate.get('/api/auth/getIds');
        const { matrimonyId, userId } = response.data;
        setMatrimonyProfileId(matrimonyId);
        setUserId(userId);

        const getNearByProfileList = await axiosPrivate.get(`/api/matrimony/profile/nearbyUser/${matrimonyId}`);
        setNearByProfileList(getNearByProfileList.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIds();
  }, []);

  useEffect(() => {
    // Update noProfilesMessage when nearByProfileList changes
    setNoProfilesMessage(nearByProfileList.length === 0);
  }, [nearByProfileList]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleProfileOptions = () => {
    setShowProfileOPtions(!showProfileOptions);
  };

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
          toggleMenu={toggleMenu}
          socket={socket}
        />
      </div>

      <div className='DesktopViewContainer'>
        <div className={`sideBarContainer ${showNotifications || showProfileOptions || showMenu ? 'blur-background' : ''}`}>
          <BuddyHomeSideBar />
        </div>
        <div className="buddyHomecontent">
          <div className='HomeNavbarContainer'>
            <BuddysNavbar
              navPage={navPage}
              setNavPage={setNavPage}
              showNotifications={showNotifications}
              showProfileOptions={showProfileOptions}
            />
          </div>
          <div className={`profileCardContainer2 ${showNotifications || showProfileOptions || showMenu ? 'blur-background' : ''}`}>
            {loading ? (
              <div className="custom-loading-spinner">
                <div className="custom-spinner"></div>
              </div>
            ) : noProfilesMessage ? (
              <p style={{ textAlign: 'center', color: '#f78773', fontWeight: 'bold', width: "100%" }}>
                No profiles found matching the criteria.
              </p>
            ) : (
              nearByProfileList.map((profile, index) => (
                <ProfileCard
                  key={index}
                  profile={profile}
                  setNearByProfileList={setNearByProfileList}
                  nearByProfileList={nearByProfileList}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className={`DummyPageContainerFooter ${showNotifications || showProfileOptions || showMenu ? 'blur-background' : ''}`}>
        <BuddyHomeFooter showProfileOptions={showProfileOptions} />
      </div>
    </div>
  );
};

export default Home;
