import { useState } from 'react'
import Button from '../../components/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { resetPassword } from '../../services/auth'

const ResetPassForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords tidak sama", {
        toastId: "reset-password-error",
        theme: "colored",
        autoClose: 3000,
      });
      return;
    }

    try {
      const data = await resetPassword(token, password);

      toast.success(data.message, {
        toastId: "reset-password-success",
        theme: "colored",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Gagal mereset password", {
        toastId: "reset-password-error",
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <Button className={"w-full"} variant="orange">
            Reset Password
          </Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassForm;
