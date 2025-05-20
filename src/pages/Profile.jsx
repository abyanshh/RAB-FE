import ProfileLayout from "../features/ProfileComponents/ProfileLayout"
import Navbar from "../Layout/Navbar"
import Sidebar from "../Layout/Sidebar"

const Profile = () => {
  const menuItems = [
    { name: "Profil Saya", path: "/profile" },
    { name: "Jadwal Saya", path: "/profile/schedule" },
    { name: "Thread Saya", path: "/profile/threads" },
  ];
  return (
    <>
      <Navbar />
      <Sidebar title="Profil" menuItems={menuItems} />
      <ProfileLayout/>
    </>
  )
}

export default Profile