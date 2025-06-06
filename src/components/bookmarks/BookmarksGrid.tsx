/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    MoreVertical,
    Copy,
    Share2,
} from "lucide-react";
import { Bookmark } from "@/types/bookmark";
import Tooltip from "../ui/tooltip";

interface BookmarksGridProps {
    bookmarks: Bookmark[];
    selectedBookmarks: string[];
    selectedTags: string[];
    onSelectBookmark: (id: string) => void;
    onToggleFavorite: (id: string, isFavorite: boolean) => void;
    onDelete: (id: string) => void;
    onCopyUrl: (url: string) => void;
    onTagToggle: (tag: string) => void;
}
export function BookmarksGrid({
    bookmarks,
    selectedBookmarks,
    selectedTags,
    onSelectBookmark,
    onToggleFavorite,
    onDelete,
    onCopyUrl,
    onTagToggle,
}: BookmarksGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark: Bookmark) => (
                <Card key={bookmark.id} className="h-fit">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                                <Checkbox
                                    id={bookmark.id}
                                    checked={selectedBookmarks.includes(bookmark.id)}
                                    onCheckedChange={() => onSelectBookmark(bookmark.id)}
                                />
                                <CardTitle className="text-lg">{bookmark.title}</CardTitle>
                            </div>
                            <div className="flex items-center gap-1">


                                <Tooltip content={bookmark.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                                    {({ isVisible, tooltipProps }: { isVisible: boolean; tooltipProps: any }) => (
                                        <Button
                                            {...tooltipProps}
                                            variant={isVisible ? "default" : "ghost"}  // Changes based on hover state
                                            size="sm"
                                            className={isVisible ? 'bg-red-50' : ''}   // Dynamic styling
                                            onClick={() => onToggleFavorite(bookmark.id, bookmark.isFavorite)}
                                        >
                                            <Heart
                                                className={`h-4 w-4 ${bookmark.isFavorite
                                                    ? "fill-red-500 text-red-500"
                                                    : isVisible ? "text-red-400" : ""  // Dynamic color based on hover
                                                    }`}
                                            />
                                        </Button>
                                    )}
                                </Tooltip>
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
                                                onClick={() => onCopyUrl(bookmark.url)}
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
                                                onClick={() => onDelete(bookmark.id)}
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
                            <p className="text-sm text-gray-600">{bookmark.description}</p>
                        )}

                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                                {bookmark.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`rounded-full px-2 py-1 text-xs cursor-pointer transition-colors ${selectedTags.includes(tag)
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                            }`}
                                        onClick={() => onTagToggle(tag)}
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
    );
}