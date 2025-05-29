"use client";

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { SnippetModal } from '@/components/SnippetModal';
import {  mockSnippets } from '@/constants';

export default  function SnippetModalPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const snippet = mockSnippets.find(async (s) => s.id === (await params).id);
  
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    if (!snippet) {
      router.replace('/snippets/not-found');
    }
  }, [snippet, router]);

  if (!snippet) {
    return null;
  }

  return (
    <SnippetModal 
      snippet={snippet} 
      onClose={handleClose} 
    />
  );
}
