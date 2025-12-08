import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FaClock,
  FaChartBar,
  FaTimes,
  FaCheck,
  FaSearch,
  FaExclamationTriangle,
  FaEnvelope,
  FaUsers,
  FaArrowRight,
  FaPlus,
  FaEye,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaBox,
} from "react-icons/fa";

// Enhanced Skeleton Card
const ItemCardSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-emerald-100/50 overflow-hidden animate-pulse">
    <div className="h-48 bg-gradient-to-br from-emerald-100/50 to-teal-100/50"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton height={24} width="70%" className="bg-emerald-200" />
        <Skeleton height={20} width="60px" className="bg-teal-200" />
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

// Enhanced Card Component
const ItemCard = ({ item, onViewDetails }) => {
  const getPostTypeConfig = (postType) => {
    return postType.toLowerCase() === "found"
      ? {
          color:
            "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200",
          badgeColor: "from-emerald-500 to-emerald-600",
        }
      : {
          color:
            "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200",
          badgeColor: "from-red-500 to-red-600",
        };
  };

  const postTypeConfig = getPostTypeConfig(item.postType);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col group relative">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100/50 to-teal-100/50">
            <div className="text-4xl">
              <FaBox />
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${postTypeConfig.color}`}
          >
            <span className="text-xs">
              <FaMapMarkerAlt />
            </span>
            <span className="capitalize">{item.postType}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200">
            <span className="text-xs">
              <FaTag />
            </span>
            <span>{item.category}</span>
          </div>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200">
          {item.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {item.description || "No description provided"}
        </p>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <span className="text-gray-500">
              <FaMapMarkerAlt />
            </span>
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <span className="text-gray-500">
              <FaCalendarAlt />
            </span>
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
          className="group/btn relative w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center gap-2">
            <span className="text-sm">
              <FaEye />
            </span>
            View Details
          </span>
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
      return res.data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleViewDetails = (itemId) => navigate(`/inventory/${itemId}`);
  const handleSeeAll = () => navigate("/lost-found-items");

  const lostCount = items.filter((item) => item.postType === "lost").length;
  const foundCount = items.filter((item) => item.postType === "found").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-6 border border-emerald-200">
            <span className="text-2xl">
              <FaClock />
            </span>
            <span className="font-bold text-emerald-800">Latest Updates</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-4">
            Recently Added Items
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover the latest lost and found items in your community. Help
            reunite valuable belongings with their owners.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-3">
              <FaChartBar className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{items.length}</h3>
            <p className="text-gray-600 font-medium">Total Items</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mx-auto mb-3">
              <FaTimes className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{lostCount}</h3>
            <p className="text-gray-600 font-medium">Lost Items</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-3">
              <FaCheck className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{foundCount}</h3>
            <p className="text-gray-600 font-medium">Found Items</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center mx-auto mb-3">
              <FaSearch className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">6</h3>
            <p className="text-gray-600 font-medium">Latest Shown</p>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <ItemCardSkeleton key={idx} />
            ))
          ) : error ? (
            <div className="col-span-full bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-3xl p-12 text-center backdrop-blur-sm">
              <div className="text-6xl mb-6">
                <FaExclamationTriangle />
              </div>
              <h3 className="text-2xl font-bold text-red-800 mb-3">
                Error Loading Items
              </h3>
              <p className="text-red-600 mb-6 max-w-md mx-auto">
                Unable to load items at the moment. Please check your
                connection.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="col-span-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 p-16 text-center">
              <div className="text-8xl mb-8 opacity-50">
                <FaEnvelope />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No Items Yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
                Be the first to post a lost or found item and help build our
                community!
              </p>
              <button
                onClick={() => navigate("/add-item")}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="text-xl">
                  <FaPlus />
                </span>
                <span>Post First Item</span>
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
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <button
              onClick={handleSeeAll}
              className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span className="text-lg">Browse All Lost & Found Items</span>
              <span className="text-xl group-hover:translate-x-2 transition-transform">
                <FaArrowRight />
              </span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
            <span className="text-2xl">
              <FaUsers />
            </span>
            <p className="text-gray-600 font-medium">
              Join thousands helping reunite lost items
            </p>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="mt-20 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 rounded-3xl p-8 border border-emerald-200/30 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Help?
              </h3>
              <p className="text-gray-600">
                Every item posted brings us closer to reuniting someone with
                their belongings.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/add-item")}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Report Item
              </button>
              <button
                onClick={() => navigate("/how-it-works")}
                className="px-8 py-3 bg-white text-emerald-700 font-bold rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestItemsSection;
