
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState,useRef } from "react";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    
    checkToken();
    
    window.addEventListener("storage", checkToken);
    
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);
  const hasAlerted = useRef(false);
  
  if (!isAuthenticated) {
    if (!hasAlerted.current){
    window.alert("Log in to continue");
   hasAlerted.current = true;}
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
