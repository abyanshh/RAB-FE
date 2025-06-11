import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto mt-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
