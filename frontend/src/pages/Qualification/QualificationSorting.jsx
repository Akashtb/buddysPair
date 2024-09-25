import React, { useContext, useEffect, useState } from 'react';
import BuddyTitleAndNotificationBar from '../../components/BuddyTitleBar/BuddyTitleAndNotificationBar';
import BuddysNavbar from '../../components/BuddysNavbar/BuddysNavbar';
import ProfileCard from '../../components/SortedProfileCard/SortedProfileCard';
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter';
import BuddyHomeSideBar from '../../components/BuddyHomeSideBar/BuddyHomeSideBar';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';

const QualificationSorting = () => {
    const [navPage, setNavPage] = useState('Qualification');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [qulificationProfileList, setQualificationProfileList] = useState([])
    const [loading, setLoading] = useState(true); // Loading state
    const [noDataMessage, setNoDataMessage] = useState(false); // State for no data message


    const axiosPrivate = useAxiosPrivate();
    const { matrimonyProfileId } = useContext(IdContext);

    useEffect(() => {
        const qualificationProfiles = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axiosPrivate.get(`/api/matrimony/profile/qualicationUsers/${matrimonyProfileId}`);
                setQualificationProfileList(response.data);
            } catch (error) {
                console.error('Error fetching qualification profiles:', error);
            } finally {
                setLoading(false); // End loading
            }
        };
        qualificationProfiles();
    }, [axiosPrivate, matrimonyProfileId]);

    useEffect(() => {
        // Update noProfilesMessage when nearByProfileList changes
        setNoDataMessage(qulificationProfileList.length === 0);
      }, [qulificationProfileList]);

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
                            qulificationProfileList.map((profile, index) => (
                                <ProfileCard key={index} profile={profile} qulificationProfileList={qulificationProfileList} setQualificationProfileList={setQualificationProfileList} />

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

export default QualificationSorting;
