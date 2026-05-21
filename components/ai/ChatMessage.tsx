'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Bot, User } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ChatMessage({ message }: { message: { role: string; content: string } }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'group relative mb-4 flex items-start gap-2 md:gap-4 px-2 md:px-0',
        isUser ? 'flex-row-reverse' : ''
      )}
    >
      {!isUser && (
        <div className="relative flex h-8 w-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white text-blue-600 shadow-sm">
          <Image src="/FC-Logo.png" alt="Bot" fill className="object-cover" />
        </div>
      )}
      <div
        className={cn(
          'relative flex flex-col gap-2 rounded-2xl px-4 py-3 text-sm shadow-sm transition-all',
          isUser
            ? 'max-w-[70%] bg-blue-600 text-white rounded-tr-none'
            : 'max-w-[85%] bg-white border border-gray-100 text-gray-800 rounded-tl-none'
        )}
      >
        <div className="prose prose-sm max-w-none break-words leading-relaxed dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-200 underline decoration-blue-200/50 hover:decoration-blue-200">
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="mb-2 list-inside list-disc space-y-1 pl-2">{children}</ul>,
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
