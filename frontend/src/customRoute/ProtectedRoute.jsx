import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState(!!auth); // Initial check if auth exists
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!auth || Object.keys(auth).length === 0) {
        setIsAuth(false); // If auth is missing, set it to false
      } else {
        setIsAuth(true); // Otherwise, auth is present
      }
      setLoading(false); // Stop loading after the check
    }, 100); // Adjust timeout duration as needed (in milliseconds)

    // Cleanup function to clear the timer when component unmounts
    return () => clearTimeout(timer);
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>; // You can customize this with a loading spinner
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
