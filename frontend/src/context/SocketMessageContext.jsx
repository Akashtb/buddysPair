import React, { createContext, useState } from "react";

export const SocketMessageContext = createContext();

export const SocketMessageProvider = ({ children }) => {
  const [socketMessage, setSocketMessage] = useState(null);

  return (
    <SocketMessageContext.Provider value={{ socketMessage, setSocketMessage }}>
      {children}
    </SocketMessageContext.Provider>
  );
};
