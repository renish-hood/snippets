"use client";

import { useCreateBookmark } from "@/hooks/use-bookmarks";
import { BookmarkForm } from "@/components/forms/bookmark-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BookmarkFormData } from "@/types/bookmark";

export default function CreateBookmarkPage() {
  const createBookmark = useCreateBookmark();
  const router = useRouter();

  const handleSubmit = async (data: BookmarkFormData) => {
    try {
      await createBookmark.mutateAsync(data);
      router.push("/dashboard/bookmarks");
    } catch (error) {
      console.error("Failed to create bookmark:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Bookmark</CardTitle>
        </CardHeader>
        <CardContent>
          <BookmarkForm
            onSubmit={handleSubmit}
            isLoading={createBookmark.isPending}
            submitText="Create Bookmark"
          />
        </CardContent>
      </Card>
    </div>
  );
}
