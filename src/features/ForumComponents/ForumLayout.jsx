import { Outlet, useLocation } from "react-router-dom";
import ThreadList from "./ThreadList";
import ThreadDetail from "./ThreadDetail";
import { useEffect, useState } from "react";
import { refreshToken } from "../../services/auth";
import { jwtDecode } from "jwt-decode";

const ForumLayouts = () => {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const fetchToken = async () => {
    const accessToken = await refreshToken();
    setToken(accessToken);
    const decoded = jwtDecode(accessToken);
    setRole(decoded.role);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const renderContent = () => {
    if (location.pathname === "/forum") {
      return <ThreadList token={token} role={role} />;
    } else if (location.pathname.startsWith("/forum/")) {
      return <ThreadDetail token={token} role={role} />;
    } else {
      return <Outlet />;
    }
  };
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-cyan-800 mb-6">
          <h1 className="text-3xl font-bold mb-2">Forum Diskusi</h1>
          <p className="text-md font-semibold max-w-xl">
            Konsultasi dan berbagi cerita bersama.
          </p>
        </div>
      <main>{renderContent()}</main>
    </div>
  );
};

export default ForumLayouts;
