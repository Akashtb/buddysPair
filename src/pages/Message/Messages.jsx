import { useNavigate } from 'react-router-dom';
import './Messages.css';
import Navbar from '../../components/NotifyNavbar/Navbar';


const Messages = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };


  const messages = [
    { id: 1, name: 'Alfredo Calzoni', text: 'What about that new jacket if I ...', time: '09:18', imgSrc: 'assets/Images/propic1.jpg' },
    { id: 2, name: 'Clara Hazel', text: 'I know right 😊', time: '12:44', imgSrc: 'assets/Images/propic1.jpg' },
    { id: 3, name: 'Brandon', text: 'Already registered, can’t wai...', time: '08:06', imgSrc: 'assets/Images/propic1.jpg'},
    { id: 4, name: 'Amina Mina', text: 'It will have two lines of heading ...', time: '09:32', imgSrc: 'assets/Images/propic1.jpg' },
    { id: 5, name: 'Raymond Hall', text: 'Great to hear that!', time: '10:21', imgSrc: 'assets/Images/propic1.jpg'},
  ];

  return (
    <div className="messages-page">
      <Navbar />
      <header className="messages-header">
        <span className="back-arrow" onClick={handleBack}>&lt;</span>
        <h1 className="header-title">Messages</h1>
      </header>

      <section className="messages-list">
        {messages.map(message => (
          <div key={message.id} className="message-item">
            <img src={message.imgSrc} alt={message.name} className="avatar" />
            <div className="message-content">
              <h5>{message.name}</h5>
              <p>{message.text}</p>
            </div>
            <span className="message-time">{message.time}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Messages;
