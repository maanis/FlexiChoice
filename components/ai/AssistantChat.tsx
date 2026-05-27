'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { SUGGESTED_QUESTIONS } from '@/lib/ai/faq-knowledge';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SESSION_KEY = 'flexichoice_chat_session';
const SESSION_EXPIRY_MS = 60 * 60 * 1000; // 60 minutes

export function AssistantChat() {
  const [messages, setMessages] = useState<Array<{id: string, role: string, content: string}>>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi! I am the FlexiChoice AI Assistant. How can I help you with your loan or insurance needs today?'
    }
  ]);
  const [localInput, setLocalInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Randomize suggestions on every new turn
  const randomSuggestions = useMemo(() => {
    return [...SUGGESTED_QUESTIONS]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  // Smooth auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Restore from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const now = Date.now();
        // Check if session has expired
        if (parsed.lastActive && (now - parsed.lastActive < SESSION_EXPIRY_MS)) {
          if (parsed.messages && parsed.messages.length > 0) {
            setMessages(parsed.messages);
          }
        } else {
          // Expired, clear old session
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch (e) {
      console.error('Failed to parse chat session', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      lastActive: Date.now(),
      messages
    }));
    scrollToBottom();
  }, [messages, isLoading, isInitialized]);

  const append = async (message: { role: string, content: string }) => {
    const newMessages = [...messages, { ...message, id: Date.now().toString() }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Intelligent Context Window: Send only the last 6 messages to prevent prompt bloating
      const contextWindow = newMessages.slice(-6);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: contextWindow })
      });

      if (!response.body) throw new Error("No response body");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      
      const assistantId = 'msg-' + Date.now().toString();
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunkStr = decoder.decode(value, { stream: true });
        const lines = chunkStr.split('\n');
        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const textChunk = JSON.parse(line.substring(2));
              assistantContent += textChunk;
              setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].content = assistantContent;
                return newArr;
              });
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    append({ role: 'user', content: question });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-gray-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="will-change-transform"
          >
            <ChatMessage message={message} />
          </motion.div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 p-4"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            FlexiChoice AI is thinking...
          </motion.div>
        )}

        {/* Suggested Questions after response */}
        {!isLoading && messages[messages.length - 1]?.role === 'assistant' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {randomSuggestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(q)}
                className="rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs text-left text-gray-600 dark:text-gray-300 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300"
              >
                {q}
              </button>
            ))}
          </motion.div>
        )}

        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-3 md:p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 rounded-b-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!localInput.trim()) return;
            append({ role: 'user', content: localInput });
            setLocalInput('');
            if (inputRef.current) inputRef.current.style.height = 'auto';
          }}
          className="relative flex items-end bg-white dark:bg-gray-900"
        >
          <textarea
            ref={inputRef}
            name="chat-message-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            rows={1}
            className="w-full resize-none rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-4 pr-12 py-3 text-sm focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ minHeight: '44px', maxHeight: '120px' }}
            value={localInput}
            onChange={(e) => {
              setLocalInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!localInput.trim() || isLoading) return;
                append({ role: 'user', content: localInput });
                setLocalInput('');
                if (inputRef.current) inputRef.current.style.height = 'auto';
              }
            }}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!localInput.trim() || isLoading}
            className={cn(
              "absolute right-1.5 bottom-1.5 flex h-9 w-9 items-center justify-center rounded-full transition-all",
              localInput.trim() && !isLoading
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
            )}
          >
            <Send size={16} className={cn("transition-transform", localInput.trim() && !isLoading && "-translate-x-0.5 translate-y-0.5")} />
          </button>
        </form>
        <div className="mt-2 text-center text-[10px] text-gray-400 dark:text-gray-500">
          Powered by FlexiChoice AI. May produce inaccurate info.
        </div>
      </div>
    </div>
  );
}
