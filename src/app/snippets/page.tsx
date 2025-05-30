"use client";

import React from 'react';
import Head from "next/head";
import { Card } from "../../components/Card";
import { mockSnippets } from '@/constants';

export default function SnippetsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Code Snippets</title>
        <meta name="description" content="A collection of useful code snippets" />
      </Head>
      
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Code Snippets</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of useful code snippets and examples for your projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSnippets.map((snippet) => (
            <Card key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </main>
    </div>
  );
}
