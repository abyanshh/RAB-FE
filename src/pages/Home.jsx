import Button from '../components/Button'
import MainLayout from '../Layout/MainLayout'
import heroImage2 from '/image/2222.png'
import { useEffect, useState } from 'react'
import { MdOutlineScreenSearchDesktop as Icon1, MdDiversity1 as Icon3 } from "react-icons/md";
import { AiOutlineSafety as Icon2 } from "react-icons/ai";
import { motion } from 'framer-motion'
import { BookCopy, BotMessageSquare } from 'lucide-react';

const phrases = [
  'Solusi modern untuk mendukung kesehatan mental Anda.',
  'Jadwalkan konsultasi dengan mudah dan nyaman.',
  'Terhubung dan berbagi cerita di ruang yang aman.',
  'Saling mendukung, tumbuh bersama dalam komunitas.'
];



const disorders = [
  {
    name: "Eating Disorder",
    img: 'https://img.freepik.com/free-vector/eating-disorder-concept-illustration_114360-8026.jpg?t=st=1745288015~exp=1745291615~hmac=1617663ec9928cb0d367bb211b59e76885629f6344b660ff3db56e73b9eefb6e&w=900',
    description:
      "Eating disorder adalah gangguan kesehatan mental yang ditandai dengan pola makan yang tidak sehat, seperti membatasi makan secara ekstrem, makan berlebihan, atau perilaku kompensasi seperti memuntahkan makanan. Gangguan ini dapat berdampak serius pada kesehatan fisik dan mental, serta membutuhkan penanganan medis dan psikologis.",
  },
  {
    name: "Depression",
    img: 'https://img.freepik.com/free-photo/young-man-having-headache-holding-his-head-pain-home_637285-5905.jpg?ga=GA1.1.355272737.1698826452&semt=ais_hybrid&w=740',
    description:
      "Depresi adalah gangguan suasana hati yang menyebabkan perasaan sedih terus-menerus, kehilangan minat, dan penurunan energi. Kondisi ini bisa memengaruhi cara seseorang berpikir, merasa, dan menjalani aktivitas sehari-hari.",
  },
  {
    name: "Anxiety",
    img: 'https://img.freepik.com/free-vector/business-woman-is-holding-her-hair-stress-work-hand-drawn-style-vector-design-illustrations_1150-39771.jpg?ga=GA1.1.355272737.1698826452&semt=ais_hybrid&w=740',
    description:
      "Anxiety atau gangguan kecemasan adalah kondisi ketika seseorang merasa cemas berlebihan, khawatir, atau takut secara terus-menerus tanpa alasan yang jelas. Gejala bisa berupa detak jantung cepat, sulit tidur, dan rasa gelisah. ",
  },
  {
    name: "Bipolar Disorder",
    img: 'https://img.freepik.com/free-vector/personality-disorder-concept-illustration_114360-3560.jpg?ga=GA1.1.355272737.1698826452&semt=ais_hybrid&w=740',
    description:
      "Bipolar Disorder adalah gangguan mental yang ditandai dengan perubahan suasana hati ekstrem, dari episode mania (sangat bersemangat dan impulsif) ke depresi (sangat sedih dan putus asa).",
  },
  {
    name: "Sleep Disorder",
    img: 'https://img.freepik.com/free-vector/insomnia-concept-illustration_114360-3684.jpg?t=st=1744478891~exp=1744482491~hmac=a581114f66e226a38d9133b88578fde68e78cabb8098c5af327c71ed41c2e442&w=900',
    description:
      "Sleep Disorder adalah gangguan yang memengaruhi kualitas, durasi, atau waktu tidur seseorang. Contohnya termasuk insomnia, sleep apnea, dan mimpi buruk kronis. Gangguan ini dapat berdampak pada kesehatan fisik dan mental jika tidak ditangani.",
  },
];



const Home = () => {
  return (
    <MainLayout>
      <HeroSection/>
      <FirstSection/>
      <SecondSection/>
      <ThirdSection/>
    </MainLayout>
  )
}

const HeroSection = () => {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    if (charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + currentPhrase[charIndex])
        setCharIndex(charIndex + 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setText('')
        setCharIndex(0)
        setPhraseIndex((phraseIndex + 1) % phrases.length)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, phraseIndex])

  return (
    <section className="flex flex-col-reverse md:flex-row items-center gap-10 max-w-6xl mx-auto px-4">
      {/* Text */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-800">
          Welcome to <span className="text-cyan-600">Ruang Aman Bersama</span>
        </h1>
        <motion.p
          className="text-cyan-800 mb-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {text}
          <motion.span
            className="ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            |
          </motion.span>
        </motion.p>
        <div className="flex gap-2 justify-center md:justify-start">
          <div className="flex justify-center md:justify-start gap-4">
            <Button to='/consult' as='link' variant='orange'>Get Started !</Button>
          </div>
          <div className="flex justify-center md:justify-start gap-4">
            
            <Button to='/chatbot' as='link' variant='blue' className="flex gap-2"><BotMessageSquare/> Coba Chatbot !</Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <img
          src={heroImage2}
          alt="Hero Illustration"
          className="w-sm md:w-full"
        />
      </div>
    </section>
  )
}

