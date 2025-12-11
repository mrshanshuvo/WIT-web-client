import React from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiEye,
  FiMail,
  FiMapPin,
  FiMessageSquare,
} from "react-icons/fi";
import {
  FaBox,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";

const MyItems = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchMyItems = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Please sign in to view your items");
    const token = await user.getIdToken();
    const email = user.email;

    const [itemsRes, recoveryRes] = await Promise.all([
      axiosInstance.get(`/my-items?email=${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axiosInstance.get("/recoveries", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    return {
      items: itemsRes.data.items || itemsRes.data.sampleItems || itemsRes.data,
      recoveries: recoveryRes.data || [],
    };
  };

  const {
    data = { items: [], recoveries: [] },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-items"],
    queryFn: fetchMyItems,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async (itemId) => {
      const user = auth.currentUser;
      if (!user) throw new Error("Please sign in to delete items");
      const token = await user.getIdToken();
      return axiosInstance.delete(`/inventory/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (_, itemId) => {
      toast.success("🎉 Item deleted successfully");
      queryClient.setQueryData(["my-items"], (oldData) => ({
        ...oldData,
        items: oldData.items.filter((i) => i._id !== itemId),
      }));
    },
    onError: (err) => toast.error(err.response?.data?.message || err.message),
  });

  const markRecoveredMutation = useMutation({
    mutationFn: async (recoveryId) => {
      const token = await auth.currentUser.getIdToken();
      return axiosInstance.patch(
        `/recoveries/${recoveryId}`,
        { recoveryStatus: "fully-recovered" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (_, recoveryId) => {
      toast.success("✅ Item marked as fully recovered!");
      queryClient.setQueryData(["my-items"], (oldData) => ({
        ...oldData,
        recoveries: oldData.recoveries.map((r) =>
          r._id === recoveryId ? { ...r, recoveryStatus: "fully-recovered" } : r
        ),
      }));
    },
    onError: () => toast.error("❌ Failed to update recovery status"),
  });

  const getRecoveryForItem = (itemId) =>
    data.recoveries.find((r) => r.itemId === itemId);

  const getStatusConfig = (item) => {
    const recovery = getRecoveryForItem(item._id);
    const isRecovered = recovery?.recoveryStatus === "fully-recovered";
    const isPending = recovery?.recoveryStatus === "pending";

    if (isRecovered) {
      return {
        color:
          "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200",
        icon: FaCheckCircle,
        text: "Fully recovered",
      };
    }
    if (isPending) {
      return {
        color:
          "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200",
        icon: FaClock,
        text: "Pending confirmation",
      };
    }
    return {
      color:
        "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-200",
      icon: FaBox,
      text: "Not recovered",
    };
  };

  const getPostTypeConfig = (postType) =>
    postType === "found"
      ? {
          color:
            "bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 border-teal-200",
          icon: FaSearch,
        }
      : {
          color:
            "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200",
          icon: FaBox,
        };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner className="mt-6" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ErrorMessage message={error.message} className="mt-6" />
        </div>
      </div>
    );
  }

  const { items } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-2">
            My posted items
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Manage your lost and found items, track recovery status, and connect
            with finders.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-7">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3.5 text-center border border-emerald-100 shadow-md">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-2.5 shadow">
              <FaBox className="text-white text-lg" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{items.length}</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Total items</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3.5 text-center border border-emerald-100 shadow-md">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-2.5 shadow">
              <FaCheckCircle className="text-white text-lg" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {
                items.filter(
                  (item) =>
                    getRecoveryForItem(item._id)?.recoveryStatus ===
                    "fully-recovered"
                ).length
              }
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">Recovered</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3.5 text-center border border-emerald-100 shadow-md">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-2.5 shadow">
              <FaClock className="text-white text-lg" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {
                items.filter(
                  (item) =>
                    getRecoveryForItem(item._id)?.recoveryStatus === "pending"
                ).length
              }
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">Pending</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3.5 text-center border border-emerald-100 shadow-md">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-2.5 shadow">
              <FaSearch className="text-white text-lg" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {items.filter((item) => item.postType === "found").length}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">Found items</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaBox className="text-emerald-600" />
            <span className="font-medium">
              {items.length} item{items.length !== 1 ? "s" : ""} posted
            </span>
          </div>
          <button
            onClick={() => navigate("/add-item")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-150 hover:scale-[1.02] shadow-md font-semibold text-sm"
          >
            <FiPlus className="text-base" />
            Add new item
          </button>
        </div>

        {/* Items Grid */}
        {items.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-8 sm:p-9 text-center">
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBox className="text-emerald-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              No items posted yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
              Start by posting your first lost or found item to help reunite it
              with its owner.
            </p>
            <button
              onClick={() => navigate("/add-item")}
              className="px-7 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-150 hover:scale-[1.02] shadow-md font-semibold text-sm"
            >
              Post your first item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map((item) => {
              const recovery = getRecoveryForItem(item._id);
              const statusConfig = getStatusConfig(item);
              const postTypeConfig = getPostTypeConfig(item.postType);
              const StatusIcon = statusConfig.icon;
              const PostTypeIcon = postTypeConfig.icon;

              return (
                <div
                  key={item._id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 overflow-hidden hover:shadow-lg transition-all duration-150 hover:-translate-y-1"
                >
                  {/* Item Image */}
                  <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                        <FaBox className="text-emerald-400 text-3xl" />
                      </div>
                    )}
                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <div
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold border shadow-sm ${statusConfig.color}`}
                      >
                        <StatusIcon className="text-xs" />
                        <span>{statusConfig.text}</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold border shadow-sm ${postTypeConfig.color}`}
                      >
                        <PostTypeIcon className="text-xs" />
                        <span className="capitalize">{item.postType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1.5 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <FaBox className="text-emerald-500" />
                        <span className="font-medium">Category:</span>
                        <span className="text-gray-700">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <FiMapPin className="text-emerald-500" />
                        <span className="font-medium">Location:</span>
                        <span className="text-gray-700 line-clamp-1">
                          {item.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <FaClock className="text-emerald-500" />
                        <span className="font-medium">Posted:</span>
                        <span className="text-gray-700">
                          {new Date(
                            item.createdAt || item.date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Recovery Information */}
                    {recovery && recovery.recoveredBy && (
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-emerald-800 text-xs sm:text-sm mb-2.5 flex items-center gap-2">
                          <FaUser className="text-emerald-600" />
                          Finder information
                        </h4>
                        <div className="flex items-center gap-3 mb-2.5">
                          <img
                            src={recovery.recoveredBy.photoURL}
                            alt={recovery.recoveredBy.name}
                            className="w-9 h-9 rounded-full object-cover border-2 border-emerald-200"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">
                              {recovery.recoveredBy.name}
                            </p>
                            <p className="text-emerald-700 text-xs">
                              {recovery.recoveredBy.email}
                            </p>
                          </div>
                        </div>
                        {recovery.recoveredLocation && (
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-700 mb-1.5">
                            <FiMapPin className="text-emerald-600" />
                            <span>{recovery.recoveredLocation}</span>
                          </div>
                        )}
                        {recovery.notes && (
                          <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                            <FiMessageSquare className="text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">
                              {recovery.notes}
                            </span>
                          </div>
                        )}
                        <a
                          href={`https://mail.google.com/mail/?view=cm&to=${recovery.recoveredBy.email}&su=Regarding your found item: ${item.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 text-xs sm:text-sm font-semibold transition-colors duration-150"
                        >
                          <FiMail className="text-sm" />
                          Contact finder
                        </a>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-3 border-top border-t border-gray-100">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => navigate(`/inventory/${item._id}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-150 text-xs sm:text-sm rounded-md"
                        >
                          <FiEye className="text-sm" />
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/update-item/${item._id}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors duration-150 text-xs sm:text-sm rounded-md"
                        >
                          <FiEdit className="text-sm" />
                          Edit
                        </button>
                      </div>
                      <div className="flex gap-1.5">
                        {recovery &&
                          recovery.originalOwner?.email ===
                            auth.currentUser?.email &&
                          recovery.recoveryStatus === "pending" && (
                            <button
                              onClick={() =>
                                markRecoveredMutation.mutate(recovery._id)
                              }
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-md hover:from-emerald-700 hover:to-teal-700 transition-all duration-150 text-xs sm:text-sm font-semibold shadow-sm"
                              disabled={markRecoveredMutation.isLoading}
                            >
                              {markRecoveredMutation.isLoading ? (
                                <LoadingSpinner size="small" />
                              ) : (
                                <>
                                  <FaCheckCircle className="text-sm" />
                                  Mark recovered
                                </>
                              )}
                            </button>
                          )}
                        <button
                          onClick={() => deleteMutation.mutate(item._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-150 text-xs sm:text-sm rounded-md"
                          disabled={deleteMutation.isLoading}
                        >
                          {deleteMutation.isLoading ? (
                            <LoadingSpinner size="small" />
                          ) : (
                            <>
                              <FiTrash2 className="text-sm" />
                              Delete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-xs sm:text-sm">
              Showing {items.length} item{items.length !== 1 ? "s" : ""} • Last
              updated {new Date().toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItems;
