export default async function SnippetDetails({
  params,
}: {
  params: Promise<{ snippetId: string }>;
}) {
  const sid = (await params).snippetId;
  return <h1>Snippet Explanation {sid}</h1>;
}
