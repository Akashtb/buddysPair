import React, { useState } from 'react'
import YourMatch from '../../../components/YourMatchs/YourMatch'
import { profileList } from '../../../components/data'
import SortingNavbar from '../../../components/sortingNavbar/SortingNavbar'
import LikesAndConnect from '../../../components/LikesAndConnect/LikesAndConnect'

const LocationSortingPage = () => {
  const [headingName,setHeadingName] = useState('Location')
  const [profileData, setProfileData] = useState(profileList)

  return (
    <>
    <SortingNavbar headingName={headingName}/> 
    <LikesAndConnect/>
    <YourMatch profileData={profileData}/>
  </>
  )
}

export default LocationSortingPage