import React from 'react';
import './ArrayOfChat.css';

function ArrayOfChat({ message, own }) {
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div>
      <div key={message.id} className={`message ${own ? "sent" : "received"}`}>
        <div className="message-cont">
          {message.text}
          <div className={`message-time ${own ? "own-time" : "received-time"}`}>{messageTime}</div>
        </div>
      </div>
    </div>
  );
}

export default ArrayOfChat;
