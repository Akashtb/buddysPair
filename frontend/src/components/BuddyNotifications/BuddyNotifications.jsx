import React, { useContext, useEffect, useState } from 'react';
import './buddyNotifications.css';
import { RxCross2 } from "react-icons/rx";
import tick from '../../assets/buddysHome/success icon.svg';
import info from '../../assets/buddysHome/info icon.svg';
import error from '../../assets/buddysHome/error icon.svg';
import News from '../NotificationComponents/News';
import AcceptRequest from '../NotificationComponents/AcceptRequest';
import ReceivedMessage from '../NotificationComponents/ReceivedMessage';
import ReceviedRequest from '../NotificationComponents/ReceviedRequest';
import RejectRequest from '../NotificationComponents/RejectRequest';
import { SocketMessageContext } from '../../context/SocketMessageContext';
const BuddyNotifications = ({ socket }) => {
  console.log("socket in notifications", socket);
  const { socketMessage, receivedRequest, acceptedRequest, rejectRequest } = useContext(SocketMessageContext)

  // console.log(`message in socket`,socketMessage);
  console.log(`receivedRequest in socket`, receivedRequest);

  const senderData = socketMessage.reduce((acc, message) => {
    if (!acc[message.senderId]) {
      // If senderId not already in the accumulator, initialize it with the message and count of 1
      acc[message.senderId] = { ...message, count: 1 };
    } else {
      // If senderId exists, increment the count and update the latest message
      acc[message.senderId].count += 1;
      acc[message.senderId] = { ...message, count: acc[message.senderId].count };
    }
    return acc;
  }, {});

  const uniqueMessages = Object.values(senderData);

  const latestRequests = receivedRequest.reduce((acc, request) => {
    if (!acc[request.fromUID] || new Date(request.time) > new Date(acc[request.fromUID].time)) {
      acc[request.fromUID] = request;
    }
    return acc;
  }, {});

  const filteredRequests = Object.values(latestRequests);
  return (
    <div className='BuddyNotifications'>
      <News />

      {uniqueMessages.length > 0 && uniqueMessages.map((message, index) => (
        <ReceivedMessage
          key={index}
          senderName={message.senderName}
          text={message.text}
          createdAt={message.createdAt}
          count={message.count} // Pass the count to the ReceivedMessage component
        />
      ))}

      {filteredRequests.length > 0 && filteredRequests.map((request, index) => (
        <ReceviedRequest
          key={index}
          fromUID={request.fromUID}
          RequestedUserName={request.from}
          requestTime={request.time}
        />
      ))}

      {acceptedRequest.length > 0 && (
        acceptedRequest.map((request, index) => (
          <AcceptRequest
            key={index}
            acceptedUserName={request.to}
            acceptedTime={request.time}
          />
        ))
      )}

      {rejectRequest.length > 0 && (
        rejectRequest.map((request, index) => (
          <RejectRequest
            key={index}
            rejectedUserName={request.to}
            rejectedTime={request.time}
          />
        ))
      )}
    </div>
  );
};

export default BuddyNotifications;
