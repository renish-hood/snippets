import { Bookmark } from "@/types/bookmark";

export const mockBookmarks: Bookmark[] = [
  {
    id: "1",
    title: "React Documentation",
    url: "https://react.dev",
    description: "Official React documentation",
    tags: ["react", "documentation", "frontend"],
    category: "work",
    isFavorite: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Next.js Guide",
    url: "https://nextjs.org/docs",
    description: "Complete Next.js framework guide",
    tags: ["nextjs", "react", "fullstack"],
    category: "work",
    isFavorite: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
];

// Simulate API delay
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
