import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface BookmarksListProps {
    bookmarks: Bookmark[];
    selectedBookmarks: string[];
    onSelectBookmark: (id: string) => void;
    onToggleFavorite: (id: string, isFavorite: boolean) => void;
    onDelete: (id: string) => void;
    onCopyUrl: (url: string) => void;
}

export function BookmarksList({
    bookmarks,
    selectedBookmarks,
    onSelectBookmark,
    onToggleFavorite,
    onDelete,
    onCopyUrl,
}: BookmarksListProps) {
    return (
        <div className="space-y-2">
            {bookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="p-4">
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={bookmark.id}
                            checked={selectedBookmarks.includes(bookmark.id)}
                            onCheckedChange={() => onSelectBookmark(bookmark.id)}
                        />

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-medium truncate">{bookmark.title}</h3>
                                {bookmark.isFavorite && (
                                    <Heart className="h-4 w-4 fill-red-500 text-red-500 flex-shrink-0" />
                                )}
                            </div>

                            {bookmark.description && (
                                <p className="text-sm text-gray-600 truncate mt-1">
                                    {bookmark.description}
                                </p>
                            )}

                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-xs text-gray-500">
                                    {bookmark.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {formatDate(bookmark.createdAt)}
                                </span>
                                <div className="flex gap-1">
                                    {bookmark.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {bookmark.tags.length > 3 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{bookmark.tags.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" size="sm">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </a>

                            <Link href={`/dashboard/bookmarks/${bookmark.id}`}>
                                <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>

                            <Button
                                variant="default"
                                size="sm"
                                onClick={() =>
                                    onToggleFavorite(bookmark.id, bookmark.isFavorite)
                                }
                            >
                                <Heart
                                    className={`h-4 w-4 ${bookmark.isFavorite ? "fill-red-500 text-red-500" : ""
                                        }`}
                                />
                            </Button>

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
                </Card>
            ))}
        </div>
    );
}