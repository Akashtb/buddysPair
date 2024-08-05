// src/pages/AcceptPage.js
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter';
import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './AcceptPage.css';

const AcceptPage = () => {
  const users = [
    { id: 1, name: 'Team Align', status: 'Today, 09:30 AM', avatar: 'assets/Images/propic1.jpg' },
    { id: 2, name: 'Jhon Abraham', status: 'Today, 07:30 AM', avatar: 'assets/Images/propic1.jpg' },
    // Add more users as needed
  ];

  return (
    <div className="container">
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
      <div className='customFooter'> <BuddyHomeFooter/></div>
    </div>
  );
};

export default AcceptPage;
