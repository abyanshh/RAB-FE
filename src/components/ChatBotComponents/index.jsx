import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BadgeCheck, HeartHandshake, Send } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const API_KEY = "AIzaSyDpEh4ztcAVbrS0shUVkUctoCHR-5Y-A8w";
  //const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    const chatHistory = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    chatHistory.push({
      role: "user",
      parts: [
        {
            text: `PERINGATAN: Kamu asisten AI di platform *Ruang Aman Bersama* yang hanya membahas seputar kesehatan mental. Jangan membahas topik di luar kesehatan mental, termasuk teknologi, politik, finansial, hiburan, atau topik umum lainnya. Jawablah dengan empati, profesional, dan singkat!. Fokuskan jawaban pada dukungan emosional, kesejahteraan mental, dan saran yang relevan. Jika pengguna menanyakan hal di luar itu, tolak dengan sopan dan arahkan kembali ke konteks kesehatan mental. Prompt pengguna: ${input}`,

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
    }
  };

  return (
    <>
        <Header/>
        <Content/>
    </>
  );
};

const Header = () => {
    return (
        <div className="flex items-center px-4 py-3 w-full rounded-t-md gap-2 border-b-3  border-cyan-800">
            <div className="flex max-w-6xl mx-auto justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                    <HeartHandshake className="w-8 h-8 text-cyan-800"/>
                    <h1 className="text-2xl text-cyan-800 font-bold">
                        Asisten RAB
                        <br />
                        <p className="text-sm font-medium">Selalu menampung keluhanmu kapan saja 😊</p> 
                    </h1>
                </div>
                <Link to="/" className="bg-cyan-600 text-white rounded-md px-3 py-2 hover:bg-cyan-700">
                    Kembali
                </Link>
            </div>
        </div>
    )
}

const Content = () => {
    return (
        <div className="p-4 max-w-4xl mx-auto mt-5">
            <div className="space-y-2 mb-4 h-100 overflow-y-auto p-2">
            {messages.map((msg, i) => (
                <>
                <div
                    className={`flex gap-2 content-center ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                    <div className="rounded-full w-8 h-8">
                        {msg.role === "user" ? (
                            <img
                                className="h-full w-full rounded-full"
                                src="https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"
                                alt=""
                            />
                        ) : (
                            <BadgeCheck className="h-full w-full text-blue-600"/>
                        )}
                    </div>
                    <div
                    key={i}
                    className={`p-2 rounded-lg whitespace-pre-wrap w-fit ${
                        msg.role === "user"
                        ? "bg-blue-100 text-right"
                        : "bg-gray-100 text-left"
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
                </>
            ))}
            <div ref={messagesEndRef} />
            </div>
            <div className="flex space-x-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Tulis pesan..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
                onClick={sendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-4 rounded-full"
            >
                <Send className="w-4 h-4"/>
            </button>
            </div>
        </div>
    )
}

export default ChatBot;

