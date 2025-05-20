"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Users, Clock, ChevronRight, Search, PlusCircle, ThumbsUp, Reply, X } from "lucide-react"
import MainLayout from "../Layout/MainLayout"

// Sample data for forums
const forumCategories = [
  {
    id: 1,
    name: "Teknologi",
    description: "Diskusi tentang teknologi terbaru, gadget, dan perkembangan IT",
    icon: "💻",
    threads: 156,
    posts: 1243,
    color: "bg-blue-100",
  },
  {
    id: 2,
    name: "Kesehatan",
    description: "Berbagi tips kesehatan, informasi medis, dan gaya hidup sehat",
    icon: "🏥",
    threads: 98,
    posts: 876,
    color: "bg-green-100",
  },
  {
    id: 3,
    name: "Pendidikan",
    description: "Forum untuk diskusi pendidikan, metode belajar, dan berbagi materi",
    icon: "📚",
    threads: 124,
    posts: 932,
    color: "bg-yellow-100",
  },
  {
    id: 4,
    name: "Keuangan",
    description: "Diskusi tentang investasi, tabungan, dan manajemen keuangan",
    icon: "💰",
    threads: 87,
    posts: 654,
    color: "bg-purple-100",
  },
  {
    id: 5,
    name: "Hobi & Hiburan",
    description: "Berbagi tentang film, musik, olahraga, dan aktivitas waktu luang",
    icon: "🎮",
    threads: 210,
    posts: 1876,
    color: "bg-pink-100",
  },
]

// Sample threads data
const threadsData = {
  1: [
    {
      id: 101,
      title: "Rekomendasi laptop untuk programmer pemula",
      author: {
        name: "Budi Santoso",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Mei 2022",
      },
      date: "2 jam yang lalu",
      content:
        "Halo semua, saya baru mulai belajar programming dan sedang mencari laptop yang cocok untuk coding. Budget sekitar 10-15 juta. Ada yang bisa kasih rekomendasi? Terima kasih sebelumnya!",
      replies: 8,
      views: 124,
      likes: 15,
      tags: ["laptop", "programming", "rekomendasi"],
      isSticky: true,
    },
    {
      id: 102,
      title: "Perkembangan AI di Indonesia",
      author: {
        name: "Dewi Lestari",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Jan 2021",
      },
      date: "Kemarin",
      content:
        "Bagaimana menurut kalian perkembangan AI di Indonesia saat ini? Apakah sudah cukup maju atau masih tertinggal dibanding negara lain?",
      replies: 12,
      views: 230,
      likes: 28,
      tags: ["AI", "teknologi", "indonesia"],
      isSticky: false,
    },
    {
      id: 103,
      title: "Tips mengamankan akun dari serangan hacker",
      author: {
        name: "Rudi Hermawan",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Nov 2020",
      },
      date: "3 hari yang lalu",
      content:
        "Dengan maraknya kasus pembobolan akun belakangan ini, saya ingin berbagi beberapa tips untuk mengamankan akun online kita dari serangan hacker.",
      replies: 15,
      views: 342,
      likes: 47,
      tags: ["keamanan", "cyber", "tips"],
      isSticky: false,
    },
  ],
  2: [
    {
      id: 201,
      title: "Cara menjaga kesehatan mental di masa pandemi",
      author: {
        name: "Siti Nurhaliza",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Apr 2021",
      },
      date: "5 jam yang lalu",
      content:
        "Selama pandemi, banyak dari kita yang mengalami stress dan kecemasan. Mari berbagi tips bagaimana cara menjaga kesehatan mental di masa sulit ini.",
      replies: 23,
      views: 456,
      likes: 89,
      tags: ["kesehatan mental", "pandemi", "tips"],
      isSticky: true,
    },
    {
      id: 202,
      title: "Rekomendasi vitamin untuk meningkatkan imunitas",
      author: {
        name: "Dr. Anita",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Feb 2019",
      },
      date: "2 hari yang lalu",
      content:
        "Sebagai dokter, saya ingin berbagi rekomendasi vitamin dan suplemen yang bisa membantu meningkatkan sistem imun tubuh. Apa yang kalian konsumsi selama ini?",
      replies: 18,
      views: 312,
      likes: 45,
      tags: ["vitamin", "imunitas", "kesehatan"],
      isSticky: false,
    },
  ],
  3: [
    {
      id: 301,
      title: "Metode belajar efektif untuk ujian",
      author: {
        name: "Andi Wijaya",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Jul 2022",
      },
      date: "1 hari yang lalu",
      content:
        "Halo teman-teman, saya mau berbagi metode belajar yang saya gunakan untuk persiapan ujian. Metode ini sangat membantu saya mendapatkan nilai bagus.",
      replies: 14,
      views: 267,
      likes: 32,
      tags: ["belajar", "ujian", "tips"],
      isSticky: false,
    },
  ],
  4: [
    {
      id: 401,
      title: "Tips investasi saham untuk pemula",
      author: {
        name: "Hendra Gunawan",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Sep 2020",
      },
      date: "3 jam yang lalu",
      content:
        "Bagi yang baru mulai investasi saham, saya ingin berbagi beberapa tips dasar yang perlu diperhatikan agar tidak rugi di awal.",
      replies: 19,
      views: 345,
      likes: 56,
      tags: ["investasi", "saham", "pemula"],
      isSticky: true,
    },
  ],
  5: [
    {
      id: 501,
      title: "Film terbaik 2023 yang wajib ditonton",
      author: {
        name: "Maya Sari",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Dec 2021",
      },
      date: "6 jam yang lalu",
      content:
        "Tahun 2023 banyak film bagus yang dirilis. Menurut kalian, film apa saja yang wajib ditonton tahun ini?",
      replies: 27,
      views: 512,
      likes: 78,
      tags: ["film", "2023", "rekomendasi"],
      isSticky: false,
    },
  ],
}

