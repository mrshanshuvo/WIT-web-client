import React from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaBoxOpen,
  FaHistory,
  FaArrowRight,
} from "react-icons/fa";

const MyRecoveredItems = () => {
  const navigate = useNavigate();

  const fetchRecoveries = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Please sign in to view recoveries");
    const token = await user.getIdToken();

    const res = await axiosInstance.get("/recoveries", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const {
    data: recoveries = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-recoveries"],
    queryFn: fetchRecoveries,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleViewItem = (itemId) => navigate(`/inventory/${itemId}`);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
      case "fully-recovered":
        return <FaCheckCircle className="text-emerald-600" />;
      case "pending":
        return <FaClock className="text-amber-500" />;
      default:
        return <FaExclamationTriangle className="text-rose-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "fully-recovered":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200";

      case "pending":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200";

      default:
        return "bg-gradient-to-r from-rose-100 to-red-100 text-rose-700 border-rose-200";
    }
  };

  const getRecoveryType = (recovery) => {
    const userEmail = auth.currentUser?.email;
    if (recovery.originalOwner?.email === userEmail) {
      return {
        type: "recovered",
        label: "Item Returned",
        color: "text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50",
        icon: FaCheckCircle,
        gradient: "from-emerald-500 to-teal-500",
      };
    }
    if (recovery.recoveredBy?.email === userEmail) {
      return {
        type: "found",
        label: "You Found This",
        color: "text-teal-700 bg-gradient-to-r from-teal-50 to-emerald-50",
        icon: FaSearch,
        gradient: "from-teal-500 to-emerald-500",
      };
    }
    return {
      type: "unknown",
      label: "Recovery",
      color: "text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100",
      icon: FaBoxOpen,
      gradient: "from-gray-400 to-gray-500",
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading your recoveries...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error(error.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-3xl p-8 text-center shadow-lg">
            <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaExclamationTriangle className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Error Loading Recoveries
            </h3>
            <p className="text-red-600">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (recoveries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-10 sm:p-12">
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBoxOpen className="text-emerald-600 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Recoveries Yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven't recovered or had any items recovered yet. When you
                find lost items or get your items back, they'll appear here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/lost-found-items")}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                >
                  <FaSearch className="text-lg" />
                  Browse Lost & Found
                </button>
                <button
                  onClick={() => navigate("/post-item")}
                  className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-emerald-300 text-emerald-700 rounded-xl hover:border-emerald-400 hover:text-emerald-800 transition-all duration-200 hover:scale-105 font-semibold"
                >
                  <FaArrowRight className="text-lg" />
                  Report an Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-4">
            Recovered Items
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track all your item recovery activities - both items you've found
            and items returned to you
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-emerald-50 to-emerald-100 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <span>Items Returned</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-teal-50 to-teal-100 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
              <span>You Found</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-yellow-50 to-yellow-100 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-emerald-100 to-emerald-50 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full"></div>
              <span>Completed</span>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FaHistory className="text-white text-xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">
              {recoveries.length}
            </h3>
            <p className="text-gray-600 font-medium">Total Recoveries</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FaCheckCircle className="text-white text-xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">
              {
                recoveries.filter((r) => r.recoveryStatus === "completed")
                  .length
              }
            </h3>
            <p className="text-gray-600 font-medium">Completed</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FaClock className="text-white text-xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">
              {recoveries.filter((r) => r.recoveryStatus === "pending").length}
            </h3>
            <p className="text-gray-600 font-medium">Pending</p>
          </div>
        </div>

        {/* Recoveries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {recoveries.map((recovery) => {
            const recoveryType = getRecoveryType(recovery);
            const RecoveryTypeIcon = recoveryType.icon;

            return (
              <div
                key={recovery._id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                {/* Header with Gradient */}
                <div
                  className={`bg-gradient-to-r ${recoveryType.gradient} p-6`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-white line-clamp-2 drop-shadow-sm">
                        {recovery.originalItemData?.title || "Untitled Item"}
                      </h2>
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold mt-3 bg-white/20 backdrop-blur-sm text-white border border-white/30`}
                      >
                        <RecoveryTypeIcon className="text-xs" />
                        {recoveryType.label}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm ${getStatusColor(
                          recovery.recoveryStatus
                        )}`}
                      >
                        {getStatusIcon(recovery.recoveryStatus)}
                        <span className="capitalize">
                          {recovery.recoveryStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recovery Details */}
                <div className="p-6 space-y-4">
                  {/* Recovered By/From */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-2 rounded-lg">
                      <FaUser className="text-emerald-600 flex-shrink-0" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        {recoveryType.type === "found"
                          ? "Returned to:"
                          : "Found by:"}
                      </span>
                      <p className="text-gray-600">
                        {recoveryType.type === "found"
                          ? recovery.originalOwner?.name || "Owner"
                          : recovery.recoveredBy?.name || "Anonymous"}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-2 rounded-lg">
                      <FaCalendarAlt className="text-emerald-600 flex-shrink-0" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Recovered on:
                      </span>
                      <p className="text-gray-600">
                        {new Date(recovery.recoveredDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-2 rounded-lg">
                      <FaMapMarkerAlt className="text-emerald-600 flex-shrink-0" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Location:
                      </span>
                      <p className="text-gray-600 line-clamp-2">
                        {recovery.recoveredLocation}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {recovery.notes && (
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
                      <h4 className="text-xs font-semibold text-emerald-800 mb-2">
                        Recovery Notes:
                      </h4>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {recovery.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleViewItem(recovery.itemId)}
                      className="group/btn flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 hover:scale-105 text-sm font-semibold shadow-md hover:shadow-lg"
                    >
                      <FaEye className="text-sm group-hover/btn:animate-pulse" />
                      View Item Details
                      <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                    <span className="text-xs text-emerald-600 font-medium">
                      {new Date(recovery.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full">
            <FaCheckCircle className="text-emerald-600" />
            <p className="text-sm text-emerald-800 font-medium">
              Showing {recoveries.length} recovery
              {recoveries.length !== 1 ? "s" : ""}
            </p>
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecoveredItems;
