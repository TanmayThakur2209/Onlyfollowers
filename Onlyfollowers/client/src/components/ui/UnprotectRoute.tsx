import { Navigate, Outlet } from "react-router-dom";

const UnprotectedRoute = () => {
const token = localStorage.getItem("token");

  if (token) {
      return  <Navigate to="/home" />;
  }

  return <Outlet/>;
};

export default UnprotectedRoute;
