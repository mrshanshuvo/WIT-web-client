import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FaClock,
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

// Compact Skeleton Card
const ItemCardSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100/50 overflow-hidden animate-pulse">
    <div className="h-40 bg-gradient-to-br from-emerald-100/50 to-teal-100/50" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <Skeleton height={20} width="70%" className="bg-emerald-200" />
        <Skeleton height={18} width="50px" className="bg-teal-200" />
      </div>
      <Skeleton height={14} width="90%" count={2} className="bg-emerald-100" />
      <div className="flex items-center gap-2">
        <Skeleton circle height={14} width={14} className="bg-emerald-200" />
        <Skeleton height={14} width="60%" className="bg-emerald-100" />
      </div>
      <Skeleton
        height={34}
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
        }
      : {
          color:
            "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200",
        };

  const postTypeConfig = getPostTypeConfig(item.postType);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col group relative">
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
            <div className="text-3xl">
              <FaBox />
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${postTypeConfig.color}`}
          >
            <FaMapMarkerAlt className="text-xs" />
            <span className="capitalize">{item.postType}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200">
            <FaTag className="text-xs" />
            <span className="truncate max-w-[120px]">{item.category}</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow relative">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200">
          {item.title}
        </h3>

        <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-grow">
          {item.description || "No description provided"}
        </p>

        <div className="space-y-2 mb-3 text-xs text-gray-700">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
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
          aria-label={`View details of ${item.title}`}
          className="group/btn relative w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02] overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
          <span className="relative flex items-center justify-center gap-1.5">
            <FaEye className="text-xs" />
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

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Soft background blobs, slightly smaller */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-16 left-8 w-48 h-48 bg-emerald-200 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-8 w-64 h-64 bg-teal-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-4 border border-emerald-200">
            <FaClock className="text-base" />
            <span className="font-semibold text-emerald-800 text-sm">
              Latest Updates
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-2">
            Recently Added Items
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover the latest lost and found items nearby and help reunite
            them with their owners.
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <ItemCardSkeleton key={idx} />
            ))
          ) : error ? (
            <div className="col-span-full bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 text-center backdrop-blur-sm">
              <FaExclamationTriangle className="text-4xl mb-4 text-red-600 mx-auto" />
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Error Loading Items
              </h3>
              <p className="text-red-600 mb-4 max-w-md mx-auto text-sm">
                Unable to load items at the moment. Please check your
                connection.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-lg hover:shadow-md transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="col-span-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-10 text-center">
              <FaEnvelope className="text-5xl mb-4 text-gray-300 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Items Yet
              </h3>
              <p className="text-gray-600 mb-5 max-w-lg mx-auto text-sm">
                Be the first to post a lost or found item and help build our
                community.
              </p>
              <button
                onClick={() => navigate("/add-item")}
                className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <FaPlus className="text-sm" />
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
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={handleSeeAll}
            className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-sm md:text-base font-bold rounded-2xl hover:shadow-xl transition-all duration-200 hover:scale-[1.03] cursor-pointer"
          >
            <span>Browse All Lost &amp; Found Items</span>
            <FaArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200 text-xs md:text-sm">
            <FaUsers className="text-base md:text-lg text-emerald-600" />
            <p className="text-gray-600 font-medium">
              Join thousands helping reunite lost items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestItemsSection;
