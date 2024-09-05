import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import './Messages.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import Message from '../../components/Message/Message';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import axios from 'axios';
import RecentConversation from '../../components/recentConversation/RecentConversation';

const Messages = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [conversationArray, setConversationArray] = useState(null);
  const { matrimonyProfileId } = useContext(IdContext);
  const [profileData,setProfileData]=useState({})
  const axiosPrivate = useAxiosPrivate()
  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };
  const unreadMessages = 5;

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const navigateToChat = (conversationArrayId, friendId, coversationDetails) => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false); // Ensure sidebar closes on mobile
    }
    navigate(`/chat`, { state: { conversationArrayId, friendId, coversationDetails } });
  }
  



  useEffect(() => {
    const getConversationsArray = async () => {
      try {
        const response = await axiosPrivate.get(`/api/matrimony/conversation/getCurrentUserConversation/${matrimonyProfileId}`)
        setConversationArray(response.data)
        const profiledata = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${matrimonyProfileId}`)
        setProfileData(profiledata.data)
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    if (matrimonyProfileId) {
      getConversationsArray();
    }
  }, [matrimonyProfileId]);
  console.log(conversationArray);



  return (
    <div className="activitycontainer">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
        <div className="activity-header">
          <header className="messages-header">
            <span className="back-arrow" onClick={handleBack}><MdOutlineKeyboardArrowLeft /></span>
            <h1 className="title">Messages</h1>
            <div className="profilePicContainer" onClick={toggleProfileOptions}>
              <img src={profileData.profilePic} alt="" className='profilePic' />
            </div>
          </header>
        </div>
        <h2 className="recent-matches">Recent Matches</h2>
        <div className="matches-wrapper">
          <div className="match-item">
            <img src={profileData.profilePic} alt="Match 1" />
            {conversationArray?.length > 0 && <div className="unread-message-count">{conversationArray?.length}</div>}
          </div>
          {conversationArray?.map((message, index) => {
            return (
                <RecentConversation key={index} message={message}/>
            );
          })}
        </div>

        <section className="messages-list">
          {conversationArray?.map((message, index) => {
            return (
                <Message key={message._id} message={message} />
            );
          })}
        </section>
      </div>
      {showProfileOptions && (
        <div className="profileOptionsContainer">
          <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} />
        </div>
      )}
    </div>
  );
};

export default Messages;
