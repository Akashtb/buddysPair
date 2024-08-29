
import React, { createContext, useRef, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import IdContext from './IdContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { matrimonyProfileId } = useContext(IdContext);
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);

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

    return () => {
      socket.current.disconnect(); 
    };
  }, [matrimonyProfileId]);

  return (
    <SocketContext.Provider value={{ socket: socket, isSocketInitialized }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
