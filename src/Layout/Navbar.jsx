import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import Logo from "/image/RAB.png";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, role, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b-4 border-cyan-600 shadow-md">
      <div className="max-w-6xl mx-auto flex px-4 py-3 justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-28" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-cyan-700 text-md relative">
          <Link to="/">Home</Link>
          <Link to="/consult">Consult</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/about">About</Link>

          {user ? (
            <div className="relative">
              <img
                src={user.avatar_url || "image/image.png"}
                alt="Profile"
                className="border-2 w-10 h-10 rounded-full cursor-pointer hover:scale-105"
                onClick={toggleProfileMenu}
              />
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 bg-white px-6 py-4 rounded-md border border-cyan-500 shadow-md flex flex-col gap-4 text-center text-cyan-700 font-medium z-50 divide-y">
                  {role === "user" && (
                    <>
                      <Link to="/profile" onClick={() => setIsProfileOpen(false)}>Profile</Link>
                      <Link to="/profile/schedule" onClick={() => setIsProfileOpen(false)}>Jadwal</Link>
                      <Link to="/profile/threads" onClick={() => setIsProfileOpen(false)}>Threads</Link>
                      <button onClick={handleLogout} className="text-red-600 hover:text-red-700 cursor-pointer">Logout</button>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <Link to="/admin" onClick={() => setIsProfileOpen(false)}>Admin</Link>
                      <Link to="/profile" onClick={() => setIsProfileOpen(false)}>Profile</Link>
                      <button onClick={handleLogout} className="text-red-600 hover:text-red-700 cursor-pointer">Logout</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Button to="/login" as="link" variant="blue">Login</Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="menu" onClick={toggleMenu}>
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-md flex flex-col gap-4 text-cyan-700 font-medium">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/consult" onClick={() => setIsOpen(false)}>Consult</Link>
          <Link to="/forum" onClick={() => setIsOpen(false)}>Forum</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="text-start text-red-600 hover:text-red-700 cursor-pointer">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
