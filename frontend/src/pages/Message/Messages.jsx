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



  const messages = [
    { id: 1, name: 'Alfredo Calzoni', age: '27yrs', location: 'Kochi', time: '09:18', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'Hello there!' },
    { id: 2, name: 'Clara Hazel', age: '27yrs', location: 'Kochi', time: '12:44', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'How are you?' },
    { id: 3, name: 'Brandon', age: '27yrs', location: 'Kochi', time: '08:06', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'See you soon!' },
    { id: 4, name: 'Amina Mina', age: '27yrs', location: 'Kochi', time: '09:32', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'Good morning!' },
    { id: 5, name: 'Raymond Hall', age: '27yrs', location: 'Kochi', time: '10:21', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'Take care!' },
  ];

  useEffect(() => {
    const getConversationsArray = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/api/matrimony/conversation/getCurrentUserConversation/${matrimonyProfileId}`);
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
