import React, { useState } from 'react'
import { profileList } from '../../../components/data'
import SortingNavbar from '../../../components/sortingNavbar/SortingNavbar'
import LikesAndConnect from '../../../components/LikesAndConnect/LikesAndConnect'
import YourMatch from '../../../components/YourMatchs/YourMatch'

const DesignationSortingPage = () => {
    const [headingName,setHeadingName] = useState('Designation')
    const [profileData, setProfileData] = useState(profileList)
   
  return (
    <>
      <SortingNavbar headingName={headingName}/>
      <LikesAndConnect/>
      <YourMatch profileData={profileData}/>
    </>
  )
}

export default DesignationSortingPage