import { useState, useRef, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';

import Header from '../../components/NotifyHeader/Header';
import './ChatRoomPage.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';

const ChatRoomPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi, how are you?', type: 'received', profilePic: 'assets/Images/propic1.jpg' },
    { id: 2, text: "I'm good, thank you! What about you?", type: 'sent', profilePic: 'assets/Images/propic1.jpg' }
  ]);
  const messagesEndRef = useRef(null);

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        type: 'sent',
        profilePic: 'assets/Images/propic1.jpg'
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the messages container
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="activitycontainer">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
        <div className="activity-header">
          <Header 
            title="Chatroom" 
            profilePic="assets/Images/propic1.jpg" 
            onProfilePicClick={toggleProfileOptions} 
          />
        </div>
        <div className="chatroom">
          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.type}`}>
                <img src={message.profilePic} alt={message.type === 'sent' ? 'Sender' : 'Receiver'} className="profile-icon" />
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="send-button" onClick={handleSendMessage}>
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>

      {showProfileOptions && (
        <div className="profileOptionsContainer">
          {/* Profile options can go here */}
        </div>
      )}
    </div>
  );
};

export default ChatRoomPage;
