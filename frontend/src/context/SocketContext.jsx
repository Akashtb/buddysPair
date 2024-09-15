import React, { createContext, useRef, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import IdContext from './IdContext';
import { toast } from 'react-toastify';
import { SocketMessageContext } from './SocketMessageContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { matrimonyProfileId } = useContext(IdContext);
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);
  const { socketMessage, setSocketMessage, receivedRequest, setReceivedRequest, acceptedRequest, setAcceptedRequest, rejectRequest, setRejectedRequest } = useContext(SocketMessageContext)
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
            createdAt: data.createdAt,
          }
        ]);
      }
    });

    socket.current.on('requestNotification', ({ fromUID, toUID, fromUIDFullName, time }) => {
      console.log("requestReceived event fired on socket ");

      if (String(toUID) === matrimonyProfileId) {
        // toast.info(`${fromUIDFullName} has sent you a new request on context.`);
        setReceivedRequest((prev) => [
          ...prev,
          {
            fromUID,
            from: fromUIDFullName,
            time
          }
        ])
      }
    });

    socket.current.on("cancelRequestNotification", ({ fromUID, requestToId, fromUIDFullName }) => {
      if (requestToId === matrimonyProfileId) {
        // toast.info(`${fromUIDFullName} has sent you a cancel request.`);   
      }
    });

    socket.current.on("acceptRequestNotification", ({ requestFromId, requestToId, toUIDFullName,time }) => {
      if (String(requestFromId) === String(matrimonyProfileId)) {
        setAcceptedRequest((prev) => [
          ...prev,
          {
            to: toUIDFullName,
            time
          }
        ])
        toast.info(`${toUIDFullName} has accepted your request.`);
      }
    });

    socket.current.on("rejectRequestNotification", ({ requestFromId, requestToId, toUIDFullName,time }) => {
      if (String(requestFromId) === String(matrimonyProfileId)) {
        setRejectedRequest((prev) => [
          ...prev,
          {
            to: toUIDFullName,
            time
          }
        ])
        toast.info(`${toUIDFullName} has rejected your request.`);
      }
    });




    return () => {
      if (socket.current) {
        socket.current.off("requestReceived");
        socket.current.off('requestReceived');
        socket.current.off('cancelReceived');
        socket.current.off('acceptRequest');
        socket.current.off('rejectRequest');
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
