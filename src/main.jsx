import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ErrorPage from './pages/Error.jsx'
import AboutUs from './pages/about.jsx'
import Consult from './pages/Consult.jsx'
import Forum from './pages/Forum.jsx'
import ChatBot from './pages/ChatBot.jsx'

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
  },
  {
    path: "/chatbot",
    element: <ChatBot />,
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
