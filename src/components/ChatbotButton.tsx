import React, { useState, useCallback, useRef } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

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
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Bonjour ! 👋 Comment puis-je vous aider aujourd'hui ?", sender: 'bot', time: '12:00' },
    { id: 2, text: "J'ai une question sur vos services", sender: 'user', time: '12:01' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messageIdRef = useRef(Date.now());

  const positionClasses: Record<string, string> = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const scrollingText = "Assistant IA • Disponible 24/7 • Posez vos questions • Réponses instantanées • ";

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessageId = messageIdRef.current++;
    const userMessage: Message = {
      id: userMessageId,
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage: Message = {
        id: messageIdRef.current++,
        text: "Je traite votre demande... Je vous répondrai dans les plus brefs délais !",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  }, [inputValue]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div 
        className={`fixed ${positionClasses[position as keyof typeof positionClasses]} z-50 flex items-center gap-2`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={`
          flex items-center gap-2 
          bg-black/70 backdrop-blur-xl rounded-full px-4 py-2
          border border-white/20 shadow-xl transition-all duration-300 overflow-hidden
          ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}>
          <Sparkles className="w-4 h-4 text-orange-400 drop-shadow-sm" />
          
          <div className="relative w-48 overflow-hidden">
            <div className={`
              whitespace-nowrap text-white/90 text-sm font-medium tracking-wide
              ${isHovering ? 'animate-marquee' : ''}
            `}>
              <span className="inline-block">{scrollingText}</span>
              <span className="inline-block ml-8">{scrollingText}</span>
            </div>
            
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/90 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/90 to-transparent pointer-events-none" />
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center justify-center w-14 h-14 rounded-full relative overflow-hidden
            bg-gradient-to-br from-orange-500/90 via-orange-400/90 to-orange-600/90
            backdrop-blur-md text-white shadow-2xl hover:shadow-orange-500/30
            hover:scale-110 hover:rotate-3 transition-all duration-300
            border-2 border-white/20 ring-2 ring-transparent
            ${isHovering ? 'ring-orange-400/50 shadow-orange-500/40' : ''}
          `}
          aria-label="Ouvrir le chat"
        >
          {isOpen ? <X className="w-6 h-6 drop-shadow-md z-10" /> : <MessageCircle className="w-6 h-6 drop-shadow-md z-10" />}
        </button>
      </div>

      {isOpen && (
        <div className={`fixed ${positionClasses[position as keyof typeof positionClasses]} z-50 mb-24 mr-2 w-80 h-96 
          bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-black/80 
          backdrop-blur-xl rounded-2xl shadow-2xl 
          border border-white/10 flex flex-col overflow-hidden
          bg-[url('/images/aria-logo.png')] bg-cover bg-center bg-no-repeat`}>
          
          {/* Header avec overlay sombre pour lisibilité */}
          <div className="bg-gradient-to-r from-black/70 via-black/80 to-black/70 
            backdrop-blur-2xl p-4 text-white border-b border-white/10 h-20 flex-shrink-0">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm 
                  flex items-center justify-center shadow-xl border border-white/30 shrink-0">
                  <MessageCircle className="w-5 h-5 drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-tight leading-tight drop-shadow-md">Assistant IA</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1.5 drop-shadow-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    En ligne 24/7
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-black/60 hover:bg-white/40 
                  backdrop-blur-sm transition-all hover:scale-110 flex-shrink-0 drop-shadow-lg"
                aria-label="Fermer le chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages - avec overlay + scroll sombre */}
          <div className="flex-1 p-4 overflow-y-auto 
            bg-black/50 backdrop-blur-2xl 
            scrollbar-thin scrollbar-thumb-slate-600/80 hover:scrollbar-thumb-orange-400/60 
            scrollbar-track-slate-900/50 scrollbar-track-border-transparent">
            <div className="space-y-4 pb-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 w-full ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-r from-orange-500/80 
                      to-orange-600/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0
                      shadow-lg border border-white/20 mt-1">
                      <MessageCircle className="w-4 h-4 text-white drop-shadow-sm" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl shadow-xl backdrop-blur-md border flex-shrink-0
                      ${message.sender === 'user'
                        ? 'bg-gradient-to-r from-orange-500/90 to-orange-400/90 text-white rounded-br-none border-white/30 shadow-orange-500/30 ml-14'
                        : 'bg-white/10 text-white/95 rounded-bl-none border-white/20 shadow-black/30 mr-14'
                      }`}
                  >
                    <p className="text-sm leading-relaxed break-words">{message.text}</p>
                    <span className={`text-xs mt-1.5 block opacity-75 font-medium inline-block
                      ${message.sender === 'user' ? 'text-orange-100' : 'text-orange-300'}`}>
                      {message.time}
                    </span>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-r from-orange-600/90 
                      to-orange-500/90 backdrop-blur-sm flex items-center justify-center flex-shrink-0
                      shadow-lg border border-white/20 mt-1">
                      <span className="text-xs font-bold text-white tracking-wide">U</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Input - avec overlay sombre */}
          <div className="p-4 bg-black/70 backdrop-blur-3xl border-t border-white/20 h-24 flex-shrink-0 flex flex-col justify-end">
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl 
                  border border-white/20 text-white/90 placeholder-white/60
                  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                  text-sm transition-all font-medium resize-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                  text-white rounded-2xl shadow-lg hover:shadow-orange-500/40
                  transition-all text-sm font-semibold flex-shrink-0 h-[42px]
                  ${inputValue.trim()
                    ? 'hover:scale-105 hover:-translate-y-0.5 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                  }`}
              >
                Envoyer
              </button>
            </div>
            <p className="text-xs text-orange-400/90 text-center font-medium tracking-wide leading-tight drop-shadow-sm">
              Assistant IA • Réponse automatique
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
