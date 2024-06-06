import React from "react";
import { useContext } from "react";
import { Context } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Public = ({ children }) => {
  const { user } = useContext(Context);
  const location = useLocation();

  if (user && ["/login", "/register"].includes(location.pathname)) {
    return <Navigate to="/profile" replace />;
  } else {
    return children;
  }
};

export default Public;
