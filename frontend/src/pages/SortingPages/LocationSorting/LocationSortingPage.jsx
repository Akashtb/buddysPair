import React, { useContext, useEffect, useState } from 'react'
import YourMatch from '../../../components/YourMatchs/YourMatch'
import { profileList } from '../../../components/data'
import SortingNavbar from '../../../components/sortingNavbar/SortingNavbar'
import LikesAndConnect from '../../../components/LikesAndConnect/LikesAndConnect'
import BuddyHomeSideBar from '../../../components/BuddyHomeSideBar/BuddyHomeSideBar'
import BuddyHomeFooter from '../../../components/BuddyHomeFooter/BuddyHomeFooter'
import useAxiosPrivate from '../../../CustomApi/UseAxiosPrivate'
import IdContext from '../../../context/IdContext'
import { useLocation } from 'react-router-dom'

const LocationSortingPage = () => {
    const [headingName, setHeadingName] = useState('Matches')
    const [profileData, setProfileData] = useState(null)
    const location = useLocation();
    const { message } = location.state || {};
    const axiosPrivate = useAxiosPrivate()
    const { matrimonyProfileId } = useContext(IdContext)
    console.log("matrimonyProfileId", matrimonyProfileId);

    const [noMatchMessage, setNoMatchMessage] = useState(false); // State for no matching profiles

    useEffect(() => {
        const sortedProfile = async () => {
            try {
                let response;

                if (message === "Filter") {
                    response = await axiosPrivate.get(`/api/matrimony/profile/filter/${matrimonyProfileId}`);
                }

                else if (message === "Prefrence") {
                    response = await axiosPrivate.get(`/api/matrimony/profile/sortedProfile/${matrimonyProfileId}`);
                }


                if (response && response.data && response.data.length > 0) {
                    setProfileData(response.data);
                    setNoMatchMessage(false);
                } else {
                    setNoMatchMessage(true);
                    setProfileData([]);
                }
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setNoMatchMessage("An error occurred while fetching profiles");
            }
        };

        sortedProfile();
    }, [message, matrimonyProfileId]);

    console.log(noMatchMessage);


    return (
        <div className='DummyPageContainer'>
            <div className="titleAndNotificationBar">
                <SortingNavbar headingName={headingName} />
                <LikesAndConnect />
            </div>

            <div className='DesktopViewContainer'>
                <div className='sideBarContainer'>
                    <BuddyHomeSideBar />
                </div>

                <div className="buddyHomecontent">

                    <YourMatch profileData={profileData} />

                    {noMatchMessage && (
                        <p style={{ textAlign: 'center', color: '#f78773', fontWeight: 'bold' }}>
                            No matching profile is found.
                        </p>
                    )}
                </div>

            </div>
            <div className='DummyPageContainerFooter'>
                <BuddyHomeFooter />
            </div>
        </div>
    )
}

export default LocationSortingPage