
// Import necessary icons and components here
import './PrivacySetting.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import { useContext, useEffect, useState } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../CustomApi/Axios';
import { toast } from 'react-toastify';
import IdContext from '../../context/IdContext';

const PrivacySettings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [isOn, setIsOn] = useState(false);  // State for toggle switch
    const [profileData, setProfileData] = useState({});
    const [profilePic, setProfilePic] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [lastSign, setLastSign] = useState('');

    const { matrimonyProfileId } = useContext(IdContext);
    const toggleProfileOptions = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setShowProfileOptions(!showProfileOptions);
      };

      const handleToggle = () => {
        setIsOn(!isOn);  // Toggle the switch state
    };

    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate('/preference');
    };

    const onClick =() => {
      navigate('/change')
    };

    useEffect(() => {
      const getProfile = async () => {
        try {
          const { data } = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${matrimonyProfileId}`);
          
          if (data) {
            setProfileData(data);
            setProfilePic(data.profilePic || "assets/Images/defaultProfilePic.jpg"); // Use a default if the profilePic is missing
            setEmail(data.email || '');
            setPhone(data.phoneNumber || '');
            setLastSign(data.updatedAt || '');
          } else {
            console.error("Profile data is empty");
          }
        } catch (error) {
          toast.error("Error fetching profile");
          console.error('Error fetching profile:', error);
        }
      };
    
      getProfile();
    }, [matrimonyProfileId]);

  return (
    <div className="activitycontainer">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
      <div className="preference-header">
      <span className='search'><CiSearch /></span>
        <h2>Privacy & Settings</h2>
        <div className="profilePicContainer" onClick={toggleProfileOptions}>
        <img src={profilePic || "assets/Images/defaultProfilePic.jpg"} alt="Profile" className="profilePic" />
        </div>
      </div>
      <div className="infoContainer">
        <div className="infoRow">
          <span className='firstText'>Sign-in Email</span>
          <span>{email}</span>
        </div>
        <div className="infoRow-border">
          <span className='firstText'>Password</span>
          <span  className="firstTextNav" onClick={onClick}>Change password</span>
        </div>

        <div className="infoRow">
          <span className='firstText'>2-FA authentication</span>
          <div onClick={handleToggle}>
      {isOn ? <FaToggleOn className='switch' /> : <FaToggleOff className='switch' />}
    </div>
        </div>

        <div className="infoRow">
          <span className='firstText'>Phone number</span>
          <span>{phone}</span>
        </div>

        <div className="infoRow-border" onClick={handleNavigate}>
          <span className='firstTextNav'>Partner Preference</span>
        </div>

        <div className="infoRow">
          <span className='firstText'>Last sign in</span>
          <p className='sessionTime'>{lastSign}</p>
        </div>

        <div className="infoRow">
          <span className='firstText'>Total active sessions (5)</span>
        </div>
        <div className="sessionRow">
          <span>DESKTOP-6TI66EC • Kyiv, Ukraine</span>
          <p className="sessionInfo">Chrome • Used right now</p>
        </div>
        <div className="sessionRow">
          <span>Iphone 11 • Kyiv, Ukraine</span>
          <p className="sessionInfo">Chrome • 04/19/2022</p>
        </div>
        <div className="buttonContainer">
        <button className="resetButton">+ Reset all active sessions</button>
      </div>
      </div>
   </div>
   {showProfileOptions && (
        <div className="profileOptionsContainer">
          <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} />
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;
