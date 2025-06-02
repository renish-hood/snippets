import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkFormData } from "@/types/bookmark";
import { mockBookmarks, delay } from "@/lib/mock-data";
import { v4 as uuidv4 } from "uuid";

// Mock API functions
const fetchBookmarks = async (): Promise<Bookmark[]> => {
  await delay(500);
  const stored = localStorage.getItem("bookmarks");
  return stored ? JSON.parse(stored) : mockBookmarks;
};

const fetchBookmark = async (id: string): Promise<Bookmark> => {
  await delay(300);
  const bookmarks = await fetchBookmarks();
  const bookmark = bookmarks.find((b) => b.id === id);
  if (!bookmark) throw new Error("Bookmark not found");
  return bookmark;
};

const createBookmark = async (data: BookmarkFormData): Promise<Bookmark> => {
  await delay(500);
  const bookmarks = await fetchBookmarks();
  const newBookmark: Bookmark = {
    ...data,
    id: uuidv4(),
    tags: data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const updated = [...bookmarks, newBookmark];
  localStorage.setItem("bookmarks", JSON.stringify(updated));
  return newBookmark;
};

const updateBookmark = async ({
  id,
  data,
}: {
  id: string;
  data: BookmarkFormData;
}): Promise<Bookmark> => {
  await delay(500);
  const bookmarks = await fetchBookmarks();
  const index = bookmarks.findIndex((b) => b.id === id);
  if (index === -1) throw new Error("Bookmark not found");

  const updatedBookmark: Bookmark = {
    ...bookmarks[index],
    ...data,
    tags: data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    updatedAt: new Date(),
  };

  bookmarks[index] = updatedBookmark;
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  return updatedBookmark;
};

const deleteBookmark = async (id: string): Promise<void> => {
  await delay(300);
  const bookmarks = await fetchBookmarks();
  const filtered = bookmarks.filter((b) => b.id !== id);
  localStorage.setItem("bookmarks", JSON.stringify(filtered));
};

// Custom hooks
export const useBookmarks = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });
};

export const useBookmark = (id: string) => {
  return useQuery({
    queryKey: ["bookmark", id],
    queryFn: () => fetchBookmark(id),
    enabled: !!id,
  });
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
};

export const useUpdateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBookmark,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["bookmark", data.id] });
    },
  });
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
};

export const useToggleFavorite = () => {
  return {
    mutateAsync: async ({
      id,
      isFavorite,
    }: {
      id: string;
      isFavorite: boolean;
    }) => {
      console.log(`Toggling favorite for ${id} to ${isFavorite}`);
      return Promise.resolve();
    },
  };
};
