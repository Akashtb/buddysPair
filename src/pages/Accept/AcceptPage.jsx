// src/pages/AcceptPage.js
import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './AcceptPage.css';

const AcceptPage = () => {
  const users = [
    { id: 1, name: 'Team Align', age:'27yrs',location:'Kochi', avatar: 'assets/Images/propic1.jpg' },
    { id: 2, name: 'Jhon Abraham', age:'27yrs',location:'Kochi', avatar: 'assets/Images/propic1.jpg' },
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
    </div>
  );
};

export default AcceptPage;
