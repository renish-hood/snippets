
"use client";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-center p-4">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4">Snippet Not Found</h1>
        <p className="text-gray-400 mb-6">
          The snippet you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/snippets"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Snippets
        </Link>
      </div>
    </div>
  );
}
