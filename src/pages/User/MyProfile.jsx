import React from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";
import {
  FaUser,
  FaBox,
  FaCheckCircle,
  FaSearch,
  FaSignOutAlt,
  FaEdit,
  FaHistory,
  FaCrown,
  FaShare,
} from "react-icons/fa";

const MyProfile = () => {
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Please sign in to view profile");
    const token = await user.getIdToken();

    const [profileRes, itemsRes, recoveriesRes] = await Promise.all([
      axiosInstance.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axiosInstance.get("/my-items", {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: user.email },
      }),
      axiosInstance.get("/recoveries", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const profileData = profileRes.data;
    const itemsData = itemsRes.data;
    const recoveriesData = recoveriesRes.data;

    const itemsPosted = itemsData.itemsFound || 0;
    const itemsRecovered = recoveriesData.filter(
      (r) => r.originalOwner.email === user.email
    ).length;
    const itemsFound = recoveriesData.filter(
      (r) => r.recoveredBy.email === user.email
    ).length;

    return {
      profile: profileData,
      stats: { itemsPosted, itemsRecovered, itemsFound },
      memberSince: profileData.createdAt || new Date().toISOString(),
    };
  };

  const {
    data = {
      profile: {},
      stats: { itemsPosted: 0, itemsRecovered: 0, itemsFound: 0 },
      memberSince: new Date().toISOString(),
    },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-profile"],
    queryFn: fetchProfileData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleLogout = async () => {
    try {
      await auth.signOut();
      await axiosInstance.post("/users/logout", null, {
        withCredentials: true,
      });
      toast.success("👋 Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to logout");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) return <LoadingSpinner className="mt-8" />;
  if (isError) return <ErrorMessage message={error.message} className="mt-8" />;

  const { profile, stats, memberSince } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account and track your activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/20 rounded-full -ml-12 -mb-12"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden mb-4">
                      {profile.photoURL ? (
                        <img
                          src={profile.photoURL}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-3xl text-white/80" />
                      )}
                    </div>
                    {profile.isAdmin && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-800 p-2 rounded-full shadow-lg">
                        <FaCrown className="text-xs" />
                      </div>
                    )}
                  </div>
                  <h1 className="text-xl font-bold truncate max-w-full">
                    {profile.name || "User"}
                  </h1>
                  <p className="text-emerald-100 text-sm truncate max-w-full">
                    {profile.email}
                  </p>
                  <div className="mt-2 text-xs text-emerald-200">
                    Member since {formatDate(memberSince)}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaEdit className="text-emerald-600" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-all duration-200 hover:scale-105 border border-emerald-200 hover:border-emerald-300 group"
                  >
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => navigate("/share-profile")}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl transition-all duration-200 hover:scale-105 border border-teal-200 hover:border-teal-300 group"
                  >
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <FaShare className="text-white text-sm" />
                    </div>
                    <span>Share Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Actions */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Stats Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaHistory className="text-emerald-600" />
                  Your Activity Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Items Posted - Primary emerald */}
                  <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-2xl border border-emerald-200 text-center group hover:shadow-lg hover:border-emerald-300 transition-all duration-300">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaBox className="text-white text-lg" />
                    </div>
                    <h3 className="font-semibold text-emerald-800 mb-1">
                      Items Posted
                    </h3>
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                      {stats.itemsPosted}
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      Lost items reported
                    </p>
                  </div>

                  {/* Items Recovered - Balanced teal/emerald */}
                  <div className="bg-gradient-to-br from-teal-50 to-white p-5 rounded-2xl border border-teal-200 text-center group hover:shadow-lg hover:border-teal-300 transition-all duration-300">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaCheckCircle className="text-white text-lg" />
                    </div>
                    <h3 className="font-semibold text-teal-800 mb-1">
                      Items Recovered
                    </h3>
                    <p className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                      {stats.itemsRecovered}
                    </p>
                    <p className="text-xs text-teal-600 mt-1">
                      Your items found
                    </p>
                  </div>

                  {/* Items Found - Deeper emerald for significance */}
                  <div className="bg-gradient-to-br from-emerald-100 to-white p-5 rounded-2xl border border-emerald-300 text-center group hover:shadow-lg hover:border-emerald-400 transition-all duration-300">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <FaSearch className="text-white text-lg" />
                    </div>
                    <h3 className="font-semibold text-emerald-900 mb-1">
                      Items Found
                    </h3>
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                      {stats.itemsFound}
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      Helped others recover
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaUser className="text-emerald-600" />
                  Account Management
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* My Items - Primary action */}
                  <button
                    onClick={() => navigate("/my-items")}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-white hover:from-emerald-100 hover:to-white border border-emerald-200 rounded-xl transition-all duration-200 hover:border-emerald-300 hover:scale-105 group"
                  >
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <FaBox className="text-white text-lg" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">My Items</h3>
                      <p className="text-sm text-gray-600">
                        View your posted items
                      </p>
                    </div>
                  </button>

                  {/* My Recoveries - Secondary action */}
                  <button
                    onClick={() => navigate("/my-recovered-items")}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-white hover:from-teal-100 hover:to-white border border-teal-200 rounded-xl transition-all duration-200 hover:border-teal-300 hover:scale-105 group"
                  >
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <FaCheckCircle className="text-white text-lg" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">
                        My Recoveries
                      </h3>
                      <p className="text-sm text-gray-600">
                        Track recovered items
                      </p>
                    </div>
                  </button>

                  {/* Post New Item - CTA action */}
                  <button
                    onClick={() => navigate("/add-item")}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-100 to-white hover:from-emerald-200 hover:to-white border border-emerald-300 rounded-xl transition-all duration-200 hover:border-emerald-400 hover:scale-105 group"
                  >
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <FaShare className="text-white text-lg" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">
                        Post New Item
                      </h3>
                      <p className="text-sm text-gray-600">
                        Report a lost item
                      </p>
                    </div>
                  </button>

                  {/* Log Out - Destructive action */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-white hover:from-red-100 hover:to-white border border-red-200 rounded-xl transition-all duration-200 hover:border-red-300 hover:scale-105 group"
                  >
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <FaSignOutAlt className="text-white text-lg" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">Log Out</h3>
                      <p className="text-sm text-gray-600">
                        Sign out of your account
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
