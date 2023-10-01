import { authContext } from "./AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useContext(authContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};
