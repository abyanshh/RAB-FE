import { useState } from 'react'
import Button from '../../components/Button'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { login } from '../../services/auth'
const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = await login(email, password);
        
        toast.success(data.message, {
          toastId: 'login-success',
          theme: 'colored',
          autoClose: 3000,
        });

        setTimeout(() => navigate('/'), 2000);
      } catch (error) {
        toast.error(error.message, {
          toastId: 'login-error',
          theme: 'colored',
          autoClose: 3000,
        });
      }
    };

  return (
    <div className="flex items-center justify-center px-4">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <Button className={'w-full'} variant="orange">Login</Button>
        <Button className={'w-full flex gap-2 items-center justify-center'} variant="gray">
          <FcGoogle className='text-2xl'/>Login with Google
        </Button>
      </form>
      <ToastContainer/>
      <p className="text-center text-sm text-gray-500 mt-4">
        Belum punya akun? <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
      </p>
    </div>
  </div>
  )
}

export default LoginForm
