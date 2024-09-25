import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import './Messages.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import Message from '../../components/Message/Message';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import RecentConversation from '../../components/recentConversation/RecentConversation';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'; // Import your loading spinner

const Messages = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [conversationArray, setConversationArray] = useState(null);
  const { matrimonyProfileId } = useContext(IdContext);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const navigateToChat = (conversationArrayId, friendId, conversationDetails) => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
    navigate(`/chat`, { state: { conversationArrayId, friendId, conversationDetails } });
  };

  useEffect(() => {
    const getConversationsArray = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(`/api/matrimony/conversation/getCurrentUserConversation/${matrimonyProfileId}`);
        setConversationArray(response.data);
        const profiledata = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${matrimonyProfileId}`);
        setProfileData(profiledata.data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (matrimonyProfileId) {
      getConversationsArray();
    }
  }, [matrimonyProfileId]);

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
            <img src={profileData.profilePic} alt="Match" />
            {conversationArray?.length > 0 && <div className="unread-message-count">{conversationArray?.length}</div>}
          </div>
          {conversationArray?.map((message, index) => (
            <RecentConversation key={index} message={message} conversationArray={conversationArray} setConversationArray={setConversationArray} />
          ))}
        </div>

        <section className="messages-list">
          {loading ? (
            <LoadingSpinner />
          ) : conversationArray?.length === 0 ? (
            <div className="no-messages-message">
              <p>No conversations found.</p>
            </div>
          ) : (
            conversationArray.map((message) => (
              <Message key={message._id} message={message} />
            ))
          )}
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
