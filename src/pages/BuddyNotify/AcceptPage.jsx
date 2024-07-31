    // src/pages/AcceptPage.js
import './AcceptPage.css';
import Navbar from '../BuddysHome/Navbar';
import UserCard from '../BuddysHome/UserCard';
import Header from '../BuddysHome/Header';


const AcceptPage = () => {
  const users = [
    { id: 1, name: 'Team Align', status: 'Today, 09:30 AM', avatar: 'assets/Images/propic1.jpg' },
    { id: 2, name: 'Jhon Abraham', status: 'Today, 07:30 AM', avatar: 'assets/Images/propic1.jpg' },
    // Add more users as needed
  ];

  return (
    <div className="container">
        <Navbar />
      <Header title="Accept" />
      <div className="user-list">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            actions={[
              { className: 'call-icon', icon: '📞' },
              { className: 'video-icon', icon: '📹' },
            ]}
          />
        ))}
      </div>
    
    </div>
  );
};

export default AcceptPage;
    