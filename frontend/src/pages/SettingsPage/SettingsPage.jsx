import  { useContext, useEffect, useState } from "react";
import {  FaQuestionCircle, FaHdd, FaUserFriends, FaRegQuestionCircle } from "react-icons/fa"; // Import react-icons
import { useNavigate } from "react-router-dom";
import { TbBell } from "react-icons/tb";
import './Settings.css'; // Import the CSS file
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import LeftSideBar from "../../components/ActivityLeftSideBar/LeftSideBar";
import { IoChatbubbleEllipsesOutline, IoKeyOutline } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { BsQrCode, BsQrCodeScan } from "react-icons/bs";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../CustomApi/Axios";
import IdContext from "../../context/IdContext";

function SettingsPage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    const toggleProfileOptions = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setShowProfileOptions(!showProfileOptions);
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const { matrimonyProfileId } = useContext(IdContext);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        bio: '',
        
    });
    const [profilePic, setProfilePic] = useState('');
    useEffect(() => {
        const getProfile = async () => {
          try {
            const { data } = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${matrimonyProfileId}`);
            
            if (data) {
              setProfileData(data);
              setProfilePic(data.profilePic || "assets/Images/defaultProfilePic.jpg"); // Use a default if the profilePic is missing
          
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
            <div className='leftsidebar'>
                <LeftSideBar />
            </div>

            <div className="main">
            <div className="activity-header">
          <header className="messages-header">
            <span className="back-arrow" onClick={handleBack}><MdOutlineKeyboardArrowLeft /></span>
            <h1 className="title">Settings</h1>
            
          </header>
        </div>



                {/* Main Content */}
                <div className="settings-main">
                    <div className="user-info">
                        <div className="user-avatar">
                           <img src={profilePic || "assets/Images/defaultProfilePic.jpg"} alt="Profile" className="profilePic-setting" />
                        </div>
                        <div className="user-details">
                            <h2>{profileData.firstName} {profileData.lastName}</h2>
                            <p>{profileData.bio || 'No bio available'}</p>
                        </div>
                        <div className="qr-code">
                             <BsQrCodeScan className="icon-qr" />
                        </div>
                    </div>

                    <main className="settings-options">
                        <section>
                            <SettingOption
                              icon={<IoKeyOutline className="icon-setting" />}
                                title="Account"
                                description="Privacy"
                                path="/privacySetting"
                            />
                            <SettingOption
                                icon={<IoChatbubbleEllipsesOutline className="icon-setting"/>}
                                title="Chat"
                                description="Chat History"
                            />
                            <SettingOption
                                icon={<TbBell className="icon-setting"/>}
                                title="Notifications"
                                description="Messages"
                            />
                            <SettingOption
                                icon={<FaRegQuestionCircle className="icon-setting"/>}
                                title="Help"
                                description="Help center"
                            />
                            <SettingOption
                                icon={<LuArrowDownUp className="icon-setting"/>}
                                title="Storage and data"
                                description="Network usage"
                            />
                            <SettingOption
                                icon={<FiUsers className="icon-setting"/>}
                                title="Invite a friend"
                                description=""
                            />
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}

function SettingOption({ icon, title, description, path }) {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <div
            className="setting-option"
            onClick={() => path && navigate(path)}
        >
            <div className="icon">{icon}</div>
            <div className="option-details">
                <p className="option-title">{title}</p>
                {description && <p className="option-description">{description}</p>}
            </div>
        </div>
    );
}

export default SettingsPage;
