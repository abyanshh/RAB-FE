import ProfileLayout from "../features/ProfileComponents/ProfileLayout";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { MessageSquareQuote, NotebookTabs, User } from "lucide-react";

const Profile = () => {
  const menuItems = [
    { name: "Profil Saya", path: "/profile", icon: <User /> },
    { name: "Jadwal Saya", path: "/profile/schedule", icon: <NotebookTabs /> },
    { name: "Thread Saya", path: "/profile/threads", icon: <MessageSquareQuote /> },
  ];

  return (
    <>
      <Navbar />
      <Sidebar title="Profil" menuItems={menuItems} />
      <ProfileLayout />
    </>
  );
};

export default Profile;
