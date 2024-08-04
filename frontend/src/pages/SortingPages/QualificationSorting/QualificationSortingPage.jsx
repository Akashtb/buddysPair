import React, { useState } from 'react'
import SortingNavbar from '../../../components/sortingNavbar/SortingNavbar'
import LikesAndConnect from '../../../components/LikesAndConnect/LikesAndConnect'
import YourMatch from '../../../components/YourMatchs/YourMatch'
import { profileList } from '../../../components/data'
const QualificationSortingPage = () => {
  const [headingName,setHeadingName] = useState('Qualification')
  const [profileData, setProfileData] = useState(profileList)
  console.log(profileData);
  return (
    <>
      <SortingNavbar headingName={headingName}/>
      <LikesAndConnect/>
      <YourMatch profileData={profileData}/>
    </>
  )
}
 
export default QualificationSortingPage