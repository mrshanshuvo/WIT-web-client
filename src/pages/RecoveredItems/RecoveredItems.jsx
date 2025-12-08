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
  FaCheckCircle,
  FaEye,
  FaExclamationTriangle,
  FaHistory,
  FaHome,
  FaSyncAlt,
  FaTimes,
  FaCaretDown,
  FaCaretUp,
  FaChartLine,
  FaTrophy,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Skeleton Card
const ItemCardSkeleton = () => (
  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-emerald-100/50 overflow-hidden animate-pulse">
    <div className="h-48 bg-gradient-to-br from-emerald-100/50 to-teal-100/50"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton height={24} width="70%" className="bg-emerald-200" />
        <Skeleton height={20} width="80px" className="bg-teal-200" />
      </div>
      <Skeleton height={16} width="90%" count={2} className="bg-emerald-100" />
      <div className="flex items-center gap-2">
        <Skeleton circle height={16} width={16} className="bg-emerald-200" />
        <Skeleton height={16} width="60%" className="bg-emerald-100" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton circle height={16} width={16} className="bg-emerald-200" />
        <Skeleton height={16} width="40%" className="bg-emerald-100" />
      </div>
      <Skeleton
        height={40}
        width="100%"
        borderRadius="12px"
        className="bg-emerald-200"
      />
    </div>
  </div>
);

