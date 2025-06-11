import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";

// Pages
import App from "../App";
import AboutUs from "../pages/About";
import Consult from "../pages/Consult";
import ChatBot from "../pages/ChatBot";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPass from "../pages/ForgotPass";
import ResetPass from "../pages/ResetPass";
import ErrorPage from "../pages/Error";

// Forum
import Forum from "../pages/Forum";
import ThreadList from "../features/ForumComponents/ThreadList";
import ThreadDetail from "../features/ForumComponents/ThreadDetail";

// Profile
import ProfilSaya from "../features/ProfileComponents/ProfilSaya";
import UpdateProfil from "../features/ProfileComponents/UpdateProfil";
import JadwalSaya from "../features/ProfileComponents/JadwalSaya";
import ThreadSaya from "../features/ProfileComponents/ThreadSaya";

// Admin
import UserList from "../features/AdminComponents/UserList";
import ScheduleList from "../features/AdminComponents/ScheduleList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<App />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="consult" element={<Consult />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPass />} />
        <Route path="reset-password" element={<ResetPass />} />
        <Route path="*" element={<ErrorPage />} />

        {/* Forum Nested */}
        <Route path="forum" element={<Forum />}>
          <Route index element={<ThreadList />} />
          <Route path=":id" element={<ThreadDetail />} />
        </Route>
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<UserList />} />
        <Route path="schedule" element={<ScheduleList />} />
      </Route>

      {/* Profile Layout */}
      <Route path="/profile" element={<Profile />}>
        <Route index element={<ProfilSaya />} />
        <Route path="update" element={<UpdateProfil />} />
        <Route path="schedule" element={<JadwalSaya />} />
        <Route path="threads" element={<ThreadSaya />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<ErrorPage />} />
      <Route path="chatbot" element={<ChatBot />} />
    </>
  )
);

export default router;
