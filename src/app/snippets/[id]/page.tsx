"use client";

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SnippetModal } from '@/components/SnippetModal';
import { mockSnippets } from '@/constants';
import { Snippet } from '@/types/snippet.types';

export default function SnippetModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [snippet, setSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      const snippetId = resolvedParams.id;
      setId(snippetId);
      const foundSnippet = mockSnippets.find((s) => s.id === snippetId);
      setSnippet(foundSnippet || null);
    });
  }, [params]);

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
    if (id && snippet === null) {
      const foundSnippet = mockSnippets.find((s) => s.id === id);
      if (!foundSnippet) {
        router.replace('/snippets/not-found');
      }
    }
  }, [id, snippet, router]);

  if (id === null) {
    return <div>Loading...</div>;
  }

  if (!snippet) {
    return null;
  }

  return (
    <SnippetModal snippet={snippet} onClose={handleClose}>
      <SnippetModal.Header />
      <SnippetModal.Content>
        <SnippetModal.Tags />
        <SnippetModal.Meta />
        <SnippetModal.Links />
        <SnippetModal.Code />
      </SnippetModal.Content>
      <SnippetModal.Footer />
    </SnippetModal>
  );
}