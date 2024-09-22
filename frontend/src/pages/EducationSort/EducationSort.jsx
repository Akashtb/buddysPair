import React, { useContext, useEffect, useState } from 'react';
import BuddyTitleAndNotificationBar from '../../components/BuddyTitleBar/BuddyTitleAndNotificationBar';
import BuddysNavbar from '../../components/BuddysNavbar/BuddysNavbar';
import ProfileCard from '../../components/SortedProfileCard/SortedProfileCard';
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter';
import BuddyHomeSideBar from '../../components/BuddyHomeSideBar/BuddyHomeSideBar';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';

const EducationSort = () => {
    const [navPage, setNavPage] = useState('Designation');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [designationProfileList, setDesignationProfileList] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [noDataMessage, setNoDataMessage] = useState(false); // State for no data message

    const axiosPrivate = useAxiosPrivate();
    const { matrimonyProfileId } = useContext(IdContext);

    useEffect(() => {
        const designationProfiles = async () => {
            setLoading(true); 
            try {
                const response = await axiosPrivate.get(`/api/matrimony/profile/designationUsers/${matrimonyProfileId}`);
                setDesignationProfileList(response.data);
                // Check if there's no data
                setNoDataMessage(response.data.length === 0);
            } catch (error) {
                console.error('Error fetching designation profiles:', error);
                setNoDataMessage(true); // Set message if there's an error
            } finally {
                setLoading(false);
            }
        };
        designationProfiles();
    }, [axiosPrivate, matrimonyProfileId]);

    useEffect(() => {
        // Update noProfilesMessage when nearByProfileList changes
        setNoDataMessage(designationProfileList.length === 0);
      }, [designationProfileList]);

    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const toggleProfileOptions = () => setShowProfileOptions(!showProfileOptions);
    const toggleMenu = () => setShowMenu(!showMenu);

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
                        ) : noDataMessage ? (
                            <p style={{ textAlign: 'center', color: '#f78773', fontWeight: 'bold', width:"100%" }}>
                                No profiles found matching the criteria.
                            </p>
                        ) : (
                            designationProfileList.map((profile, index) => (
                                <ProfileCard
                                    key={index}
                                    profile={profile}
                                    designationProfileList={designationProfileList}
                                    setDesignationProfileList={setDesignationProfileList}
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
}

export default EducationSort;
