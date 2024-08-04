// src/pages/SentPage.js

import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './SentPage.css';

const SentPage = () => {
  const users = [
    { id: 1, name: 'Afrin Sabila', status: 'Life is beautiful 👌', avatar: 'assets/Images/propic1.jpg' },
    { id: 2, name: 'Adil Adnan', status: 'Be your own hero 💪', avatar: 'assets/Images/propic1.jpg' },
    { id: 3, name: 'Bristy Haque', status: 'Keep working ✍️', avatar: 'assets/Images/propic1.jpg' },
    { id: 4, name: 'John Borino', status: 'Make yourself proud 😊',  avatar: 'assets/Images/propic1.jpg' },
    { id: 5, name: 'Borsha Akther', status: 'Flowers are beautiful 🌸',  avatar: 'assets/Images/propic1.jpg' },
    { id: 6, name: 'Sheik Sadi', status: 'Life is beautiful 👌', avatar: 'assets/Images/propic1.jpg' },
    // Add more users as needed
  ];

  return (
    <div className="container">
      <Header title="Sent" />
      <div className="user-list">
        {users.map(user => (
          <UserCard key={user.id} user={user} actions={[{ className: 'remove-icon', icon: '❌' }]} />
        ))}
      </div>
  
    </div>
  );
};

export default SentPage;
