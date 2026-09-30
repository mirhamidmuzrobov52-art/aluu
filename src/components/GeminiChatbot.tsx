import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Sparkles, Globe, ArrowUpRight, 
  Phone, Instagram, ShieldCheck, Zap, BookOpen,
  Maximize2, Minimize2
} from 'lucide-react';

interface Source {
  title: string;
  uri: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Assalomu alaykum! Men Aluvantis studiyasining virtual AI-konsultantiman. Biznesingiz uchun 48 soatda sayt yaratish, bepul hosting va narxlarimiz haqida so'rashingiz mumkin. Qanday yordam bera olaman?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Suggested actions for quick triggers
  const suggestedQueries = [
    { label: '💰 Tariflar & Narxlar', query: 'Aluvantis xizmatlari tariflari va narxlari qancha?' },
    { label: '⚡ 48 soatda tayyormi?', query: 'Saytlar rostdan ham 48 soat ichida tayyor bo\'ladimi?' },
    { label: '☁️ Bepul hosting bormi?', query: 'Domen va hosting qanday ulanadi va umrbod bepulmi?' },
    { label: '📞 Bog\'lanish', query: 'Sizlar bilan qanday bog\'lansa bo\'ladi? Telefon va telegram aloqa' }
  ];

  // Particle Canvas Background Loop
  useEffect(() => {
    if (!isOpen || !canvasRef.current || window.innerWidth < 768) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1;
        this.color = 'rgba(14, 79, 79, 0.12)';
      }

      update(speedMultiplier: number) {
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 22 }, () => new Particle());

    const drawLine = (p1: Particle, p2: Particle, dist: number) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < dist) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(198, 161, 91, ${0.12 * (1 - d / dist)})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const speedMultiplier = isLoading ? 3.5 : 1;

      particles.forEach((p) => {
        p.update(speedMultiplier);
        p.color = isLoading ? 'rgba(198, 161, 91, 0.22)' : 'rgba(14, 79, 79, 0.12)';
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          drawLine(particles[i], particles[j], 75);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, isLoading, isExpanded]);

  // Force scroll strictly to bottom when messages or loading changes
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  // Prevent background page scrolling when scrolling inside the chat widget
  useEffect(() => {
    if (!isOpen) return;
    
    const container = chatContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollable = container.scrollHeight > container.clientHeight;
      if (!scrollable) return;

      const isScrollUp = e.deltaY < 0;
      const isScrollDown = e.deltaY > 0;
      const atTop = container.scrollTop <= 0;
      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

      // If scrolling within the limits of the chat, scroll local container and block page scroll
      if ((isScrollUp && !atTop) || (isScrollDown && !atBottom)) {
        container.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen, messages]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatHistory = messages
        .concat(userMessage)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))
        .slice(-8);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.text || "Kechirasiz, javob shakllantirishda xatolik bo'ldi.",
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "Muammosiz bog'lanish uchun loyiha menejerimizga murojaat qiling:\nTelegram: @aluvantis_admin\nTelefon: +998 99 845 66 32",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-body">
      {/* Floating AI Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 rounded-full bg-teal text-linen shadow-2xl flex items-center gap-2 hover:bg-teal-900 border-2 border-gold/50 cursor-pointer relative group overflow-hidden"
        aria-label="AI Yordamchi Chat"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-gold/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -95, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <X className="w-5 h-5 text-gold" />
              <span className="font-display font-extrabold text-xs text-linen">Yopish</span>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 95, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-gold text-obsidian flex items-center justify-center font-display font-black text-[10px] shadow-sm border border-white/20">
                AI
              </div>
              <span className="font-display font-bold text-xs text-linen tracking-tight">
                AI Konsultant
              </span>
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Chat Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className={`fixed z-50 rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-teal/10 flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded
                ? 'inset-3 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[780px] sm:h-[700px] sm:max-h-[92vh] h-[calc(100dvh-24px)]'
                : 'bottom-20 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-22 sm:w-[420px] h-[520px] max-h-[82vh]'
            }`}
          >
            {/* Interactive Neural Canvas Background */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-0 opacity-80"
            />

            {/* Header */}
            <div className="p-4 bg-teal text-linen border-b border-teal-900/40 flex items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gold/15 flex items-center justify-center text-gold border border-gold/15 relative shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-teal" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-linen tracking-tight">Aluvantis AI</h3>
                  <p className="text-[10px] text-linen/70 mt-0.5 flex items-center gap-1">
                    Virtual AI Konsultant
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 z-20 shrink-0">
                {/* Expand / Minimize Toggle Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(prev => !prev);
                  }}
                  title={isExpanded ? "Kichraytirish" : "Kengaytirish"}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-linen transition-all cursor-pointer border border-white/10 touch-manipulation"
                >
                  {isExpanded ? <Minimize2 className="w-4.5 h-4.5 text-gold" /> : <Maximize2 className="w-4.5 h-4.5 text-gold" />}
                </button>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  title="Yopish"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-linen transition-all cursor-pointer border border-white/10 touch-manipulation"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Message Thread Scroll Area */}
            <div 
              ref={chatContainerRef}
              data-lenis-prevent
              className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-linen/15 scroll-smooth z-10 relative"
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index === messages.length - 1 ? 0.05 : 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-teal text-linen rounded-tr-none'
                        : 'bg-white text-obsidian border border-teal/5 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>

                  {/* Rich Source Citations Layout */}
                  {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pl-2 flex flex-col gap-1.5 w-[85%] animate-fade-in">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-teal/80 uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5 text-gold" />
                        <span>Tadqiqotchi agent manbalari:</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {msg.sources.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.uri}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-between gap-2 text-[10px] bg-white hover:bg-gold/5 border border-teal/5 hover:border-gold/35 rounded-xl px-3 py-2 transition-all shadow-2xs"
                          >
                            <span className="truncate max-w-[210px] text-teal font-medium group-hover:text-gold transition-colors">{src.title}</span>
                            <ArrowUpRight className="w-3 h-3 text-teal/40 group-hover:text-gold transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Pulsing Loading ... Bubble */}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start"
                >
                  <div className="bg-white border border-teal/5 rounded-2xl rounded-tl-none p-3.5 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              {/* Suggestions Grid (Visible only on empty thread state / welcomes) */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pt-6 border-t border-teal/5 flex flex-col gap-2.5 mt-auto"
                >
                  <div className="text-[10px] font-semibold text-teal/60 uppercase tracking-widest pl-1">
                    Tezkor savollar:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedQueries.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(item.query)}
                        className="text-left p-3 bg-white hover:bg-teal-50/40 border border-teal/5 hover:border-teal/20 rounded-2xl text-[11px] font-medium text-teal transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-2xs flex flex-col justify-between"
                      >
                        <span className="leading-normal">{item.label}</span>
                        <ChevronRight className="w-3 h-3 mt-1 text-gold self-end" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Form Input Container */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
                setInput('');
              }}
              className="p-3 border-t border-teal/10 bg-white flex gap-2 z-10 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savolingizni yozing..."
                className="flex-1 px-4 py-3 text-xs sm:text-sm bg-linen/30 border border-teal/10 rounded-2xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all text-obsidian placeholder:text-obsidian/45"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-2xl bg-gold hover:bg-gold/90 text-obsidian flex items-center justify-center shrink-0 disabled:opacity-40 disabled:hover:bg-gold cursor-pointer transition-colors border border-gold/15 shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Simple icon for navigation chevron
const ChevronRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
