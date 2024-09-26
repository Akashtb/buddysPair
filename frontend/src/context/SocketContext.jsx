import React, { createContext, useRef, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import IdContext from './IdContext';
import { toast } from 'react-toastify';
import { SocketMessageContext } from './SocketMessageContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

  const covertToTime = (timestamp) => {
    const date = new Date(timestamp); 
    const now = new Date(); 
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
      const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (isToday) {
      return `Today ${time}`; 
    } else {
      return date.toLocaleString(); 
    }
  };

  
  const socket = useRef(null);
  const { matrimonyProfileId } = useContext(IdContext);
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);
  const { socketMessage, setSocketMessage, receivedRequest, setReceivedRequest, acceptedRequest, setAcceptedRequest, rejectRequest, setRejectedRequest, setCancelRequest } = useContext(SocketMessageContext)
  useEffect(() => {
    socket.current = io("ws://localhost:8003");

    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id);
      socket.current.emit("addUser", matrimonyProfileId);
    });

    socket.current.on("getUsers", users => {
      console.log("users from socket", users);
    });



    console.log("Socket object in app js:", socket);
    setIsSocketInitialized(true);

    socket.current.on("getMessagesNotification", data => {
      console.log("Message received:", data);
      if (data.receiverId === matrimonyProfileId) {
        setSocketMessage((prevMessages) => [
          ...prevMessages, // Spread previous messages
          {
            senderId: data.senderId,
            senderName: data.senderName,
            text: data.text,
            createdAt: covertToTime(data.createdAt)
          }
        ]);
      }
    });

 // Handle request notification
socket?.current?.on('requestNotification', ({ fromUID, toUID, fromUIDFullName, time }) => {
  console.log("requestReceived event fired on socket ");
  
  if (String(toUID) === matrimonyProfileId) {
    setReceivedRequest((prev) => {
      const updatedReceviedRequest = [...prev, { fromUID, from: fromUIDFullName, time }];
      
      // Filter out canceled requests from receivedRequest
      setCancelRequest((cancelRequests) => 
        cancelRequests.filter(cancel => !updatedReceviedRequest.some(request => request.fromUID === cancel.fromUID))
      );

      return updatedReceviedRequest;
    });
  }
});

// Handle cancel request notification
socket?.current?.on("cancelRequestNotification", ({ fromUID, requestToId, fromUIDFullName, time }) => {
  if (String(requestToId) === String(matrimonyProfileId)) {
    setCancelRequest((prev) => {
      const updatedCancelRequest = [...prev, { fromUID, from: fromUIDFullName, time }];
      
      // Filter out the canceled request from the receivedRequest
      setReceivedRequest((receivedRequests) => 
        receivedRequests.filter(request => !updatedCancelRequest.some(cancel => cancel.fromUID === request.fromUID))
      );

      return updatedCancelRequest;
    });
  }
});





    socket.current.on("acceptRequestNotification", ({ requestFromId, requestToId, toUIDFullName, time }) => {
      if (String(requestFromId) === String(matrimonyProfileId)) {
        setAcceptedRequest((prev) => [
          ...prev,
          {
            requestToId,
            to: toUIDFullName,
            time
          }
        ])
        toast.info(`${toUIDFullName} has accepted your request.`);
      }
    });

    socket.current.on("rejectRequestNotification", ({ requestFromId, requestToId, toUIDFullName, time }) => {
      if (String(requestFromId) === String(matrimonyProfileId)) {
        setRejectedRequest((prev) => [
          ...prev,
          {
            requestToId,
            to: toUIDFullName,
            time
          }
        ])
        toast.info(`${toUIDFullName} has rejected your request.`);
      }
    });




    return () => {
      if (socket.current) {
        socket.current.off("requestNotification");
        socket.current.off('cancelRequestNotification');
        socket.current.off('acceptRequestNotification');
        socket.current.off('rejectRequestNotification');
        socket.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [socket.current, matrimonyProfileId]);


  return (
    <SocketContext.Provider value={{ socket: socket, isSocketInitialized, socketMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;