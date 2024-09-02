
// Import necessary icons and components here
import './privacy.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import { useState } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';

const PrivacySettings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [isOn, setIsOn] = useState(false);  // State for toggle switch

    const toggleProfileOptions = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setShowProfileOptions(!showProfileOptions);
      };

      const handleToggle = () => {
        setIsOn(!isOn);  // Toggle the switch state
    };

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
          <img src="assets/Images/propic1.jpg" alt="" className="profilePic" />
        </div>
      </div>
      <div className="infoContainer">
        <div className="infoRow">
          <span className='firstText'>Sign-in Email</span>
          <span>johnsmith@gmail.com</span>
        </div>
        <div className="infoRow-border">
          <span className='firstText'>Password</span>
          <a href="#" className="changePassword">Change password</a>
        </div>

        <div className="infoRow">
          <span className='firstText'>2-FA authentication</span>
          <div onClick={handleToggle}>
      {isOn ? <FaToggleOn className='switch' /> : <FaToggleOff className='switch' />}
    </div>
        </div>

        <div className="infoRow">
          <span className='firstText'>Phone number</span>
          <span>+380 93 123 45 67</span>
        </div>

        <div className="infoRow-border">
          <span className='firstText'>Partner Preference</span>
        </div>

        <div className="infoRow">
          <span className='firstText'>Last sign in</span>
          <p className='sessionTime'>today at 18:34, Safary 198.123.23.23</p>
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
    </div>
  );
};

export default PrivacySettings;