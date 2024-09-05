import React, { createContext, useRef, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import IdContext from './IdContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => { 
  const socket = useRef(null); 
  const { matrimonyProfileId } = useContext(IdContext);
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);
  const [socketMessage, setSocketMessage] = useState(null); 

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

    socket.current.on("getMessages", data => {
      console.log("Message received:", data);
      setSocketMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: data.createdAt
      });
    });



    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [matrimonyProfileId]);


  return (
    <SocketContext.Provider value={{ socket: socket, isSocketInitialized, socketMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
