import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/api";
import Swal from "sweetalert2";

const RecoveryModal = ({ user, item, postType, onClose }) => {
  const queryClient = useQueryClient();
  const [recoveryData, setRecoveryData] = useState({
    recoveredLocation: "",
    recoveredDate: new Date(),
    notes: "",
  });

  // Mutation to submit recovery
  const recoveryMutation = useMutation({
    mutationFn: async (payload) => {
      const token = await user.getIdToken();
      const { data } = await axiosInstance.post(
        `/inventory/${item._id}/recover`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Recovery recorded successfully!");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["item", item._id] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecoveryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setRecoveryData((prev) => ({ ...prev, recoveredDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Step 1: Confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit this recovery?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl shadow-lg",
        title: "text-lg font-semibold",
        confirmButton:
          "px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white",
        cancelButton:
          "px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800",
      },
    });

    if (!result.isConfirmed) return;

    const payload = {
      recoveredLocation: recoveryData.recoveredLocation,
      recoveredDate: recoveryData.recoveredDate.toISOString(),
      notes: recoveryData.notes,
      itemId: item._id,
      postType: item.postType,
      title: item.title,
      description: item.description,
      category: item.category,
      originalLocation: item.location,
      originalDate: item.date,
      thumbnail: item.thumbnail,
      status: item.status,
      originalOwner: {
        name: item.contactName,
        email: item.contactEmail,
      },
      recoveredBy: {
        userId: user.uid,
        name: user.displayName || "Anonymous",
        email: user.email,
        photoURL: user.photoURL || null,
      },
      recoverySubmittedAt: new Date().toISOString(),
    };

    // Step 2: Submit mutation
    recoveryMutation.mutate(payload, {
      onSuccess: () => {
        // Step 3: SweetAlert success popup
        Swal.fire({
          title: "Success!",
          text: "Recovery recorded successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          // confirmButtonText: "OK",
          customClass: {
            popup: "rounded-xl shadow-lg",
            title: "text-lg font-semibold",
            confirmButton:
              "px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white",
          },
        });
        onClose();
        queryClient.invalidateQueries({ queryKey: ["item", item._id] });
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err.response?.data?.message || err.message,
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
          customClass: {
            popup: "rounded-xl shadow-lg",
            title: "text-lg font-semibold",
            confirmButton:
              "px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white",
          },
        });
      },
    });
  };

  const getModalTitle = () =>
    postType === "found" ? "Claim This Item" : "Report Recovery";
  const getLocationLabel = () =>
    postType === "found" ? "Where did you receive it?" : "Where was it found?";
  const getDateLabel = () =>
    postType === "found" ? "Date Received" : "Date Found";

  return (
    <div className="fixed inset-0 bg-white/1 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {getModalTitle()}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={recoveryMutation.isLoading}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getLocationLabel()} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="recoveredLocation"
                value={recoveryData.recoveredLocation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={recoveryMutation.isLoading}
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getDateLabel()} <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={recoveryData.recoveredDate}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxDate={new Date()}
                required
                disabled={recoveryMutation.isLoading}
              />
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={recoveryData.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                disabled={recoveryMutation.isLoading}
                placeholder="Provide any additional details about the recovery..."
              />
            </div>

            {/* User Info */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Your Information
              </h3>
              <div className="bg-gray-50 p-3 rounded-md flex items-center space-x-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 text-lg">
                      {user?.displayName?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-gray-800 font-medium">
                    {user?.displayName || "Anonymous"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {user?.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={recoveryMutation.isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={recoveryMutation.isLoading}
                className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  recoveryMutation.isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : postType === "found"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {recoveryMutation.isLoading
                  ? "Processing..."
                  : "Submit Recovery"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoveryModal;
