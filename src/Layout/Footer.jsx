import React from 'react'
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const FooterLayout = ({ children }) => {
  return (
    <>
    <footer className="bg-gray-100 text-cyan-700 mt-10">
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-4 gap-10 text-sm">
      {children}
    </div>
    <div className="py-4 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} RuangAmanBersama. All rights reserved.
    </div>
    </footer>
    </>
  )
}

const Footer = () => {
  return (
    <FooterLayout>
       {/* About */}
        <div> 
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p>
          Ruang Aman Bersama adalah aplikasi yang dirancang untuk membantu pengguna dalam berkonsultasi seputar kesehatan mental. Kami menyediakan ruang yang aman dan nyaman agar setiap individu dapat merasa didengar, dipahami, dan mendapat dukungan yang dibutuhkan
          </p>
        </div>

        {/* Our Service */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Our Service</h3>
          <ul className="flex flex-col gap-6">
            <li>Consultation</li>
            <li>Scheduling</li>
            <li>Forum & Community</li>
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
              <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700">
                <FaInstagram />
              </Link>
              <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700">
                <FaTwitter />
              </Link>
              <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700">
                <FaFacebook />
              </Link>
            </div>
          </div>
    </FooterLayout>
  )
}

export default Footer