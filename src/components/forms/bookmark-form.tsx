"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookmarkSchema, BookmarkFormSchema } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bookmark } from "@/types/bookmark";
import type { SubmitHandler } from "react-hook-form";

interface BookmarkFormProps {
  defaultValues?: Partial<Bookmark>;
  onSubmit: SubmitHandler<BookmarkFormSchema>;
  isLoading?: boolean;
  submitText?: string;
}

export function BookmarkForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitText = "Save Bookmark",
}: BookmarkFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookmarkFormSchema>({
    // @ts-expect-error - Type mismatch between zod and react-hook-form
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      url: defaultValues?.url || "",
      description: defaultValues?.description || "",
      tags: defaultValues?.tags?.join(", ") || "",
      category: (defaultValues?.category || "personal") as BookmarkFormSchema["category"],
      isFavorite: defaultValues?.isFavorite || false,
    },
  });

  return (
    <form 
      onSubmit={handleSubmit((data) => {
        onSubmit({
          title: data.title,
          url: data.url,
          description: data.description,
          tags: data.tags,
          category: data.category,
          isFavorite: data.isFavorite
        } as BookmarkFormSchema);
      })}
      className="space-y-6"
    >
      <Input
        label="Title"
        {...register("title")}
        error={errors.title?.message}
        placeholder="Enter bookmark title"
      />

      <Input
        label="URL"
        type="url"
        {...register("url")}
        error={errors.url?.message}
        placeholder="https://example.com"
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Description"
        />
      </div>

      <Input
        label="Tags"
        {...register("tags")}
        error={errors.tags?.message}
        placeholder="react, javascript, tutorial (comma-separated)"
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <select
          {...register("category")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register("isFavorite")}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label className="text-sm font-medium">Mark as favorite</label>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : submitText}
      </Button>
    </form>
  );
}
