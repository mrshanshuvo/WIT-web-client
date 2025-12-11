import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaBox,
  FaEye,
  FaExclamationTriangle,
  FaHome,
  FaSyncAlt,
  FaListUl,
  FaTimes,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Compact Skeleton Card
const ItemCardSkeleton = () => (
  <div className="bg-white/85 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100/60 overflow-hidden animate-pulse">
    <div className="h-36 bg-gradient-to-br from-emerald-100/50 to-teal-100/50" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <Skeleton height={18} width="70%" className="bg-emerald-200" />
        <Skeleton height={16} width="50px" className="bg-teal-200" />
      </div>
      <Skeleton height={14} width="90%" count={2} className="bg-emerald-100" />
      <div className="flex items-center gap-2">
        <Skeleton circle height={14} width={14} className="bg-emerald-200" />
        <Skeleton height={14} width="60%" className="bg-emerald-100" />
      </div>
      <Skeleton
        height={32}
        width="100%"
        borderRadius="10px"
        className="bg-emerald-200"
      />
    </div>
  </div>
);

// Compact Card Component
const ItemCard = ({ item, onViewDetails }) => {
  const getPostTypeConfig = (postType) =>
    postType.toLowerCase() === "found"
      ? {
          color:
            "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200",
          icon: FaEye,
        }
      : {
          color:
            "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200",
          icon: FaExclamationTriangle,
        };

  const postTypeConfig = getPostTypeConfig(item.postType);
  const PostTypeIcon = postTypeConfig.icon;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col group">
      {/* Image Section */}
      <div className="relative h-40 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100/50 to-teal-100/50">
            <FaBox className="text-3xl text-gray-400" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${postTypeConfig.color}`}
          >
            <PostTypeIcon className="text-xs" />
            <span className="capitalize">{item.postType}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200">
            <FaTag className="text-xs" />
            <span className="truncate max-w-[120px]">{item.category}</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200">
          {item.title}
        </h3>

        <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-grow">
          {item.description || "No description provided"}
        </p>

        <div className="space-y-2 mb-3 text-xs text-gray-700">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-emerald-500 flex-shrink-0" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-emerald-500 flex-shrink-0" />
            <span>
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(item._id)}
          className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-1.5 group/btn"
        >
          <FaEye className="text-xs group-hover/btn:scale-110 transition-transform duration-200" />
          View Details
        </button>
      </div>
    </div>
  );
};

const LostFoundItems = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    postType: "all",
    category: "all",
    location: "all",
    sortBy: "newest",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const itemsPerPage = 12;

  const {
    data: items = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axiosInstance.get("/inventory");
      return res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    staleTime: 1000 * 60 * 3,
  });

  const handleViewDetails = (itemId) => navigate(`/inventory/${itemId}`);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    setCurrentPage(1);

    const activeCount = Object.entries(newFilters).filter(
      ([key, val]) => key !== "sortBy" && val !== "all"
    ).length;
    setActiveFiltersCount(activeCount);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      postType: "all",
      category: "all",
      location: "all",
      sortBy: "newest",
    });
    setCurrentPage(1);
    setActiveFiltersCount(0);
  };

  const filteredItems = items
    .filter((item) => item.status !== "recovered")
    .filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPostType =
        filters.postType === "all" ||
        item.postType.toLowerCase() === filters.postType;
      const matchesCategory =
        filters.category === "all" || item.category === filters.category;
      const matchesLocation =
        filters.location === "all" ||
        item.location.toLowerCase().includes(filters.location.toLowerCase());
      return (
        matchesSearch && matchesPostType && matchesCategory && matchesLocation
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const categories = [...new Set(items.map((i) => i.category))].filter(Boolean);
  const locations = [...new Set(items.map((i) => i.location))].filter(Boolean);

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(
    indexOfLastItem - itemsPerPage,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations (smaller) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-16 left-10 w-52 h-52 bg-emerald-200 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-10 w-64 h-64 bg-teal-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-3 border border-emerald-200">
            <FaListUl className="text-emerald-600 text-base" />
            <span className="font-semibold text-emerald-800 text-sm">
              Lost &amp; Found Items
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-2">
            Browse Community Items
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover lost and found items near you and help reunite them with
            their owners.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-4 sm:p-5 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm group-hover:text-emerald-500 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search items by title or description..."
              className="w-full pl-11 pr-9 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-white/60 text-sm text-gray-800 placeholder-gray-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Filter Header */}
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-200"
            >
              <FaFilter className="text-sm" />
              <span>
                Filters{activeFiltersCount > 0 && ` (${activeFiltersCount})`}
              </span>
              {showFilters ? <FaCaretUp /> : <FaCaretDown />}
            </button>

            <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-gray-900">
              <FaFilter className="text-emerald-600" />
              <span>Filter items</span>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2 text-sm">
              <label className="text-gray-600 font-medium">Sort by:</label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-emerald-200 rounded-lg bg-white/60 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block transition-all duration-200`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <FaTag className="text-emerald-600" />
                    Item Type
                  </span>
                </label>
                <select
                  name="postType"
                  value={filters.postType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2.5 border border-emerald-200 rounded-lg text-sm bg-white/60 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                >
                  <option value="all">All types</option>
                  <option value="lost">Lost items</option>
                  <option value="found">Found items</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <FaTag className="text-emerald-600" />
                    Category
                  </span>
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2.5 border border-emerald-200 rounded-lg text-sm bg-white/60 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  disabled={categories.length === 0}
                >
                  <option value="all">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-600" />
                    Location
                  </span>
                </label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2.5 border border-emerald-200 rounded-lg text-sm bg-white/60 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  disabled={locations.length === 0}
                >
                  <option value="all">All locations</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <FaHome className="text-emerald-600" />
                    Actions
                  </span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={resetFilters}
                    className="flex-1 px-3 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-200 border border-gray-200"
                  >
                    Reset all
                  </button>
                  <button
                    onClick={() => refetch()}
                    className="px-3 py-2.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-lg hover:shadow-md transition-all duration-200 border border-emerald-200 flex items-center justify-center"
                  >
                    <FaSyncAlt className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-between items-center pt-3 border-t border-emerald-100 text-xs sm:text-sm">
            <div className="text-gray-600 font-medium mb-2 sm:mb-0">
              <span className="text-emerald-700 font-bold">
                {filteredItems.length}
              </span>{" "}
              of <span className="font-bold">{items.length}</span> items
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Found</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Lost</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {isError ? (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 text-center backdrop-blur-sm">
            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Error loading items
            </h3>
            <p className="text-red-600 mb-4 max-w-md mx-auto text-sm">
              Unable to load items at the moment. Please check your connection.
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-lg hover:shadow-md transition-all duration-200"
            >
              Try again
            </button>
          </div>
        ) : filteredItems.length === 0 && !isLoading ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-10 text-center">
            <FaSearch className="text-gray-300 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-5 max-w-md mx-auto text-sm">
              No items match your search criteria. Try adjusting filters or
              search terms.
            </p>
            <button
              onClick={resetFilters}
              className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <FaTimes className="text-sm" />
              Reset all filters
            </button>
          </div>
        ) : (
          <>
            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6">
              {isLoading
                ? Array.from({ length: itemsPerPage }).map((_, idx) => (
                    <ItemCardSkeleton key={idx} />
                  ))
                : currentItems.map((item) => (
                    <ItemCard
                      key={item._id}
                      item={item}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 px-3 py-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-emerald-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>

                  {getVisiblePages().map((pageNum, index) =>
                    pageNum === "..." ? (
                      <span
                        key={`dots-${index}`}
                        className="px-2 py-1 text-gray-500 text-sm"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-emerald-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-emerald-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <FaChevronRight className="text-sm" />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LostFoundItems;
