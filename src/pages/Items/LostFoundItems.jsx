import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiMapPin,
  FiCalendar,
  FiTag,
  FiBox,
} from "react-icons/fi";
import {
  FaEye,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Skeleton Card
const ItemCardSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden animate-pulse">
    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton height={24} width="70%" />
        <Skeleton height={20} width="60px" />
      </div>
      <Skeleton height={16} width="90%" count={2} />
      <div className="flex items-center gap-2">
        <Skeleton circle height={16} width={16} />
        <Skeleton height={16} width="60%" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton circle height={16} width={16} />
        <Skeleton height={16} width="40%" />
      </div>
      <Skeleton height={40} width="100%" borderRadius="12px" />
    </div>
  </div>
);

// Card Component
const ItemCard = ({ item, onViewDetails }) => {
  const getPostTypeConfig = (postType) => {
    return postType.toLowerCase() === "found"
      ? {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: FaEye,
        }
      : {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: FaExclamationTriangle,
        };
  };

  const postTypeConfig = getPostTypeConfig(item.postType);
  const PostTypeIcon = postTypeConfig.icon;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col group">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image+Available";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <FiBox className="text-4xl text-gray-400" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${postTypeConfig.color}`}
          >
            <PostTypeIcon className="text-xs" />
            <span className="capitalize">{item.postType}</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <FaTag className="text-xs" />
            <span>{item.category}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {item.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {item.description || "No description provided"}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <FaCalendarAlt className="text-gray-400 flex-shrink-0" />
            <span>
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(item._id)}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
        >
          <FaEye className="text-sm group-hover/btn:scale-110 transition-transform duration-200" />
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
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  const {
    data: items = [],
    isLoading,
    isError,
    error,
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
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({ postType: "all", category: "all", location: "all" });
    setCurrentPage(1);
  };

  const filteredItems = items
    .filter((item) => item.status !== "recovered")
    .filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
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
    });

  const categories = [...new Set(items.map((i) => i.category))].filter(Boolean);
  const locations = [...new Set(items.map((i) => i.location))].filter(Boolean);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Lost & Found Items
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through lost and found items in your community. Help reunite
            items with their owners.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search items by title or description..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Filter Toggle for Mobile */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 w-full justify-center"
            >
              <FiFilter className="text-lg" />
              <span className="font-semibold">Filters</span>
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {Object.values(filters).filter((v) => v !== "all").length}
              </span>
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaTag className="text-blue-500" />
                    Item Type
                  </span>
                </label>
                <select
                  name="postType"
                  value={filters.postType}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                >
                  <option value="all">All Types</option>
                  <option value="lost">Lost Items</option>
                  <option value="found">Found Items</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FiTag className="text-blue-500" />
                    Category
                  </span>
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  disabled={categories.length === 0}
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FiMapPin className="text-blue-500" />
                    Location
                  </span>
                </label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  disabled={locations.length === 0}
                >
                  <option value="all">All Locations</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {filteredItems.length} of {items.length} items
              </div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {isError ? (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Error Loading Items
            </h3>
            <p className="text-red-600 mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : filteredItems.length === 0 && !isLoading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
            <FiSearch className="text-gray-400 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Items Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              No items match your search criteria. Try adjusting your filters or
              search terms.
            </p>
            <button
              onClick={resetFilters}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <FiChevronLeft className="text-lg" />
                  </button>

                  {getVisiblePages().map((pageNum, index) =>
                    pageNum === "..." ? (
                      <span
                        key={`dots-${index}`}
                        className="px-3 py-2 text-gray-500"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <FiChevronRight className="text-lg" />
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
