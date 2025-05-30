export default async function Comments({
  params,
}: {
  params: Promise<{ snippetId: string }>;
}) {
  const sid = (await params).snippetId;
  return <h1>Comments for Snippet{sid}</h1>;
}
