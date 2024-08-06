import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Messages.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter';
const Messages = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const messages = [
    { id: 1, name: 'Alfredo Calzoni', age: '27yrs', location: 'Kochi', time: '09:18', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'Hello there!' },
    { id: 2, name: 'Clara Hazel', age: '27yrs', location: 'Kochi', time: '12:44', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'How are you?' },
    { id: 3, name: 'Brandon', age: '27yrs', location: 'Kochi', time: '08:06', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'See you soon!' },
    { id: 4, name: 'Amina Mina', age: '27yrs', location: 'Kochi', time: '09:32', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'Good morning!' },
    { id: 5, name: 'Raymond Hall', age: '27yrs', location: 'Kochi', time: '10:21', imgSrc: 'assets/Images/propic1.jpg', lastMessage: 'Take care!' },
  ];

  return (
    <div className="messages-page">
      <header className="messages-header">
        <span className="back-arrow" onClick={handleBack}><MdOutlineKeyboardArrowLeft />
        </span>
        <h1 className="header-title">Messages</h1>
      </header>

      <section className="messages-list">
        {messages.map(message => (
          <div key={message.id} className="message-item">
            <img src={message.imgSrc} alt={message.name} className="avatar" />
            <div className="message-content">
              <h5>{message.name}</h5>
              <div className="details">
                <p>{message.age}</p>
                <p>{message.location}</p>
                <div className="last-message">{message.lastMessage}</div>
              </div>
             
            </div>
          
            <span className="message-time">{message.time}</span>
          </div>
        ))}
      </section>
      <div className='customFooter'> <BuddyHomeFooter/></div>
    </div>
  );
};

export default Messages;
