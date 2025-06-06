import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, X } from "lucide-react";
import { Bookmark } from "@/types/bookmark";

interface BookmarksFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    categoryFilter: string;
    setCategoryFilter: (category: string) => void;
    favoriteFilter: string;
    setFavoriteFilter: (filter: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    selectedTags: string[];
    showAdvancedFilters: boolean;
    setShowAdvancedFilters: (show: boolean) => void;
    dateFrom: string;
    setDateFrom: (date: string) => void;
    dateTo: string;
    setDateTo: (date: string) => void;
    hasActiveFilters: boolean;
    onClearAllFilters: () => void;
    onSelectAll: () => void;
    onTagToggle: (tag: string) => void;
    categories: string[];
    allTags: string[];
    filteredBookmarks: Bookmark[];
    selectedBookmarks: string[];
    totalBookmarks: number;
}

export function BookmarksFilters({
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    favoriteFilter,
    setFavoriteFilter,
    sortBy,
    setSortBy,
    selectedTags,
    showAdvancedFilters,
    setShowAdvancedFilters,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    hasActiveFilters,
    onClearAllFilters,
    onSelectAll,
    onTagToggle,
    categories,
    allTags,
    filteredBookmarks,
    selectedBookmarks,
    totalBookmarks,
}: BookmarksFiltersProps) {
    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Search bookmarks by title, description, or URL..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 mr-8">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Filters:</span>
                </div>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            All Categories
                        </SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Favorite Filter */}
                <Select value={favoriteFilter} onValueChange={setFavoriteFilter}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Favorites" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            All Bookmarks
                        </SelectItem>
                        <SelectItem value="favorites">
                            Favorites Only
                        </SelectItem>
                        <SelectItem value="non-favorites">
                            Non-Favorites
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Sort Options */}
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">
                            Newest First
                        </SelectItem>
                        <SelectItem value="oldest">
                            Oldest First
                        </SelectItem>
                        <SelectItem value="title">
                            Title A-Z
                        </SelectItem>
                        <SelectItem value="category">
                            Category
                        </SelectItem>
                        <SelectItem value="favorites">
                            Favorites First
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Advanced Filters Toggle */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                    Advanced
                </Button>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClearAllFilters}
                        className="text-xs"
                    >
                        <X className="h-3 w-3 mr-1" />
                        Clear All
                    </Button>
                )}
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
                <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                    <h3 className="font-medium">Advanced Filters</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Date Range */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date Range</label>
                            <div className="flex gap-2">
                                <Input
                                    type="date"
                                    placeholder="From"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="flex-1"
                                />
                                <Input
                                    type="date"
                                    placeholder="To"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="flex-1"
                                />
                            </div>
                        </div>

                        {/* Bulk Actions */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Bulk Selection</label>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="select-all"
                                    checked={
                                        selectedBookmarks.length === filteredBookmarks.length &&
                                        filteredBookmarks.length > 0
                                    }
                                    onCheckedChange={onSelectAll}
                                />
                                <label htmlFor="select-all" className="text-sm">
                                    Select all visible bookmarks
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tag Filter */}
            {allTags.length > 0 && (
                <div className="space-y-2">
                    <span className="text-sm font-medium">Filter by tags:</span>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <Badge
                                key={tag}
                                variant={selectedTags.includes(tag) ? "default" : "outline"}
                                className="cursor-pointer hover:bg-blue-100"
                                onClick={() => onTagToggle(tag)}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Results Count */}
            <div className="text-sm text-gray-600">
                {filteredBookmarks.length} of {totalBookmarks} bookmarks
                {hasActiveFilters && " (filtered)"}
            </div>
        </div>
    );
}