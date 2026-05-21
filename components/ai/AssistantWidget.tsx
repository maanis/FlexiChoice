'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Minus } from 'lucide-react';
import Image from 'next/image';
import { AssistantChat } from './AssistantChat';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // Initially true to draw attention

  useEffect(() => {
    // Restore widget state from session storage
    try {
      const storedState = sessionStorage.getItem('flexichoice_widget_open');
      if (storedState === 'true') {
        setIsOpen(true);
        setHasUnread(false);
      }
    } catch (e) {}

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle visualViewport for mobile keyboard
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const viewport = window.visualViewport;
    const adjustHeight = () => {
      if (viewport) {
        document.documentElement.style.setProperty('--vvp-height', `${viewport.height}px`);
      }
    };

    adjustHeight();
    viewport?.addEventListener('resize', adjustHeight);
    return () => viewport?.removeEventListener('resize', adjustHeight);
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobile, isOpen]);

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) setHasUnread(false);
    try {
      sessionStorage.setItem('flexichoice_widget_open', String(newState));
    } catch (e) {}
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleOpen}
            className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            <Bot size={24} />
            {hasUnread && (
              <span className="absolute right-0 top-0 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500"></span>
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Widget Container */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => toggleOpen()}
                className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm touch-none"
              />
            )}

            <motion.div
              initial={
                isMobile
                  ? { y: '100%' }
                  : { opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }
              }
              animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={
                isMobile
                  ? { y: '100%' }
                  : { opacity: 0, scale: 0.9, y: 20 }
              }
              transition={
                isMobile
                  ? { type: 'tween', duration: 0.3, ease: 'easeOut' }
                  : { type: 'spring', damping: 25, stiffness: 200 }
              }
              style={
                isMobile
                  ? {
                      height: 'var(--vvp-height, 100dvh)',
                      maxHeight: '100dvh',
                    }
                  : {}
              }
              className={cn(
                "fixed z-[9999] flex flex-col overflow-hidden bg-white shadow-2xl ring-1 ring-black/5",
                isMobile
                  ? "inset-x-0 bottom-0 rounded-t-3xl"
                  : "bottom-6 right-6 h-[600px] w-[380px] rounded-2xl",
                "will-change-transform"
              )}
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <Image src="/FC-Logo.png" alt="FlexiChoice" fill className="object-cover rounded-xl" />
                    <div className="absolute -bottom-1 -right-1 z-10 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">FlexiChoice AI</h3>
                    <p className="text-xs text-green-600 font-medium">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isMobile && (
                    <button
                      onClick={() => toggleOpen()}
                      className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                      <Minus size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => toggleOpen()}
                    className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="flex-1 overflow-hidden relative">
                <AssistantChat />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
