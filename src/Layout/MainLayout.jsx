import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = () => {
  const location = useLocation()
  const cyanPages = ['/register', '/login']
  const isCyanPage = cyanPages.includes(location.pathname)

  return (
    <>
      <Navbar />
      <div className={`mt-20 min-h-screen py-20 px-3 ${isCyanPage ? 'bg-cyan-50' : ''}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default MainLayout

