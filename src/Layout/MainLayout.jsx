import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = ({children}) => {
  return (
    <>
        <Navbar/>
        <div className='mt-20 min-h-screen py-20 px-3'>
          {children}
        </div>
        <Footer/>
    </>
  )
}

export default MainLayout