"use client";

import { useState, useMemo, useEffect } from "react";
import {
  useBookmarks,
  useDeleteBookmark,
  useToggleFavorite,
} from "@/hooks/use-bookmarks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import {
  Heart,
  ExternalLink,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  Grid,
  List,
  MoreVertical,
  Copy,
  Share2,
  Download,
} from "lucide-react";

export default function BookmarksPage() {
  const { data: bookmarks, isLoading } = useBookmarks();
  const deleteBookmark = useDeleteBookmark();
  const toggleFavorite = useToggleFavorite();

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [favoriteFilter, setFavoriteFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // UI state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Date range filter
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Persist view mode in localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem("bookmarks-view-mode") as
      | "grid"
      | "list";
    if (savedViewMode) setViewMode(savedViewMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks-view-mode", viewMode);
  }, [viewMode]);

  // Get unique categories and tags from bookmarks
  const { categories, allTags } = useMemo(() => {
    if (!bookmarks) return { categories: [], allTags: [] };

    const categories = [...new Set(bookmarks.map((b) => b.category))].sort();
    const allTags = [...new Set(bookmarks.flatMap((b) => b.tags))].sort();

    return { categories, allTags };
  }, [bookmarks]);

  // Filter and sort bookmarks
  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];

    const filtered = bookmarks.filter((bookmark) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        categoryFilter === "all" || bookmark.category === categoryFilter;

      // Favorite filter
      const matchesFavorite =
        favoriteFilter === "all" ||
        (favoriteFilter === "favorites" && bookmark.isFavorite) ||
        (favoriteFilter === "non-favorites" && !bookmark.isFavorite);

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => bookmark.tags.includes(tag));

      // Date range filter
      const bookmarkDate = new Date(bookmark.createdAt);
      const matchesDateFrom = !dateFrom || bookmarkDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || bookmarkDate <= new Date(dateTo);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFavorite &&
        matchesTags &&
        matchesDateFrom &&
        matchesDateTo
      );
    });

    // Sort bookmarks
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "category":
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "favorites":
        filtered.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    bookmarks,
    searchTerm,
    categoryFilter,
    favoriteFilter,
    selectedTags,
    sortBy,
    dateFrom,
    dateTo,
  ]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this bookmark?")) {
      await deleteBookmark.mutateAsync(id);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedBookmarks.length === 0) return;
    if (
      confirm(
        `Are you sure you want to delete ${selectedBookmarks.length} bookmarks?`
      )
    ) {
      try {
        await Promise.all(
          selectedBookmarks.map((id) => deleteBookmark.mutateAsync(id))
        );
        setSelectedBookmarks([]);
      } catch (error) {
        console.error("Failed to delete bookmarks:", error);
      }
    }
  };

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await toggleFavorite.mutateAsync({ id, isFavorite: !isFavorite });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handleSelectBookmark = (id: string) => {
    setSelectedBookmarks((prev) =>
      prev.includes(id)
        ? prev.filter((bookmarkId) => bookmarkId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedBookmarks(
      selectedBookmarks.length === filteredBookmarks.length
        ? []
        : filteredBookmarks.map((b) => b.id)
    );
  };

  const copyBookmarkUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You can add a toast notification here
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const exportBookmarks = () => {
    const dataStr = JSON.stringify(filteredBookmarks, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bookmarks.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setFavoriteFilter("all");
    setSelectedTags([]);
    setSortBy("newest");
    setDateFrom("");
    setDateTo("");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    categoryFilter !== "all" ||
    favoriteFilter !== "all" ||
    selectedTags.length > 0 ||
    sortBy !== "newest" ||
    dateFrom !== "" ||
    dateTo !== "";

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Bookmarks</h1>
          {selectedBookmarks.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedBookmarks.length} selected
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                Delete Selected
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "default"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "default"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Export Button */}
          <Button variant="outline" size="sm" onClick={exportBookmarks}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <Link href="/dashboard/bookmarks/create">
            <Button>Add Bookmark</Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search bookmarks by title, description, or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" onSelect={() => handleSelectAll()}>
                All Categories
              </SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  onSelect={() => handleSelectAll()}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Favorite Filter */}
          <Select value={favoriteFilter} onValueChange={setFavoriteFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Favorites" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" onSelect={() => handleSelectAll()}>
                All Bookmarks
              </SelectItem>
              <SelectItem value="favorites" onSelect={() => handleSelectAll()}>
                Favorites Only
              </SelectItem>
              <SelectItem
                value="non-favorites"
                onSelect={() => handleSelectAll()}
              >
                Non-Favorites
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Options */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest" onSelect={() => handleSelectAll()}>
                Newest First
              </SelectItem>
              <SelectItem value="oldest" onSelect={() => handleSelectAll()}>
                Oldest First
              </SelectItem>
              <SelectItem value="title" onSelect={() => handleSelectAll()}>
                Title A-Z
              </SelectItem>
              <SelectItem value="category" onSelect={() => handleSelectAll()}>
                Category
              </SelectItem>
              <SelectItem value="favorites" onSelect={() => handleSelectAll()}>
                Favorites First
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            Advanced
          </Button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <h3 className="font-medium">Advanced Filters</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    placeholder="From"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="date"
                    placeholder="To"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Bulk Actions */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bulk Selection</label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="select-all"
                    checked={
                      selectedBookmarks.length === filteredBookmarks.length &&
                      filteredBookmarks.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="text-sm">
                    Select all visible bookmarks
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Filter by tags:</span>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          {filteredBookmarks.length} of {bookmarks?.length || 0} bookmarks
          {hasActiveFilters && " (filtered)"}
        </div>
      </div>

      {/* Bookmarks Display */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="h-fit">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id={bookmark.id}
                      checked={selectedBookmarks.includes(bookmark.id)}
                      onCheckedChange={() => handleSelectBookmark(bookmark.id)}
                    />
                    <CardTitle className="text-lg">{bookmark.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() =>
                        handleToggleFavorite(bookmark.id, bookmark.isFavorite)
                      }
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          bookmark.isFavorite ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="default" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48" align="end">
                        <div className="space-y-1">
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => copyBookmarkUrl(bookmark.url)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy URL
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <Separator />
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full justify-start text-red-600"
                            onClick={() => handleDelete(bookmark.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookmark.description && (
                  <p className="text-sm text-gray-600">
                    {bookmark.description}
                  </p>
                )}

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {bookmark.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2 py-1 text-xs cursor-pointer transition-colors ${
                          selectedTags.includes(tag)
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500">
                    {bookmark.category} • {formatDate(bookmark.createdAt)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit
                    </Button>
                  </a>

                  <Link href={`/dashboard/bookmarks/${bookmark.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-2">
          {filteredBookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="p-4">
              <div className="flex items-center gap-4">
                <Checkbox
                  id={bookmark.id}
                  checked={selectedBookmarks.includes(bookmark.id)}
                  onCheckedChange={() => handleSelectBookmark(bookmark.id)}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{bookmark.title}</h3>
                    {bookmark.isFavorite && (
                      <Heart className="h-4 w-4 fill-red-500 text-red-500 flex-shrink-0" />
                    )}
                  </div>

                  {bookmark.description && (
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {bookmark.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">
                      {bookmark.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(bookmark.createdAt)}
                    </span>
                    <div className="flex gap-1">
                      {bookmark.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {bookmark.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{bookmark.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>

                  <Link href={`/dashboard/bookmarks/${bookmark.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() =>
                      handleToggleFavorite(bookmark.id, bookmark.isFavorite)
                    }
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        bookmark.isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="default" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48" align="end">
                      <div className="space-y-1">
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => copyBookmarkUrl(bookmark.url)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy URL
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Separator />
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full justify-start text-red-600"
                          onClick={() => handleDelete(bookmark.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty States */}
      {!bookmarks?.length && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No bookmarks yet</p>
          <Link href="/dashboard/bookmarks/create">
            <Button>Create your first bookmark</Button>
          </Link>
        </div>
      )}

      {bookmarks?.length && !filteredBookmarks.length && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            No bookmarks match your current filters
          </p>
          <Button variant="outline" onClick={clearAllFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
