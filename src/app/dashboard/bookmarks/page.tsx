"use client";

import { useState, useEffect } from "react";
import {
  useBookmarks,
  useDeleteBookmark,
  useToggleFavorite,
} from "@/hooks/use-bookmarks";
import { BookmarksHeader } from "@/components/bookmarks/BookmarksHeader";
import { BookmarksFilters } from "@/components/bookmarks/BookmarksFilters";
import { BookmarksGrid } from "@/components/bookmarks/BookmarksGrid";
import { BookmarksList } from "@/components/bookmarks/BookmarksList";
import { BookmarksEmptyState } from "@/components/bookmarks/BookmarksEmptyState";
import { useBookmarksFilters } from "@/hooks/useBookmarksFilters";
import { useBookmarksActions } from "@/hooks/useBookmarksActions";

export default function BookmarksPage() {
  const { data: bookmarks, isLoading } = useBookmarks();
  const deleteBookmark = useDeleteBookmark();
  const toggleFavorite = useToggleFavorite();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);

  // Custom hooks for filters and actions
  const {
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
  } = useBookmarksFilters(bookmarks);

  const {
    handleDelete,
    handleBulkDelete,
    handleToggleFavorite,
    handleSelectBookmark,
    handleSelectAll,
    copyBookmarkUrl,
    exportBookmarks,
    handleTagToggle,
  } = useBookmarksActions({
    deleteBookmark,
    toggleFavorite,
    selectedBookmarks,
    setSelectedBookmarks,
    filteredBookmarks,
    setSelectedTags,
    selectedTags,
  })

  // Persist view mode
  useEffect(() => {
    const savedViewMode = localStorage.getItem("bookmarks-view-mode") as
      | "grid"
      | "list";
    if (savedViewMode) setViewMode(savedViewMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks-view-mode", viewMode);
  }, [viewMode]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <BookmarksHeader
        selectedBookmarks={selectedBookmarks}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onBulkDelete={handleBulkDelete}
        onExport={exportBookmarks}
      />

      <BookmarksFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        favoriteFilter={favoriteFilter}
        setFavoriteFilter={setFavoriteFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedTags={selectedTags}
        showAdvancedFilters={showAdvancedFilters}
        setShowAdvancedFilters={setShowAdvancedFilters}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        hasActiveFilters={hasActiveFilters}
        onClearAllFilters={clearAllFilters}
        onSelectAll={handleSelectAll}
        onTagToggle={handleTagToggle}
        categories={categories}
        allTags={allTags}
        filteredBookmarks={filteredBookmarks}
        selectedBookmarks={selectedBookmarks}
        totalBookmarks={bookmarks?.length || 0}
      />

      {viewMode === "grid" ? (
        <BookmarksGrid
          bookmarks={filteredBookmarks}
          selectedBookmarks={selectedBookmarks}
          selectedTags={selectedTags}
          onSelectBookmark={handleSelectBookmark}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
          onCopyUrl={copyBookmarkUrl}
          onTagToggle={handleTagToggle}
        />
      ) : (
        <BookmarksList
          bookmarks={filteredBookmarks}
          selectedBookmarks={selectedBookmarks}
          onSelectBookmark={handleSelectBookmark}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
          onCopyUrl={copyBookmarkUrl}
        />
      )}

      <BookmarksEmptyState
        hasBookmarks={!!bookmarks?.length}
        hasFilteredResults={!!filteredBookmarks.length}
        onClearFilters={clearAllFilters}
      />
    </div>
  );
}