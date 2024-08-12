import React from 'react';
import './UserCard.css';

const UserCard = ({ user, actions }) => {
  return (
    <div className="user-card">
      <img className="avatar" src={user.avatar} alt={user.name} />
      <div className="info">
        <h5 className="name">{user.name}</h5>
        <div className="details">
          <div className="age">{user.age}</div>
          <div className="location">{user.location}</div>
        </div>
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
