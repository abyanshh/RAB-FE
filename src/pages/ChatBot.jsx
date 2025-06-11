import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BadgeCheck, HeartHandshake, Send } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    setMessages([
      {
        role: "bot",
        content: "Halo! Aku siap bantu. Silakan tanya apa saja 😊",
      },
    ]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const chatHistory = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    chatHistory.push({
      role: "user",
      parts: [
        {
          text: `PERINGATAN: Kamu asisten AI di platform *Ruang Aman Bersama* yang hanya membahas seputar kesehatan mental. Jangan membahas topik di luar kesehatan mental, termasuk teknologi, politik, finansial, hiburan, atau topik umum lainnya. Jawablah dengan empati, profesional, dan singkat!. Fokuskan jawaban pada dukungan emosional, kesejahteraan mental, dan saran yang relevan. Jika pengguna menanyakan hal di luar itu, tolak dengan sopan dan arahkan kembali ke konteks kesehatan mental. Prompt pengguna: ${input},`
        },
      ],
    });

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent",
        {
          contents: chatHistory,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
        }
      );

      const botReply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Hmm, aku belum bisa jawab itu.";
      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Ups, ada error saat menjawab 😓" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-cyan-800" />
            <div>
              <h1 className="text-xl font-semibold text-cyan-800">Asisten RAB</h1>
              <p className="text-sm text-gray-500">Menemani dan mendengarkan kapan saja 😊</p>
            </div>
          </div>
          <Link
            to="/"
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-4 py-2 rounded-md"
          >
            Kembali
          </Link>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-36 pt-4 max-w-3xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "flex-row-reverse justify-start" : "justify-start"
              }`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 flex-shrink-0">
                {msg.role === "user" ? (
                  <img
                    src="https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-cyan-600" />
                  </div>
                )}
              </div>

              {/* Chat Bubble */}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-cyan-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.content
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.*?)\*/g, "<em>$1</em>")
                    .replace(/`(.*?)`/g, "<code>$1</code>")
                    .replace(/\n/g, "<br>")
                    .replace(/^- (.*)/gm, "• $1"),
                }}
              />
            </div>
          ))}

          {/* Loading Bubble */}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm rounded-bl-none animate-pulse">
                ...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 w-full z-20">
        <div className="max-w-md md:max-w-3xl mx-auto flex items-center px-4 pb-3 gap-2 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Tulis pesan..."
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`p-3 rounded-full transition-all mr-3 ${
              input.trim()
                ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
