import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const MainLayout = () => {
  const location = useLocation()
  const cyanPages = ['/register', '/login']
  const isCyanPage = cyanPages.includes(location.pathname)

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className={`mt-20 min-h-screen py-20 px-3 ${isCyanPage ? 'bg-cyan-50' : ''}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
//fix layout
export default MainLayout

