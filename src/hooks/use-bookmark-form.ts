import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookmarkSchema, BookmarkFormSchema } from "@/lib/validations";
import { Bookmark } from "@/types/bookmark";

export const useBookmarkForm = (defaultValues?: Partial<Bookmark>) => {
  const form = useForm<BookmarkFormSchema>({
    // @ts-expect-error - Type mismatch between zod and react-hook-form
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      url: defaultValues?.url || "",
      description: defaultValues?.description || "",
      tags: defaultValues?.tags?.join(", ") || "",
      category: (defaultValues?.category || "personal") as BookmarkFormSchema["category"],
      isFavorite: defaultValues?.isFavorite ?? false,
    },
  });

  return form;
};
