import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Logo from '/image/RAB.png';
import { HiMenu, HiX } from 'react-icons/hi';
import { logout as logoutService, refreshToken } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [token, setToken] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchToken();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  const fetchToken = async () => {
    const accessToken = await refreshToken();
    if (accessToken) {
      setToken(accessToken);
      const decoded = jwtDecode(accessToken);
      setRole(decoded.role);
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setToken("");
    } catch (error) {
      console.log(error.message);
    }
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

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6 items-center text-cyan-700 text-md relative">
          <Link to="/" className="hover:text-slate-700">Home</Link>
          <Link to="/consult" className="hover:text-slate-700">Consult</Link>
          <Link to="/forum" className="hover:text-slate-700">Forum</Link>
          <Link to="/about" className="hover:text-slate-700">About</Link>

          {token ? (
            <div className="relative">
              <Button onClick={toggleProfileMenu} variant="blue">Profile</Button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 bg-white px-6 py-4 rounded-md border border-cyan-500 shadow-md flex flex-col gap-4 text-cyan-700 font-medium z-50">
                  {role === "user" && (
                    <>
                      <Link to="/profile" className="hover:text-slate-700" onClick={() => setIsProfileOpen(false)}>Profile</Link>
                      <Link to="/profile/schedule" className="hover:text-slate-700" onClick={() => setIsProfileOpen(false)}>Schedule</Link>
                      <Link to="/profile/threads" className="hover:text-slate-700" onClick={() => setIsProfileOpen(false)}>Threads</Link>
                      <Link to="/" className="hover:text-slate-700" onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}>Logout</Link>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <Link to="/admin" className="hover:text-slate-700" onClick={() => setIsProfileOpen(false)}>Admin</Link>
                      <Link to="/profile" className="hover:text-slate-700" onClick={() => setIsProfileOpen(false)}>Profile</Link>
                      <Link to="/" className="hover:text-slate-700" onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}>Logout</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Button to="/login" as="link" variant="blue">Login</Button>
          )}
        </div>


        {/* Burger Button (Mobile) */}
        <div className="md:hidden">
          <Button variant="menu" onClick={toggleMenu}>
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Dropdown Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-md flex flex-col gap-4 text-cyan-700 font-medium item">
          <Link to="/" className="hover:text-slate-700" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/consult" className="hover:text-slate-700" onClick={() => setIsOpen(false)}>Consult</Link>
          <Link to="/forum" className="hover:text-slate-700" onClick={() => setIsOpen(false)}>Forum</Link>
          <Link to="/about" className="hover:text-slate-700" onClick={() => setIsOpen(false)}>About Us</Link>
          {token ? (
            <>
              <Button as="link" to="/profile" variant="blue" className="text-center">Profile</Button>
              <Button onClick={logout} variant="red">Logout</Button>
            </>
          ) : (
            <Link to="/login" className="hover:text-slate-700" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

