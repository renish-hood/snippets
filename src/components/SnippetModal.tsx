"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { Snippet } from '@/types/snippet.types';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

interface SnippetModalProps {
  snippet: Snippet;
  onClose: () => void;
}

export function SnippetModal({ snippet, onClose }: SnippetModalProps) {
  const [copied, setCopied] = useState(false);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const copyToClipboard = (text: string) => {
    if (!snippet) return;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm p-4 border-b border-gray-800 flex justify-between items-start z-10">
            <div>
              <h2 className="text-2xl font-bold text-white">{snippet.title}</h2>
              <p className="text-gray-400 mt-1">{snippet.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {snippet.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Language and Last Updated */}
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span>Language: {snippet.language}</span>
              <span>•</span>
              <span>Last updated: {snippet.lastUpdated}</span>
            </div>

            {/* Links */}
            <div className="flex gap-4 mb-6">
              {snippet.githubUrl && (
                <a
                  href={snippet.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
              {snippet.demoUrl && (
                <a
                  href={snippet.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>

            {/* Content with syntax highlighting */}
            <div className="prose prose-invert max-w-none">
               <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                              {snippet.content}
                            </ReactMarkdown>
              {/* <div dangerouslySetInnerHTML={{ __html: snippet.content }} /> */}
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Language:</span> {snippet.language}
            </div>
            <button
              onClick={() => copyToClipboard(snippet.content)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
