import React, { useState } from 'react'
import LikesAndConnect from '../../../components/LikesAndConnect/LikesAndConnect'
import SortingNavbar from '../../../components/sortingNavbar/SortingNavbar'
import YourMatch from '../../../components/YourMatchs/YourMatch'
import { profileList } from '../../../components/data'

const ViewedMyProfile = () => {
    const [headingName,setHeadingName] = useState('Viewed My Profile')
    const [profileData, setProfileData] = useState(profileList)
  return (
    <>
    <SortingNavbar headingName={headingName}/> 
    <YourMatch profileData={profileData} headingName={headingName}/>
  </>
  )
}

export default ViewedMyProfile