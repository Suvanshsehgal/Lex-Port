import { useState, useRef, useEffect } from 'react';
import API from "../api";
import chatIcon from '../assets/ChatbotIcon.png';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Hello! I\'m Lex Bot, your legal assistant. How can I help you today?', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      sender: 'user', 
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await API.post('/chat', { message: input });
      const botMessage = { 
        sender: 'bot', 
        text: res.data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMsg = {
        sender: 'bot',
        text: '⚠️ Oops! Server error. Please try again later.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
      console.error('Chat Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-[#1e463c] to-[#2a5a4a] hover:from-[#16352e] hover:to-[#1e463c] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl z-50 transition-all duration-300 transform hover:scale-105 ${isOpen ? 'rotate-180' : ''}`}
      >
        {isOpen ? (
          <span className="text-2xl font-bold">×</span>
        ) : (
          <img src={chatIcon} alt="Chat Icon" className="w-8 h-8" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
         <div className="bg-[#FAF9F6] w-full max-w-2xl h-[60vh] rounded-t-2xl shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 scale-100">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#1e463c] to-[#2a5a4a] text-white rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">L</span>
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Lex Bot</h2>
                  <p className="text-sm text-green-200">Online</p>
                </div>
              </div>
              <button 
                onClick={toggleChat} 
                className="text-white hover:bg-white hover:bg-opacity-20 w-8 h-8 rounded-full transition-colors duration-200 flex items-center justify-center text-xl font-bold"
              >
                X
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''} animate-fade-in`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                    msg.sender === 'user' ? 'bg-[#1e463c] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {msg.sender === 'user' ? 'U' : 'B'}
                  </div>

                  <div className={`max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#1e463c] text-white rounded-br-md' 
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.timestamp && (
                      <p className="text-xs text-gray-500 mt-1 px-1">
                        {msg.timestamp}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start space-x-3 animate-fade-in">
                  <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                    B
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#FAF9F6] border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e463c] focus:border-transparent transition-all duration-200"
                    placeholder="Ask something legal..."
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1e463c] hover:bg-[#16352e] disabled:bg-gray-300 disabled:cursor-not-allowed text-white w-8 h-8 rounded-full transition-colors duration-200 flex items-center justify-center text-sm font-bold"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
