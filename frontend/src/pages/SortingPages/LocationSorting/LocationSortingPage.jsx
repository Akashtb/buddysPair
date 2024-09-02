import React, { useContext, useEffect, useState } from 'react'
import YourMatch from '../../../components/YourMatchs/YourMatch'
import { profileList } from '../../../components/data'
import SortingNavbar from '../../../components/sortingNavbar/SortingNavbar'
import LikesAndConnect from '../../../components/LikesAndConnect/LikesAndConnect'
import BuddyHomeSideBar from '../../../components/BuddyHomeSideBar/BuddyHomeSideBar'
import BuddyHomeFooter from '../../../components/BuddyHomeFooter/BuddyHomeFooter'
import useAxiosPrivate from '../../../CustomApi/UseAxiosPrivate'
import IdContext from '../../../context/IdContext'

const LocationSortingPage = () => {
  const [headingName,setHeadingName] = useState('Matches')
  const [profileData, setProfileData] = useState(null)

  const axiosPrivate = useAxiosPrivate()
  const {matrimonyProfileId} = useContext(IdContext)
  console.log("matrimonyProfileId",matrimonyProfileId);
  
   useEffect(()=>{
    const sortedProfile = async()=>{
        try {
            const response = await axiosPrivate.get(`/api/matrimony/profile/sortedProfile/${matrimonyProfileId}`)
            console.log("sorted data is arrived",response.data);
            
            setProfileData(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    sortedProfile()
   },[matrimonyProfileId])

  return (
    <div className='DummyPageContainer'>
        <div className="titleAndNotificationBar">
        <SortingNavbar headingName={headingName}/> 
        <LikesAndConnect/>
        </div>

        <div className='DesktopViewContainer'>
            <div className='sideBarContainer'>
                <BuddyHomeSideBar />
            </div>
            <div className="buddyHomecontent">
            <YourMatch profileData={profileData}/>
            </div>

        </div>
        <div className='DummyPageContainerFooter'>
            <BuddyHomeFooter />
        </div>
    </div>
)
}

export default LocationSortingPage