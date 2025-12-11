import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { auth } from "../../firebase/firebase.config";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import RecoveryModal from "../../components/RecoveryModal";
import { axiosInstance } from "../../api/api";

const ItemDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  // Fetch item
  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/inventory/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!item) return <ErrorMessage message="Item not found" />;

  const postType = item.postType?.toLowerCase();
  const isRecovered = item.status.toLowerCase() === "recovered";
  const isOwner = user?.email === item.contactEmail;

  // Button text logic
  const actionButton = (() => {
    if (isRecovered) return { text: "Already Recovered", disabled: true };
    if (isOwner) return { text: "Your Item", disabled: true };
    return {
      text: postType === "found" ? "This is Mine!" : "I Found It!",
      disabled: false,
    };
  })();

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{item.title}</h1>
            <div className="flex items-center mt-2">
              <span
                className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  postType === "found"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.postType}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                {item.category}
              </span>
            </div>
          </div>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              isRecovered
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {isRecovered ? "Recovered" : "Active"}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={
                item.thumbnail ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {item.description || "No description provided"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="text-gray-800">
                  {item.location || "Not specified"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="text-gray-800">{formatDate(item.date)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="text-gray-800 capitalize">
                  {item.status.replace("-", " ")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Posted By</h3>
                <p className="text-gray-800">
                  {item.contactName || "Anonymous"}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={actionButton.disabled || !user}
              className={`px-4 py-2 rounded-md font-medium ${
                actionButton.disabled
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : postType === "found"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {actionButton.text}
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Contact Name</h3>
            <p className="text-gray-800">
              {item.contactName || "Not provided"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Contact Email</h3>
            <p className="text-gray-800">
              {item.contactEmail || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Recovery Modal */}
      {isModalOpen && user && (
        <RecoveryModal
          user={user}
          item={item}
          postType={postType}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ItemDetails;
