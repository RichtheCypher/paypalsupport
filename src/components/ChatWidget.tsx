'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ChatMessage } from '@/data/supportData';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am PayPal Assistant. How can I assist you with your account, transactions, or disputes today?',
      time: 'Just now',
      actions: [
        { label: 'Check Refund Status', action: 'refund' },
        { label: 'Dispute a Transaction', action: 'dispute' },
        { label: 'Locked Account', action: 'locked' }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userText) setInput('');
    setIsTyping(true);

    // Simulate AI bot response logic
    setTimeout(() => {
      let botResponseText = "I understand you need assistance with that. Let me look up your recent account activity.";
      let actions = undefined;

      const lower = textToSend.toLowerCase();

      if (lower.includes('refund') || lower.includes('check refund status')) {
        botResponseText = "To check your refund status: Refunds usually return to your original payment method in 3–5 business days. Your recent airline refund of $450.00 USD was processed on July 28.";
        actions = [
          { label: 'View Resolution Center', action: 'resolution_center' },
          { label: 'Report Issue', action: 'report_issue' }
        ];
      } else if (lower.includes('dispute') || lower.includes('dispute a transaction')) {
        botResponseText = "You currently have 1 active case (CASE-2026-8901 for $299.00 USD). The merchant has been notified and has until Aug 28 to respond.";
        actions = [
          { label: 'Open Resolution Center', action: 'resolution_center' },
          { label: 'File New Dispute', action: 'new_dispute' }
        ];
      } else if (lower.includes('locked') || lower.includes('security') || lower.includes('unauthorized')) {
        botResponseText = "If you suspect unauthorized activity, we recommend locking your card immediately and verifying your 2FA security settings.";
        actions = [
          { label: 'Start Account Recovery Wizard', action: 'recovery' },
          { label: 'Reset Password', action: 'reset_pass' }
        ];
      } else {
        botResponseText = `Thank you for reaching out regarding "${textToSend}". I can guide you through our step-by-step resolution tools or help you open a claim in the Resolution Center.`;
        actions = [
          { label: 'Open Resolution Center', action: 'resolution_center' },
          { label: 'Account Security Wizard', action: 'recovery' }
        ];
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2 px-4 py-3.5 rounded-full bg-[#0066cc] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"></span>
          </div>
          <span className="font-semibold text-sm">PayPal Support Assistant</span>
          <Sparkles className="w-4 h-4 text-amber-300 ml-1" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#0066cc] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white ring-2 ring-white/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center space-x-1.5">
                  <span>PayPal Live Assistant</span>
                  <span className="px-1.5 py-0.2 bg-emerald-500/30 text-emerald-100 text-[10px] rounded-full border border-emerald-400/40">Online</span>
                </h3>
                <p className="text-[11px] text-blue-100 opacity-90">24/7 Automated Claims & Help Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end space-x-2 max-w-[85%]">
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-[#0066cc] text-white flex items-center justify-center text-[10px] shrink-0 mb-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0066cc] text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>

                {/* Quick Action Suggestion Buttons */}
                {msg.actions && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[88%]">
                    {msg.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(act.label)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs py-1">
                <div className="w-6 h-6 rounded-full bg-blue-600/20 text-[#0066cc] flex items-center justify-center text-[10px]">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <span className="italic">PayPal Assistant is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about refunds, disputes, 2FA..."
                className="flex-1 px-3 py-2 text-xs bg-slate-100 text-slate-900 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-[#0066cc] text-white disabled:opacity-50 hover:bg-blue-700 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}
