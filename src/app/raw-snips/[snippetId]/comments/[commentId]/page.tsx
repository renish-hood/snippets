export default async function SnippetDetails({
  params,
}: {
  params: Promise<{ snippetId: string; commentId: string }>;
}) {
  const sid = (await params).snippetId;
  const cId = (await params).commentId;
  return (
    <>
      <h1>Snippet Explanation {sid}</h1>
      <p>Summary {cId}</p>
    </>
  );
}
