import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AuthContext";
import Layout from "../components/layout/Layout";
import { useLocation } from "react-router-dom";

export function Protected({ children }) {
  const { user, userData } = useContext(Context);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if(userData && userData.onBoarding && location.pathname === "/onBoarding"){
    return <Navigate to="/profile" replace />;
  } else {
    return <Layout>{children}</Layout>;
  }
}
