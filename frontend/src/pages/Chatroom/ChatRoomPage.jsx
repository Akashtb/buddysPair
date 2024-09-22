import { useState, useRef, useEffect, useContext } from 'react';
import { IoMdAttach, IoMdCall, IoMdMic, IoMdSend } from 'react-icons/io';
import axios from 'axios'
import './ChatRoomPage.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import { useLocation, useNavigate} from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import ArrayOfChat from '../../components/ArrayOfChat/ArrayOfChat';
import IdContext from '../../context/IdContext'
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate'
import SocketContext from '../../context/SocketContext';
import { SocketMessageContext } from '../../context/SocketMessageContext';

const ChatRoomPage = () => {

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  const messagesEndRef = useRef(null);
  const [arrivalMessages, setArrivalMessages] = useState(null)
  const [user, setUser] = useState(null)
  const { matrimonyProfileId } = useContext(IdContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {socketMessage, setSocketMessage} = useContext(SocketMessageContext)
  const { friendId,conversationArrayId,coversationDetails } = location.state || {}; 
  const [currentUser,setCurrentUser]= useState({})
  const {socket} = useContext(SocketContext)
  const axiosPrivate = useAxiosPrivate()

  // console.log('Friend ID:', friendId);
  // console.log("socket in chat room",socket);
  
  // console.log('Conversation ID:', conversationArrayId);
  // console.log("coversationDetails",coversationDetails);

  useEffect(()=>{
   
    socket.current.on("getMessages", data => {
      // console.log("Message received:", data);
      setArrivalMessages({
          senderId:data.senderId,
          text: data.text, 
          createdAt:data.createdAt
      });
      
  });

},[socket])

// console.log("arrived messages",arrivalMessages);



useEffect(() => {
  // if (arrivalMessages) {
  //     console.log("arrivalMessages is confirm", arrivalMessages);
  // } else {
  //     console.log("No new messages");
  // }

  arrivalMessages && coversationDetails?.members.includes(arrivalMessages.senderId) && setMessages((prev) => [...prev, arrivalMessages]);
  // console.log("message after checking conditions",messages);
  
}, [arrivalMessages, coversationDetails]);



  useEffect(() => {
    const getMessages = async () => {
      try {
        const currentUserProfile = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${matrimonyProfileId}`)
        setCurrentUser(currentUserProfile.data)
        const profiledata = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${friendId}`)
        setUser(profiledata.data)
        const response = await axios.get(`http://localhost:8003/api/matrimony/messages/${conversationArrayId}`)
        setMessages(response.data)
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } 
    };

    if (conversationArrayId) {
      getMessages();
    }
  }, [conversationArrayId]);

  // console.log("messages", messages);




  const handleSendMessage = async() => {
    if (!coversationDetails) {
      console.error("Current chat is not defined");
      return;
  }
      const message ={
        text:inputMessage,
        conversationId:conversationArrayId
      }
      // console.log("message sent my sender",message);

      const receiverId = coversationDetails?.members.find(member => member !== matrimonyProfileId);
      if (!receiverId) {
          console.error("Receiver ID is not found");
          return;
      }
      // console.log('Sending message to receiverId:', receiverId);
    

      socket.current.emit("sendMessage", { 
        senderId: matrimonyProfileId,
        senderName: `${currentUser.firstName} ${currentUser.lastName}`,
        receiverId: receiverId,
        text: inputMessage,
      });
    // console.log("messages after sending",messages);

      try {
        console.log("req body for send message", message);
        const response = await axios.post(`http://localhost:8003/api/matrimony/messages/${matrimonyProfileId}`, message);
        setMessages([...messages, response.data]);
        // console.log('Message sent:', response.data);
        setInputMessage('');
    } catch (error) {
        console.log(error);
    }
  
  };



  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    // Scroll to the bottom of the messages container
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    const removeCurrentUserMsgNoti = () =>{
      const msg = socketMessage.filter(msg=>msg.senderId!==friendId)
      setSocketMessage(msg)
    }
    removeCurrentUserMsgNoti()
  }, [messages]);

  return (
    <div className="activitycontainer">
      <div className="leftsidebar">
        <LeftSideBar />
      </div>
      <div className="main">
        <div className="activity-header">
          <header className="messages-header">
            <span className="back-arrow" onClick={handleBack}><MdOutlineKeyboardArrowLeft /></span>
            <h1 className="title">{user?.firstName} {user?.lastName}</h1>
            <div className="chat-call" > <IoMdCall />
            </div>
          </header>
        </div>
        <div className="chatroom">
          <div className="chat-messages">
          {messages.map((message, index) => (
              <div key={index} ref={messagesEndRef}>
                <ArrayOfChat key={index} message={message} own={message.sender === matrimonyProfileId} />
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <IoMdAttach className="pin-icon" />
            <IoMdMic className="mic-icon" />
            <button className="send-button" onClick={handleSendMessage}>
              <IoMdSend />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
