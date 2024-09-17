import React, { createContext, useState } from "react";

export const SocketMessageContext = createContext();

export const SocketMessageProvider = ({ children }) => {
  const [socketMessage, setSocketMessage] = useState([]);
  const [receivedRequest, setReceivedRequest] = useState([]);
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  const [rejectRequest, setRejectedRequest] = useState([]);
  const [cancelRequest,setCancelRequest] = useState([]);

  return (
    <SocketMessageContext.Provider value={
      {
        socketMessage, setSocketMessage,
        receivedRequest, setReceivedRequest,
        acceptedRequest, setAcceptedRequest,
        rejectRequest, setRejectedRequest,
        cancelRequest, setCancelRequest
      }
    }>
      {children}
    </SocketMessageContext.Provider>
  );
};
