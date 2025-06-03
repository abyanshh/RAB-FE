import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ForgotPass from './pages/ForgotPass.jsx'
import ResetPass from './pages/ResetPass.jsx'
import ErrorPage from './pages/Error.jsx'
import AboutUs from './pages/about.jsx'
import Consult from './pages/Consult.jsx'
import Forum from './pages/Forum.jsx'
import ChatBot from './pages/ChatBot.jsx'
import Profile from './pages/Profile.jsx'
import ProfilSaya from './features/ProfileComponents/ProfilSaya.jsx'
import JadwalSaya from './features/ProfileComponents/JadwalSaya.jsx'
import ThreadSaya from './features/ProfileComponents/ThreadSaya.jsx'
import Admin from './pages/Admin.jsx'
import UserList from './features/AdminComponents/UserList.jsx'
import ScheduleList from './features/AdminComponents/ScheduleList.jsx'
import UpdateProfil from './features/ProfileComponents/UpdateProfil.jsx'
import ThreadList from './features/ForumComponents/ThreadList.jsx'
import ThreadDetail from './features/ForumComponents/ThreadDetail.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPass />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/consult",
    element: <Consult />,
  },
  {
    path: "/forum",
    element: <Forum />,
    children: [
      { index: true, element: <ThreadList /> },
      { path: ":id", element: <ThreadDetail /> },
    ]
  },
  {
    path: "/chatbot",
    element: <ChatBot />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { index: true, element: <UserList /> },
      { path: "schedule", element: <ScheduleList /> },
    ]
  },
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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)

