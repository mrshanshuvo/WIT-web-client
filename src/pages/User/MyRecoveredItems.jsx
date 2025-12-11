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
        label: "Item returned",
        color: "text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50",
        icon: FaCheckCircle,
        gradient: "from-emerald-500 to-teal-500",
      };
    }
    if (recovery.recoveredBy?.email === userEmail) {
      return {
        type: "found",
        label: "You found this",
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center h-56">
              <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-emerald-500" />
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Loading your recoveries...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error(error.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-7 text-center shadow-md">
            <div className="bg-gradient-to-r from-red-500 to-red-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaExclamationTriangle className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-bold text-red-800 mb-2">
              Error loading recoveries
            </h3>
            <p className="text-red-600 text-sm">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-150 hover:scale-[1.02] shadow-md"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (recoveries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-8 sm:p-9">
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBoxOpen className="text-emerald-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                No recoveries yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
                You have not recovered or had any items recovered yet. Once you
                find items or get yours back, they will appear here.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/lost-found-items")}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-150 hover:scale-[1.02] shadow-md text-sm font-semibold"
                >
                  <FaSearch className="text-sm" />
                  Browse lost &amp; found
                </button>
                <button
                  onClick={() => navigate("/post-item")}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 border border-emerald-300 text-emerald-700 rounded-lg hover:border-emerald-400 hover:text-emerald-800 transition-all duration-150 hover:scale-[1.02] text-sm font-semibold"
                >
                  <FaArrowRight className="text-sm" />
                  Report an item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const completedCount = recoveries.filter(
    (r) => r.recoveryStatus === "completed"
  ).length;
  const pendingCount = recoveries.filter(
    (r) => r.recoveryStatus === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-7 sm:mb-9">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-2">
            Recovered items
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Track all your item recovery activity – items you found and items
            returned to you.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-600 bg-gradient-to-r from-emerald-50 to-emerald-100 px-3 py-1.5 rounded-full">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
              <span>Items returned</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-gradient-to-r from-teal-50 to-teal-100 px-3 py-1.5 rounded-full">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full" />
              <span>You found</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-gradient-to-r from-yellow-50 to-yellow-100 px-3 py-1.5 rounded-full">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-gradient-to-r from-emerald-100 to-emerald-50 px-3 py-1.5 rounded-full">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full" />
              <span>Completed</span>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 text-center border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-150 hover:-translate-y-1">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
              <FaHistory className="text-white text-lg" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {recoveries.length}
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              Total recoveries
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 text-center border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-150 hover:-translate-y-1">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
              <FaCheckCircle className="text-white text-lg" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {completedCount}
            </h3>
            <p className="text-gray-600 text-sm font-medium">Completed</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 text-center border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-150 hover:-translate-y-1">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
              <FaClock className="text-white text-lg" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{pendingCount}</h3>
            <p className="text-gray-600 text-sm font-medium">Pending</p>
          </div>
        </div>

        {/* Recoveries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {recoveries.map((recovery) => {
            const recoveryType = getRecoveryType(recovery);
            const RecoveryTypeIcon = recoveryType.icon;

            return (
              <div
                key={recovery._id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 overflow-hidden hover:shadow-lg transition-all duration-150 hover:-translate-y-1 group"
              >
                {/* Header */}
                <div
                  className={`bg-gradient-to-r ${recoveryType.gradient} p-5`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-bold text-white line-clamp-2 drop-shadow-sm">
                        {recovery.originalItemData?.title || "Untitled item"}
                      </h2>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold mt-2 bg-white/20 backdrop-blur-sm text-white border border-white/30">
                        <RecoveryTypeIcon className="text-xs" />
                        {recoveryType.label}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border shadow-sm ${getStatusColor(
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

                {/* Details */}
                <div className="p-5 space-y-3">
                  {/* Recovered By/From */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
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
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
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
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
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
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-3">
                      <h4 className="text-[11px] font-semibold text-emerald-800 mb-1">
                        Recovery notes:
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-700 line-clamp-3">
                        {recovery.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                  <div className="flex justify-between items-center gap-3">
                    <button
                      onClick={() => handleViewItem(recovery.itemId)}
                      className="group/btn flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-150 hover:scale-[1.02] text-xs sm:text-sm font-semibold shadow-md"
                    >
                      <FaEye className="text-xs group-hover/btn:animate-pulse" />
                      View item
                      <FaArrowRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform duration-150" />
                    </button>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      {new Date(recovery.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full">
            <FaCheckCircle className="text-emerald-600 text-sm" />
            <p className="text-xs sm:text-sm text-emerald-800 font-medium">
              Showing {recoveries.length} recovery
              {recoveries.length !== 1 ? "s" : ""}
            </p>
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecoveredItems;
