// This is a Server Component that renders the SnippetContent client component
import { Suspense } from 'react';
import SnippetContent from './SnippetContent';

export default async function SnippetDetails({
  params,
}: {
  params: Promise<{ snippetId: string }>;
}) {
  const sId = (await params).snippetId;
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <SnippetContent snippetId={sId} />
    </Suspense>
  );
}
