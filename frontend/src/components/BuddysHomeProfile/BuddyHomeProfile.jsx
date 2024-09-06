import React, { useContext, useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon
import { useNavigate } from 'react-router-dom';
import './BuddyHomeProfile.css';
import profilepic from '../../assets/buddysHome/propic1.jpg';
import IdContext from '../../context/IdContext';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
 
const BuddyHomeProfile = ({ toggleProfileOptions,socket }) => {
  console.log("socket in homeProfile",socket);
  
  const navigate = useNavigate();

  const {setMatrimonyProfileId,matrimonyProfileId,setUserId} = useContext(IdContext)
  const [profileDetails,setProfileDetails] = useState({})
  const { setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate()

  
  const handleLogout = async () => {
    try {
     const response = await axiosPrivate.post('/api/auth/logout');
     console.log(response.data);
     if(response.status===200){
      localStorage.removeItem('MatrimonyProfileId');
      localStorage.removeItem('userId');

      setMatrimonyProfileId(null);
      setUserId(null);
      setAuth({});
      navigate('/login');
      if (socket.current) {
        socket.current.disconnect();
        console.log("Socket disconnected");
      }
      
     }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(()=>{
      const profileDetails = async()=>{
        const response = await axios.get(`http://localhost:8003/api/matrimony/profile/getProfile/${matrimonyProfileId}`)
        setProfileDetails(response.data)
      }
      profileDetails()
  },[matrimonyProfileId])

  console.log("profile details in home Profiles",profileDetails);
  

  return (
    <div className="buddyHomeProfile">
      <div className="buddyHomeProfileHeader">
        <div className='HeadingprofilePicContainer'>
          <img src={profileDetails?.profilePic} alt="Profile" className="HeadingProfilePic" />
          <span className='onlineDot'></span>
        </div>
        <div className="buddyHomeProfileInfo">
          <h2>{profileDetails?.firstName} {profileDetails?.lastName}</h2>
          <span>Prime Member</span>
          <span className="onlineStatus">Online</span>
        </div>
        <div className="closeButton" onClick={toggleProfileOptions}>
          &times;
        </div>
      </div>
      <div className="buddyHomeProfileOptions">
        <button >My Profile</button>
        <button onClick={() => navigate('/sent')}>Sent Request</button>
        <button onClick={() => navigate('/viewed')}>Viewed My Profile</button>
        <button onClick={() => navigate('/accept')}>Accept Request</button>
        <button onClick={() => navigate('/reject')}>Reject</button>
        <button onClick={() => navigate('/received')}>Received</button>
        <button onClick={() => navigate('/shortlistedby')}>Shortlisted By</button>
        <button onClick={() => navigate('/shortlist')}>Shortlist</button>
        <button onClick={() => navigate('/contacted')}>Contacted</button>
        <button onClick={() => navigate('/message')}>Message</button> 
        <button onClick={() => navigate('/setting')}>Settings</button>
        <span className="logoutButton" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </span>
      </div>
    </div>
  );
};

export default BuddyHomeProfile;
