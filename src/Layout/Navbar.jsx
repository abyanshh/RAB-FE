import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Logo from '/image/RAB.png';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
        <div className="hidden md:flex gap-6 items-center text-cyan-700 text-md">
          <Link to="/" className="hover:text-slate-700">Home</Link>
          <Link to="/consult" className="hover:text-slate-700">Consult</Link>
          <Link to="/forum" className="hover:text-slate-700">Forum</Link>
          <Link to="/about" className="hover:text-slate-700">About</Link>
          <Button to="/login" as="link" variant="blue">Login</Button>
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
          <Link to="/login" className="hover:text-slate-700" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
