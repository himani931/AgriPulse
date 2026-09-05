import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Send, Mic, MicOff, Bot, User, Sparkles, Volume2 } from 'lucide-react';

export default function KisanSaathi() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am AgriPulse Saathi. Ask me anything about current MSP prices, PM-KISAN, PMFBY crop insurance, or booking a slot at your mandi.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Web Speech API for voice input
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  // Text-to-Speech playback
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (customPrompt) => {
    const messageToSend = customPrompt || input;
    if (!messageToSend.trim() || loading) return;

    const userMessage = { sender: 'user', text: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/chat', {
        prompt: messageToSend,
        language: language
      });

      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I could not reach the server. Please ensure the backend is running.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "What is the official MSP for Wheat and Mustard?",
    "How do I apply for PM-KISAN ₹6,000 benefit?",
    "What is PMFBY crop insurance premium for Rabi crops?",
    "How to get a Kisan Credit Card (KCC) loan?"
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="max-w-4xl w-full mx-auto p-4 flex-1 flex flex-col space-y-4">

        {/* Header Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                AgriPulse Saathi AI <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              </h1>
              <p className="text-xs text-slate-500">Live Official MSP & Scheme Advisory</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
            >
              Mode: {language === 'Hindi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
            </button>
          </div>
        </div>

        {/* Quick Query Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 px-3 py-1.5 rounded-full transition shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 overflow-y-auto space-y-4 max-h-[58vh]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${m.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-tr-none'
                    : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none space-y-2'
                  }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                {m.sender === 'bot' && (
                  <button
                    onClick={() => speakText(m.text)}
                    className="flex items-center gap-1 text-[11px] text-emerald-700 hover:underline pt-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Read aloud
                  </button>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-xs text-slate-400 pl-11">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.3s]"></span>
              Retrieving verified government data...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2.5 rounded-xl transition ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            title="Speak query"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              language === 'Hindi'
                ? "एमएसपी या सरकारी योजनाओं के बारे में पूछें..."
                : "Ask about MSP rates, PM-KISAN, PMFBY crop insurance..."
            }
            className="flex-1 border-none focus:outline-hidden text-xs text-slate-800 px-2"
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2.5 bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}