const FirstSection = () => {
  return (
    <section className="flex flex-col items-center bg-cyan-50 py-20 mt-20 gap-5">
      <h1 className="max-w-xs text-center text-2xl font-semibold text-cyan-800">Kenapa Memilih Ruang Aman Bersama</h1>
      <p className="max-w-3xl text-center text-slate-500">Ruang Aman Bersama hadir sebagai platform yang memberikan ruang konsultasi dan berbagi cerita bagi pengguna yang mengalami gangguan mental. </p>
      <ul className="flex flex-col md:flex-row gap-4 mt-10 max-w-6xl">
        <li className="flex flex-col gap-5 text-center items-center px-5 py-4 rounded-2xl shadow-md">
          <Icon1 className='w-12 h-12'/>
          <p className="max-w-2xs text-cyan-800">Banyak orang yang punya masalah mental ragu untuk bercerita atau mencari bantuan karena khawatir mendapat tanggapan negatif.</p>
        </li>
        <li className="flex flex-col gap-5 text-center items-center px-5 py-4 rounded-2xl shadow-md">
          <Icon2 className='w-12 h-12'/>
          <p className="max-w-2xs text-cyan-800">Orang-orang butuh tempat yang aman dan nyaman untuk ngobrol atau curhat tentang masalah mereka.</p>
        </li>
        <li className="flex flex-col gap-5 text-center items-center px-5 py-4 rounded-2xl shadow-md">
          <Icon3 className='w-12 h-12'/>
          <p className="max-w-2xs text-cyan-800">Ruang Aman Bersama adalah website yang dibuat untuk tempat konsultasi dan berbagi cerita tanpa rasa takut.</p>
        </li>
      </ul>
  </section>
  )
}

const SecondSection = () => {
  const [selected, setSelected] = useState(disorders[0]);
  return (
    <section className="flex flex-col max-w-6xl mx-auto items-center bg-white py-20 gap-10">
      <h1 className="text-2xl font-semibold text-cyan-800 text-centers">
        Kenali Jenis-Jenis Gangguan Mental
      </h1>
      <p className="text-center max-w-3xl text-slate-500">
        Gangguan mental memiliki berbagai jenis, mulai dari yang ringan hingga berat. 
        Setiap jenis memiliki gejala dan penanganan yang berbeda, namun semuanya penting untuk dikenali dan ditangani dengan tepat.
      </p>

      <div className="flex flex-col md:flex-row gap-10 max-w-4xl w-full mx-auto">
        <ul className="overflow-y-auto max-h-70 flex flex-col w-full md:w-auto mx-auto">
          {disorders.map((item, index) => (
            <Button
              key={index}
              onClick={() => setSelected(item)}
              variant="disorderlist"
              className={`mx-4 my-2
                ${
                  selected.name === item.name
                    ? "bg-cyan-600 text-white"
                    : "bg-cyan-100 text-cyan-800 hover:bg-cyan-200"
                }
              `}
            >
              <BookCopy className="w-6 h-6 mr-4"/>
              {item.name}
            </Button>
          ))}
        </ul>

        <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-md">
          <img
            src={selected.img}
            alt={selected.name}
            className="rounded-md w-full h-64 object-cover mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {selected.name}
          </h2>
          <p className="text-gray-600">{selected.description}</p>
        </div>
      </div>
    </section>
  )
}

const ThirdSection = () => {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex bg-cyan-50 rounded-2xl px-10 py-15 mt-20 justify-between items-center">
        <div>
          <h2 className="text-slate-500">Coba Sekarang!</h2>
          <div className="max-w-xl text-3xl font-bold text-cyan-800 my-5">
            <h1>
              Buat Jadwal Konsultasi dan Berbagi Cerita dengan <span className="text-cyan-600">Ruang Aman Bersama</span>
            </h1>
          </div>
          <Button to="/consult" as="link" variant="orange">Buat Jadwal !</Button>
        </div>
        <div className="h-64">
          <img 
            src="image/2222.png" 
            alt="join" 
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </section>
  )
}

export default Home
