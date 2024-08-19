import React from 'react';
import './ProfileCard.css';
import { LuMessageCircle } from "react-icons/lu";
import { AiOutlineLike } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import noUser from '../../assets/buddysHome/no image.webp'
const ProfileCard = ({profile}) => {
  console.log("profile list",profile);
  const getGenderAbbreviation = (gender) => {
    return gender === 'female' ? 'F' : 'M';
  };
  return (
    <>
        <div className="profileCardContainer3">
            <img src={noUser} alt="" className='profileCardimageContainer'/>
            <span className='profileCardOnlineTag'>Online</span>
            <div className="profileCardIcons">
            <span className='profileCardIcon'><AiOutlineLike /></span>
            <span className='profileCardIcon'><LuMessageCircle /></span>
            <span className='profileCardIcon'><SlOptionsVertical /></span>
            </div>
              <div className="profileCardNameAndAge">
                <span className="profileName">{profile.firstName} {profile.lastName}</span>
                <span className="profileAgeAndGender">{getGenderAbbreviation(profile.gender)} {profile.age} YRS</span>
              </div>
              <div className='profileDesignationAndPlaceContainer'>
                <span className="profileDesignationAndPlace">{profile.profession},{profile.district}</span>
                </div>  
        </div>
    </>
 
  );
};

export default ProfileCard;
