import { Button } from "@/components/ui/button";
import { Grid, List, Download } from "lucide-react";
import Link from "next/link";

interface BookmarksHeaderProps {
    selectedBookmarks: string[];
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    onBulkDelete: () => void;
    onExport: () => void;
}

export function BookmarksHeader({
    selectedBookmarks,
    viewMode,
    setViewMode,
    onBulkDelete,
    onExport,
}: BookmarksHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold">Bookmarks</h1>
                {selectedBookmarks.length > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                            {selectedBookmarks.length} selected
                        </span>
                        <Button variant="destructive" size="sm" onClick={onBulkDelete}>
                            Delete Selected
                        </Button>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="flex border rounded-md">
                    <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>

                {/* Export Button */}
                <Button variant="outline" size="sm" onClick={onExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>

                <Link href="/dashboard/bookmarks/create">
                    <Button>Add Bookmark</Button>
                </Link>
            </div>
        </div>
    );
}