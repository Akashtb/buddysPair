import React from 'react';
import './UserCard.css';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, actions }) => {
  const navigate = useNavigate();

  const reDirectToProfile = (id) => {
    navigate(`/other/${id}`);
  };

  const handleActionClick = (event, action) => {
    event.stopPropagation(); 
    if (action.onClick) {
      action.onClick(); 
    }
  };

  return (
    <div className="user-card" onClick={() => reDirectToProfile(user?._id)}>
      <img className="avatar" src={user.profilePic} alt={user.name} />
      <div className="info">
        <h5 className="name">{user.firstName} {user.lastName}</h5>
        <div className="details">
          <div className="age">{user.age}</div>
          <div className="location">{user.district}</div>
        </div>
      </div>
      <div className="actions">
        {actions.map((action, index) => (
          <span
            key={index}
            className={action.className}
            onClick={(event) => handleActionClick(event, action)}
          >
            {action.icon}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
