import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { BotMessageSquare } from "lucide-react";

const FooterLayout = ({ children }) => {
  return (
    <>
      <footer className="shadow-2xl text-cyan-800">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-4 gap-10 text-sm">
          {children}
        </div>
        <div
          className={`fixed bottom-0 right-0 m-4 ${
            window.location.pathname === "/chatbot" ? "hidden" : "block"
          }`}
        >
          <div className="relative p-[2px] rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 hover:drop-shadow-xl/20">
            <Link to="/chatbot">
              <div className="bg-white rounded-full p-3 w-full h-full text-cyan-600 hover:text-cyan-800">
                <BotMessageSquare className="" />
              </div>
            </Link>
          </div>
        </div>
        <div className="py-4 bg-cyan-50 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} RuangAmanBersama. All rights reserved.
        </div>
      </footer>
    </>
  );
};

const Footer = () => {
  return (
    <FooterLayout>
      {/* About */}
      <div>
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p>
          Ruang Aman Bersama adalah aplikasi yang dirancang untuk membantu
          pengguna dalam berkonsultasi seputar kesehatan mental. Kami
          menyediakan ruang yang aman dan nyaman agar setiap individu dapat
          merasa didengar, dipahami, dan mendapat dukungan yang dibutuhkan
        </p>
      </div>

      {/* Our Service */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Our Service</h3>
        <ul className="flex flex-col gap-6">
          <li>
            <Link to="/consult">Consultation</Link>
          </li>
          <li>
            <Link to="/scheduling">Scheduling</Link>
          </li>
          <li>
            <Link to="/forum">Forum & Community</Link>
          </li>
          <li>
            <Link to="/chatbot">ChatBot</Link>
          </li>
        </ul>
      </div>

      {/* Others */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Others</h3>
        <ul className="flex flex-col gap-6">
          <li>Contact Us</li>
          <li>About Us</li>
          <li>FAQ</li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Social Media</h3>
        <div className="flex flex-col gap-5 text-2xl">
          <Link
            to="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-700"
          >
            <FaInstagram />
          </Link>
          <Link
            to="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-700"
          >
            <FaTwitter />
          </Link>
          <Link
            to="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-700"
          >
            <FaFacebook />
          </Link>
        </div>
      </div>
    </FooterLayout>
  );
};

export default Footer;
