import { useState } from 'react'
import Button from '../../components/Button'
import { FcGoogle } from 'react-icons/fc'
import { Link, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/auth/register', {
        username: name,
        email,
        password,
        confirmPassword,
      });

      if (res.status === 201) {
        toast.success(res.data.message, {
          toastId: 'registration-success',
          theme: "colored",
          position: "bottom-left",
          autoClose: 3000,
        });
        setTimeout(() => Navigate('/login'), 2000);
      }
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.error || 'Terjadi kesalahan saat registrasi';

      toast.error(message, {
        toastId: 'registration-error',
        theme: "colored",
        position: "bottom-left",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
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

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <Button className={'w-full'} variant="orange">Register</Button>
          <Button className={'w-full flex gap-2 items-center justify-center'} variant="gray">
            <FcGoogle className='text-2xl'/>Register with Google
          </Button>
        </form>
      <ToastContainer />

        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
