import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = ({children}) => {
  return (
    <>
        <Navbar/>
        <div className='mt-20'>
          {children}
        </div>
        <Footer/>
    </>
  )
}

export default MainLayout