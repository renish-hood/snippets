"use client";

import React from 'react';
import Head from "next/head";
import { Card } from "../../components/Card";

export interface Snippet {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  lastUpdated: string;
  language: string;
}

export default function SnippetsPage() {
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
    {
      id: '2',
      title: 'Next.js API Routes',
      description: 'Guide to creating API routes in Next.js',
      content: '# Next.js API Routes\n\nAPI routes provide a solution to build your API with Next.js.',
      tags: ['nextjs', 'api', 'backend', 'javascript'],
      lastUpdated: '2023-06-15',
      language: 'typescript',
      githubUrl: 'https://github.com/yourusername/your-repo/blob/main/nextjs-api-routes.md'
    },
    {
      id: '3',
      title: 'Tailwind CSS Tips',
      description: 'Useful Tailwind CSS patterns and tips',
      content: '# Tailwind CSS Tips\n\nCollection of useful Tailwind CSS patterns and tips.',
      tags: ['tailwind', 'css', 'frontend', 'styling'],
      lastUpdated: '2023-07-01',
      language: 'css',
      demoUrl: 'https://tailwindcss.com/'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Code Snippets</title>
        <meta name="description" content="A collection of useful code snippets" />
      </Head>
      
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Code Snippets</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of useful code snippets and examples for your projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSnippets.map((snippet) => (
            <div key={snippet.id} className="h-80">
              <Card snippet={snippet} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
