// src/components/Header.js
import { useContext, useEffect, useState } from 'react';
import './Header.css';
import { CiSearch } from "react-icons/ci";
import IdContext from '../../context/IdContext';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';

const Header = ({ title, profilePic, onProfilePicClick }) => {
  const [profileData,setProfileData]=useState({})
  const { matrimonyProfileId } = useContext(IdContext);
  const axiosPrivate = useAxiosPrivate()

  useEffect(()=>{
    const getProfile = async()=>{
      const profiledata = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${matrimonyProfileId}`)
      setProfileData(profiledata.data)
    }
    getProfile()

  },[])
  return (
    <div className="header">
      <span className='search'><CiSearch /></span>
      <div className="title-wrapper">
        <h1 className="title">{title}</h1>
      </div>
      {profilePic && (
        <div className="profile-pic-container" onClick={onProfilePicClick}>
          <img src={profileData?.profilePic} alt="Profile" className='profile-pic' />
        </div>
      )}
    </div>
  );
};

export default Header;
