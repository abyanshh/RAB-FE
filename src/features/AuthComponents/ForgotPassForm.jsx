import { useState } from 'react'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { forgotPassword } from '../../services/auth'


const ForgotPassForm = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await forgotPassword(email);

      toast.success(data.message, {
        toastId: "forgot-password-success",
        theme: "colored",
        autoClose: 3000,
      });

    } catch (error) {
      toast.error(error.message, {
        toastId: "forgot-password-error",
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Lupa Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-center">
              Masukkan email terdaftar Anda untuk reset kata sandi
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <Button className={"w-full"} variant="orange">
            Kirim Link Reset Password
          </Button>
        </form>
        <ToastContainer />
        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassForm;

