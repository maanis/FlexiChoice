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
      {/* Floating Action Buttons */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed z-[9999] pointer-events-none inset-0 flex items-end justify-between px-3 pb-6 md:px-6 md:pb-8 md:justify-end md:gap-4">
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/919892870455"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/20 transition-colors hover:bg-[#20bd5a] md:h-14 md:w-14"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white md:h-7 md:w-7">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </motion.a>

            {/* AI Bot Button */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleOpen}
              className="pointer-events-auto relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/20 transition-colors hover:bg-blue-700 md:h-14 md:w-14"
            >
              <Bot className="h-6 w-6 md:h-[24px] md:w-[24px]" />
              {hasUnread && (
                <span className="absolute right-0 top-0 flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500"></span>
                </span>
              )}
            </motion.button>
          </div>
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
                "fixed z-[9999] flex flex-col overflow-hidden bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10",
                isMobile
                  ? "inset-x-0 bottom-0 rounded-t-3xl"
                  : "bottom-6 right-6 h-[600px] w-[380px] rounded-2xl",
                "will-change-transform"
              )}
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30">
                    <Image src="/FC-Logo.png" alt="FlexiChoice" fill className="object-cover rounded-xl" />
                    <div className="absolute -bottom-1 -right-1 z-10 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-900 bg-green-500 shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">FlexiChoice AI</h3>
                    <p className="text-xs text-green-600 dark:text-green-500 font-medium">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isMobile && (
                    <button
                      onClick={() => toggleOpen()}
                      className="rounded-full p-1.5 text-gray-400 dark:text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Minus size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => toggleOpen()}
                    className="rounded-full p-1.5 text-gray-400 dark:text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
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
