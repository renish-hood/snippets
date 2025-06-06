import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BookmarksEmptyStateProps {
    hasBookmarks: boolean;
    hasFilteredResults: boolean;
    onClearFilters: () => void;
}

export function BookmarksEmptyState({
    hasBookmarks,
    hasFilteredResults,
    onClearFilters,
}: BookmarksEmptyStateProps) {
    if (!hasBookmarks) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No bookmarks yet</p>
                <Link href="/dashboard/bookmarks/create">
                    <Button>Create your first bookmark</Button>
                </Link>
            </div>
        );
    }

    if (hasBookmarks && !hasFilteredResults) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                    No bookmarks match your current filters
                </p>
                <Button variant="outline" onClick={onClearFilters}>
                    Clear all filters
                </Button>
            </div>
        );
    }

    return null;
}