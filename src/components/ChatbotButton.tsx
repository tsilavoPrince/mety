import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Send, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

interface ChatbotButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Bonjour ! 👋 Comment puis-je vous aider aujourd'hui ?", sender: 'bot', time: '12:00' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messageIdRef = useRef(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const positionClasses: Record<string, string> = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const scrollingText = "Assistant IA • Disponible 24/7 • Réponses instantanées • ";

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messageIdRef.current++,
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: messageIdRef.current++,
        text: "Je traite votre demande... 🤖",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  }, [inputValue]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      {/* Bouton flottant */}
      <div
        className={`fixed ${positionClasses[position]} z-50 flex items-center gap-2`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Scrolling tag */}
        <div
          className={`
          flex items-center gap-2 bg-black/70 backdrop-blur-xl rounded-full px-4 py-2
          border border-white/20 shadow-xl transition-all duration-300 overflow-hidden
          ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}
        >
          <Sparkles className="w-4 h-4 text-orange-400 drop-shadow-sm animate-pulse" />
          <div className="relative w-48 overflow-hidden">
            <div
              className={`whitespace-nowrap text-white/90 text-sm font-medium tracking-wide ${
                isHovering ? 'animate-marquee' : ''
              }`}
            >
              <span className="inline-block">{scrollingText}</span>
              <span className="inline-block ml-8">{scrollingText}</span>
            </div>
          </div>
        </div>

        {/* Bouton principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center justify-center w-14 h-14 rounded-full relative overflow-hidden
            bg-gradient-to-br from-orange-500/90 via-orange-400/90 to-orange-600/90
            backdrop-blur-md text-white shadow-2xl
            hover:scale-110 hover:rotate-3 transition-all duration-300
            border-2 border-white/20
            ${isHovering ? 'shadow-orange-500/40 ring ring-orange-400/50' : ''}
          `}
          aria-label="Ouvrir le chat"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 animate-bounce" />}
        </button>
      </div>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div
          className={`fixed ${positionClasses[position]} z-50 mb-24 mr-2 w-80 h-96 
          bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-black/85 backdrop-blur-xl rounded-2xl shadow-2xl 
          border border-white/10 flex flex-col overflow-hidden animate-[fadeInUp_0.4s_ease-out]
        `}
        >
          {/* Header */}
          <div className="bg-black/70 p-4 text-white border-b border-white/10 flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Assistant IA</h3>
                <p className="text-xs opacity-90 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> En ligne
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600/70 hover:scrollbar-thumb-orange-400/60">
            <div className="space-y-4 pb-2">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2 transition-all`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white/90 shadow-md">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-md ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-orange-500/90 to-orange-400/90 text-white rounded-br-none'
                        : 'bg-white/10 text-white/95 rounded-bl-none border border-white/10'
                    } animate-[fadeIn_0.3s_ease-out]`}
                  >
                    {message.text}
                    <span className="block text-xs opacity-75 mt-1">{message.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                  <p className="text-sm text-orange-300 italic">Assistant écrit...</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Zone d'entrée */}
          <div className="p-4 bg-black/70 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez un message..."
              className="flex-1 px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`p-2.5 rounded-xl shadow-md transition-all flex items-center justify-center ${
                inputValue.trim()
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 text-white'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
