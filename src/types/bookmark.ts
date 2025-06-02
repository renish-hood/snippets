export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags: string[];
  category: "work" | "personal" | "education" | "entertainment";
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookmarkFormData {
  title: string;
  url: string;
  description?: string;
  tags: string;
  category: Bookmark["category"];
  isFavorite: boolean;
}
