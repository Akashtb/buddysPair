// src/components/UserCard.js
import './UserCard.css';

const UserCard = ({ user, actions }) => {
  return (
    <div className="user-card">
      <img className="avatar" src={user.avatar} alt={user.name} />
      <div className="info">
        <div className="name">{user.name}</div>
        <div className="status">{user.status}</div>
      </div>
      <div className="actions">
        {actions.map((action, index) => (
          <span key={index} className={action.className}>
            {action.icon}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
