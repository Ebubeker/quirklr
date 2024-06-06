import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import OnBoarding from "../pages/app/OnBoarding"
import Feed from "../pages/app/Feed"
import Profile from "../pages/app/Profile"
import { Protected } from "./Protected"
import Public from "./Public"
import User from "../pages/app/User"
import { createBrowserRouter } from "react-router-dom"
// export const nav = [
//   { path: "/", name: "Home", element: <Feed />, isMenu: true, isPrivate: true },
//   { path: "/profile", name: "Profile", element: <Profile />, isMenu: true, isPrivate: true },
//   { path: "/login", name: "Login", element: <Login />, isMenu: false, isPrivate: false },
//   { path: "/register", name: "Register", element: <Register />, isMenu: false, isPrivate: false },
//   { path: "/onBoarding", name: "Register", element: <OnBoarding />, isMenu: false, isPrivate: true },
// ]

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Feed /></Protected>
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