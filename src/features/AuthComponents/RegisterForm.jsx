import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { register, googleRegister } from "../../services/auth";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const quotes = [
    "Ruang Aman Bersama hadir sebagai tempat yang ramah dan bebas stigma, mendukung setiap langkahmu menuju kesehatan mental yang lebih baik.",
    "Kami percaya bahwa setiap orang berhak mendapatkan ruang yang aman untuk bercerita, didengar, dan dipahami tanpa penilaian.",
    "Melalui kolaborasi antara tenaga ahli dan komunitas, kami menciptakan lingkungan yang suportif bagi semua orang.",
    "Bergabunglah dan jadilah bagian dari gerakan yang membangun kesadaran serta kepedulian terhadap kesehatan mental di Indonesia.",
    "Di Ruang Aman Bersama, kamu tidak sendiri. Kami ada untuk menemani perjalananmu menuju kesejahteraan batin dan pikiran yang lebih kuat.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRegisterLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (credentialResponse) => {
      try {
        const data = await googleRegister(credentialResponse.code);
        toast.success(data.message, {
          toastId: "registration-success",
          theme: "colored",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/login"), 2000);
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
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const data = await register(name, fullname, email, password);
        toast.success(data.message, {
          toastId: "registration-success",
          theme: "colored",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        toast.error(error.message, {
          toastId: "registration-error",
          theme: "colored",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Password tidak sesuai", {
        toastId: "password-mismatch",
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center px-4 max-w-6xl mx-auto">
        {/* Form Register */}
        <div className="w-full md:w-1/2 max-w-xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Daftar
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
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
            </div>
            <Button className="w-full mb-2" variant="orange">
              Daftar
            </Button>
          </form>
          {/* <Button className="w-full mb-2" variant="orange" onClick={handleRegisterLogin}>
            Login dengan google
          </Button>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const id_token = credentialResponse.credential;
                const res = await googleRegister(id_token);
                toast.success(res.message || "Google register berhasil", {
                  toastId: "google-registration-success",
                  theme: "colored",
                  autoClose: 3000,
                });
                setTimeout(() => navigate("/login"), 2000);
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
            text="signup_with"
            shape="pill"
            logo_alignment="center"
          /> */}

          <ToastContainer />

          <p className="text-center text-sm text-gray-500 mt-4">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Sisi Kanan */}
        <div className="hidden md:flex w-full md:w-1/2 p-4 ml-10 transition-all">
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

      <Modal isOpen={loading} title="">
        <div className="flex flex-col items-center justify-center min-h-[180px] space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-25" />
            <div className="w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-700">Sedang memuat</h3>
            <p className="text-sm text-gray-500">Mohon tunggu sebentar...</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;
