import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";


function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);

  if (!auth || Object.keys(auth).length === 0 ) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
