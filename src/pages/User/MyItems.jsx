import React from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiEye,
  FiMail,
  FiPhone,
  FiMapPin,
  FiMessageSquare,
} from "react-icons/fi";
import {
  FaBox,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaUser,
  FaEnvelope,
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
        color: "bg-green-100 text-green-800 border-green-200",
        icon: FaCheckCircle,
        text: "Fully Recovered",
      };
    }
    if (isPending) {
      return {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: FaClock,
        text: "Pending Confirmation",
      };
    }
    return {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: FaBox,
      text: "Not Recovered",
    };
  };

  const getPostTypeConfig = (postType) => {
    return postType === "found"
      ? {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: FaSearch,
        }
      : { color: "bg-red-100 text-red-800 border-red-200", icon: FaBox };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner className="mt-8" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ErrorMessage message={error.message} className="mt-8" />
        </div>
      </div>
    );
  }

  const { items } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Posted Items
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your lost and found items, track recovery status, and connect
            with finders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaBox className="text-white text-lg" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{items.length}</h3>
            <p className="text-gray-600 text-sm">Total Items</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCheckCircle className="text-white text-lg" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {
                items.filter(
                  (item) =>
                    getRecoveryForItem(item._id)?.recoveryStatus ===
                    "fully-recovered"
                ).length
              }
            </h3>
            <p className="text-gray-600 text-sm">Recovered</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaClock className="text-white text-lg" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {
                items.filter(
                  (item) =>
                    getRecoveryForItem(item._id)?.recoveryStatus === "pending"
                ).length
              }
            </h3>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaSearch className="text-white text-lg" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {items.filter((item) => item.postType === "found").length}
            </h3>
            <p className="text-gray-600 text-sm">Found Items</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FaBox className="text-blue-500" />
            <span className="font-medium">
              {items.length} item{items.length !== 1 ? "s" : ""} posted
            </span>
          </div>
          <button
            onClick={() => navigate("/add-item")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
          >
            <FiPlus className="text-lg" />
            Add New Item
          </button>
        </div>

        {/* Items Grid */}
        {items.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
            <FaBox className="text-gray-400 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Items Posted Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start by posting your first lost or found item to help reunite it
              with its owner.
            </p>
            <button
              onClick={() => navigate("/add-item")}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 font-semibold"
            >
              Post Your First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item) => {
              const recovery = getRecoveryForItem(item._id);
              const statusConfig = getStatusConfig(item);
              const postTypeConfig = getPostTypeConfig(item.postType);
              const StatusIcon = statusConfig.icon;
              const PostTypeIcon = postTypeConfig.icon;

              return (
                <div
                  key={item._id}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  {/* Item Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <FaBox className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}
                      >
                        <StatusIcon className="text-xs" />
                        <span>{statusConfig.text}</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${postTypeConfig.color}`}
                      >
                        <PostTypeIcon className="text-xs" />
                        <span className="capitalize">{item.postType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaBox className="text-gray-400" />
                        <span className="font-medium">Category:</span>
                        <span>{item.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin className="text-gray-400" />
                        <span className="font-medium">Location:</span>
                        <span className="line-clamp-1">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaClock className="text-gray-400" />
                        <span className="font-medium">Posted:</span>
                        <span>
                          {new Date(
                            item.createdAt || item.date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Recovery Information */}
                    {recovery && recovery.recoveredBy && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                        <h4 className="font-semibold text-blue-800 text-sm mb-3 flex items-center gap-2">
                          <FaUser className="text-blue-600" />
                          Finder Information
                        </h4>
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={recovery.recoveredBy.photoURL}
                            alt={recovery.recoveredBy.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">
                              {recovery.recoveredBy.name}
                            </p>
                            <p className="text-gray-600 text-xs">
                              {recovery.recoveredBy.email}
                            </p>
                          </div>
                        </div>
                        {recovery.recoveredLocation && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <FiMapPin className="text-blue-500" />
                            <span>{recovery.recoveredLocation}</span>
                          </div>
                        )}
                        {recovery.notes && (
                          <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                            <FiMessageSquare className="text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">
                              {recovery.notes}
                            </span>
                          </div>
                        )}
                        <a
                          href={`https://mail.google.com/mail/?view=cm&to=${recovery.recoveredBy.email}&su=Regarding your found item: ${item.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors duration-200"
                        >
                          <FiMail className="text-sm" />
                          Contact Finder
                        </a>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/inventory/${item._id}`)}
                          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                        >
                          <FiEye className="text-sm" />
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/update-item/${item._id}`)}
                          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm"
                        >
                          <FiEdit className="text-sm" />
                          Edit
                        </button>
                      </div>
                      <div className="flex gap-2">
                        {recovery &&
                          recovery.originalOwner?.email ===
                            auth.currentUser?.email &&
                          recovery.recoveryStatus === "pending" && (
                            <button
                              onClick={() =>
                                markRecoveredMutation.mutate(recovery._id)
                              }
                              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm font-semibold"
                              disabled={markRecoveredMutation.isLoading}
                            >
                              {markRecoveredMutation.isLoading ? (
                                <LoadingSpinner size="small" />
                              ) : (
                                <>
                                  <FaCheckCircle className="text-sm" />
                                  Mark Recovered
                                </>
                              )}
                            </button>
                          )}
                        <button
                          onClick={() => deleteMutation.mutate(item._id)}
                          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
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
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
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
