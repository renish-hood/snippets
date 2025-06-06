/* eslint-disable @typescript-eslint/no-explicit-any */
interface UseBookmarksActionsProps {
  deleteBookmark: any;
  toggleFavorite: any;
  selectedBookmarks: string[];
  setSelectedBookmarks: (bookmarks: string[]) => void;
  filteredBookmarks: any[];
  setSelectedTags: (tags: string[]) => void;
  selectedTags: string[]; // Add this to access current selected tags
}

export function useBookmarksActions({
  deleteBookmark,
  toggleFavorite,
  selectedBookmarks,
  setSelectedBookmarks,
  filteredBookmarks,
  setSelectedTags,
  selectedTags, // Add this parameter
}: UseBookmarksActionsProps) {
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
    setSelectedBookmarks(
      selectedBookmarks.includes(id)
        ? selectedBookmarks.filter((bookmarkId) => bookmarkId !== id)
        : [...selectedBookmarks, id]
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
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  return {
    handleDelete,
    handleBulkDelete,
    handleToggleFavorite,
    handleSelectBookmark,
    handleSelectAll,
    copyBookmarkUrl,
    exportBookmarks,
    handleTagToggle,
  };
}