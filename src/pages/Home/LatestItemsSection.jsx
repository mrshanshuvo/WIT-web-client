import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEye,
  FaArrowRight,
  FaExclamationTriangle,
  FaBox,
  FaSearch,
  FaClock,
} from "react-icons/fa";
import { axiosInstance } from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Enhanced Skeleton Card
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

// Enhanced Card Component
const ItemCard = ({ item, onViewDetails }) => {
  const getPostTypeConfig = (postType) => {
    return postType.toLowerCase() === "found"
      ? {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: FaSearch,
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
            <FaBox className="text-4xl text-gray-400" />
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
            <FaBox className="text-xs" />
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
          aria-label={`View details of ${item.title}`}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
        >
          <FaEye className="text-sm group-hover/btn:scale-110 transition-transform duration-200" />
          View Details
        </button>
      </div>
    </div>
  );
};

const LatestItemsSection = () => {
  const navigate = useNavigate();

  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latest-items"],
    queryFn: async () => {
      const res = await axiosInstance.get("/inventory");
      // Sort by date and get latest 6 items
      return res.data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleViewDetails = (itemId) => navigate(`/inventory/${itemId}`);
  const handleSeeAll = () => navigate("/lost-found-items");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg">
              <FaClock className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Recently Added Items
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Discover the latest lost and found items in your community. Help
            reunite items with their owners.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaBox className="text-white text-sm" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{items.length}</h3>
            <p className="text-gray-600 text-xs">Total Items</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaExclamationTriangle className="text-white text-sm" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {items.filter((item) => item.postType === "lost").length}
            </h3>
            <p className="text-gray-600 text-xs">Lost Items</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaSearch className="text-white text-sm" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {items.filter((item) => item.postType === "found").length}
            </h3>
            <p className="text-gray-600 text-xs">Found Items</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaClock className="text-white text-sm" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">6</h3>
            <p className="text-gray-600 text-xs">Latest Shown</p>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <ItemCardSkeleton key={idx} />
            ))
          ) : error ? (
            <div className="col-span-full bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
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
          ) : items.length === 0 ? (
            <div className="col-span-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
              <FaBox className="text-gray-400 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Items Yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Be the first to post a lost or found item in your community!
              </p>
              <button
                onClick={() => navigate("/add-item")}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 font-semibold"
              >
                Post First Item
              </button>
            </div>
          ) : (
            items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={handleSeeAll}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <span>Browse All Lost & Found Items</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Additional Info */}
          <p className="text-gray-500 text-sm mt-4">
            Join thousands of users helping each other recover lost items
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestItemsSection;
