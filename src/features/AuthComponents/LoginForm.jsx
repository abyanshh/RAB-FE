import { useState, useEffect, useContext } from 'react'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { login, googleLogin } from '../../services/auth'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from '../../contexts/AuthContext'

const LoginForm = () => {
  
  const { fetchUser } = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Ruang Aman Bersama hadir sebagai tempat yang ramah dan bebas stigma, mendukung setiap langkahmu menuju kesehatan mental yang lebih baik.",
    "Kami percaya bahwa setiap orang berhak mendapatkan ruang yang aman untuk bercerita, didengar, dan dipahami tanpa penilaian.",
    "Melalui kolaborasi antara tenaga ahli dan komunitas, kami menciptakan lingkungan yang suportif bagi semua orang.",
    "Bergabunglah dan jadilah bagian dari gerakan yang membangun kesadaran serta kepedulian terhadap kesehatan mental di Indonesia.",
    "Di Ruang Aman Bersama, kamu tidak sendiri. Kami ada untuk menemani perjalananmu menuju kesejahteraan batin dan pikiran yang lebih kuat."
  ]

   useEffect(() => {
      const interval = setInterval(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);

  const handleGoogleLogin = useGoogleLogin({
    flow : "auth-code",
    onSuccess: async (credentialResponse) => {
      try {
        const data = await googleLogin(credentialResponse.code);
        toast.success(data.message, {
          toastId: "registration-success",
          theme: "colored",
          autoClose: 3000,
        });

        await fetchUser();
        setTimeout(() => navigate("/"), 2000);
      } catch (error) {
        toast.error(error.message, {
          toastId: "registration-error",
          theme: "colored",
          autoClose: 3000,
        });
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);

      toast.success(data.message, {
        toastId: 'login-success',
        theme: 'colored',
        autoClose: 3000,
      });

      await fetchUser();
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
    <div className="flex flex-col md:flex-row-reverse items-center justify-center px-4 max-w-6xl mx-auto">
      <div className="w-full md:w-1/2 max-w-xl bg-white p-8 rounded-lg shadow-lg">
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
            <div className="flex justify-between items-center text-sm font-medium text-gray-600 mb-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <Link to="/forgot-password" className="text-orange-500 hover:underline">Lupa Password?</Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <Button className={'w-full mb-2'} variant="orange">Login</Button>
        </form>
        {/* <Button className={'w-full mb-2'} variant="orange" onClick={handleGoogleLogin}>Login dengan google</Button> */}
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const id_token = credentialResponse.credential;
              console.log("ID Token:", id_token);

              const res = await googleLogin( id_token );

              toast.success(res.message || "Google register berhasil", {
                toastId: "google-registration-success",
                theme: "colored",
                autoClose: 3000,
              });
              setTimeout(() => navigate("/"), 2000);
            } catch (error) {
              toast.error(error.message || "Google register gagal", {
                toastId: "google-registration-error",
                theme: "colored",
                autoClose: 3000,
              });
            }
          }}
          onError={() => {
            toast.error("Google login gagal", {
              toastId: "google-login-error",
              theme: "colored",
              autoClose: 3000,
            });
          }}
          shape="pill"
          logo_alignment="center"
        />
        <ToastContainer/>
        <p className="text-center text-sm text-gray-500 mt-4">
          Belum punya akun? <Link to="/register" className="text-orange-500 hover:underline">Daftar</Link>
        </p>
      </div>
       {/* Sisi Kanan */}
      <div className="hidden md:flex w-full md:w-1/2 p-4 mr-10 transition-all">
        <div className="max-w-xl">
          <h3 className="text-3xl font-semibold text-cyan-700 mb-4">
            #RuangAmanUntukSemua
          </h3>
          <div className="flex">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="text-gray-600 text-lg"
              >
                {quotes[quoteIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm


