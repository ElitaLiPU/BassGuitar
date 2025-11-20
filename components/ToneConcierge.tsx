import React, { useState, useRef, useEffect } from 'react';
import { getToneAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MessageSquare, X, Send, Loader2, Mic } from 'lucide-react';

export const ToneConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "I am Vulkan. How can I assist with your tone today?", timestamp: Date.now() }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getToneAdvice(userMsg.text);
    
    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-4 bg-brand-black text-white shadow-2xl hover:bg-brand-gray transition-all duration-300 group"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="font-medium tracking-wide text-sm">TONE CONCIERGE</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] h-[500px] bg-white shadow-2xl flex flex-col border border-gray-200 animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-brand-black text-white">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
          <h3 className="font-serif font-medium tracking-wide">Vulkan Consultant</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[85%] p-3 text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-brand-black text-white' 
                  : 'bg-white text-brand-black border border-gray-200 shadow-sm'}
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 border border-gray-200 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about tubes, impedance, or tone..."
            className="flex-1 bg-gray-50 border-0 px-3 py-2 text-sm focus:ring-1 focus:ring-brand-black outline-none"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="p-2 bg-brand-black text-white hover:bg-brand-gray disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};
