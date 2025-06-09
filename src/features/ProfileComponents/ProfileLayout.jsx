import { Outlet, useLocation } from "react-router-dom";
import ProfilSaya from "./ProfilSaya";
import JadwalSaya from "./JadwalSaya";
import ThreadSaya from "./ThreadSaya";
import UpdateProfil from "./UpdateProfil";

const ProfileLayout = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/profile":
        return <ProfilSaya />;
      case "/profile/update":
        return <UpdateProfil />;
      case "/profile/schedule":
        return <JadwalSaya />;
      case "/profile/threads":
        return <ThreadSaya />;
      default:
        return <Outlet />;
    }
  };

  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto mt-20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
