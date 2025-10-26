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
        return <FaCheckCircle className="text-green-500" />;
      case "pending":
        return <FaClock className="text-yellow-500" />;
      default:
        return <FaExclamationTriangle className="text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getRecoveryType = (recovery) => {
    const userEmail = auth.currentUser?.email;
    if (recovery.originalOwner?.email === userEmail) {
      return {
        type: "recovered",
        label: "Item Returned",
        color: "text-green-600 bg-green-50",
      };
    }
    if (recovery.recoveredBy?.email === userEmail) {
      return {
        type: "found",
        label: "You Found This",
        color: "text-blue-600 bg-blue-50",
      };
    }
    return {
      type: "unknown",
      label: "Recovery",
      color: "text-gray-600 bg-gray-50",
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center shadow-lg">
            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Error Loading Recoveries
            </h3>
            <p className="text-red-600">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12">
              <FaBoxOpen className="text-gray-400 text-6xl mx-auto mb-6" />
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
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                >
                  Browse Lost & Found
                </button>
                <button
                  onClick={() => navigate("/post-item")}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-500 transition-all duration-200 hover:scale-105"
                >
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Recovered Items
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track all your item recovery activities - both items you've found
            and items returned to you
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>You Found</span>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg">
            <FaHistory className="text-blue-500 text-2xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              {recoveries.length}
            </h3>
            <p className="text-gray-600">Total Recoveries</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg">
            <FaCheckCircle className="text-green-500 text-2xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              {
                recoveries.filter((r) => r.recoveryStatus === "completed")
                  .length
              }
            </h3>
            <p className="text-gray-600">Completed</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg">
            <FaClock className="text-yellow-500 text-2xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              {recoveries.filter((r) => r.recoveryStatus === "pending").length}
            </h3>
            <p className="text-gray-600">Pending</p>
          </div>
        </div>

        {/* Recoveries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {recoveries.map((recovery) => {
            const recoveryType = getRecoveryType(recovery);

            return (
              <div
                key={recovery._id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                        {recovery.originalItemData?.title || "Untitled Item"}
                      </h2>
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mt-2 ${recoveryType.color}`}
                      >
                        {recoveryType.type === "found" ? (
                          <FaSearch className="text-xs" />
                        ) : (
                          <FaCheckCircle className="text-xs" />
                        )}
                        {recoveryType.label}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
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
                    <FaUser className="text-gray-400 flex-shrink-0" />
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
                    <FaCalendarAlt className="text-gray-400 flex-shrink-0" />
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
                    <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
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
                    <div className="bg-gray-50 rounded-xl p-3">
                      <h4 className="text-xs font-semibold text-gray-700 mb-1">
                        Recovery Notes:
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {recovery.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleViewItem(recovery.itemId)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105 text-sm font-semibold"
                    >
                      <FaEye className="text-sm" />
                      View Item
                    </button>
                    <span className="text-xs text-gray-500">
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
          <p className="text-gray-500 text-sm">
            Showing {recoveries.length} recovery
            {recoveries.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyRecoveredItems;
