"use client";

import { use } from "react";
import { useBookmark, useUpdateBookmark } from "@/hooks/use-bookmarks";
import { BookmarkForm } from "@/components/forms/bookmark-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookmarkFormData } from "@/types/bookmark";

export default function EditBookmarkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: bookmark, isLoading } = useBookmark(id);
  const updateBookmark = useUpdateBookmark();
  const router = useRouter();

  const handleSubmit = async (data: BookmarkFormData) => {
    try {
      await updateBookmark.mutateAsync({ id, data });
      router.push(`/dashboard/bookmarks/${id}`);
    } catch (error) {
      console.error("Failed to update bookmark:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!bookmark) return <div>Bookmark not found</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/dashboard/bookmarks/${bookmark.id}`}>
          <Button variant="outline">← Back to Bookmark</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Bookmark</CardTitle>
        </CardHeader>
        <CardContent>
          <BookmarkForm
            defaultValues={bookmark}
            onSubmit={handleSubmit}
            isLoading={updateBookmark.isPending}
            submitText="Update Bookmark"
          />
        </CardContent>
      </Card>
    </div>
  );
}