// Item Card Component
const ItemCard = ({ item, onViewDetails }) => {
  const getPostTypeConfig = (postType) => {
    return postType.toLowerCase() === "found"
      ? {
          color:
            "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200",
          icon: FaCheckCircle,
        }
      : {
          color:
            "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200",
          icon: FaExclamationTriangle,
        };
  };

  const postTypeConfig = getPostTypeConfig(item.postType);
  const PostTypeIcon = postTypeConfig.icon;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col group">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100/50 to-teal-100/50">
            <FaCheckCircle className="text-5xl text-emerald-400" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${postTypeConfig.color}`}
          >
            <PostTypeIcon className="text-xs" />
            <span className="capitalize">{item.postType}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200">
            <FaTag className="text-xs" />
            <span>{item.category}</span>
          </div>
        </div>

        {/* Recovered Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
            <FaTrophy className="text-xs" />
            <span>Recovered</span>
          </div>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200">
          {item.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {item.description || "No description provided"}
        </p>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <FaMapMarkerAlt className="text-emerald-500 flex-shrink-0" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
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

        {/* Success Message */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
              <FaCheckCircle className="text-emerald-600" />
            </div>
            <div>
              <div className="font-bold text-emerald-800">
                Successfully Recovered!
              </div>
              <p className="text-emerald-700 text-xs mt-1">
                This item has been reunited with its owner
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(item._id)}
          className="group/btn w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <FaEye className="text-sm group-hover/btn:scale-110 transition-transform duration-200" />
          View Recovery Story
        </button>
      </div>
    </div>
  );
};

const RecoveredItems = () => {
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
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);

    // Update active filters count
    const newFilters = { ...filters, [name]: value };
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
    .filter((item) => item.status === "recovered")
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

  const lostCount = filteredItems.filter(
    (item) => item.postType === "lost"
  ).length;
  const foundCount = filteredItems.filter(
    (item) => item.postType === "found"
  ).length;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-6 border border-emerald-200">
            <FaTrophy className="text-emerald-600 text-lg" />
            <span className="font-bold text-emerald-800">Recovered Items</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-4">
            Success Stories
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Celebrate these success stories! Browse through items that have been
            successfully reunited with their owners.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-white text-xl" />
            </div>
            <h3 className="text-3xl font-black text-gray-900">
              {filteredItems.length}
            </h3>
            <p className="text-gray-600 font-medium">Total Recovered</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4">
              <FaExclamationTriangle className="text-white text-xl" />
            </div>
            <h3 className="text-3xl font-black text-gray-900">{lostCount}</h3>
            <p className="text-gray-600 font-medium">Lost Items Found</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-white text-xl" />
            </div>
            <h3 className="text-3xl font-black text-gray-900">{foundCount}</h3>
            <p className="text-gray-600 font-medium">Found Items Returned</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center mx-auto mb-4">
              <FaTag className="text-white text-xl" />
            </div>
            <h3 className="text-3xl font-black text-gray-900">
              {categories.length}
            </h3>
            <p className="text-gray-600 font-medium">Categories</p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-hover:text-emerald-500 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search recovered items by title or description..."
              className="w-full pl-14 pr-5 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Filter Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <FaFilter className="text-lg" />
              <span>
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
              {showFilters ? <FaCaretUp /> : <FaCaretDown />}
            </button>

            <div className="hidden lg:block">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaFilter className="text-emerald-600" />
                Filter Recovered Items
              </h3>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 font-medium">
                Sort by:
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-emerald-200 rounded-lg bg-white/50 backdrop-blur-sm text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block transition-all duration-300`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="form-group">
                <label className="block mb-3 font-bold text-gray-700 items-center gap-2">
                  <FaTag className="text-emerald-600" />
                  Item Type
                </label>
                <select
                  name="postType"
                  value={filters.postType}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  <option value="all">All Types</option>
                  <option value="lost">Lost Items</option>
                  <option value="found">Found Items</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block mb-3 font-bold text-gray-700 items-center gap-2">
                  <FaTag className="text-emerald-600" />
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
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
                <label className="block mb-3 font-bold text-gray-700 items-center gap-2">
                  <FaMapMarkerAlt className="text-emerald-600" />
                  Location
                </label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
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

              <div className="form-group">
                <label className="block mb-3 font-bold text-gray-700 items-center gap-2">
                  <FaHome className="text-emerald-600" />
                  Actions
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={() => refetch()}
                    className="px-4 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 border border-emerald-200"
                  >
                    <FaSyncAlt className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-between items-center pt-4 border-t border-emerald-100">
            <div className="text-sm text-gray-600 font-medium">
              <span className="text-emerald-700 font-bold">
                {filteredItems.length}
              </span>{" "}
              recovered items
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>Found Items</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Lost Items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {isError ? (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-3xl p-12 text-center backdrop-blur-sm">
            <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-red-800 mb-3">
              Error Loading Items
            </h3>
            <p className="text-red-600 mb-6 max-w-md mx-auto">
              Unable to load recovered items at the moment. Please check your
              connection.
            </p>
            <button
              onClick={() => refetch()}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        ) : filteredItems.length === 0 && !isLoading ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-16 text-center">
            <FaCheckCircle className="text-gray-400 text-7xl mx-auto mb-8" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              No Recovered Items Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              When items are successfully recovered and marked as returned, they
              will appear here to celebrate these success stories.
            </p>
            <button
              onClick={() => navigate("/lost-found-items")}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaEye className="text-lg" />
              Browse Active Items
            </button>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-gray-600 font-medium">
                Showing {filteredItems.length === 0 ? 0 : indexOfFirstItem + 1}–
                {Math.min(indexOfLastItem, filteredItems.length)} of{" "}
                <span className="text-emerald-700 font-bold">
                  {filteredItems.length}
                </span>{" "}
                recovered items
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
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
                <nav className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-3">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl border border-emerald-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <FaChevronLeft className="text-lg" />
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
                        className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                            : "text-gray-700 hover:bg-emerald-50"
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
                    className="p-3 rounded-xl border border-emerald-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <FaChevronRight className="text-lg" />
                  </button>
                </nav>
              </div>
            )}

            {/* Celebration Banner */}
            <div className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 text-white overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    Share Your Success Story!
                  </h3>
                  <p className="text-emerald-100 max-w-lg">
                    Your recovery story can inspire others and help build trust
                    in our community.
                  </p>
                </div>
                <button className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-gray-100 hover:shadow-xl transition-all duration-300">
                  Share Your Story
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecoveredItems;
