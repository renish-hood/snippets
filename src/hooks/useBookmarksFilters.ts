import { Bookmark } from "@/types/bookmark";
import { useState, useMemo } from "react";

export function useBookmarksFilters(bookmarks: Bookmark[] | undefined) {
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [favoriteFilter, setFavoriteFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Get unique categories and tags
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

  return {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    favoriteFilter,
    setFavoriteFilter,
    sortBy,
    setSortBy,
    selectedTags,
    setSelectedTags,
    showAdvancedFilters,
    setShowAdvancedFilters,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    clearAllFilters,
    hasActiveFilters,
    filteredBookmarks,
    categories,
    allTags,
  };
}