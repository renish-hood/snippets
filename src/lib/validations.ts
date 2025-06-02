import { z } from "zod";

export const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  url: z.string().url("Please enter a valid URL"),
  description: z.string(),
  tags: z.string(),
  category: z.enum(["work", "personal", "education", "entertainment"]),
  isFavorite: z.boolean().default(false),
});

export type BookmarkFormSchema = z.infer<typeof bookmarkSchema>;
