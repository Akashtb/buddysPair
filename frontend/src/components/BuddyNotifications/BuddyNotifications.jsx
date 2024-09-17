import React, { useContext, useMemo } from 'react';
import './buddyNotifications.css';
import ReceivedMessage from '../NotificationComponents/ReceivedMessage';
import ReceviedRequest from '../NotificationComponents/ReceviedRequest';
import AcceptRequest from '../NotificationComponents/AcceptRequest';
import RejectRequest from '../NotificationComponents/RejectRequest';
import { SocketMessageContext } from '../../context/SocketMessageContext';

const BuddyNotifications = ({ socket }) => {
  const { socketMessage, receivedRequest, acceptedRequest, rejectRequest } = useContext(SocketMessageContext);

  const uniqueMessages = useMemo(() => {
    const senderData = socketMessage.reduce((acc, message) => {
      if (!acc[message.senderId]) {
        acc[message.senderId] = { ...message, count: 1 };
      } else {
        acc[message.senderId].count += 1;
        acc[message.senderId] = { ...message, count: acc[message.senderId].count };
      }
      return acc;
    }, {});
    return Object.values(senderData);
  }, [socketMessage]);

  const filteredRequests = useMemo(() => {
    const latestRequests = receivedRequest.reduce((acc, request) => {
      if (!acc[request.fromUID] || new Date(request.time) > new Date(acc[request.fromUID].time)) {
        acc[request.fromUID] = request;
      }
      return acc;
    }, {});
    return Object.values(latestRequests);
  }, [receivedRequest]);

  // Check if all notification lists are empty
  const hasNoNotifications =
    uniqueMessages.length === 0 &&
    filteredRequests.length === 0 &&
    acceptedRequest.length === 0 &&
    rejectRequest.length === 0;

  return (
    <div className='BuddyNotifications'>
      {hasNoNotifications ? (
        <div className="no-notifications">
          No notifications to display.
        </div>
      ) : (
        <>
          {uniqueMessages.length > 0 && uniqueMessages.map((message, index) => (
            <ReceivedMessage
              key={index}
              senderId={message.senderId}
              senderName={message.senderName}
              text={message.text}
              createdAt={message.createdAt}
              count={message.count}
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

          {acceptedRequest.length > 0 && acceptedRequest.map((request, index) => (
            <AcceptRequest
              key={index}
              requestToId={request.requestToId}
              acceptedUserName={request.to}
              acceptedTime={request.time}
            />
          ))}

          {rejectRequest.length > 0 && rejectRequest.map((request, index) => (
            <RejectRequest
              key={index}
              requestToId={request.requestToId}
              rejectedUserName={request.to}
              rejectedTime={request.time}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default BuddyNotifications;
