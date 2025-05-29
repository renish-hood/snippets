'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiClock, FiGithub, FiExternalLink } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Snippet } from '@/types/snippet.types';

const getSnippetById = (snippetId: string): Promise<Snippet | null> => {
  return new Promise((resolve) => {
    const mockSnippets: Snippet[] = [
      {
        id: '1',
        title: 'React Hooks Guide',
        description: 'A comprehensive guide to React Hooks',
        content: `# React Hooks Guide\n\nHooks are functions that let you use state and other React features without writing classes.\n\n## useState\n\n\`\`\`jsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n\`\`\``,
        tags: ['react', 'hooks', 'frontend', 'javascript'],
        lastUpdated: '2023-05-20',
        language: 'typescript',
        githubUrl: 'https://github.com/yourusername/your-repo/blob/main/react-hooks.md',
        demoUrl: 'https://reactjs.org/docs/hooks-intro.html'
      },
      // ... other mock snippets
    ];
    
    setTimeout(() => {
      const snippet = mockSnippets.find(s => s.id === snippetId) || null;
      resolve(snippet);
    }, 500);
  });
};

export default function SnippetContent({ snippetId }: { snippetId: string }) {
  const router = useRouter();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const data = await getSnippetById(snippetId);
        setSnippet(data);
      } catch (error) {
        console.error('Error fetching snippet:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippet();
  }, [snippetId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Snippet not found</h1>
        <button 
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <button 
                onClick={() => router.back()}
                className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4 md:mb-0"
              >
                <FiArrowLeft className="mr-2" /> Back to snippets
              </button>
              <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {snippet.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {snippet.description}
              </p>
              <div className="flex items-center mt-3 text-sm text-gray-500 dark:text-gray-400">
                <FiClock className="mr-1" />
                <span>Last updated: {snippet.lastUpdated}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              {snippet.githubUrl && (
                <a
                  href={snippet.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiGithub className="mr-2" /> View on GitHub
                </a>
              )}
              {snippet.demoUrl && (
                <a
                  href={snippet.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <FiExternalLink className="mr-2" /> View Demo
                </a>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {snippet.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {snippet.content}
              </ReactMarkdown>
            </div>
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
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Your Snippets. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
