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

const Messages = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [conversationArray, setConversationArray] = useState(null);
  const { matrimonyProfileId } = useContext(IdContext);
  const axiosPrivate = useAxiosPrivate()
  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };
  const unreadMessages = 5;

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const navigateToChat = (conversationArrayId, friendId,coversationDetails) => {
    navigate(`/chat`, { state: { conversationArrayId, friendId,coversationDetails}});
  }



  useEffect(() => {
    const getConversationsArray = async () => {
      try {
        const response = await axiosPrivate.get(`/api/matrimony/conversation/getCurrentUserConversation/${matrimonyProfileId}`);
        console.log("conversationArray after axiosPrivate",response.data);
        setConversationArray(response.data);
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
              <img src="assets/Images/propic1.jpg" alt="" className='profilePic' />
            </div>
          </header>
        </div>
        <h2 className="recent-matches">Recent Matches</h2>
        <div className="matches-wrapper">
          <div className="match-item">
            <img src="assets/Images/propic1.jpg" alt="Match 1" />
            {unreadMessages > 0 && <div className="unread-message-count">{unreadMessages}</div>}
          </div>
          <img src="assets/Images/propic1.jpg" alt="Match 2" />
          <img src="assets/Images/propic1.jpg" alt="Match 3" />
          <img src="assets/Images/propic1.jpg" alt="Match 4" />
          <img src="assets/Images/propic1.jpg" alt="Match 5" />
          <img src="assets/Images/propic1.jpg" alt="Match 6" />
          <img src="assets/Images/propic1.jpg" alt="Match 7" />
          <img src="assets/Images/propic1.jpg" alt="Match 8" />
          <img src="assets/Images/propic1.jpg" alt="Match 2" />
          <img src="assets/Images/propic1.jpg" alt="Match 3" />
          <img src="assets/Images/propic1.jpg" alt="Match 4" />
          <img src="assets/Images/propic1.jpg" alt="Match 5" />
          <img src="assets/Images/propic1.jpg" alt="Match 6" />
          <img src="assets/Images/propic1.jpg" alt="Match 7" />
          <img src="assets/Images/propic1.jpg" alt="Match 8" />
        </div>

        <section className="messages-list">
          {conversationArray?.map((message, index) => {
            const friendId = message.members.find((m) => m !== matrimonyProfileId);
            return (
              <div key={index} onClick={() => navigateToChat(message?._id, friendId,message)}>
                <Message key={message._id} message={message} />
              </div>
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
