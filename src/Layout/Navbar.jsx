import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Logo from '/image/RAB.png'
const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-white border-b-4 border-cyan-600 shadow-md">
    <div className='max-w-6xl mx-auto flex px-4 py-4 justify-between items-center'>
       <div>
          <img
            src={Logo}
            alt="Hero Illustration"
            className="w-27"
          />
        </div>
        <div className='flex gap-4 text-cyan-700 text-sm items-center'>
            <Link to='/' className='hover:text-slate-700'>Home</Link>
            <Link to='/consult' className='hover:text-slate-700'>Consult</Link>
            <Link to='/forum' className='hover:text-slate-700'>Forum</Link>
            <Link to='/about' className='hover:text-slate-700'>About Us</Link>
            <Button to='/login' as='link' variant='orange'>Login</Button>
        </div>
    </div>
    </nav>
  )
}

export default Navbar