import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";

import App from "../App";
import AboutUs from "../pages/About";
import Consult from "../pages/Consult";
import ChatBot from "../pages/ChatBot";

import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPass from "../pages/ForgotPass";
import ResetPass from "../pages/ResetPass";

import Forum from "../pages/Forum";
import ThreadDetail from "../features/ForumComponents/ThreadDetail";
import ThreadList from "../features/ForumComponents/ThreadList";

import Profile from "../pages/Profile";
import JadwalSaya from "../features/ProfileComponents/JadwalSaya";
import ThreadSaya from "../features/ProfileComponents/ThreadSaya";
import ProfilSaya from "../features/ProfileComponents/ProfilSaya";
import UpdateProfil from "../features/ProfileComponents/UpdateProfil";

import Admin from "../pages/Admin";
import UserList from "../features/AdminComponents/UserList";
import ScheduleList from "../features/AdminComponents/ScheduleList";

import ErrorPage from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "about", element: <AboutUs /> },
      { path: "consult", element: <Consult /> },
      {
        path: "forum",
        element: <Forum />,
        children: [
          { index: true, element: <ThreadList /> },
          { path: ":id", element: <ThreadDetail /> },
        ],
      },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPass /> },
      { path: "/reset-password", element: <ResetPass /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },

  // Admin with AdminLayout
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { index: true, element: <UserList /> },
      { path: "schedule", element: <ScheduleList /> },
    ],
  },

  // Profile with ProfileLayout
  {
    path: "/profile",
    element: <Profile />,
    children: [
      { index: true, element: <ProfilSaya /> },
      { path: "update", element: <UpdateProfil /> },
      { path: "schedule", element: <JadwalSaya /> },
      { path: "threads", element: <ThreadSaya /> },
    ],
  },
  { path: "chatbot", element: <ChatBot /> },
]);

export default router;