// Sample replies data
const repliesData = {
  101: [
    {
      id: 1001,
      author: {
        name: "Rina Marlina",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Jun 2021",
      },
      date: "2 jam yang lalu",
      content:
        "Untuk programmer pemula, saya sarankan laptop dengan minimal RAM 8GB dan prosesor i5 generasi 10 ke atas. Beberapa merek yang bagus seperti Lenovo ThinkPad, Dell XPS, atau MacBook Air M1 kalau budget mencukupi.",
      likes: 8,
    },
    {
      id: 1002,
      author: {
        name: "Agus Pratama",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Mar 2020",
      },
      date: "1 jam yang lalu",
      content:
        "Saya setuju dengan Rina. Saya sendiri menggunakan Lenovo ThinkPad dan sangat puas untuk coding. Pastikan juga SSD minimal 256GB untuk kenyamanan.",
      likes: 5,
    },
    {
      id: 1003,
      author: {
        name: "Dian Sastro",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "Aug 2022",
      },
      date: "45 menit yang lalu",
      content:
        "Kalau saya lebih merekomendasikan ASUS ROG atau Acer Predator. Meskipun laptop gaming, tapi performa untuk coding juga sangat bagus, terutama kalau kamu juga tertarik dengan pengembangan game.",
      likes: 3,
    },
  ],
}

