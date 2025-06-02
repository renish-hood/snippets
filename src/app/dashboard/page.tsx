"use client";

import { useBookmarks } from "@/hooks/use-bookmarks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { data: bookmarks, isLoading } = useBookmarks();

  if (isLoading) return <div>Loading...</div>;

  const stats = {
    total: bookmarks?.length || 0,
    favorites: bookmarks?.filter((b) => b.isFavorite).length || 0,
    categories: new Set(bookmarks?.map((b) => b.category)).size || 0,
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/dashboard/bookmarks/create">
          <Button>Add Bookmark</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookmarks?.slice(0, 5).map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{bookmark.title}</p>
                    <p className="text-sm text-gray-500">{bookmark.category}</p>
                  </div>
                  <Link href={`/dashboard/bookmarks/${bookmark.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/bookmarks/create">
              <Button className="w-full">Add New Bookmark</Button>
            </Link>
            <Link href="/dashboard/bookmarks">
              <Button variant="outline" className="w-full">
                View All Bookmarks
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
