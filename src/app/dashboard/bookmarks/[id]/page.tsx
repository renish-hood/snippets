"use client";

import { useBookmark } from "@/hooks/use-bookmarks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Heart, ExternalLink, Edit } from "lucide-react";
import { use } from "react";

export default function BookmarkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: bookmark, isLoading, error } = useBookmark(id);

  if (isLoading) return <div>Loading...</div>;
  if (error || !bookmark) return <div>Bookmark not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/bookmarks">
          <Button variant="outline">← Back to Bookmarks</Button>
        </Link>
        <Link href={`/dashboard/bookmarks/${bookmark.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                {bookmark.title}
                {bookmark.isFavorite && (
                  <Heart className="h-6 w-6 fill-red-500 text-red-500" />
                )}
              </CardTitle>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                {bookmark.url}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {bookmark.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{bookmark.description}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 capitalize">
              {bookmark.category}
            </span>
          </div>

          {bookmark.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {bookmark.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <h3 className="font-semibold mb-1">Created</h3>
              <p className="text-sm text-gray-600">
                {formatDate(bookmark.createdAt)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Last Updated</h3>
              <p className="text-sm text-gray-600">
                {formatDate(bookmark.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
