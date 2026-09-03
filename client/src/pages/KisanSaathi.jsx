import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Bot, Send, Mic, Sparkles, BookOpen } from "lucide-react";

export default function KisanSaathi() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! I am AgriPulse Saathi. How can I assist you with mandi slots, MSP guidelines, or procurement tracking today?",
    },
  ]);
  const [isListening, setIsListening] = useState(false);

  const sendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message: text,
      });
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: res.data.reply,
          source: res.data.officialSource,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVoiceInput = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      return alert("Speech recognition is not supported in this browser.");
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN"; // Default to Hindi speech input

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col justify-between my-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        {/* Header */}
        <div className="border-b pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                AgriPulse Saathi <Sparkles className="w-4 h-4 text-amber-500" />
              </h2>
              <p className="text-xs text-slate-500">
                AI Procurement Assistant (Text & Voice Support)
              </p>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                  msg.sender === "user"
                    ? "bg-emerald-800 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-800 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                {msg.source && (
                  <div className="mt-2 text-xs flex items-center gap-1 text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <BookOpen className="w-3.5 h-3.5" /> Source: {msg.source}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 text-xs">
          {[
            "Mere paas 40 qtl gehun hai",
            "MSP calculations explain karo",
            "Nearest mandi queue status",
          ].map((pill, i) => (
            <button
              key={i}
              onClick={() => sendMessage(pill)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-full border border-slate-200 transition whitespace-nowrap"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2 pt-2 border-t"
        >
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-3 rounded-xl border transition ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything in Hindi or English..."
            className="flex-1 border border-slate-300 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            className="bg-emerald-800 hover:bg-emerald-700 text-white p-3 rounded-xl transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
