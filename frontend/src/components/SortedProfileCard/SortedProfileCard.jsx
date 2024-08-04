import React from 'react';
import './ProfileCard.css';
import img2 from '../../assets/buddysHome/img2.webp'
import { LuMessageCircle } from "react-icons/lu";
import { AiOutlineLike } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { profiles } from '../data.js';
const ProfileCard = ({profile}) => {
  return (
    <>
        <div className="profileCardContainer3">
            <img src={profile.image} alt="" className='profileCardimageContainer'/>
            <span className='profileCardOnlineTag'>Online</span>
            <div className="profileCardIcons">
            <span className='profileCardIcon'><AiOutlineLike /></span>
            <span className='profileCardIcon'><LuMessageCircle /></span>
            <span className='profileCardIcon'><SlOptionsVertical /></span>
            </div>
              <div className="profileCardNameAndAge">
                <span className="profileName">Sithara Nair</span>
                <span className="profileAgeAndGender">F 22 YRS</span>
              </div>
              <div className='profileDesignationAndPlaceContainer'>
                <span className="profileDesignationAndPlace">Software Engineer,Hydrabad</span>
                </div>  
        </div>
    </>
 
  );
};

export default ProfileCard;
