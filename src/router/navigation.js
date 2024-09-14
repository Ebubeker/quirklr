import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import OnBoarding from "../pages/app/OnBoarding"
import Feed from "../pages/app/Feed"
import Profile from "../pages/app/Profile"
import SharePost from "../pages/app/SharePost"
import { Protected } from "./Protected"
import Public from "./Public"
import User from "../pages/app/User"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Feed /></Protected>
  },
  {
    path: "/share-post",
    element: <Protected><SharePost /></Protected>
  },
  {
    path: "/profile",
    element: <Protected><Profile /></Protected>
  },
  {
    path: "/user/:userId",
    element: <Protected><User /></Protected>
  },
  {
    path: "/onBoarding",
    element: <Protected><OnBoarding /></Protected>
  },
  {
    path: "/login",
    element: <Public><Login /></Public>
  },
  {
    path: "/register",
    element: <Public><Register /></Public>
  }
])