export default function Forum() {
  const [view, setView] = useState("categories") // categories, threads, thread-detail
  const [currentCategory, setCurrentCategory] = useState(null)
  const [currentThread, setCurrentThread] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false)
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const [newThreadTitle, setNewThreadTitle] = useState("")
  const [newThreadContent, setNewThreadContent] = useState("")
  const [newReplyContent, setNewReplyContent] = useState("")
  const modalRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsNewThreadModalOpen(false)
        setIsReplyModalOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter categories based on search term
  const filteredCategories = forumCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filter threads based on search term
  const filteredThreads = currentCategory
    ? threadsData[currentCategory.id]?.filter(
        (thread) =>
          thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          thread.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ) || []
    : []

  const handleCategoryClick = (category) => {
    setCurrentCategory(category)
    setView("threads")
    setSearchTerm("")
  }

  const handleThreadClick = (thread) => {
    setCurrentThread(thread)
    setView("thread-detail")
  }

  const handleBackToCategories = () => {
    setCurrentCategory(null)
    setView("categories")
    setSearchTerm("")
  }

  const handleBackToThreads = () => {
    setCurrentThread(null)
    setView("threads")
  }

  const handleCreateThread = () => {
    // In a real app, this would send the new thread data to a server
    console.log("Creating new thread:", {
      title: newThreadTitle,
      content: newThreadContent,
      categoryId: currentCategory.id,
    })

    // Close modal and reset form
    setIsNewThreadModalOpen(false)
    setNewThreadTitle("")
    setNewThreadContent("")

    // Show success message or update UI
    alert("Thread berhasil dibuat!")
  }

  const handleCreateReply = () => {
    // In a real app, this would send the reply data to a server
    console.log("Creating new reply:", {
      content: newReplyContent,
      threadId: currentThread.id,
    })

    // Close modal and reset form
    setIsReplyModalOpen(false)
    setNewReplyContent("")

    // Show success message or update UI
    alert("Balasan berhasil dikirim!")
  }

  return (
    <MainLayout>
        <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Forum Diskusi</h1>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
            <button onClick={handleBackToCategories} className="hover:text-gray-900 hover:underline">
            Forum
            </button>

            {currentCategory && (
            <>
                <ChevronRight className="h-4 w-4 mx-2" />
                <button
                onClick={handleBackToThreads}
                className={`hover:text-gray-900 hover:underline ${!currentThread ? "font-medium text-gray-900" : ""}`}
                >
                {currentCategory.name}
                </button>
            </>
            )}

            {currentThread && (
            <>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="font-medium text-gray-900 truncate max-w-xs">{currentThread.title}</span>
            </>
            )}
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
                type="text"
                placeholder={
                view === "categories"
                    ? "Cari kategori forum..."
                    : view === "threads"
                    ? `Cari di forum ${currentCategory?.name}...`
                    : "Cari dalam diskusi ini..."
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>

            {view === "threads" && (
            <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                onClick={() => setIsNewThreadModalOpen(true)}
            >
                <PlusCircle className="h-5 w-5 mr-2" />
                Buat Thread Baru
            </button>
            )}

            {view === "thread-detail" && (
            <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                onClick={() => setIsReplyModalOpen(true)}
            >
                <Reply className="h-5 w-5 mr-2" />
                Balas
            </button>
            )}
        </div>

        {/* Forum Categories View */}
        {view === "categories" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                <div
                    key={category.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                >
                    <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div
                        className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-2xl`}
                        >
                        {category.icon}
                        </div>
                        <div className="ml-4">
                        <h3 className="font-bold text-lg">{category.name}</h3>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mt-4 justify-between">
                        <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{category.threads} threads</span>
                        </div>
                        <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{category.posts} posts</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="col-span-2 text-center py-12">
                <h3 className="text-lg font-medium">Tidak ada kategori yang ditemukan</h3>
                <p className="text-gray-600 mt-2">Coba ubah kata kunci pencarian Anda</p>
                </div>
            )}
            </div>
        )}

        {/* Threads View */}
        {view === "threads" && currentCategory && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center">
                <div
                    className={`w-10 h-10 rounded-full ${currentCategory.color} flex items-center justify-center text-xl`}
                >
                    {currentCategory.icon}
                </div>
                <div className="ml-3">
                    <h2 className="font-bold text-xl">{currentCategory.name}</h2>
                    <p className="text-gray-600 text-sm">{currentCategory.description}</p>
                </div>
                </div>
            </div>

            {filteredThreads.length > 0 ? (
                <div className="divide-y divide-gray-200">
                {filteredThreads.map((thread) => (
                    <div
                    key={thread.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${thread.isSticky ? "bg-blue-50" : ""}`}
                    onClick={() => handleThreadClick(thread)}
                    >
                    <div className="flex items-start">
                        <img
                        src={thread.author.avatar || "/placeholder.svg"}
                        alt={thread.author.name}
                        className="w-10 h-10 rounded-full mr-4"
                        />
                        <div className="flex-grow">
                        <div className="flex items-center mb-1">
                            {thread.isSticky && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">Sticky</span>
                            )}
                            <h3 className="font-bold text-lg">{thread.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{thread.content}</p>

                        <div className="flex flex-wrap gap-1 mb-2">
                            {thread.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                                {tag}
                            </span>
                            ))}
                        </div>

                        <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-4">Oleh: {thread.author.name}</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{thread.date}</span>
                        </div>
                        </div>

                        <div className="text-right text-sm">
                        <div className="flex items-center justify-end mb-1">
                            <MessageSquare className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{thread.replies} balasan</span>
                        </div>
                        <div className="flex items-center justify-end mb-1">
                            <Users className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{thread.views} dilihat</span>
                        </div>
                        <div className="flex items-center justify-end">
                            <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{thread.likes} suka</span>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-12">
                <h3 className="text-lg font-medium">Tidak ada thread yang ditemukan</h3>
                <p className="text-gray-600 mt-2">Coba ubah kata kunci pencarian Anda atau buat thread baru</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center"
                    onClick={() => setIsNewThreadModalOpen(true)}
                >
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Buat Thread Baru
                </button>
                </div>
            )}
            </div>
        )}

        {/* Thread Detail View */}
        {view === "thread-detail" && currentThread && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Thread Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-start">
                <img
                    src={currentThread.author.avatar || "/placeholder.svg"}
                    alt={currentThread.author.name}
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-grow">
                    <h2 className="font-bold text-2xl mb-2">{currentThread.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                    {currentThread.tags.map((tag) => (
                        <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                        {tag}
                        </span>
                    ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">{currentThread.author.name}</span>
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Bergabung: {currentThread.author.joinDate}</span>
                    <span className="text-gray-500 mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{currentThread.date}</span>
                    </div>
                </div>
                </div>

                <div className="mt-6 text-gray-800">
                <p className="whitespace-pre-line">{currentThread.content}</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <ThumbsUp className="h-5 w-5 mr-1" />
                    <span>Suka ({currentThread.likes})</span>
                    </button>
                    <button
                    className="flex items-center text-gray-600 hover:text-blue-600 ml-4"
                    onClick={() => setIsReplyModalOpen(true)}
                    >
                    <Reply className="h-5 w-5 mr-1" />
                    <span>Balas</span>
                    </button>
                </div>
                <div className="text-sm text-gray-500">
                    <span>{currentThread.views} dilihat</span>
                </div>
                </div>
            </div>

            {/* Replies */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-bold text-lg">Balasan ({repliesData[currentThread.id]?.length || 0})</h3>
            </div>

            {repliesData[currentThread.id] ? (
                <div className="divide-y divide-gray-200">
                {repliesData[currentThread.id].map((reply) => (
                    <div key={reply.id} className="p-6">
                    <div className="flex items-start">
                        <img
                        src={reply.author.avatar || "/placeholder.svg"}
                        alt={reply.author.name}
                        className="w-10 h-10 rounded-full mr-4"
                        />
                        <div className="flex-grow">
                        <div className="flex items-center mb-2">
                            <span className="font-medium mr-2">{reply.author.name}</span>
                            <span className="text-gray-500 mr-2">•</span>
                            <span className="text-sm text-gray-500">Bergabung: {reply.author.joinDate}</span>
                            <span className="text-gray-500 mx-2">•</span>
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-sm text-gray-500">{reply.date}</span>
                        </div>

                        <div className="text-gray-800 mb-3">
                            <p className="whitespace-pre-line">{reply.content}</p>
                        </div>

                        <div className="flex items-center">
                            <button className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>Suka ({reply.likes})</span>
                            </button>
                            <button
                            className="flex items-center text-sm text-gray-600 hover:text-blue-600 ml-4"
                            onClick={() => setIsReplyModalOpen(true)}
                            >
                            <Reply className="h-4 w-4 mr-1" />
                            <span>Balas</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-12">
                <p className="text-gray-600">Belum ada balasan. Jadilah yang pertama membalas!</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center"
                    onClick={() => setIsReplyModalOpen(true)}
                >
                    <Reply className="h-5 w-5 mr-2" />
                    Balas Thread
                </button>
                </div>
            )}
            </div>
        )}

        {/* New Thread Modal */}
        {isNewThreadModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
                </span>

                <div
                ref={modalRef}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setIsNewThreadModalOpen(false)}
                    >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Buat Thread Baru di {currentCategory?.name}
                        </h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">Silakan isi judul dan konten thread yang ingin Anda buat.</p>
                        </div>

                        <div className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="thread-title" className="block text-sm font-medium text-gray-700">
                            Judul Thread
                            </label>
                            <input
                            type="text"
                            id="thread-title"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Masukkan judul thread"
                            value={newThreadTitle}
                            onChange={(e) => setNewThreadTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="thread-content" className="block text-sm font-medium text-gray-700">
                            Konten
                            </label>
                            <textarea
                            id="thread-content"
                            rows={6}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Tulis konten thread Anda di sini..."
                            value={newThreadContent}
                            onChange={(e) => setNewThreadContent(e.target.value)}
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                        !newThreadTitle || !newThreadContent ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleCreateThread}
                    disabled={!newThreadTitle || !newThreadContent}
                    >
                    Buat Thread
                    </button>
                    <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsNewThreadModalOpen(false)}
                    >
                    Batal
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Reply Modal */}
        {isReplyModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
                </span>

                <div
                ref={modalRef}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setIsReplyModalOpen(false)}
                    >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Balas Thread: {currentThread?.title}
                        </h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">Tulis balasan Anda untuk thread ini.</p>
                        </div>

                        <div className="mt-4">
                        <label htmlFor="reply-content" className="block text-sm font-medium text-gray-700">
                            Balasan Anda
                        </label>
                        <textarea
                            id="reply-content"
                            rows={6}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Tulis balasan Anda di sini..."
                            value={newReplyContent}
                            onChange={(e) => setNewReplyContent(e.target.value)}
                        />
                        </div>
                    </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                        !newReplyContent ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleCreateReply}
                    disabled={!newReplyContent}
                    >
                    Kirim Balasan
                    </button>
                    <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsReplyModalOpen(false)}
                    >
                    Batal
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    </MainLayout>
  )
}
